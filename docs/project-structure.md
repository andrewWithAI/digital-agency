# Talty Tech Solutions - Project Structure

This document outlines the recommended project structure for the Talty Tech Solutions website, focusing on organization, maintainability, and scalability.

## Project Organization Principles

- **Modularity**: Organize code into cohesive, self-contained modules
- **Discoverability**: Make it easy to find files and understand their purpose
- **Consistency**: Follow consistent naming and organization patterns
- **Scalability**: Structure should accommodate growth without major reorganization
- **Separation of Concerns**: Keep distinct responsibilities in separate files

## Directory Structure

```
digital-agency/
├── app/                      # Next.js App Router directory
│   ├── api/                  # API routes
│   │   ├── contact/          # Contact form API
│   │   └── [other APIs]/     # Other API endpoints
│   ├── components/           # Shared components
│   │   ├── ui/               # UI components (atomic design)
│   │   │   ├── atoms/        # Basic building blocks
│   │   │   ├── molecules/    # Combinations of atoms
│   │   │   └── organisms/    # Complex UI sections
│   │   ├── layout/           # Layout components
│   │   └── features/         # Feature-specific components
│   │       ├── about/        # About page components
│   │       ├── blog/         # Blog components
│   │       ├── contact/      # Contact components
│   │       ├── home/         # Home page components
│   │       ├── portfolio/    # Portfolio components
│   │       └── services/     # Services components
│   ├── context/              # React Context providers
│   │   ├── theme/            # Theme context
│   │   ├── ui/               # UI state context
│   │   └── [other contexts]/ # Other context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and helpers
│   │   ├── api/              # API client functions
│   │   ├── utils/            # General utility functions
│   │   └── validation/       # Form validation schemas
│   ├── styles/               # Global styles and theme
│   │   ├── animations/       # Animation utilities
│   │   └── theme/            # Theme configuration
│   ├── types/                # TypeScript type definitions
│   ├── [page directories]/   # Page routes (Next.js App Router)
│   │   ├── about/            # About page
│   │   ├── blog/             # Blog pages
│   │   │   └── [slug]/       # Dynamic blog post pages
│   │   ├── contact/          # Contact page
│   │   ├── portfolio/        # Portfolio pages
│   │   │   └── [slug]/       # Dynamic project pages
│   │   └── services/         # Services pages
│   │       └── [slug]/       # Dynamic service pages
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global CSS
├── public/                   # Static assets
│   ├── fonts/                # Font files
│   ├── images/               # Image assets
│   │   ├── icons/            # Icon assets
│   │   ├── logos/            # Logo assets
│   │   └── projects/         # Project images
│   └── [other assets]/       # Other static assets
├── docs/                     # Project documentation
│   ├── implementation-plan.md # Implementation plan
│   ├── component-architecture.md # Component architecture
│   └── [other docs]/         # Other documentation
├── scripts/                  # Build and utility scripts
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## File Organization

### Component Organization

Each component should be organized in its own directory with related files:

```
ComponentName/
├── ComponentName.tsx         # Component implementation
├── ComponentName.module.css  # Component-specific styles
├── index.ts                  # Re-export for cleaner imports
└── __tests__/                # Tests for the component
    └── ComponentName.test.tsx
```

Example:

```
Button/
├── Button.tsx
├── Button.module.css
├── index.ts
└── __tests__/
    └── Button.test.tsx
```

### Page Organization

Pages should follow a consistent structure:

```
about/
├── page.tsx                  # Page component (default export)
├── layout.tsx                # (Optional) Page-specific layout
└── components/               # (Optional) Page-specific components
    └── TeamSection.tsx
```

### API Route Organization

API routes should be organized by feature:

```
api/
├── contact/
│   └── route.ts              # Contact form API handler
├── newsletter/
│   └── route.ts              # Newsletter signup API handler
└── projects/
    ├── route.ts              # Projects list API handler
    └── [id]/
        └── route.ts          # Single project API handler
```

## Naming Conventions

### Files and Directories

- **Components**: PascalCase (e.g., `Button.tsx`, `HeroBanner.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMediaQuery.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types**: PascalCase with descriptive names (e.g., `ServiceType.ts`)
- **Page Directories**: kebab-case for multi-word routes (e.g., `digital-strategy`)

### CSS Modules

- Use component name as prefix for class names
- Use camelCase for class names

```css
/* Button.module.css */
.button {
  /* Base styles */
}

.buttonPrimary {
  /* Primary variant styles */
}

.buttonSecondary {
  /* Secondary variant styles */
}
```

### TypeScript Types and Interfaces

- Use PascalCase
- Use `Interface` suffix for interfaces when appropriate
- Use `Type` suffix for complex types when appropriate
- Use `Props` suffix for component props

```typescript
// Component props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Domain models
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}

// Utility types
type ServiceCategory = 'web-development' | 'digital-strategy' | 'ux-design';
```

## Import Organization

Organize imports in a consistent order:

1. React and Next.js imports
2. Third-party library imports
3. Internal absolute imports (components, hooks, etc.)
4. Relative imports
5. Type imports
6. CSS/SCSS imports

```tsx
// 1. React and Next.js imports
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 2. Third-party library imports
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

// 3. Internal absolute imports
import Button from '@/components/ui/atoms/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// 4. Relative imports
import { formatProjectDate } from '../../utils/formatters';

// 5. Type imports
import type { Project } from '@/types/projects';

// 6. CSS imports
import styles from './ProjectCard.module.css';
```

## Code Organization

### Component Structure

Follow a consistent structure for components:

```tsx
// 1. Imports

// 2. Type definitions
interface ButtonProps {
  // ...
}

// 3. Constants (if needed)
const BUTTON_VARIANTS = {
  // ...
};

// 4. Component definition
export default function Button({ variant, size, children, onClick }: ButtonProps) {
  // 5. Hooks
  const [isHovered, setIsHovered] = useState(false);
  
  // 6. Derived state and effects
  useEffect(() => {
    // ...
  }, []);
  
  // 7. Event handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  // 8. Render helpers (if needed)
  const renderIcon = () => {
    // ...
  };
  
  // 9. Component render
  return (
    <button
      className={/* ... */}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderIcon()}
      {children}
    </button>
  );
}
```

### Page Structure

Follow a consistent structure for pages:

```tsx
// 1. Metadata (for Next.js App Router)
export const metadata = {
  title: 'About Us | Talty Tech Solutions',
  description: 'Learn about our team and our approach to digital solutions.',
};

// 2. Data fetching (for Server Components)
async function getTeamMembers() {
  // ...
}

// 3. Page component
export default async function AboutPage() {
  // 4. Data fetching calls
  const teamMembers = await getTeamMembers();
  
  // 5. Page render
  return (
    <div className="about-page">
      <HeroBanner title="About Us" />
      <TeamSection members={teamMembers} />
      <ValuesSection />
      <ContactCTA />
    </div>
  );
}
```

## Module Boundaries

### Feature Modules

Organize related components, hooks, and utilities into feature modules:

```
features/
├── authentication/           # Authentication feature
│   ├── components/           # Authentication components
│   ├── hooks/                # Authentication hooks
│   ├── utils/                # Authentication utilities
│   └── index.ts              # Public API
├── blog/                     # Blog feature
│   ├── components/           # Blog components
│   ├── hooks/                # Blog hooks
│   ├── utils/                # Blog utilities
│   └── index.ts              # Public API
└── [other features]/
```

### Public APIs

Use barrel files (index.ts) to define public APIs for modules:

```typescript
// features/blog/index.ts
export { default as BlogList } from './components/BlogList';
export { default as BlogPost } from './components/BlogPost';
export { useBlogPosts } from './hooks/useBlogPosts';
export type { BlogPost, BlogCategory } from './types';
```

This allows for clean imports:

```typescript
import { BlogList, useBlogPosts } from '@/features/blog';
```

## Next.js App Router Considerations

### Route Groups

Use route groups to organize pages without affecting the URL structure:

```
app/
├── (marketing)/              # Marketing pages route group
│   ├── about/
│   ├── services/
│   └── contact/
├── (dashboard)/              # Dashboard pages route group
│   ├── dashboard/
│   ├── projects/
│   └── settings/
└── page.tsx                  # Home page
```

### Parallel Routes

Use parallel routes for complex layouts with independent navigation:

```
app/
├── @sidebar/                 # Sidebar parallel route
│   └── default.tsx
├── @main/                    # Main content parallel route
│   └── default.tsx
└── layout.tsx                # Layout with multiple slots
```

### Intercepting Routes

Use intercepting routes for modal patterns:

```
app/
├── projects/
│   ├── page.tsx              # Projects list page
│   └── [id]/
│       └── page.tsx          # Project detail page
└── (.)projects/              # Intercept projects routes
    └── [id]/
        └── page.tsx          # Project modal view
```

## Documentation

### Code Documentation

Use JSDoc comments for components, functions, and types:

```tsx
/**
 * Button component for user interactions
 * 
 * @param variant - Visual style of button
 * @param size - Size of the button
 * @param children - Button content
 * @param onClick - Click handler function
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}: ButtonProps) {
  // ...
}
```

### README Files

Include README.md files in key directories to explain purpose and usage:

```
components/
├── README.md                 # Explains component organization
ui/
├── README.md                 # Explains UI component system
```

## Implementation Plan

### Phase 1: Core Structure Setup
- Set up base directory structure
- Establish naming conventions
- Create initial README files

### Phase 2: Component Organization
- Organize existing components
- Implement atomic design structure
- Set up feature modules

### Phase 3: Documentation
- Add JSDoc comments to key components
- Create README files for important directories
- Document code organization standards

## Next Steps

1. Audit current project structure
2. Reorganize files according to the recommended structure
3. Implement consistent naming conventions
4. Add documentation to key components and directories
5. Create README files for important modules