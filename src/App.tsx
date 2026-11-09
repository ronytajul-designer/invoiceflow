import { useEffect } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { initSmoothScroll } from './lib/smoothScroll';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { SocialProof } from './sections/SocialProof';
import { Features } from './sections/Features';
import { HowItWorks } from './sections/HowItWorks';
import { Showcase } from './sections/Showcase';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { FinalCta } from './sections/FinalCta';
import { Footer } from './sections/Footer';

export default function App() {
  useEffect(() => initSmoothScroll(), []);
  return (
    // LazyMotion loads only the DOM animation features we use (smaller bundle);
    // "strict" makes any accidental full `motion.*` import an error.
    // reducedMotion "user" honours the OS reduced-motion setting everywhere.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <Header />
      <main id="main">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Showcase />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
