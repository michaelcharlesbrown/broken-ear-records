/** Maps a string or number seed to a deterministic cut variant number (1–8). */
export function cutVariant(seed: string | number): number {
  const str = String(seed);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return (hash % 8) + 1;
}
