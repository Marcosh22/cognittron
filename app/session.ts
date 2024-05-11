// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

export type SessionFlashData = {
  feedbackMessage: {
    type: 'success' | 'error',
    message: string
  }
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionFlashData>(
    {
      cookie: {
        name: "__session",
        secrets: ["s3cret1"],
      },
    }
  );

export { getSession, commitSession, destroySession };
