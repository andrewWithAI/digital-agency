'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServiceInquirySchema, type ServiceInquiry, ServiceCategorySchema } from '@/app/types/services';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  defaultService?: string;
  onSubmit?: (data: ServiceInquiry) => Promise<void>;
}

export default function ContactForm({ defaultService, onSubmit }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<ServiceInquiry>({
    resolver: zodResolver(ServiceInquirySchema),
    defaultValues: {
      serviceCategory: (defaultService || undefined) as ServiceInquiry['serviceCategory'],
      name: '',
      email: '',
      message: '',
      company: '',
      phone: '',
      budget: undefined,
      timeline: undefined
    },
    mode: 'onBlur'
  });

  const watchedFields = watch();

  const handleFormSubmit = async (data: ServiceInquiry) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
      }

      reset();
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = `${styles.notification} bg-green-50 text-green-800 ${styles.notificationEnter}`;
      successMessage.innerHTML = `
        <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Thank you for your message. We'll get back to you soon!</span>
      `;
      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.classList.add(styles.notificationExit);
        setTimeout(() => successMessage.remove(), 300);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = `${styles.notification} bg-red-50 text-red-800 ${styles.notificationEnter}`;
      errorMessage.innerHTML = `
        <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>There was an error submitting the form. Please try again.</span>
      `;
      document.body.appendChild(errorMessage);
      setTimeout(() => {
        errorMessage.classList.add(styles.notificationExit);
        setTimeout(() => errorMessage.remove(), 300);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="form-label">
            Name *
            <span className="text-xs text-gray-500 ml-1">(min. 2 characters)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`form-input ${styles.formInput} ${errors.name ? 'form-input-error' : watchedFields.name?.length >= 2 ? 'border-green-500' : ''}`}
            />
            {watchedFields.name?.length >= 2 && !errors.name && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {errors.name && (
            <p className="form-error flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email *
            <span className="text-xs text-gray-500 ml-1">(valid email required)</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`form-input ${errors.email ? 'form-input-error' : watchedFields.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'border-green-500' : ''}`}
            />
            {watchedFields.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && !errors.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {errors.email && (
            <p className="form-error flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="form-label">Company</label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="serviceCategory" className="form-label">
          Service Category *
          <span className="text-xs text-gray-500 ml-1">(required)</span>
        </label>
        <div className="relative">
          <select
            id="serviceCategory"
            {...register('serviceCategory')}
            className={`form-select ${errors.serviceCategory ? 'form-input-error' : watchedFields.serviceCategory ? 'border-green-500' : ''}`}
          >
            <option value="">Select a service category</option>
            <option value="">Select a service category</option>
            {ServiceCategorySchema.options.map((category) => (
              <option key={category} value={category} className="py-2">
                {category.split('-').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </option>
            ))}
          </select>
          {watchedFields.serviceCategory && !errors.serviceCategory && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {errors.serviceCategory && (
          <p className="form-error flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.serviceCategory.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          Message *
          <span className="text-xs text-gray-500 ml-1">(min. 10 characters)</span>
        </label>
        <div className="relative">
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            className={`form-input ${errors.message ? 'form-input-error' : watchedFields.message?.length >= 10 ? 'border-green-500' : ''}`}
          ></textarea>
          {watchedFields.message?.length >= 10 && !errors.message && (
            <div className="absolute right-3 top-3">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          <div className="absolute right-3 bottom-3 text-xs text-gray-500">
            {watchedFields.message?.length || 0}/1000
          </div>
        </div>
        {errors.message && (
          <p className="form-error flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="form-label">Budget Range</label>
          <select
            id="budget"
            {...register('budget')}
            className="form-select"
          >
            <option value="">Select a range</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k+">$100,000+</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="form-label">Project Timeline</label>
          <select
            id="timeline"
            {...register('timeline')}
            className="form-select"
          >
            <option value="">Select timeline</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary min-w-[200px] relative ${styles.submitButton} ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          <span className={isSubmitting ? 'invisible' : ''}>
            Send Message
          </span>
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </button>
      </div>
    </form>
  );
}