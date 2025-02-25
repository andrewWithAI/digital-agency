import React from 'react';
import { GlobeAltIcon, DevicePhoneMobileIcon, CloudIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import styles from './ServiceHero.module.css';

export default function ServiceHero() {
  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'web':
        return <GlobeAltIcon className="w-10 h-10 text-secondary" />;
      case 'mobile':
        return <DevicePhoneMobileIcon className="w-10 h-10 text-secondary" />;
      case 'cloud':
        return <CloudIcon className="w-10 h-10 text-secondary" />;
      case 'design':
        return <PaintBrushIcon className="w-10 h-10 text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary animate-gradient">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:24px_24px]" />
      </div>
      <div className="container mx-auto max-w-container px-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className={`text-h1 font-bold text-white mb-6 ${styles.heroTitle}`}>
              Our Services
            </h1>
            <p className={`text-xl mb-8 text-white/90 ${styles.heroDescription}`}>
              End-to-end digital expertise to help your business thrive in the digital age.
              From web development to digital strategy, we deliver solutions that drive growth.
            </p>
            <div className={`flex flex-wrap gap-4 ${styles.heroButtons}`}>
              <a href="#service-categories" className="btn-secondary">
                Explore Services
              </a>
              <a href="#contact" className="btn-outline border-white text-white hover:bg-white hover:text-secondary">
                Get in Touch
              </a>
            </div>
          </div>
          <div className={`relative hidden lg:block ${styles.heroImage}`}>
            <div className="relative h-[500px] w-[500px] mx-auto">
              {/* Background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`absolute w-80 h-80 rounded-full bg-secondary/20 ${styles.pulseCircle}`} />
                <div className={`absolute w-64 h-64 rounded-full bg-primary-light/20 ${styles.pulseCircleDelayed1}`} />
                <div className={`absolute w-48 h-48 rounded-full bg-secondary-light/20 ${styles.pulseCircleDelayed2}`} />
              </div>
              
              {/* Service icons */}
              <div className="absolute inset-0">
                {['web', 'mobile', 'cloud', 'design'].map((icon, index) => {
                  const angle = (index * Math.PI * 2) / 4; // Distribute evenly in a circle
                  const radius = 180; // Distance from center
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={icon}
                      className={`absolute w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${styles.serviceIcon}`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        animationDelay: `${1 + index * 0.2}s`
                      }}
                    >
                      {getIconComponent(icon)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}