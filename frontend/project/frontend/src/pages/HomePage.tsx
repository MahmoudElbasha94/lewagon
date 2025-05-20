import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import PopularCoursesSection from '../components/home/PopularCoursesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import PageTransition from '../components/common/PageTransition';

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturesSection />
      <PopularCoursesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </PageTransition>
  );
};

export default HomePage;