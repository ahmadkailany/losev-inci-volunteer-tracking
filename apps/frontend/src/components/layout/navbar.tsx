'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { getAuthToken } from '@/lib/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = getAuthToken() !== null;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
          <span className="hidden sm:inline">LÖSEV İnci</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
            About
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
            Contact
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-4 space-y-3">
          <Link href="#" className="block text-sm hover:text-primary">
            About
          </Link>
          <Link href="#" className="block text-sm hover:text-primary">
            Features
          </Link>
          <Link href="/contact" className="block text-sm hover:text-primary">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
