---
title: How this works
description: What is Remix SSG and how does it work?
order: 0
---

# How this works

Remix SSG works by wrapping the `@remix-run/dev` CLI and introducing a new plugin to modify the client runtime to fetch from static `.json` files. It then executes your handler to generate the static assets.

Head on over to the [Quick Start](/docs/quick-start) to get started.

## More details

### What gets replaced in the client runtime?

From `@remix-run/react` we replace the implementation of the `fetchData` function that is used to call your loaders. We also replace the `getDataLinkHrefs` function used to generate the `<link rel="preload">` tags. This is all that's required 🥳.
