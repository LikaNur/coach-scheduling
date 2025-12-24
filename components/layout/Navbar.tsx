import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/coaches', label: 'Coaches' },
  { href: '/sessions', label: 'Sessions' },
] as const;

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Cloudathlete"
              width={80}
              height={10}
              className="h-7 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black font-medium hover:text-[#FF6B35] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
