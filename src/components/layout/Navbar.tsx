
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Battery, Car, Map, Search, User, MenuIcon, X, Zap } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold">e-Araba Pazar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Authentication buttons for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-dark-gray">
              Giriş Yap
            </Button>
            <Button className="bg-white text-dark-gray hover:bg-light-gray">
              Kayıt Ol
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <NavLinks mobile />
            </nav>
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-dark-gray w-full">
                Giriş Yap
              </Button>
              <Button className="bg-white text-dark-gray hover:bg-light-gray w-full">
                Kayıt Ol
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const links = [
    { href: "/", icon: <Car size={20} />, label: "Araçlar" },
    { href: "/charging-stations", icon: <Battery size={20} />, label: "Şarj İstasyonları" },
    { href: "/compare", icon: <Search size={20} />, label: "Karşılaştır" },
    { href: "/blog", icon: <Map size={20} />, label: "Blog" },
    { href: "/account", icon: <User size={20} />, label: "Hesabım" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={`flex items-center space-x-2 text-white hover:text-light-gray transition-colors ${
            mobile ? 'py-2' : ''
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </>
  );
};

export default Navbar;
