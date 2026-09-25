// Vercel invokes the Express app per request; the local server entry still owns app.listen.
export { default } from '../artifacts/api-server/src/app';