'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ServiceCategory } from '../types/services';
import ContactForm from '../components/forms/ContactForm';

// Component that uses useSearchParams
function ContactPageContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') as ServiceCategory | null;
  
  return (
    <ContactForm defaultService={serviceParam || undefined} />
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-light to-secondary text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
        <div className="container mx-auto max-w-container px-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-h2 font-bold text-white mb-6">
              Let&apos;s Start Your Project
            </h1>
            <p className="text-xl text-white/90">
              Ready to transform your digital presence? Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-section">
        <div className="container mx-auto max-w-container px-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <Suspense fallback={<div>Loading form...</div>}>
                <ContactPageContent />
              </Suspense>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-h5 mb-4">Contact Information</h3>
                <ul className="space-y-4 text-gray-dark">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>contact@thompson.digital</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>1-800-THOMPSON</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p>123 Tech Avenue</p>
                      <p>San Francisco, CA 94105</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-h5 mb-4">Business Hours</h3>
                <ul className="space-y-2 text-gray-dark">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM PST</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>By appointment</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-h5 mb-4">Emergency Support</h3>
                <p className="text-gray-dark">
                  For urgent matters, our support team is available 24/7 for existing clients.
                  Please use your dedicated support channel or emergency contact number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative">
        <div className="absolute inset-0 bg-gray-light/30 flex items-center justify-center">
          {/* TODO: Add Google Maps integration */}
          <div className="text-center text-gray-dark">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>Map integration coming soon</p>
          </div>
        </div>
      </section>
    </>
  );
}