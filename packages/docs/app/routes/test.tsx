import { Link, useLoaderData } from "@remix-run/react";

export function loader() {
  return "Test";
}

export function getStaticPaths() {
  return ["/test"];
}

export default function Test() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{useLoaderData()}</h1>
      <ul>
        <li>
          <Link prefetch="intent" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link prefetch="intent" to="foo">
            Foo
          </Link>
        </li>
        <li>
          <Link prefetch="intent" to="bar">
            Bar
          </Link>
        </li>
      </ul>
    </div>
  );
}
