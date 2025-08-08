"use client";

import { Button } from "@/components/ui/button";
import { X, ZoomIn } from "lucide-react";
import { useState } from "react";

interface ImagePreviewProps {
  src: string;
  alt: string;
  onRemove?: () => void;
}

export function ImagePreview({ src, alt, onRemove }: ImagePreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  return (
    <>
      <div className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
          </div>
        )}

        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
            <div className="text-2xl mb-2">⚠️</div>
            <p className="text-xs text-center">Failed to load image</p>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoading ? "none" : "block" }}
          />
        )}

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/80 hover:bg-white"
              onClick={() => setIsModalOpen(true)}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            {onRemove && (
              <Button
                size="sm"
                variant="outline"
                className="bg-red-50/80 hover:bg-red-100 text-red-600 hover:text-red-700"
                onClick={onRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Full-screen modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
