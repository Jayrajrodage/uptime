import { TextAnimate } from "../magicui/text-animate";
import { ArrowRightIcon } from "lucide-react";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";

const hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto">
      <AnimatedShinyText className="cursor-pointer inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition ease-out hover:text-foreground hover:bg-accent/50 hover:border-accent hover:duration-300">
        <span>✨ Introducing Uptime</span>
        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedShinyText>
      <TextAnimate className="font-cal text-center text-4xl md:text-6xl bg-gradient-to-tl from-0% from-[hsl(var(--muted))] to-40% to-[hsl(var(--foreground))] bg-clip-text ">
        A better way to monitor your services.
      </TextAnimate>
      <p className="mx-auto text-center max-w-md text-lg text-muted-foreground md:max-w-xl md:text-xl mt-4">
        Monitor your API and website globally, identify performance issues,
        downtime and receive alerts before your users are affected.
      </p>
    </div>
  );
};

export default hero;
