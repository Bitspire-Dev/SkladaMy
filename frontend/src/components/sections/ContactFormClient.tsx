"use client";

import dynamic from "next/dynamic";
import React from "react";

const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false,
  loading: () => (
    <div role="status" aria-live="polite" className="animate-pulse">
      <div className="h-72 bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-center items-center">
        <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-neutral-200 rounded w-2/3 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-1/2" />
      </div>
    </div>
  ),
});

export default function ContactFormClient() {
  return <ContactForm />;
}
