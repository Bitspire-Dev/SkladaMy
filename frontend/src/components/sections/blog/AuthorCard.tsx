"use client";

import Image from "next/image";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";
import type { Author } from "@/types/strapi";

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">O autorze</h3>

      <div className="flex items-start gap-4">
        {author.avatar && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-border">
            <Image
              src={author.avatar.url}
              alt={author.avatar.alternativeText || author.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{author.name}</h4>
          {author.bio && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{author.bio}</p>
          )}
        </div>
      </div>

      {/* Social Links */}
      {(author.email || author.twitter || author.linkedin || author.website) && (
        <div className="flex gap-3 pt-2 border-t border-border">
          {author.email && (
            <a
              href={`mailto:${author.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
              title={`Wyślij email do ${author.name}`}
            >
              <Mail className="h-5 w-5" />
            </a>
          )}

          {author.twitter && (
            <a
              href={
                author.twitter.startsWith("http")
                  ? author.twitter
                  : `https://twitter.com/${author.twitter.replace("@", "")}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
              title="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}

          {author.linkedin && (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}

          {author.website && (
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Strona www"
              title="Strona www"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
