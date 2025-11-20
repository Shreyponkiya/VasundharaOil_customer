import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Whatsapp from "@/components/Whatsapp";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 relative z-0 pt-[88px] md:pt-[88px]">
        <Component {...pageProps} />
      </main>

      {/* Floating WhatsApp Button */}
      <Whatsapp />

      {/* Footer */}
      <footer className="relative z-0">
        <Footer />
      </footer>
    </div>
  );
}
