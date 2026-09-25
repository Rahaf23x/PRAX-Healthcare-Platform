---
name: Vite directive sourcemaps
description: Diagnosing sourcemap-location warnings caused by ignored module directives
---

In a Vite-only React app, a `SOURCEMAP_ERROR` about an unresolved original location can be a secondary warning from Rollup trying to locate an ignored `"use client"` directive, not a missing source-map file or a broken import. Inspect Rollup's `onLog` events to reveal the associated `MODULE_LEVEL_DIRECTIVE` before changing sourcemap settings.

**Why:** TypeScript transformation with strict directives can place `"use strict"` before the client directive. Rollup ignores the client directive during browser bundling and may fail to remap its generated position; Vite can suppress the directive warning while still printing the sourcemap warning.

**How to apply:** If the module truly runs only in a browser-built Vite SPA, remove the redundant directive in the offending source module and confirm a clean build. Do not remove it from components that are also consumed by React Server Components.