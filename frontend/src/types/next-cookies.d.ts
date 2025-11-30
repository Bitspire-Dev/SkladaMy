declare module 'next-cookies' {
  export default function cookies(
    ctx?: unknown
  ): Record<string, string | undefined>;
}
