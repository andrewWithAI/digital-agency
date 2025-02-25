import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Thompson Digital Solutions',
  description: 'Learn about Thompson Digital Solutions, our team, values, and approach to digital excellence.',
  keywords: 'digital agency, web development team, technology consultants, company values, digital expertise',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-h2 md:text-h1 font-bold mb-6">About Thompson Digital Solutions</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We're a team of digital experts passionate about transforming ideas into exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h3 font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-4">
                Founded in 2018, Thompson Digital Solutions began with a simple mission: to help businesses succeed in the digital age through innovative technology solutions and strategic thinking.
              </p>
              <p className="text-lg mb-4">
                What started as a small team of passionate developers has grown into a full-service digital agency with expertise spanning web development, UX/UI design, digital strategy, and more.
              </p>
              <p className="text-lg mb-6">
                Today, we partner with businesses of all sizes to create digital experiences that drive real results. Our approach combines technical excellence with strategic insight, ensuring that every solution we deliver not only looks great but performs exceptionally.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="btn-primary">
                  Our Services
                </Link>
                <Link href="/contact" className="btn-outline">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/about/company-story.jpg"
                alt="Thompson Digital Solutions team collaboration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-section bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h3 font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray max-w-3xl mx-auto">
              These core principles guide everything we do and define how we work with our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-8 rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
                <div className="h-12 w-12 mb-6 rounded-lg bg-primary/10 flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-h5 mb-3">{value.title}</h3>
                <p className="text-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h3 font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray max-w-3xl mx-auto">
              Our diverse team of experts brings together the perfect blend of technical skill, creative thinking, and strategic insight.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-h5 mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-gray mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    {member.social.map((social) => (
                      <a 
                        key={social.platform} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-dark hover:text-primary transition-colors"
                        aria-label={`${member.name}'s ${social.platform}`}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-section bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h3 font-bold mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award) => (
              <div key={award.title} className="bg-white p-8 rounded-lg shadow-card text-center">
                <div className="h-16 w-16 mx-auto mb-6">
                  <Image
                    src={award.icon}
                    alt={award.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-h6 mb-2">{award.title}</h3>
                <p className="text-gray text-sm">{award.organization}</p>
                <p className="text-secondary font-medium mt-2">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h3 text-white font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let's work together to create digital experiences that drive real business results.
            </p>
            <Link href="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Sample data (would typically come from a CMS or API)
const values = [
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to client communication.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "We embrace new technologies and approaches to solve complex problems in creative ways.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description: "We believe the best results come from true partnership with our clients and each other.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description: "We operate with honesty, transparency, and a commitment to doing what's right.",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "Alex Thompson",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in digital technology, Alex founded Thompson Digital Solutions to help businesses thrive in the digital age.",
    image: "/about/team/alex-thompson.jpg",
    social: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/",
        icon: ({ className }: { className?: string }) => (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/",
        icon: ({ className }: { className?: string }) => (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "Maya Rodriguez",
    role: "Creative Director",
    bio: "Maya leads our design team with a focus on creating beautiful, user-centered experiences that drive engagement and conversion.",
    image: "/about/team/maya-rodriguez.jpg",
    social: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/",
        icon: ({ className }: { className?: string }) => (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        platform: "Dribbble",
        url: "https://dribbble.com/",
        icon: ({ className }: { className?: string }) => (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "David Chen",
    role: "Technical Director",
    bio: "David oversees our development team, ensuring we deliver robust, scalable solutions using the latest technologies.",
    image: "/about/team/david-chen.jpg",
    social: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/",
        icon: ({ className }: { className?: string }) => (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        platform: "GitHub",
        url: "https://github.com/",
        icon: ({ className }: { className?: string }) => (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        ),
      },
    ],
  },
];

const awards = [
  {
    title: "Best Digital Agency",
    organization: "Digital Excellence Awards",
    year: "2024",
    icon: "/about/awards/award-1.svg",
  },
  {
    title: "Innovation in Web Development",
    organization: "Tech Innovators",
    year: "2023",
    icon: "/about/awards/award-2.svg",
  },
  {
    title: "UX Design Excellence",
    organization: "Design Industry Association",
    year: "2023",
    icon: "/about/awards/award-3.svg",
  },
  {
    title: "Top 50 Fast-Growing Companies",
    organization: "Business Growth Index",
    year: "2022",
    icon: "/about/awards/award-4.svg",
  },
];