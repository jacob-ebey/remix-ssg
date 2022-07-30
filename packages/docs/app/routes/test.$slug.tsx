import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export function loader({ params }: LoaderArgs) {
  return `Hello, ${params.slug}!`;
}

export function getStaticPaths() {
  return ["/test/foo", "/test/bar"];
}

export default function Test() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{useLoaderData()}</h1>
      <ul>
        <li>
          <Link to="/test">Test</Link>
        </li>
      </ul>
    </div>
  );
}
