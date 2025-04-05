
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, ChevronRight, Tag, ArrowRight, User } from 'lucide-react';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Elektrikli Araçların Çevresel Etkisi: Gerçekten Sürdürülebilir mi?',
    excerpt: 'Elektrikli araçların çevre üzerindeki etkileri, üretimden kullanıma ve geri dönüşüme kadar tüm yaşam döngüsü boyunca inceliyoruz.',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba53a0333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVsZWN0cmljJTIwY2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    publishDate: '2023-04-15',
    readTime: 8,
    category: 'Çevre',
    featured: true,
    author: {
      name: 'Ayşe Kaya',
      avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg'
    }
  },
  {
    id: 2,
    title: '2023\'ün En İyi Elektrikli Araçları: Hangi Model Size Uygun?',
    excerpt: '2023 yılında Türkiye pazarında bulunan en iyi elektrikli araç modelleri, özellikleri ve fiyatlarıyla karşılaştırmalı bir inceleme.',
    imageUrl: 'https://images.unsplash.com/photo-1617469767053-8f97f10dfac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWxlY3RyaWMlMjBjYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    publishDate: '2023-03-22',
    readTime: 12,
    category: 'İnceleme',
    featured: true,
    author: {
      name: 'Mehmet Yılmaz',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: 3,
    title: 'Elektrikli Araç Bataryaları: Teknoloji, Ömür ve Bakım',
    excerpt: 'Elektrikli araç bataryalarının teknolojisi, ömrünü uzatma yöntemleri ve doğru bakım için bilmeniz gereken her şey.',
    imageUrl: 'https://images.unsplash.com/photo-1558857563-b0c1992e36d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVsZWN0cmljJTIwY2FyJTIwYmF0dGVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    publishDate: '2023-03-10',
    readTime: 10,
    category: 'Teknoloji',
    featured: false,
    author: {
      name: 'Ali Demir',
      avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  },
  {
    id: 4,
    title: 'Şarj İstasyonu Ağları: Türkiye\'de Durum ve Geleceği',
    excerpt: 'Türkiye\'deki şarj istasyonu altyapısının mevcut durumu, karşılaşılan zorluklar ve gelecekteki genişleme planları.',
    imageUrl: 'https://images.unsplash.com/photo-1615645549319-89991fe904c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hhcmdpbmclMjBzdGF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    publishDate: '2023-02-28',
    readTime: 7,
    category: 'Altyapı',
    featured: false,
    author: {
      name: 'Zeynep Türk',
      avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg'
    }
  },
  {
    id: 5,
    title: 'İkinci El Elektrikli Araç Alırken Dikkat Edilmesi Gerekenler',
    excerpt: 'İkinci el elektrikli araç alırken kontrol edilmesi gereken noktalar, batarya sağlığı tespiti ve pazarlık taktikleri.',
    imageUrl: 'https://images.unsplash.com/photo-1633025094151-6fc466c28b9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHVzZWQlMjBlbGVjdHJpYyUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    publishDate: '2023-02-15',
    readTime: 9,
    category: 'Alıcı Rehberi',
    featured: false,
    author: {
      name: 'Can Özkan',
      avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  },
  {
    id: 6,
    title: 'Elektrikli Araç Teşvikleri ve Vergi Avantajları: 2023 Güncellemesi',
    excerpt: 'Türkiye\'de elektrikli araç alımında sağlanan teşvikler, vergi avantajları ve 2023 yılı için getirilen yeni düzenlemeler.',
    imageUrl: 'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVsZWN0cmljJTIwY2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    publishDate: '2023-01-30',
    readTime: 6,
    category: 'Finans',
    featured: false,
    author: {
      name: 'Deniz Aydın',
      avatarUrl: 'https://randomuser.me/api/portraits/women/53.jpg'
    }
  },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would filter blog posts based on search query
  };
  
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-header-gradient text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Elektrikli Araç Blogu
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Elektrikli araçlar, şarj teknolojileri ve sürdürülebilir ulaşım hakkında en güncel içerikler.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto">
            <div className="relative">
              <Input
                className="pl-10 pr-4 py-6 w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/70"
                type="text"
                placeholder="Blog yazılarında ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
              <Button type="submit" className="absolute right-1 top-1 bottom-1 bg-white text-dark-gray hover:bg-light-gray">
                Ara
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Öne Çıkan Yazılar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all card-hover">
                <div className="aspect-[16/9]">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-green text-white">{post.category}</Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {post.publishDate}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">
                    <Link to={`/blog/${post.id}`} className="hover:text-green transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={post.author.avatarUrl} 
                        alt={post.author.name} 
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {post.readTime} dk okuma
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-12 px-4 bg-light-gray">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">En Son Yazılar</h2>
            <Button variant="outline">
              Tüm Yazılar
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all card-hover">
                <div className="aspect-[16/9]">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="outline" className="border-green text-green">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {post.publishDate}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3">
                    <Link to={`/blog/${post.id}`} className="hover:text-green transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={post.author.avatarUrl} 
                        alt={post.author.name} 
                        className="w-6 h-6 rounded-full mr-2 object-cover"
                      />
                      <span className="text-xs">{post.author.name}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock size={12} className="mr-1" />
                      {post.readTime} dk okuma
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Kategoriler</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Teknoloji', 'Çevre', 'İnceleme', 'Altyapı', 'Alıcı Rehberi', 'Finans', 'Haberler', 'Test'].map(category => (
              <Link 
                key={category} 
                to={`/blog/category/${category.toLowerCase()}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Tag size={16} className="mr-2 text-green" />
                  <span>{category}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 px-4 bg-dark-gray text-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Bültenimize Abone Olun</h2>
            <p className="text-gray-300 mb-6">
              Elektrikli araçlar hakkında en güncel haberleri, incelemeleri ve ipuçlarını içeren 
              haftalık bültenimize abone olun.
            </p>
            
            <form className="max-w-md mx-auto flex">
              <Input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="rounded-r-none bg-white/10 border-white/20"
              />
              <Button className="rounded-l-none bg-green hover:bg-opacity-90">
                Abone Ol
              </Button>
            </form>
            
            <p className="text-xs text-gray-400 mt-4">
              Abone olarak, e-posta bildirimleri almayı kabul etmiş olursunuz. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
