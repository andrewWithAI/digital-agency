import styles from './page.module.css';
import HeroBanner from './components/hero/HeroBanner';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HeroBanner />

      {/* Services Grid */}
      <section className="section bg-gray-50 dark:bg-gray-dark/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={`text-xl text-gray max-w-2xl mx-auto ${styles.sectionDescription}`}>
              End-to-end digital expertise to help your business thrive in the digital age
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className={`card group ${styles.serviceCard}`}>
                <div className="h-12 w-12 mb-6 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-h5 mb-3">{service.title}</h3>
                <p className="text-gray">{service.description}</p>
                <Link href={service.link} className="inline-flex items-center mt-4 text-secondary hover:text-secondary-dark">
                  Learn more
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <p className={`text-xl text-gray max-w-2xl mx-auto ${styles.sectionDescription}`}>
              Discover how we&apos;ve helped businesses achieve their digital goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className={`card group overflow-hidden ${styles.projectCard}`}>
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-h6">{project.title}</h4>
                <p className="text-gray mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className={`text-white ${styles.sectionTitle}`}>Client Success Stories</h2>
            <p className={`text-xl text-white/90 max-w-2xl mx-auto ${styles.sectionDescription}`}>
              Don&apos;t just take our word for it - hear from our satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className={`bg-white/5 p-8 rounded-lg backdrop-blur-sm ${styles.testimonialCard}`}>
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h5 className="text-white font-heading">{testimonial.author}</h5>
                    <p className="text-white/70">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/90 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2>Let&apos;s Work Together</h2>
              <p className="text-xl text-gray">
                Ready to transform your digital presence? Get in touch with us today.
              </p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

// Sample data (would typically come from a CMS or API)
const services = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern technologies and best practices.",
    link: "/services/web-development",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Digital Strategy",
    description: "Strategic planning and consulting to maximize your digital potential.",
    link: "/services/digital-strategy",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "UX/UI Design",
    description: "User-centered design that creates engaging digital experiences.",
    link: "/services/ux-design",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

const projects = [
  {
    title: "E-commerce Platform",
    description: "A modern e-commerce solution with seamless payment integration.",
    image: "/window.svg",
    technologies: ["Next.js", "Stripe", "Tailwind CSS"],
  },
  {
    title: "Healthcare Portal",
    description: "Secure patient management system for healthcare providers.",
    image: "/file.svg",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Real Estate App",
    description: "Property listing and management platform with virtual tours.",
    image: "/grid.svg",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
  },
];

const testimonials = [
  {
    quote: "Thompson Digital transformed our online presence. Their expertise and attention to detail exceeded our expectations.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    avatar: "/testimonials/sarah.jpg",
  },
  {
    quote: "Working with Thompson Digital was a game-changer for our business. They delivered a solution that perfectly matched our vision.",
    author: "Michael Chen",
    role: "Founder, InnovateCo",
    avatar: "/testimonials/michael.jpg",
  },
  {
    quote: "The team's technical expertise and project management made our digital transformation seamless and successful.",
    author: "Emily Rodriguez",
    role: "CTO, FutureScale",
    avatar: "/testimonials/emily.jpg",
  },
];
