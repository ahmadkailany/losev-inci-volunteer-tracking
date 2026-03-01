'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/auth';
import HeroSection from '@/components/marketing/hero-section';
import FeaturesSection from '@/components/marketing/features-section';
import StatsSection from '@/components/marketing/stats-section';
import StorySection from '@/components/marketing/story-section';
import SocialSection from '@/components/marketing/social-section';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <StorySection />
        <SocialSection />
      </main>
      <Footer />
    </>
  );
}
