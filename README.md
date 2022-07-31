# Remix SSG

Simple SSG for [Remix](https://remix.run/).

[Read the Docs](https://remix-ssg.pages.dev/docs)

# Docs

Deployed to multiple hosts:

- [Github Pages](https://remix-ssg.pages.dev)
- [Netlify](https://remix-ssg.netlify.app)
- [Vercel](https://remix-ssg.vercel.app)

## Quick Start

1. Initialize a new remix project:

   ```bash
   npx create-remix@latest
   ```

   Choose "Just the basics" and the "Remix App Server" when prompted.

1. Install `remix-ssg` and `serve` to serve the static assets:

   ```bash
   npm install -D remix-ssg serve
   ```

1. Update your `package.json` `scripts` to use `remix-ssg` instead of `remix` and `serve` instead of `remix-serve`:

   ```json
   {
     "scripts": {
       "build": "remix-ssg public",
       "dev": "remix dev",
       "start": "serve -l 3000 public"
     }
   }
   ```

1. Add a `getStaticPaths` export to your routes. For example `app/routes/index.tsx` may look like:

   ```tsx
   export function getStaticPaths() {
     return ["/"];
   }
   ```
