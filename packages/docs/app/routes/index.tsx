import { Link, useLoaderData } from "@remix-run/react";

export function loader() {
  return "Home";
}

export default function Index() {
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
