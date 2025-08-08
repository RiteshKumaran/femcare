"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface VideoResource {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
}

const videoResources: VideoResource[] = [
  {
    id: "1",
    title: "The Importance of Mental Health in Women",
    description:
      "Exploring the impact of mental health on women and strategies for self-care.",
    youtubeId: "i4Q_bL-63oc",
  },
  {
    id: "2",
    title: "Nutrition Tips for Women: A Balanced Diet for Health & Wellness",
    description:
      "A guide to essential nutrients and diet tips tailored for women's health.",
    youtubeId: "KoBLzVgZrWw",
  },
  {
    id: "3",
    title: "The Top Women's Health Highlights from 2024",
    description:
      "An overview of significant women's health topics and advancements from 2024.",
    youtubeId: "_kjG6V6OcuY",
  },
  {
    id: "4",
    title: "Understanding Breast Cancer",
    description:
      "A comprehensive guide to understanding breast cancer and its treatment options.",
    youtubeId: "KyeiZJrWrys",
  },
  {
    id: "5",
    title: "How menstruation works",
    description:
      "Understanding the menstrual cycle and its impact on women's health.",
    youtubeId: "ayzN5f3qN8g",
  },
  {
    id: "6",
    title: "Women's Health and Aging: Expert Q&A",
    description:
      "Experts discuss how women can maintain health and independence as they age.",
    youtubeId: "4DgwWqh8UsQ",
  },
  {
    id: "7",
    title: "A Comprehensive Approach to Women's Health",
    description:
      "An integrated approach to women's health care by experts at Stony Brook Medicine.",
    youtubeId: "88M7syTZ-HQ",
  },
  {
    id: "8",
    title: "Managing Menopause | Women's Health",
    description:
      "Updated recommendations for menopausal management, especially hormone therapy.",
    youtubeId: "QNZfEtZ53RY",
  },
  {
    id: "9",
    title: "The Science of Women's Health: Ob/Gyn Reveals 10 Truths",
    description: "An Ob/Gyn shares insights on women's health topics.",
    youtubeId: "7KX2x0d42EE",
  },
  {
    id: "10",
    title: "Women's Health and Aging: Expert Q&A",
    description: "How women can maintain health and independence as they age.",
    youtubeId: "4DgwWqh8UsQ",
  },
  {
    id: "11",
    title: "Tips on Women's Health",
    description:
      "Dr. Jennifer Ashton answers viewers' questions and gives her prescription for wellness.",
    youtubeId: "wrL_yVfSR-E",
  },
  {
    id: "12",
    title: "Ovarian Cancer: Moving to a Personalized Treatment Approach",
    description:
      "Discussion on personalized treatment approaches for ovarian cancer.",
    youtubeId: "dVgb7w6X95w",
  },
  {
    id: "13",
    title: "10 Common Women's Health Conditions (How to Recognise Them)",
    description:
      "Recognize common gynecological conditions with this informative guide.",
    youtubeId: "LKBvjvIXUJE",
  },
  {
    id: "14",
    title: "The Science of Women's Health: Ob/Gyn Reveals 10 Truths",
    description:
      "An Ob/Gyn shares insights on key truths about women's health.",
    youtubeId: "7KX2x0d42EE",
  },
  {
    id: "15",
    title: "Managing Menopause | Women's Health",
    description:
      "Updated recommendations for menopausal management and hormone therapy.",
    youtubeId: "QNZfEtZ53RY",
  },
  {
    id: "16",
    title: "2024 Women's Health Campaign :45",
    description:
      "A look at Hackensack Meridian Health's 2024 campaign dedicated to women's health.",
    youtubeId: "eg4ADUf5BX0",
  },
  {
    id: "17",
    title: "TODAY's Five Things: Doctors Share Top Advice for Women's Health",
    description:
      "Doctors share their top advice on women’s health in this insightful TODAY segment.",
    youtubeId: "4cGVBAruWBY",
  },
  {
    id: "18",
    title: "2024 Women's Health: Stories",
    description:
      "Real stories and testimonials highlighting women's health journeys in 2024.",
    youtubeId: "yYH6gFAf6No",
  },
  {
    id: "19",
    title: "Understanding PCOS",
    description:
      "A comprehensive guide to recognizing symptoms and treatments for PCOS.",
    youtubeId: "IvbjjJdKWTg",
  },
  {
    id: "20",
    title: "The Hormone Diaries: The Bloody Truth About Our Periods",
    description:
      "Hannah Witton gives an honest look at menstruation and hormonal health.",
    youtubeId: "3ScXKTtgy-U",
  },
  {
    id: "21",
    title: "What is Endometriosis? An Overview",
    description:
      "A clear explanation of endometriosis, its symptoms, and treatment options.",
    youtubeId: "GfrgbtXRCHw",
  },
];

export default function ResourcesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videoResources.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Button
        variant="ghost"
        className="text-pink-600 mb-4"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      <h1 className="text-3xl text-center mt-16 font-bold text-pink-800">
        Educational Resources
      </h1>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search videos..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-pink-900 mb-2">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No videos found matching your search.
        </div>
      )}
    </div>
  );
}
