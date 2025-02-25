# Talty Tech Solutions - State Management Strategy

This document outlines the state management strategy for the Talty Tech Solutions website, focusing on maintainability, performance, and developer experience.

## State Management Goals

- Create a predictable and maintainable state architecture
- Minimize unnecessary re-renders for optimal performance
- Provide a consistent approach to state management across the application
- Balance simplicity with scalability
- Support server components in Next.js

## State Categories

We'll categorize state based on its scope and purpose:

1. **UI State**: Temporary visual state (e.g., open/closed menus, form input values)
2. **Application State**: Shared state across multiple components (e.g., theme, authentication)
3. **Server State**: Data fetched from APIs (e.g., services, projects, blog posts)
4. **URL State**: State derived from the URL (e.g., search parameters, filters)
5. **Form State**: State related to form inputs, validation, and submission

## State Management Approaches

### Local Component State

For UI state that's confined to a single component:

```tsx
// Example of local component state
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="accordion">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}
```

**When to use**:
- Component-specific UI state (open/closed, hover, focus)
- Temporary state that doesn't affect other components
- Simple toggle or counter functionality

### React Context

For application-wide state that needs to be accessed by multiple components:

```tsx
// Example of React Context for theme
// ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

**When to use**:
- Application-wide settings (theme, language)
- User authentication state
- Shared UI state (mobile menu, notifications)
- Any state that needs to be accessed by multiple components across the component tree

### Custom Hooks

For encapsulating and reusing stateful logic:

```tsx
// Example of a custom hook for form validation
function useFormValidation(initialValues, validationSchema) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const validate = () => {
    try {
      validationSchema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      const formattedErrors = {};
      error.errors.forEach(err => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };
  
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validate()) {
      callback(values);
    }
    
    setIsSubmitting(false);
  };
  
  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}
```

**When to use**:
- Reusable stateful logic across multiple components
- Complex state logic that benefits from abstraction
- When you want to separate concerns and improve readability

### React Hook Form (for Form State)

For managing form state with validation:

```tsx
// Example of React Hook Form with Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });
  
  const onSubmit = async (data: ContactFormData) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      reset();
      // Show success message
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

**When to use**:
- Complex forms with validation
- Forms with multiple fields and dependencies
- When performance during form updates is important

### Server State with SWR

For fetching, caching, and updating server data:

```tsx
// Example of SWR for data fetching
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function ProjectsList() {
  const { data, error, isLoading } = useSWR('/api/projects', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });
  
  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Failed to load projects</div>;
  
  return (
    <div className="projects-grid">
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

**When to use**:
- Data fetching with automatic revalidation
- Cached data that needs to stay fresh
- When you need optimistic UI updates
- For real-time data that changes frequently

### URL State with Next.js

For state that should be reflected in the URL:

```tsx
// Example of URL state in Next.js
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function ProjectFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const category = searchParams.get('category') || 'all';
  
  const updateFilters = (newCategory) => {
    const params = new URLSearchParams(searchParams);
    
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    
    router.replace(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="filters">
      <button 
        className={category === 'all' ? 'active' : ''}
        onClick={() => updateFilters('all')}
      >
        All Projects
      </button>
      <button 
        className={category === 'web' ? 'active' : ''}
        onClick={() => updateFilters('web')}
      >
        Web Projects
      </button>
      {/* More filter buttons */}
    </div>
  );
}
```

**When to use**:
- Filters, sorting, and pagination
- Search queries
- Any state that should be shareable via URL
- When you want to enable browser history navigation

## State Management Decision Tree

Use this decision tree to determine the appropriate state management approach:

1. **Is the state confined to a single component?**
   - Yes → Use local component state (useState/useReducer)
   - No → Continue

2. **Is it form-related state?**
   - Yes → Use React Hook Form
   - No → Continue

3. **Is it server data?**
   - Yes → Use SWR
   - No → Continue

4. **Should the state be reflected in the URL?**
   - Yes → Use URL state with Next.js router
   - No → Continue

5. **Is the state needed across multiple components?**
   - Yes → Use React Context
   - No → Reconsider if state is actually needed

## Context Structure

Organize contexts by domain to avoid a single massive context:

```
app/
├── context/
│   ├── theme/
│   │   ├── ThemeContext.tsx
│   │   └── ThemeProvider.tsx
│   ├── auth/
│   │   ├── AuthContext.tsx
│   │   └── AuthProvider.tsx
│   ├── ui/
│   │   ├── UIContext.tsx
│   │   └── UIProvider.tsx
│   └── index.tsx (exports all contexts)
```

## Custom Hooks Library

Create a library of reusable hooks for common state patterns:

```
app/
├── hooks/
│   ├── useMediaQuery.ts (responsive design hooks)
│   ├── useLocalStorage.ts (persistent state)
│   ├── useToggle.ts (boolean state toggle)
│   ├── useDebounce.ts (debounced state updates)
│   ├── usePrevious.ts (access previous state)
│   └── index.ts (exports all hooks)
```

## State Management with Server Components

Next.js 13+ introduces Server Components, which affects state management:

### Server Components (Non-Interactive)
- Cannot use hooks (useState, useEffect, etc.)
- Ideal for data fetching and rendering
- No client-side JavaScript included

### Client Components (Interactive)
- Can use all React hooks and state
- Required for interactive elements
- Include client-side JavaScript

```tsx
// Example of state management with Server and Client Components

// ServerComponent.tsx (default in Next.js 13+)
import ClientComponent from './ClientComponent';

// This component fetches data on the server
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data').then(res => res.json());
  
  return (
    <div>
      <h1>Server Component</h1>
      <p>This renders on the server with no client JS</p>
      
      {/* Pass data to client component */}
      <ClientComponent initialData={data} />
    </div>
  );
}

// ClientComponent.tsx
'use client'; // Mark as client component

import { useState } from 'react';

function ClientComponent({ initialData }) {
  // Client-side state management
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      <h2>Client Component</h2>
      <p>This includes interactive elements</p>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      
      {isEditing && (
        <form>
          {/* Form fields */}
        </form>
      )}
    </div>
  );
}
```

## Performance Optimization

### Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders:

```tsx
// Example of memoization
import { memo, useMemo, useCallback } from 'react';

// Memoize component
const ProjectCard = memo(function ProjectCard({ project, onSelect }) {
  return (
    <div className="card" onClick={() => onSelect(project.id)}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
});

function ProjectsList({ projects }) {
  // Memoize expensive calculations
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => a.title.localeCompare(b.title));
  }, [projects]);
  
  // Memoize callback functions
  const handleSelect = useCallback((id) => {
    console.log(`Selected project: ${id}`);
  }, []);
  
  return (
    <div className="projects-grid">
      {sortedProjects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
```

### Context Optimization

Split contexts to avoid unnecessary re-renders:

```tsx
// Instead of one large context
const AppContext = createContext({
  theme: 'light',
  user: null,
  notifications: [],
  // Many more values
});

// Split into domain-specific contexts
const ThemeContext = createContext({ theme: 'light' });
const UserContext = createContext({ user: null });
const NotificationContext = createContext({ notifications: [] });
```

## Implementation Plan

### Phase 1: Core State Management Setup
- Set up basic React Context providers (Theme, UI)
- Create custom hooks library
- Implement form state management with React Hook Form

### Phase 2: Server State Integration
- Set up SWR for data fetching
- Implement URL state for filterable content
- Create server/client component boundaries

### Phase 3: Performance Optimization
- Audit and optimize context usage
- Implement memoization where needed
- Set up performance monitoring

## Best Practices

1. **Keep state as local as possible**
   - Only elevate state when truly needed by multiple components

2. **Use the right tool for the job**
   - Follow the decision tree to select the appropriate state management approach

3. **Separate concerns**
   - Split state by domain rather than having a single global state

4. **Document state management decisions**
   - Add comments explaining why a particular approach was chosen

5. **Consider performance implications**
   - Be mindful of re-renders and use memoization appropriately

6. **Leverage TypeScript**
   - Define clear types for all state to improve developer experience

7. **Test state management logic**
   - Write unit tests for complex state logic and custom hooks

## Next Steps

1. Audit current state management in existing components
2. Set up core context providers (Theme, UI)
3. Create custom hooks library
4. Implement form state management with React Hook Form
5. Document state management patterns for the team