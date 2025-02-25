import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Portfolio | Thompson Digital Solutions',
  description: 'Explore our portfolio of successful digital projects and transformative solutions.',
};

const portfolioItems = [
  {
    title: 'Shopify E-Commerce Platform',
    description: 'A full E-Commerce solution built with Shopify',
    image: '/projects/placeholder.svg',
    tags: ['UX Design', 'Web Development', 'E-Commerce', 'Shopify'],
  },
  {
    title: 'Whole Sale Real Estate Business CRM',
    description: 'Real-time financial data dashboard with advanced analytics and reporting capabilities.',
    image: '/projects/placeholder.svg',
    tags: ['Real Estate', 'Data Visualization','SalesForce', 'Dialer Systems', 'Data Automations'],
  },
  {
    title: 'Supply Chain Management Platform',
    description: 'End-to-end supply chain management solution with real-time tracking and analytics.',
    image: '/projects/placeholder.svg',
    tags: ['Enterprise Software', 'Cloud Infrastructure', 'Analytics'],
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto max-w-container px-container">
          <h1 className="text-white mb-6">Our Portfolio</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Discover how we've helped businesses transform their digital presence and achieve remarkable results through innovative solutions and strategic implementation.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto max-w-container px-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="card group hover:scale-[1.02] transition-transform">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-container px-container text-center">
          <h2 className="mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's work together to bring your digital vision to life. Our team is ready to help you achieve your goals.
          </p>
          <a href="/contact" className="btn-primary">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}