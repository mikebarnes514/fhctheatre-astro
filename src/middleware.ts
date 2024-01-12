import { defineMiddleware } from "astro/middleware";
import {
  FHC_COOKIE_KEY,
  FHC_RESTRICTED_ROUTES,
} from "./authentication/constants";
import { errors, jwtVerify } from "jose";

const secret = new TextEncoder().encode(import.meta.env.PORTAL_PASSWORD);

const verifyAuthentication = async (token?: string) => {
  if (!token) {
    return {
      status: "unauthorized",
      msg: "not authorized",
    } as const;
  }

  try {
    const jwtVerifyResult = await jwtVerify(token, secret);
    return {
      status: "authorized",
      msg: "authorized",
      payload: jwtVerifyResult.payload,
    } as const;
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      return {
        status: "error",
        msg: err.message,
      } as const;
    }

    return {
      status: "error",
      msg: "could not validate authentication token",
    } as const;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  if (!FHC_RESTRICTED_ROUTES.includes(context.url.pathname)) {
    return next();
  }

  const token = context.cookies.get(FHC_COOKIE_KEY)?.value;
  const validationResult = await verifyAuthentication(token ?? "");

  switch (validationResult.status) {
    case "authorized":
      return next();
    case "error":
    case "unauthorized":
      if (context.url.pathname.startsWith("/api/")) {
        return new Response(
          JSON.stringify({
            message: validationResult.msg,
          }),
          {
            status: 401,
          },
        );
      } else {
        return Response.redirect(new URL("/login", context.url));
      }
    default:
      return Response.redirect(new URL("/login", context.url));
  }
});
