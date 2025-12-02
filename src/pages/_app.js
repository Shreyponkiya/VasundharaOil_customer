import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Whatsapp from "@/components/Whatsapp";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* GLOBAL DEFAULT SEO (Can be overridden in each page) */}
      <Head>
        <meta
          name="description"
          content="Vasundhara – Premium cold-pressed groundnut oil extracted from fresh G20 peanuts. 100% natural, pure & chemical-free."
        />
        <meta
          name="keywords"
          content="cold pressed oil, groundnut oil, vasundhara oil, pure oil, organic oil, peanut oil, natural cooking oil"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fbbf24" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* OG Tags */}
        <meta property="og:title" content="Vasundhara Desi-Ghani Oils" />
        <meta
          property="og:description"
          content="Fresh, pure and chemical-free cold-pressed oils trusted by thousands."
        />
        <meta property="og:image" content="hero_image.png" />
        <meta property="og:url" content="https://shreevasundharaoil.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        {/* Global JSON-LD Schema (Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vasundhara Oils",
              url: "https://shreevasundharaoil.com",
              logo: "https://shreevasundharaoil.com/logo.png",
              description:
                "Vasundhara offers 100% pure cold-pressed groundnut oil extracted from premium G20 peanuts.",
            }),
          }}
        />
      </Head>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          theme="light"
          toastClassName="custom-toast"
          bodyClassName="custom-body"
          progressClassName="custom-progress"
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />

        <main className="flex-1 relative z-0 pt-[88px] md:pt-[88px]">
          <Component {...pageProps} />
        </main>

        <Whatsapp />

        <footer className="relative z-0">
          <Footer />
        </footer>
      </div>
    </>
  );
}
