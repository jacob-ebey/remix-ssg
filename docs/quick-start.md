---
title: Quick Start
description: Get up and running with Remix SSG in minutes.
order: 1
---

# Quick Start

1. Initialize a new remix project:

   ```bash
   npx create-remix@latest
   ```

   Choose "Just the basics" and the "Remix App Server" when prompted.

1. Install `serve` to serve the static assets:

   ```bash
   npm install serve
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
