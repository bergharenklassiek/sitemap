import { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
                <url>
                    <loc>https://bergharenklassiek.nl</loc>
                    <lastmod>2024-03-01T00:00:00+00:00</lastmod>
                </url>
            </urlset>
        `,
        {
            status: 200,
            statusText: "OK",
            headers: {
                'Content-Type': 'application/xml'
            }
        } 
    );
}