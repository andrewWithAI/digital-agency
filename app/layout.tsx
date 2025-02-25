import type { Metadata } from "next";
import { Inter, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navigation/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talty Tech Solutions | Transforming Ideas into Digital Excellence",
  description: "We craft innovative digital solutions that drive real business growth. Expert web development, digital strategy, and technology consulting services.",
  keywords: "web development, digital solutions, technology consulting, digital transformation, web design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-primary text-white mt-section">
          <div className="container mx-auto max-w-container px-container py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold mb-4">Thompson Digital</h3>
                <p className="text-sm opacity-80">Transforming Ideas into Digital Excellence</p>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/services/web-development" className="hover:opacity-80">Web Development</a></li>
                  <li><a href="/services/digital-strategy" className="hover:opacity-80">Digital Strategy</a></li>
                  <li><a href="/services/ux-design" className="hover:opacity-80">UX/UI Design</a></li>
                  <li><a href="/services/cloud-services" className="hover:opacity-80">Cloud Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="hover:opacity-80">About Us</a></li>
                  <li><a href="/portfolio" className="hover:opacity-80">Portfolio</a></li>
                  <li><a href="/blog" className="hover:opacity-80">Blog</a></li>
                  <li><a href="/careers" className="hover:opacity-80">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li>contact@thompson.digital</li>
                  <li>1-800-THOMPSON</li>
                  <li>123 Tech Avenue</li>
                  <li>San Francisco, CA 94105</li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/10 text-sm opacity-80">
              <p>&copy; {new Date().getFullYear()} Talty Tech Solutions. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
