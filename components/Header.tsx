import Link from 'next/link';
import { Button } from './Button';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
                Tourvisto
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-blue transition-colors">
              Home
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-primary-blue transition-colors">
              Explore
            </Link>
            <Link href="/account" className="text-gray-700 hover:text-primary-blue transition-colors">
              Account
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
