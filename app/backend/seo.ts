import { Metadata } from "next";

export const basicMetadata = (options: { title?: string, description?: string, localPath?: string, keywords?: string[] }): Metadata => {
    return {
        metadataBase: new URL('https://tonalityedu.vercel.app'),
        title: options.title || 'Tonality',
        description: options.description || 'Explore the depths of music by learning music theory and analyzing music with interactive games and lessons.',
        authors: [
            {
                name: "Landon Harter",
                url: 'https://landonharter.me'
            },
            {
                name: "Tonality",
                url: 'https://tonalityedu.vercel.app'
            },
        ],
        publisher: 'Tonality',
        robots: {
            index: true,
            follow: true,
        },
        keywords: options.keywords ? options.keywords.join(', ') : 'Tonality, education, music',
        category: 'Education',
        classification: 'Education',
        creator: 'Tonality',
        icons: 'https://tonalityedu.vercel.app/images/logos/icon.png',
        applicationName: 'Tonality',
        openGraph: {
            title: options.title || 'Tonality',
            description: options.description || 'Explore the depths of music by learning music theory and analyzing music with interactive games and lessons.',
            url: `https://tonalityedu.vercel.app${options.localPath || ''}`,
            type: 'website',
            images: ['https://tonalityedu.vercel.app/images/logos/icon.png'],
            siteName: 'Tonality',
        },
        twitter: {
            site: `https://tonalityedu.vercel.app${options.localPath || ''}`,
            card: 'summary_large_image',
            images: ['https://tonalityedu.vercel.app/images/logos/icon.png'],
            title: options.title || 'Tonality',
            description: options.description || 'Explore the depths of music by learning music theory and analyzing music with interactive games and lessons.',
        }
    };
};