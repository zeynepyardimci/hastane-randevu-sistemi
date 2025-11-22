'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Ana Sayfa', icon: '🏥' },
        { href: '/doctors', label: 'Doktorlar', icon: '👨‍⚕️' },
        { href: '/appointments', label: 'Randevu Al', icon: '📅' },
        { href: '/appointments/list', label: 'Randevularım', icon: '📋' },
    ];

    return (
        <nav className="bg-card border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl">🏥</span>
                            <span className="text-xl font-bold text-primary">Galactic Prominence</span>
                        </Link>
                    </div>
                    <div className="flex space-x-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${isActive
                                            ? 'bg-primary text-primary-foreground shadow-lg'
                                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    <span className="hidden sm:inline">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
