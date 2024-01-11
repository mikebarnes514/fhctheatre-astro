import { FHC_COOKIE_MAX_AGE_IN_SECONDS } from "./constants";
import { sha256, getCookieKeyValue } from "./utils";

export async function onRequestPost(context: {
  request: Request;
  env: { PORTAL_PASSWORD?: string };
}): Promise<Response> {
  const { request, env } = context;
  const body = await request.formData();
  const { password, redirect } = Object.fromEntries(body);
  const hashedPassword = await sha256(password.toString());
  const hashedFHCPassword = await sha256(env.PORTAL_PASSWORD ?? "");
  const redirectPath = redirect.toString() || "/";

  if (hashedPassword === hashedFHCPassword) {
    const cookieKeyValue = await getCookieKeyValue(env.PORTAL_PASSWORD ?? "");

    return new Response("", {
      status: 302,
      headers: {
        "Set-Cookie": `${cookieKeyValue}; Max-Age=${FHC_COOKIE_MAX_AGE_IN_SECONDS}; Path=/; HttpOnly; Secure`,
        "Cache-Control": "no-cache",
        Location: redirectPath,
      },
    });
  } else {
    return new Response("", {
      status: 302,
      headers: {
        "Cache-Control": "no-cache",
        Location: `${redirectPath}/?error=1`,
      },
    });
  }
}
