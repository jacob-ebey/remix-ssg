import { Link } from "@remix-run/react";

export function getStaticPaths() {
  return ["/"];
}

export default function Index() {
  return (
    <div className="flex relative items-center">
      <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-4">
        <div className="flex flex-col">
          <h1 className="text-3xl my-6 text-center dark:text-white">
            Remix SSG
          </h1>
          <p className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
            Build blazing fast static sites using Remix!
          </p>
          <div className="flex items-center justify-center mt-4">
            <Link
              to="/docs"
              className="uppercase py-2 my-2 px-4 md:mt-16 bg-transparent dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md"
            >
              READ THE DOCS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
