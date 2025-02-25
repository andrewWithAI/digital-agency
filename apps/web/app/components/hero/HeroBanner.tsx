import Link from 'next/link';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <section className={`relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-primary to-primary-dark ${styles.heroSection}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      <div className="container mx-auto max-w-container px-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`text-white ${styles.heroContent}`}>
            <h1 className={`text-display font-bold text-white mb-6 ${styles.title}`}>
              Elevate Your Digital Presence
            </h1>
            <p className="text-xl mb-8 text-white/90">
              We craft innovative digital solutions that drive real business growth. Transform your ideas into powerful digital experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-secondary">
                Get Started
              </Link>
              <Link href="/portfolio" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                View Our Work
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className={styles.heroImage}>
              <div className={styles.globeContainer}>
                <div className={styles.globeShape} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}