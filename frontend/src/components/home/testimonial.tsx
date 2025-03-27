import React from "react";
import { TestimonialCards } from "../ui/testimonial-cards";

const testimonial = () => {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-full border border-border p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-quote h-5 w-5"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold">Testimonials</h1>
      </div>
      <div>
        <TestimonialCards />
      </div>
    </div>
  );
};

export default testimonial;
