import React from 'react';
import Image from 'next/image';
import { Service, ServiceCategory } from '@/app/types/services';

// Sample service data - In a real app, this would come from an API or CMS
const serviceDetails: Record<ServiceCategory, Service> = {
  'web-development': {
    id: '1',
    title: 'Web Development',
    slug: 'web-development',
    category: 'web-development',
    description: 'Custom web applications built with modern technologies and best practices.',
    longDescription: 'We create scalable, high-performance web applications that drive business growth. Our development team leverages cutting-edge technologies and follows industry best practices to deliver robust solutions.',
    features: [
      'Custom web application development',
      'Progressive Web Apps (PWA)',
      'E-commerce solutions',
      'Content Management Systems',
      'API development and integration',
      'Performance optimization'
    ],
    technologies: [
      { name: 'React', description: 'Frontend development' },
      { name: 'Next.js', description: 'Full-stack framework' },
      { name: 'Node.js', description: 'Backend development' },
      { name: 'TypeScript', description: 'Type-safe development' }
    ],
    caseStudies: ['case1', 'case2'],
    image: null
  },
  'digital-strategy': {
    id: '2',
    title: 'Digital Strategy',
    slug: 'digital-strategy',
    category: 'digital-strategy',
    description: 'Strategic planning and consulting to maximize your digital potential.',
    longDescription: 'We help businesses navigate the digital landscape with comprehensive strategies that align technology with business objectives. Our approach combines data-driven insights with industry expertise.',
    features: [
      'Digital transformation consulting',
      'Technology roadmap planning',
      'Market analysis and research',
      'Competitive analysis',
      'KPI definition and tracking',
      'ROI optimization'
    ],
    technologies: [
      { name: 'Analytics Tools', description: 'Data analysis' },
      { name: 'Project Management', description: 'Strategy execution' },
      { name: 'Business Intelligence', description: 'Insights generation' }
    ],
    caseStudies: ['case3', 'case4'],
    image: null
  },
  'ux-design': {
    id: '3',
    title: 'UX/UI Design',
    slug: 'ux-design',
    category: 'ux-design',
    description: 'User-centered design that creates engaging digital experiences.',
    longDescription: 'Our design team creates intuitive and engaging user experiences that delight users and achieve business goals. We follow a user-centered design process with continuous testing and iteration.',
    features: [
      'User research and testing',
      'Wireframing and prototyping',
      'Visual design',
      'Interaction design',
      'Design systems',
      'Accessibility compliance'
    ],
    technologies: [
      { name: 'Figma', description: 'Design and prototyping' },
      { name: 'Adobe Creative Suite', description: 'Visual design' },
      { name: 'Prototyping Tools', description: 'Interactive mockups' }
    ],
    caseStudies: ['case5', 'case6'],
    image: null
  },
  'mobile-solutions': {
    id: '4',
    title: 'Mobile Solutions',
    slug: 'mobile-solutions',
    category: 'mobile-solutions',
    description: 'Native and cross-platform mobile applications.',
    longDescription: 'We develop high-quality mobile applications that provide seamless experiences across all devices. Our mobile solutions are built with performance and user experience in mind.',
    features: [
      'Native iOS development',
      'Native Android development',
      'Cross-platform solutions',
      'Mobile app strategy',
      'App store optimization',
      'Mobile analytics'
    ],
    technologies: [
      { name: 'React Native', description: 'Cross-platform development' },
      { name: 'Swift', description: 'iOS development' },
      { name: 'Kotlin', description: 'Android development' }
    ],
    caseStudies: ['case7', 'case8'],
    image: null
  },
  'cloud-services': {
    id: '5',
    title: 'Cloud Services',
    slug: 'cloud-services',
    category: 'cloud-services',
    description: 'Scalable cloud solutions for modern businesses.',
    longDescription: 'We help businesses leverage cloud technologies to improve scalability, reduce costs, and enhance security. Our cloud solutions are designed for reliability and performance.',
    features: [
      'Cloud migration',
      'Infrastructure as Code',
      'DevOps automation',
      'Cloud security',
      'Monitoring and optimization',
      'Disaster recovery'
    ],
    technologies: [
      { name: 'AWS', description: 'Cloud infrastructure' },
      { name: 'Azure', description: 'Microsoft cloud' },
      { name: 'Google Cloud', description: 'Google infrastructure' }
    ],
    caseStudies: ['case9', 'case10'],
    image: null
  },
  'digital-marketing': {
    id: '6',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    category: 'digital-marketing',
    description: 'Data-driven digital marketing strategies.',
    longDescription: 'Our digital marketing services help businesses reach their target audience and achieve measurable results. We use data-driven strategies and continuous optimization.',
    features: [
      'SEO optimization',
      'Content marketing',
      'Social media management',
      'PPC campaigns',
      'Email marketing',
      'Analytics and reporting'
    ],
    technologies: [
      { name: 'Google Analytics', description: 'Performance tracking' },
      { name: 'SEO Tools', description: 'Search optimization' },
      { name: 'Marketing Automation', description: 'Campaign management' }
    ],
    caseStudies: ['case11', 'case12'],
    image: null
  }
};

export default function ServiceDetails({
  category
}: {
  category: ServiceCategory | null;
}) {
  if (!category) return null;

  const service = serviceDetails[category];

  return (
    <section className="py-section bg-gray-50">
      <div className="container mx-auto max-w-container px-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-h3 mb-6">{service.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{service.longDescription}</p>
            
            <h3 className="text-h5 mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-h5 mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {service.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
                  title={tech.description}
                >
                  {tech.name}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={`/contact?service=${service.slug}`}
                className="btn-primary"
              >
                Discuss Your Project
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-24">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-100">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                <h4 className="text-h6 mb-4">Why Choose Our {service.title}?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Expert team with proven track record</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Customized solutions for your needs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Continuous support and maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}