import type { APIRoute } from "astro";
import { getCookieKeyValue, sha256 } from "../../authentication/utils";
import { FHC_COOKIE_MAX_AGE_IN_SECONDS } from "../../authentication/constants";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const { request } = context;
  const body = await request.formData();
  const { password, redirect } = Object.fromEntries(body);
  const encodedPassword = await sha256(password.toString());
  const fhcPassword = await sha256(import.meta.env.PORTAL_PASSWORD);
  const redirectRoute = redirect.toString() || "/";

  console.log({
    password: import.meta.env.PORTAL_PASSWORD,
    redirectRoute,
  });
  if (encodedPassword === fhcPassword) {
    const cookieValue = await getCookieKeyValue(
      import.meta.env.PORTAL_PASSWORD ?? "",
    );

    return new Response("", {
      status: 302,
      headers: {
        "Set-Cookie": `${cookieValue}; Max-age=${FHC_COOKIE_MAX_AGE_IN_SECONDS}; Path=/; HttpOnly; Secure`,
        "Cache-Control": "no-cache",
        Location: redirectRoute,
      },
    });
  } else {
    return new Response("", {
      status: 302,
      headers: {
        "Cache-Control": "no-cache",
        Location: "/login",
      },
    });
  }
};
