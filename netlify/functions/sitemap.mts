import { Context } from '@netlify/functions';
import { Story } from './models/event';

export default async (_: Request, __: Context) => {
    const storyblokBaseUrl = 'https://api.storyblok.com/v2/cdn';
    const token = 'token=acu9a7B7tQrUQ6dr0rQTqgtt';
    
    const eventsResponse = await fetch(`${storyblokBaseUrl}/stories?content_type=Event&sort_by=published_at:asc&${token}`);
    const eventsData = await eventsResponse.json();

    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
                <url>
                    <loc>https://bergharenklassiek.nl</loc>
                    <lastmod>2024-03-01T00:00:00+00:00</lastmod>
                </url>
                <url>
                    <loc>https://bergharenklassiek.nl/contact</loc>
                    <lastmod>2024-03-01T00:00:00+00:00</lastmod>
                </url>
                ${(eventsData['stories'] as Story[]).map((story) => `
                    <url>
                        <loc>https://bergharenklassiek.nl/events/${story.slug}</loc>
                        <lastmod>${story.published_at.split('.')[0]}+00:00</lastmod>
                    </url>
                `).join('')}
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