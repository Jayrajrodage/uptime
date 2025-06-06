import { ModeToggle } from "../ui/mode-toggle";

const Footer = () => {
  return (
    <div>
      <div className="w-full rounded-lg border border-border px-3 py-4 backdrop-blur-[2px] md:p-6 grid gap-6 mt-3">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-3">
            <div>
              <span data-state="closed">
                <a className="flex items-center gap-2 font-cal">Uptime</a>
              </span>
              <p className="mt-2 max-w-md font-light text-muted-foreground text-sm">
                We are on a mission to provide a reliable, easy and fast way to
                monitor the performance of your APIs and websites.
                <br />
                <span className="underline  underline-offset-2">
                  Speed Matters
                </span>
              </p>
            </div>
            <div className="max-w-min" data-state="closed">
              <a
                className="inline-flex max-w-fit items-center gap-2 rounded-md border border-gray-200 px-3 py-1 text-gray-700 text-sm hover:bg-gray-100 hover:text-black dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
                href="/"
                target="_blank"
                rel="noreferrer"
              >
                Operational
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 duration-1000"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
              </a>
            </div>
          </div>

          <div className="order-2 flex flex-col gap-3 text-sm">
            <p className="font-semibold text-foreground">Resources</p>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              Blog
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              Pricing
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              target="_blank"
              rel="noreferrer"
              href="/"
            >
              Docs
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
                className="lucide lucide-arrow-up-right h-4 w-4 flex-shrink-0"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              OSS Friends
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              External Providers Monitoring
            </a>
          </div>

          <div className="order-3 flex flex-col gap-3 text-sm">
            <p className="font-semibold text-foreground">Company</p>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              About
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              Changelog
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              Terms
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              Privacy
            </a>
          </div>

          <div className="order-3 flex flex-col gap-3 text-sm">
            <p className="font-semibold text-foreground">Tools</p>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              Speed Checker
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              href="/"
            >
              cURL Builder
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              target="_blank"
              rel="noreferrer"
              href="/"
            >
              All Status Codes
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
                className="lucide lucide-arrow-up-right h-4 w-4 flex-shrink-0"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
            <a
              className="flex w-fit flex-wrap items-center gap-1 text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
              target="_blank"
              rel="noreferrer"
              href="/"
            >
              Vercel Edge Ping
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
                className="lucide lucide-arrow-up-right h-4 w-4 flex-shrink-0"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <a
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
              href="https://github.com/jayrajrodage/uptime"
            >
              <span className="sr-only">GitHub</span>
              <svg viewBox="0 0 438.549 438.549" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                ></path>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
              href="https://x.com/JayrajRodage"
            >
              <span className="sr-only">Twitter</span>
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
                className="lucide lucide-twitter h-4 w-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
              href="https://www.linkedin.com/in/jayraj-rodage-590252194/"
            >
              <span className="sr-only">LinkedIn</span>
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
                className="lucide lucide-linkedin h-4 w-4"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
          <div className="text-right md:text-left">
            <div
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
              id="theme-toggle"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
