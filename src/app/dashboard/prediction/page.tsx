"use client";

import { AnalysisLoadingSkeleton } from "@/components/ui/analysis-loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormattedAnalysis } from "@/components/ui/formatted-analysis";
import { ImagePreview } from "@/components/ui/image-preview";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Brain,
  Clock,
  FileText,
  Heart,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  Trash2,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface AnalysisResult {
  analysis: string;
  timestamp: string;
}

interface UploadedFile {
  file: File;
  preview: string;
  type: "image" | "document";
}

export default function PredictionPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setError(""); // Clear any previous errors

    files.forEach((file) => {
      console.log(
        "Uploading file:",
        file.name,
        "Type:",
        file.type,
        "Size:",
        file.size
      );

      // Validate file type and size
      if (file.type.startsWith("image/")) {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          setError(
            `File ${file.name} is too large. Please use files under 10MB.`
          );
          return;
        }
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log("File loaded, data URL length:", result?.length);

        // Ensure we have a valid data URL
        if (result && result.startsWith("data:")) {
          const newFile: UploadedFile = {
            file,
            preview: result,
            type: file.type.startsWith("image/") ? "image" : "document",
          };
          setUploadedFiles((prev) => [...prev, newFile]);
          console.log("File added to uploadedFiles");
        } else {
          setError(`Failed to load ${file.name}. Please try again.`);
        }
      };

      reader.onerror = () => {
        console.error("Error reading file:", file.name);
        setError(`Error reading ${file.name}. Please try again.`);
      };

      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (!query.trim()) {
      setError("Please describe your symptoms or health concerns");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      // Convert images to base64
      const imageData = await Promise.all(
        uploadedFiles
          .filter((file) => file.type === "image")
          .map((file) => {
            return new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(file.file);
            });
          })
      );

      const response = await fetch("/api/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          images: imageData,
          medicalHistory: medicalHistory,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisResult({
          analysis: data.analysis,
          timestamp: data.timestamp,
        });
      } else {
        setError(data.error || "Analysis failed");
      }
    } catch (err) {
      setError("Failed to connect to AI service. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const commonQuestions = [
    "I've been experiencing irregular periods. What could be the cause?",
    "I found a lump in my breast. Should I be concerned?",
    "I'm having severe menstrual cramps and heavy bleeding.",
    "I've been trying to conceive for months without success.",
    "I'm experiencing unusual vaginal discharge and discomfort.",
    "I have symptoms that might indicate PCOS.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          className="text-pink-600 mb-4"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI Health Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized health insights powered by AI. Upload medical
            reports, images, and describe your symptoms for comprehensive
            analysis.
          </p>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-800">
                Important Disclaimer
              </span>
            </div>
            <p className="text-sm text-yellow-700">
              This AI analysis is for informational purposes only and should not
              replace professional medical advice. Always consult with
              healthcare professionals for accurate diagnosis and treatment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Query Input */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-5 w-5 text-pink-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Describe Your Health Concerns
                </h3>
              </div>
              <Textarea
                placeholder="Please describe your symptoms, concerns, or questions in detail. The more information you provide, the better the AI can assist you..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-32 mb-4"
              />

              {/* Quick Questions */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">
                  Or choose from common questions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {commonQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(question)}
                      className="text-left p-3 bg-gray-50 hover:bg-pink-50 rounded-lg text-sm transition-colors border border-gray-200 hover:border-pink-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Medical History */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Medical History (Optional)
                </h3>
              </div>
              <Textarea
                placeholder="Share relevant medical history, current medications, allergies, family history, or previous diagnoses..."
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                className="min-h-24"
              />
            </Card>

            {/* File Upload */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Upload className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Upload Medical Reports or Images
                </h3>
              </div>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add(
                    "border-pink-400",
                    "bg-pink-50"
                  );
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove(
                    "border-pink-400",
                    "bg-pink-50"
                  );
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove(
                    "border-pink-400",
                    "bg-pink-50"
                  );
                  const files = Array.from(e.dataTransfer.files);
                  if (files.length > 0) {
                    const fakeEvent = {
                      target: { files },
                    } as any;
                    handleFileUpload(fakeEvent);
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="mb-4">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supports images (JPG, PNG) and documents (PDF, DOC) • Max
                    10MB per file
                  </p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="border-pink-300 text-pink-700 hover:bg-pink-50"
                >
                  Choose Files
                </Button>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="space-y-2">
                      {file.type === "image" ? (
                        <ImagePreview
                          src={file.preview}
                          alt={file.file.name}
                          onRemove={() => removeFile(index)}
                        />
                      ) : (
                        <div className="relative group aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4">
                          <FileText className="h-8 w-8 text-gray-500 mb-2" />
                          <p className="text-xs text-gray-600 text-center truncate w-full">
                            {file.file.name}
                          </p>
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !query.trim()}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  Analyze with AI
                </>
              )}
            </Button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <Heart className="h-6 w-6 text-pink-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">AI-Powered</p>
                <p className="font-semibold">Health Analysis</p>
              </Card>
              <Card className="p-4 text-center">
                <Activity className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Specialized in</p>
                <p className="font-semibold">Women's Health</p>
              </Card>
            </div>

            {/* Analysis Results */}
            {isAnalyzing && (
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Loader2 className="h-5 w-5 text-blue-600 mr-2 animate-spin" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Analyzing Your Health Query...
                  </h3>
                </div>
                <AnalysisLoadingSkeleton />
              </Card>
            )}

            {analysisResult && !isAnalyzing && (
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Brain className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    AI Analysis
                  </h3>
                  <div className="ml-auto flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(analysisResult.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <FormattedAnalysis analysis={analysisResult.analysis} />
                </div>
              </Card>
            )}

            {/* Health Tips */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                General Health Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    Regular health screenings are crucial for early detection
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Maintain a healthy diet rich in fruits and vegetables</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Stay hydrated and exercise regularly</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Don't hesitate to consult healthcare professionals</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
