"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title }) => {
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank",
    );
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Share this post</h2>
      <div className="flex space-x-4">
        <Button variant="ghost" onClick={shareOnTwitter}>
          Share on Twitter
        </Button>
        <Button variant="ghost" onClick={shareOnFacebook}>
          Share on Facebook
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;
