import React from 'react';
import { ServiceCategory, ServiceCategorySchema } from '@/app/types/services';

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  isActive: boolean;
  onClick: (category: ServiceCategory) => void;
}

const getCategoryIcon = (category: ServiceCategory) => {
  const icons = {
    'web-development': (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    'digital-strategy': (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    'ux-design': (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    'mobile-solutions': (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    'cloud-services': (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    'digital-marketing': (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    )
  };

  return icons[category];
};

const getCategoryTitle = (category: ServiceCategory) => {
  const titles = {
    'web-development': 'Web Development',
    'digital-strategy': 'Digital Strategy',
    'ux-design': 'UX/UI Design',
    'mobile-solutions': 'Mobile Solutions',
    'cloud-services': 'Cloud Services',
    'digital-marketing': 'Digital Marketing'
  };

  return titles[category];
};

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ category, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`p-6 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-primary text-white shadow-lg scale-105'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`h-12 w-12 mb-4 rounded-lg flex items-center justify-center ${
          isActive ? 'bg-white/10' : 'bg-primary/10'
        }`}>
          <div className={isActive ? 'text-white' : 'text-primary'}>
            {getCategoryIcon(category)}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{getCategoryTitle(category)}</h3>
      </div>
    </button>
  );
};

export default function ServiceCategories({
  selectedCategory,
  onCategoryChange
}: {
  selectedCategory: ServiceCategory | null;
  onCategoryChange: (category: ServiceCategory) => void;
}) {
  const categories = ServiceCategorySchema.options;

  return (
    <section id="service-categories" className="py-section">
      <div className="container mx-auto max-w-container px-container">
        <div className="text-center mb-12">
          <h2 className="text-h2 mb-4">Our Expertise</h2>
          <p className="text-xl text-gray max-w-2xl mx-auto">
            Discover our comprehensive range of digital services tailored to your business needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <ServiceCategoryCard
              key={category}
              category={category}
              isActive={selectedCategory === category}
              onClick={onCategoryChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
}