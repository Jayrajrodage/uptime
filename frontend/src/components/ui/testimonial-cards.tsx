import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <div
      className={cn(
        "  relative cursor-pointer overflow-hidden rounded-xl border p-4    ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-start gap-2">
          <img
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={img}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold dark:text-white">
              {name}
            </span>
            <p className="text-xs font-semibold dark:text-white/40">
              {username}
            </p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm font-medium text-start">
          {body}
        </blockquote>
      </div>
    </div>
  );
};

export const TestimonialCards = () => {
  return (
    <div className="relative flex flex-col gap-2 items-center justify-center overflow-hidden">
      <Marquee pauseOnHover={true}>
        {reviews.map((review) => (
          <div key={review.name} className="mx-2">
            <ReviewCard {...review} />
          </div>
        ))}
      </Marquee>
      <Marquee pauseOnHover={true} direction="right">
        {reviews.map((review) => (
          <div key={review.name} className="mx-2">
            <ReviewCard {...review} />
          </div>
        ))}
      </Marquee>
      <Marquee pauseOnHover={true}>
        {reviews.map((review) => (
          <div key={review.name} className="mx-2">
            <ReviewCard {...review} />
          </div>
        ))}
      </Marquee>
      <Marquee pauseOnHover={true} direction="right">
        {reviews.map((review) => (
          <div key={review.name} className="mx-2">
            <ReviewCard {...review} />
          </div>
        ))}
      </Marquee>
      {/* Left Fade */}
      <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-white dark:from-black z-10 pointer-events-none"></div>
      {/* Right Fade */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white  dark:from-black  z-10 pointer-events-none"></div>
    </div>
  );
};
