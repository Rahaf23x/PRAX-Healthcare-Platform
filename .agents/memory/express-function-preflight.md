---
name: Express function preflight
description: Why a raw local ESM esbuild bundle is not a reliable Vercel Express function test
---

Plain esbuild ESM bundling of Express dependencies can produce a `Dynamic require of "tty" is not supported` startup error even when the source app is valid. Do not treat this result alone as a Vercel runtime failure.

**Why:** CommonJS dependencies retain dynamic Node built-in requires when bundled to ESM without a compatibility shim. A local CommonJS Node bundle of the same function successfully handled the API health route.

**How to apply:** For local preflight, bundle the function in a Node-compatible format or use Vercel's actual build/runtime. Keep the distinction explicit: local bundle and route checks cannot prove that a remote Vercel deployment succeeds.