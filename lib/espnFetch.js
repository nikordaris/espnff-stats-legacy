import fetch from "node-fetch";
import { CookieJar, Cookie } from "tough-cookie";

const cookieJar = new CookieJar();

export default async function espnFetch(url, cookies) {
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

  cookieJar.setCookie(espnS2, "http://games.espn.com/", () => {});
  cookieJar.setCookie(SWID, "http://games.espn.com/", () => {});

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Cookie: cookieJar.cookieString
    }
  };

  const response = await fetch(url, options);
  return response.json();
}
