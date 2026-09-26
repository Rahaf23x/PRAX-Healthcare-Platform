---
name: Vite async config typing
description: A TypeScript inference issue when moving a Vite config object into an async function
---

When converting a Vite config object into an async `defineConfig` callback, explicitly annotate the callback result as `Promise<UserConfig>` if TypeScript rejects the inferred plugin array even though the original object was accepted.

**Why:** An uncontextualized async return can infer plugin types from different installed Vite instances as an incompatible union, triggering a `defineConfig` overload error. The explicit return type gives the plugin list the intended Vite config context without a cast or skipped check.

**How to apply:** Use the annotation only when an async config function needs runtime command information and type inference fails; validate with the artifact typecheck and the full build afterward.