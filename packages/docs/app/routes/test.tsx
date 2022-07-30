import { Link, useLoaderData } from "@remix-run/react";

export function loader() {
  return "Test";
}

export default function Test() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{useLoaderData()}</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="foo">Foo</Link>
        </li>
        <li>
          <Link to="bar">Bar</Link>
        </li>
      </ul>
    </div>
  );
}
