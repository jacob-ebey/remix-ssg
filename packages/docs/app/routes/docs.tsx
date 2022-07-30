import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getDocs } from "~/api.server";

export function loader() {
  let docs = getDocs()
    .sort(
      (a, b) =>
        ((a.attributes as any)?.order || Number.MAX_SAFE_INTEGER) -
        ((b.attributes as any)?.order || Number.MAX_SAFE_INTEGER)
    )
    .map((doc) => ({ ...doc.attributes, slug: doc.slug }));

  return json({ docs });
}

export default function Test() {
  const { docs } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto mt-4 pt-12">
      <div className="flex flex-wrap">
        <div className="w-full sm:w-3/12 lg:w-2/12 pr-4 tex-left">
          <div className="block overflow-y-auto pt-8 pb-4">
            <div className="mb-6">
              <ul className="block flex-wrap list-none pl-0 mb-0 mt-0">
                {docs.map((doc) => (
                  <li key={doc.slug}>
                    <NavLink
                      className="text-sm block mb-2 mx-4 no-underline"
                      to={doc.slug}
                    >
                      {doc.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-9/12 lg:w-8/12 px-4 sm:pr-10 lg:pr-4">
          <div className="my-8">
            <Outlet />
          </div>
        </div>
        <div className="w-full lg:w-2/12 px-4 hidden lg:block" />
      </div>
    </div>
  );
}
