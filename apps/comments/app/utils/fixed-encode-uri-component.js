/**
 * Encodes a URI component adhering to https://tools.ietf.org/html/rfc3986
 *
 * @param {string} value
 * @return {string} Encoded URI Component
 */
export default function fixedEncodeURIComponent(value) {
  return encodeURIComponent(value).replace(/[.!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
}
