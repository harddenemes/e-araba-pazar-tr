
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Zap className="h-6 w-6" />
              <span className="text-xl font-bold">e-Araba Pazar</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Türkiye'nin ilk elektrikli araç alım-satım platformu. Çevre dostu bir geleceğe birlikte adım atalım.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/charging-stations" className="text-gray-300 hover:text-white transition-colors">Şarj İstasyonları</Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-300 hover:text-white transition-colors">Araç Karşılaştırma</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Yardım & Destek</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">Sık Sorulan Sorular</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Gizlilik Politikası</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Kullanım Şartları</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin size={18} />
                <span className="text-gray-300">İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} />
                <span className="text-gray-300">+90 212 555 44 33</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <span className="text-gray-300">info@earabapazar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} e-Araba Pazar. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
