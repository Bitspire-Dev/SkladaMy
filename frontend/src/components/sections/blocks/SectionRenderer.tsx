import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import PageHeaderSection from "./PageHeaderSection";
import StatsSection from "./StatsSection";
import ListGridSection from "./ListGridSection";
import QASection from "./QASection";
import RichTextSection from "./RichTextSection";
import ContactPanelSection from "./ContactPanelSection";
import {
  blockType,
  type CtaBlock,
  type FaqBlock,
  type FeaturesBlock,
  type HeroBlock,
  type ListGridBlock,
  type PageBlock,
  type PageHeaderBlock,
  type ProcessBlock,
  type QaBlock,
  type RichTextBlock,
  type ServicesBlock,
  type StatsBlock,
  type TestimonialsBlock,
  type ContactPanelBlock,
} from "./blocks";

/** Renders a single page block based on its `_template`/`__typename`. */
export default function SectionRenderer({ block }: { block: PageBlock }) {
  switch (blockType(block)) {
    case "pageHeader":
      return <PageHeaderSection data={block as PageHeaderBlock} />;
    case "hero":
      return <HeroSection data={block as HeroBlock} />;
    case "services":
      return <ServicesSection data={block as ServicesBlock} />;
    case "whyUs":
    case "features":
      return <WhyUsSection data={block as FeaturesBlock} />;
    case "process":
      return <ProcessSection data={block as ProcessBlock} />;
    case "testimonials":
      return <TestimonialsSection data={block as TestimonialsBlock} />;
    case "faq":
      return <FAQSection data={block as FaqBlock} />;
    case "qa":
      return <QASection data={block as QaBlock} />;
    case "cta":
      return <FinalCTASection data={block as CtaBlock} />;
    case "stats":
      return <StatsSection data={block as StatsBlock} />;
    case "listGrid":
      return <ListGridSection data={block as ListGridBlock} />;
    case "richText":
      return <RichTextSection data={block as RichTextBlock} />;
    case "contactPanel":
      return <ContactPanelSection data={block as ContactPanelBlock} />;
    default:
      return null;
  }
}
