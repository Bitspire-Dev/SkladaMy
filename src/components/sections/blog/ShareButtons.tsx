"use client";

import { useState } from "react";
import { Share2, X, Facebook, Linkedin, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Share2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Udostępnij</h3>
      </div>

      <div className="space-y-2">
        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors group"
        >
          <X className="h-5 w-5 text-black group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-foreground">Udostępnij na X</span>
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors group"
        >
          <Facebook className="h-5 w-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-foreground">Udostępnij na Facebook</span>
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors group"
        >
          <Linkedin className="h-5 w-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-foreground">Udostępnij na LinkedIn</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors group"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Skopiowano!
              </span>
            </>
          ) : (
            <>
              <LinkIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
              <span className="text-sm font-medium text-foreground">Kopiuj link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
