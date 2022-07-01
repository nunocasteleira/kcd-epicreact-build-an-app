import { createCookieSessionStorage } from "@remix-run/node";
import { authenticator } from "./auth.server";

// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [process.env.SESSION_SECRET ?? ""], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

export async function requireUser(request: Request) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
}

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;