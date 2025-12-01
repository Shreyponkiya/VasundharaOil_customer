import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary SEO Meta Tags */}
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Vasundhara – 100% pure cold-pressed groundnut oil. Trusted by 50,000+ families. Natural, fresh, chemical-free oils extracted from premium G20 peanuts."
        />
        <meta
          name="keywords"
          content="cold pressed oil, groundnut oil, pure oil, vasundhara oil, organic oil, healthy cooking oil, peanut oil, natural oil"
        />
        <meta name="author" content="Vasundhara Oils" />

        {/* Viewport for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Theme Color */}
        <meta name="theme-color" content="#fbbf24" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="Vasundhara – 100% Pure Cold-Pressed Groundnut Oil" />
        <meta
          property="og:description"
          content="Freshly extracted cold-pressed groundnut oil made from premium G20 peanuts. Pure, healthy & chemical-free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shreevasundharaoil.com" />
        <meta property="og:image" content="https://shreevasundharaoil.com/og-image.jpg" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vasundhara – Pure Cold-Pressed Oils" />
        <meta
          name="twitter:description"
          content="100% pure cold-pressed groundnut oil. No chemicals. Trusted by 50K+ families."
        />
        <meta name="twitter:image" content="https://shreevasundharaoil.com/og-image.jpg" />

        {/* Favicon + Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect (Performance Boost) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="dns-prefetch"
          href="https://cdnjs.cloudflare.com"
        />

        {/* Schema.org JSON-LD for SEO (Google Loves This) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vasundhara Oils",
              url: "https://shreevasundharaoil.com",
              logo: "https://shreevasundharaoil.com/logo.png",
              sameAs: [
                "https://www.facebook.com/yourbrand",
                "https://www.instagram.com/yourbrand",
                "https://www.youtube.com/yourbrand"
              ],
              description:
                "Vasundhara offers 100% pure cold-pressed groundnut oil extracted from premium G20 peanuts.",
            }),
          }}
        />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
