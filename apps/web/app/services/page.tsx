'use client';

import { useState } from 'react';
import { ServiceCategory } from '../types/services';
import ServiceHero from '../components/services/ServiceHero';
import ServiceCategories from '../components/services/ServiceCategories';
import ServiceDetails from '../components/services/ServiceDetails';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>('web-development');

  const handleCategoryChange = (category: ServiceCategory) => {
    setSelectedCategory(category);
    // Smooth scroll to details section
    const detailsSection = document.getElementById('service-details');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ServiceHero />
      
      <ServiceCategories
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <div id="service-details">
        <ServiceDetails category={selectedCategory} />
      </div>

      {/* CTA Section */}
      <section className="py-section bg-primary text-white">
        <div className="container mx-auto max-w-container px-container text-center">
          <h2 className="text-h3 text-white mb-6">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our {selectedCategory?.replace('-', ' ')} services can help your business grow.
          </p>
          <a
            href={`/contact?service=${selectedCategory}`}
            className="btn-secondary"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </>
  );
}