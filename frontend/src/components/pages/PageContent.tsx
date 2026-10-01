"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "@/lib/tina-field";
import LazyComponent from "@/components/ui/LazyComponent";
import BackToTop from "@/components/ui/BackToTop";
import SectionRenderer from "@/components/sections/blocks/SectionRenderer";
import { getBlocks } from "@/components/sections/blocks/blocks";
import { renderMarkdown } from "@/lib/content/processors/markdown";

export interface PageContentProps {
  /** `{ page }` data — either Tina query result or filesystem-loaded record */
  data: { page: Record<string, unknown> | null };
  /** GraphQL query text for live preview ("" when served offline from files) */
  query: string;
  variables: { relativePath: string };
  /** Blocks at index >= lazyFrom mount lazily on scroll (below the fold) */
  lazyFrom?: number;
}

function PageBody({ page, lazyFrom }: { page: Record<string, unknown> | null; lazyFrom: number }) {
  const blocks = getBlocks(page);
  const body = typeof page?.body === "string" ? page.body.trim() : "";
  return (
    <>
      {blocks.map((block, i) =>
        i >= lazyFrom ? (
          <LazyComponent key={i} threshold={0.15} rootMargin="200px">
            <SectionRenderer block={block} />
          </LazyComponent>
        ) : (
          <SectionRenderer key={i} block={block} />
        )
      )}
      {body && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <article
            data-tinafield={page ? tinaField(page, "body") : undefined}
            className="prose prose-base max-w-none text-neutral-800 prose-headings:text-neutral-900 prose-headings:scroll-mt-24 prose-a:text-[#6a4a00] prose-li:marker:text-neutral-400"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
          />
          <BackToTop />
        </div>
      )}
    </>
  );
}

function LivePageContent({ data, query, variables, lazyFrom = 3 }: PageContentProps) {
  const { data: live } = useTina({ query, variables, data });
  return <PageBody page={live?.page ?? null} lazyFrom={lazyFrom} />;
}

export default function PageContent(props: PageContentProps) {
  if (!props.data?.page) return null;
  if (props.query) return <LivePageContent {...props} />;
  return <PageBody page={props.data.page} lazyFrom={props.lazyFrom ?? 3} />;
}
