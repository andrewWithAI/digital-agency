# Talty Tech Solutions - Development Workflow

This document outlines the development workflow and best practices for the Talty Tech Solutions website project, focusing on collaboration, code quality, and efficient development processes.

## Development Environment

### Prerequisites

- Node.js (v18.17.0 or later)
- npm (v9.6.0 or later)
- Git (v2.30.0 or later)
- Visual Studio Code (recommended)

### Environment Setup

1. **Clone the repository**

```bash
git clone https://github.com/thompson-digital/digital-agency.git
cd digital-agency
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the project root:

```
# API Keys
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Third-party services
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Development settings
NEXT_PUBLIC_DEVELOPMENT_MODE=true
```

4. **Start the development server**

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

### Recommended VS Code Extensions

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- PostCSS Language Support
- GitLens
- Error Lens

### VS Code Settings

Add these settings to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Git Workflow

### Branch Strategy

We follow a modified Git Flow approach:

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features and enhancements
- `bugfix/*`: Bug fixes
- `hotfix/*`: Urgent production fixes
- `release/*`: Release preparation

### Branch Naming Convention

```
<type>/<issue-number>-<short-description>
```

Examples:
- `feature/123-add-portfolio-page`
- `bugfix/456-fix-mobile-navigation`
- `hotfix/789-critical-auth-fix`

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
- `feat(portfolio): add project filtering functionality`
- `fix(nav): resolve mobile menu not closing on click`
- `docs: update README with setup instructions`

### Pull Request Process

1. **Create a branch** from `develop` (or `main` for hotfixes)
2. **Implement changes** following the coding standards
3. **Write tests** for new functionality
4. **Run tests locally** to ensure they pass
5. **Create a pull request** with a clear description
6. **Request reviews** from team members
7. **Address feedback** and make necessary changes
8. **Merge** once approved and CI passes

### Pull Request Template

```markdown
## Description
[Describe the changes made and why they were made]

## Related Issues
Closes #[issue number]

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Performance improvement
- [ ] Refactoring
- [ ] Documentation update
- [ ] Other (please describe)

## How Has This Been Tested?
[Describe the tests that you ran]

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have added tests that prove my fix/feature works
- [ ] All new and existing tests pass
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings or errors
```

## Development Process

### Feature Development Workflow

1. **Understand requirements**
   - Review user stories and acceptance criteria
   - Clarify any questions with the team

2. **Plan implementation**
   - Break down the feature into smaller tasks
   - Consider architecture and component design
   - Identify potential reusable components

3. **Implement feature**
   - Follow coding standards and best practices
   - Write tests as you go
   - Keep commits small and focused

4. **Test thoroughly**
   - Unit tests for components and functions
   - Integration tests for feature workflows
   - Manual testing for UI and interactions

5. **Document changes**
   - Update component documentation
   - Add JSDoc comments to functions and components
   - Update README files if necessary

6. **Create pull request**
   - Follow the pull request process
   - Ensure CI passes
   - Address review feedback

### Bug Fix Workflow

1. **Reproduce the bug**
   - Understand the steps to reproduce
   - Identify the root cause

2. **Write a failing test**
   - Create a test that demonstrates the bug
   - Ensure the test fails before fixing

3. **Implement the fix**
   - Make the minimal changes needed to fix the issue
   - Ensure the test now passes

4. **Verify the fix**
   - Test related functionality to ensure no regressions
   - Verify the fix works in different environments

5. **Document the fix**
   - Explain the root cause in the commit message
   - Update documentation if necessary

6. **Create pull request**
   - Follow the pull request process
   - Include steps to verify the fix

## Code Quality Standards

### Linting and Formatting

We use ESLint and Prettier to maintain code quality and consistency:

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### TypeScript Standards

- Use strict type checking
- Avoid `any` type when possible
- Use interfaces for object shapes
- Use type aliases for unions and complex types
- Use generics for reusable components and functions

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Avoid
interface ButtonProps {
  variant: any;
  size: any;
  children: any;
  onClick: any;
}
```

### Component Standards

- One component per file
- Use functional components with hooks
- Follow the component structure defined in the project structure document
- Use TypeScript for props and state
- Use CSS modules for component-specific styles

```tsx
// Good
import { useState } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ variant, children, onClick }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      className={`${styles.button} ${styles[`button${variant}`]}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}
```

### CSS/Tailwind Standards

- Use Tailwind utility classes for most styling
- Use CSS modules for complex or component-specific styles
- Follow a consistent class naming convention
- Use CSS variables for theme values

```tsx
// Using Tailwind
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// Using CSS modules for complex components
import styles from './Carousel.module.css';

function Carousel({ items }) {
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTrack}>
        {items.map((item) => (
          <div key={item.id} className={styles.carouselItem}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Testing Standards

### Unit Testing

- Test components in isolation
- Focus on behavior, not implementation details
- Use React Testing Library for component tests
- Use Jest for utility and hook tests

```tsx
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

- Test component interactions
- Focus on user workflows
- Use React Testing Library for integration tests

```tsx
// Integration test example
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('submits form with valid data', async () => {
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello, world!' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, world!'
      });
    });
  });
});
```

### End-to-End Testing

- Test complete user journeys
- Focus on critical paths
- Use Cypress for E2E tests

```javascript
// E2E test example
describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('submits a contact form successfully', () => {
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true }
    }).as('submitForm');

    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('textarea[name="message"]').type('Hello, world!');
    
    cy.get('button[type="submit"]').click();
    
    cy.wait('@submitForm');
    cy.contains('Thank you for your message').should('be.visible');
  });
});
```

## Documentation Standards

### Code Documentation

- Use JSDoc comments for functions, components, and types
- Document props, return values, and side effects
- Explain complex logic and algorithms

```tsx
/**
 * Button component for user interactions
 * 
 * @param variant - Visual style of button
 * @param size - Size of the button
 * @param children - Button content
 * @param onClick - Click handler function
 * @returns A styled button component
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => console.log('Clicked')}>
 *   Click me
 * </Button>
 * ```
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

- Include README.md files in key directories
- Explain the purpose and usage of components
- Provide examples and best practices

### Storybook Documentation

- Create stories for all UI components
- Document component variants and props
- Include usage examples and guidelines

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Visual style of the button'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button'
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
};
```

## Continuous Integration

### CI Pipeline

We use GitHub Actions for continuous integration:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm start
```

### Deployment Pipeline

We use Vercel for deployments:

- Preview deployments for pull requests
- Staging deployments for the `develop` branch
- Production deployments for the `main` branch

## Performance Monitoring

### Lighthouse CI

We use Lighthouse CI to monitor performance:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/services
            http://localhost:3000/contact
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Web Vitals Monitoring

We use Next.js Web Vitals to monitor performance in production:

```tsx
// app/layout.tsx
export function reportWebVitals(metric) {
  // Send to analytics
  console.log(metric);
}
```

## Accessibility Monitoring

### Automated Accessibility Testing

We use axe-core for automated accessibility testing:

```tsx
// Example of integrating axe-core in tests
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';

expect.extend(toHaveNoViolations);

describe('Button accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Next Steps

1. Set up the development environment
2. Configure ESLint and Prettier
3. Set up the CI/CD pipeline
4. Implement the Git workflow
5. Create documentation templates