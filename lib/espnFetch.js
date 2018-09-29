import fetch from "node-fetch";
import { CookieJar, Cookie } from "tough-cookie";

const ESPN_COOKIE_URL = "http://games.espn.com/";

export default async function espnFetch(url, cookies) {
  const cookieJar = new CookieJar();
  const espnS2 = new Cookie({
    key: "espn_s2",
    value: cookies.espnS2,
    domain: "espn.com"
  });
  const SWID = new Cookie({
    key: "SWID",
    value: cookies.SWID,
    domain: "espn.com"
  });

  cookieJar.setCookieSync(espnS2, ESPN_COOKIE_URL);
  cookieJar.setCookieSync(SWID, ESPN_COOKIE_URL);

  const cookieHeader = cookieJar.getCookieStringSync(ESPN_COOKIE_URL);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Cookie: cookieHeader
    }
  };

  const response = await fetch(url, options);
  return response.json();
}
