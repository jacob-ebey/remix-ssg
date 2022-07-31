import * as React from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useFetchers,
  useTransition,
} from "@remix-run/react";
import NProgress from "nprogress";
import clsx from "clsx";

import nProgressStyles from "nprogress/nprogress.css";
import tailwindStylesHref from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: nProgressStyles },
  { rel: "stylesheet", href: tailwindStylesHref },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <Document>
      <Shell>
        <Outlet />
      </Shell>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <Shell>
        <div className="relative overflow-hidden h-screen">
          <div className="inset-0 absolute"></div>
          <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
            <div className="w-full font-mono flex flex-col items-center relative z-10">
              <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                {caught.statusText}
              </h1>
              <p className="font-extrabold text-8xl my-32 text-white animate-bounce">
                {caught.status}
              </p>
            </div>
          </div>
        </div>
      </Shell>
    </Document>
  );
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const transition = useTransition();
  const fetchers = useFetchers();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  const state = React.useMemo<"idle" | "loading">(
    function getGlobalState() {
      const states = [
        transition.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers]
  );

  React.useEffect(() => {
    if (state === "idle") NProgress.done();
    else NProgress.start();

    return () => {
      NProgress.done();
    };
  }, [state]);

  return (
    <div className="dark:bg-gray-800 font-mono bg-white relative overflow-y-auto h-screen dark:text-white text-gray-800">
      <header className="h-24 sm:h-32 flex items-center z-20 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-gray-800 dark:text-white font-black text-3xl flex items-center">
            <RemixSVG />
          </div>
          <div className="flex items-center relative">
            <nav
              className={clsx(
                "font-sen text-gray-800 dark:text-white uppercase text-lg sm:flex items-center",
                "absolute sm:relative top-full right-0 dark:bg-gray-800 bg-white z-30",
                !menuOpen && "hidden"
              )}
            >
              <Link
                onClick={handleMenuItemClick}
                to="/"
                className="py-2 px-6 flex hover:text-black"
              >
                Home
              </Link>
              <Link
                onClick={handleMenuItemClick}
                to="docs"
                className="py-2 px-6 flex hover:text-black"
              >
                Docs
              </Link>
              <a
                href="https://github.com/jacob-ebey/remix-ssg"
                className="py-2 px-6 flex hover:text-black"
                rel="noopener noreferrer"
                target="_blank"
              >
                Source
              </a>
            </nav>
            <button
              className="sm:hidden flex flex-col ml-4"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1" />
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1" />
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1" />
            </button>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}

function RemixSVG() {
  return (
    <svg
      x-comp="Wordmark"
      height="25"
      viewBox="0 0 659 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title>Remix Logo</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z"
        fill="currentColor"
      ></path>
      <path
        d="M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z"
        fill="currentColor"
      ></path>
      <path
        d="M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z"
        fill="url(#paint0_linear)"
      ></path>
      <path
        d="M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z"
        fill="currentColor"
      ></path>
      <path
        d="M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z"
        fill="url(#paint1_linear)"
      ></path>
      <path
        d="M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z"
        fill="currentColor"
      ></path>
      <path
        d="M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z"
        fill="url(#paint2_linear)"
      ></path>
      <path
        d="M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z"
        fill="currentColor"
      ></path>
      <path
        d="M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z"
        fill="url(#paint3_linear)"
      ></path>
      <path
        d="M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z"
        fill="currentColor"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="591.052"
          y1="47.1035"
          x2="591.052"
          y2="161.28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor"></stop>
          <stop offset="1" stopColor="currentColor" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="203.19"
          y1="44.0317"
          x2="203.19"
          y2="164.352"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor"></stop>
          <stop offset="1" stopColor="currentColor" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="368.744"
          y1="44.0317"
          x2="368.744"
          y2="161.28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor"></stop>
          <stop offset="1" stopColor="currentColor" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="499.172"
          y1="0"
          x2="499.172"
          y2="161.28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor"></stop>
          <stop offset="1" stopColor="currentColor" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
