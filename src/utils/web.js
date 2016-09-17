export function handleRes(res) {
  if (!res) return null;
  return JSON.parse(res.text);
}
