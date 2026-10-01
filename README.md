# SkładaMy

Frontend strony [skladamy.com](https://skladamy.com) — Next.js 16 + TinaCMS (Git-based CMS).

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **TinaCMS 3** — treści w Markdown/JSON w `./content`, media w `./public/uploads`
- **Tailwind CSS 4** + `@tailwindcss/typography`
- **Vitest** + Testing Library
- **sharp** — optymalizacja obrazów (`next/image`)

## Rozwój lokalny

```bash
pnpm install
pnpm dev
```

`pnpm dev` uruchamia `tinacms dev` + `next dev`:

- Strona: `http://localhost:3001`
- Panel CMS: `http://localhost:3001/admin` (edycja plików w `./content` z live preview)
- GraphQL Tiny: `http://localhost:4001/graphql`

Edycja w adminie zapisuje zmiany prosto do plików — commitujesz je gitem.

## Treści (`content/`)

| Katalog | Kolekcja Tiny | Zawartość |
| --- | --- | --- |
| `content/posts/*.md` | Posty | Artykuły bloga (frontmatter + markdown) |
| `content/categories/*.md` | Kategorie | Kategorie bloga |
| `content/tags/*.md` | Tagi | Tagi bloga |
| `content/pages/*.md` | Podstrony | home, o-nas, kontakt, slupsk, blog, portfolio + strony prawne (sekcje blokowe + body markdown + SEO) |
| `content/gallery/gallery.json` | Galeria | Zdjęcia portfolio |

Obrazy wrzucane przez Tiny lądują w `public/uploads/`.

## Komendy

| Komenda | Opis |
| --- | --- |
| `pnpm dev` | Tiny + Next (CMS + podgląd na żywo) |
| `pnpm dev:site` | samo Next, bez CMS-a |
| `pnpm build` / `pnpm start` | build produkcyjny / start (`server.js`, DirectAdmin) |
| `pnpm build:cms` | `tinacms build` — wymaga TinaCloud (clientId/token) |
| `pnpm cms:audit` | walidacja plików `content/` pod schemat Tiny |
| `pnpm lint` / `type-check` / `test` | eslint / tsc / vitest |

## Zmienne środowiskowe

Wzorzec: `.env.example`. Env trzyma tylko sekrety i rzeczy zmienne między środowiskami: `NEXT_PUBLIC_SITE_URL` + `SMTP_*` (formularz kontaktowy). Tiny działa lokalnie bez żadnych zmiennych; `NEXT_PUBLIC_TINA_CLIENT_ID`/`TINA_TOKEN` są potrzebne tylko przy TinaCloud.

Wszystko inne to stałe strony w kodzie: dane firmy w `src/lib/config/company.ts` (`COMPANY_CONFIG`), a SEO/social/GTM w `src/lib/config/site.ts` (`SITE_CONFIG`). Schematy JSON-LD generuje `src/lib/seo/structured-data/` + komponent `src/components/StructuredData.tsx`.

## Deploy (DirectAdmin)

`server.js` startuje Nexta na porcie podanym przez hosting. Treści są w repo, więc build jest w pełni statyczny — CMS nie jest potrzebny na produkcji.
