// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Service types
export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceDetail {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

// Portfolio types
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}