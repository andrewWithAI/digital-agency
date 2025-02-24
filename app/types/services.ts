import { z } from 'zod';

// Service category schema
export const ServiceCategorySchema = z.enum([
  'web-development',
  'digital-strategy',
  'ux-design',
  'mobile-solutions',
  'cloud-services',
  'digital-marketing'
]);

export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;

// Technology schema
export const TechnologySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  description: z.string().optional()
});

export type Technology = z.infer<typeof TechnologySchema>;

// Service schema
export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  category: ServiceCategorySchema,
  description: z.string(),
  longDescription: z.string(),
  features: z.array(z.string()),
  technologies: z.array(TechnologySchema),
  caseStudies: z.array(z.string()), // References to case study IDs
  icon: z.string().optional(),
  image: z.string().nullable()
});

export type Service = z.infer<typeof ServiceSchema>;

// Service inquiry form schema
export const ServiceInquirySchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Invalid email address'),
  company: z.string()
    .optional(),
  phone: z.string()
    .optional(),
  serviceCategory: ServiceCategorySchema,
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  budget: z.enum(['10k-25k', '25k-50k', '50k-100k', '100k+'])
    .optional(),
  timeline: z.enum(['1-3 months', '3-6 months', '6+ months'])
    .optional()
});

export type ServiceInquiry = z.infer<typeof ServiceInquirySchema>;

// Sample service data validation
export const validateService = (data: unknown): Service => {
  return ServiceSchema.parse(data);
};

// Service inquiry validation
export const validateServiceInquiry = (data: unknown): ServiceInquiry => {
  return ServiceInquirySchema.parse(data);
};