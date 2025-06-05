import Cookies from "js-cookie";

/**
 * Get a cookie value by name
 * @param {string} name - The name of the cookie
 * @returns {string | undefined} - The cookie value, or undefined if not found
 */
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function removeCookie(name: string): void {
  Cookies.remove(name);
}

export function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}
