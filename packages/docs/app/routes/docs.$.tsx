import { useMemo } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// @ts-expect-error
import { Parser as HtmlParser } from "html-to-react";
import { getDocBySlug, getDocs } from "~/api.server";

export const links = () => [
  {
    rel: "stylesheet",
    href: "https://unpkg.com/highlight.js@11.5.1/styles/a11y-dark.css",
  },
];

export function loader({ params }: LoaderArgs) {
  const doc = getDocBySlug(params["*"] || "");

  if (!doc) throw json(null, 404);

  return json({ html: doc.html });
}

export function getStaticPaths() {
  return getDocs().map((doc) => `/docs/${doc.slug}`);
}

export default function Test() {
  const { html } = useLoaderData<typeof loader>();

  const body = useMemo(() => {
    const parser = new HtmlParser();
    return parser.parse(html || "");
  }, [html]);

  return <main className="prose lg:prose-xl dark:prose-invert">{body}</main>;
}
