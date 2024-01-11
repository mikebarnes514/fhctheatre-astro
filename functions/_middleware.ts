import { FHC_RESTRICTED_PATHS } from "./constants";
import { getCookieKeyValue } from "./utils";
import { getTemplate } from "./template";

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
  env: { PORTAL_PASSWORD?: string };
}): Promise<Response> {
  const { request, next, env } = context;
  const { pathname, searchParams } = new URL(request.url);
  const { error } = Object.fromEntries(searchParams);
  const cookie = request.headers.get("cookie") || "";
  const cookieKeyValue = await getCookieKeyValue(env.PORTAL_PASSWORD);

  if (
    cookie.includes(cookieKeyValue) ||
    !FHC_RESTRICTED_PATHS.includes(pathname) ||
    !env.PORTAL_PASSWORD
  ) {
    return await next();
  } else {
    return new Response(
      getTemplate({ redirectPath: pathname, withError: error === "1" }),
      {
        headers: {
          "content-type": "text/html",
        },
      },
    );
  }
}
