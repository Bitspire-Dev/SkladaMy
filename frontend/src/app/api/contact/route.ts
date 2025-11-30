import { NextResponse } from 'next/server';

// When using `output: 'export'`, routes must be static or explicitly marked.
// Mark this route as force-static so the static export build will accept it.
export const dynamic = 'force-static';

// This route has been intentionally disabled/removed.
// Previous implementation handled sending emails and attachments from the frontend.
// To keep the project static, contact handling was migrated to Strapi.

export async function POST() {
  return NextResponse.json({ error: 'This API route has been removed. Use Strapi /api/contacts.' }, { status: 410 });
}

export async function GET() {
  return NextResponse.json({ error: 'This API route has been removed.' }, { status: 410 });
}
