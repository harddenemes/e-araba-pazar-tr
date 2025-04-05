import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Share2, 
  ChevronRight, 
  Facebook, 
  Twitter, 
  Linkedin,
  User,
  Heart,
  MessageCircle,
  BookmarkPlus,
  ArrowRight
} from 'lucide-react';

// Sample blog post data
const samplePost = {
  id: 1,
  title: 'Elektrikli Araçların Çevresel Etkisi: Gerçekten Sürdürülebilir mi?',
  excerpt: 'Elektrikli araçların çevre üzerindeki etkileri, üretimden kullanıma ve geri dönüşüme kadar tüm yaşam döngüsü boyunca inceliyoruz.',
  imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba53a0333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVsZWN0cmljJTIwY2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  publishDate: '15 Nisan 2023',
  readTime: 8,
  category: 'Çevre',
  content: `
    <p>Elektrikli araçlar (EV'ler), fosil yakıtlı araçlara umut verici bir alternatif olarak sunuluyorlar. Egzoz emisyonları olmadan çalışmaları, onları daha çevre dostu bir seçenek olarak gösteriyor. Ancak elektrikli araçların gerçekten ne kadar sürdürülebilir olduğunu anlamak için, yaşam döngülerinin tüm aşamalarını incelememiz gerekiyor.</p>
    
    <h2>Üretim Aşaması</h2>
    
    <p>Elektrikli bir aracın üretimi, geleneksel bir içten yanmalı motorlu araca göre genellikle daha fazla enerji ve kaynak gerektirir. Bu farkın en büyük nedeni, elektrikli araçların batarya sistemleridir.</p>
    
    <p>Lityum-iyon bataryaların üretimi için lityum, kobalt, nikel ve grafit gibi ham maddelerin çıkarılması ve işlenmesi gerekir. Bu madencilik faaliyetleri toprak, su ve hava kirliliğine yol açabilir ve bazı durumlarda yerel ekosistemlere zarar verebilir.</p>
    
    <p>Örneğin, bir çalışmaya göre, 75 kWh'lik bataryaya sahip bir elektrikli aracın üretimi, 650-900 kg CO2 eşdeğeri sera gazı emisyonu ile sonuçlanabilir. Bu, elektrikli aracı kullanmadan önce bile belli bir "karbon borcuyla" başladığımız anlamına geliyor.</p>
    
    <h2>Kullanım Aşaması</h2>
    
    <p>Elektrikli araçların en büyük çevresel avantajı, kullanım aşamasında ortaya çıkar. EV'ler, çalışırken doğrudan emisyon üretmezler. Ancak, kullandıkları elektriğin kaynağı, genel çevresel etkilerini büyük ölçüde belirler.</p>
    
    <p>Eğer elektrik yenilenebilir kaynaklardan (güneş, rüzgar, hidroelektrik vb.) geliyorsa, elektrikli araçların kullanım aşamasındaki karbon ayak izi çok düşük olabilir. Ancak elektrik kömür gibi fosil yakıtlardan üretiliyorsa, dolaylı emisyonlar önemli olabilir.</p>
    
    <p>Türkiye'de elektrik üretiminin yaklaşık %40'ı yenilenebilir kaynaklardan gelmektedir. Bu oran arttıkça, elektrikli araçların çevresel faydaları da artacaktır.</p>
    
    <h2>Geri Dönüşüm ve Atık Yönetimi</h2>
    
    <p>Elektrikli araç bataryalarının ömrü genellikle 8-10 yıl arasındadır. Bu süreden sonra, kapasitelerinin yaklaşık %70-80'ini korurlar ve değiştirilmeleri gerekebilir.</p>
    
    <p>Kullanılmış bataryaların uygun şekilde geri dönüştürülmesi veya yeniden kullanılması, elektrikli araçların toplam çevresel etkisini azaltmak için kritik öneme sahiptir. Eski EV bataryaları, güneş enerjisi depolama sistemleri gibi sabit enerji depolama uygulamalarında "ikinci hayat" bulabilirler.</p>
    
    <p>Batarya bileşenlerinin geri dönüşümü, değerli metallerin yeniden kazanılmasına ve yeni bataryalarda kullanılmasına olanak sağlar. Bu, madencilikten kaynaklanan çevresel etkileri azaltabilir.</p>
    
    <h2>Toplam Yaşam Döngüsü Değerlendirmesi</h2>
    
    <p>Çeşitli araştırmalar, elektrikli araçların, yaşam döngülerinin tamamı dikkate alındığında bile, içten yanmalı motorlu araçlardan daha düşük çevresel etkilere sahip olduğunu gösteriyor.</p>
    
    <p>Örneğin, Avrupa Çevre Ajansı'na göre, tipik bir elektrikli aracın karbon ayak izi, benzer bir dizel veya benzinli araçtan yaklaşık %17-30 daha düşüktür. Elektrik şebekesinin daha temiz hale gelmesiyle bu fark daha da büyüyecektir.</p>
    
    <h2>Sonuç</h2>
    
    <p>Elektrikli araçlar, fosil yakıtlı araçlara göre daha sürdürülebilir bir seçenek sunma potansiyeline sahiptir. Ancak, gerçek çevresel faydalarını en üst düzeye çıkarmak için bazı konulara dikkat etmemiz gerekiyor:</p>
    
    <ul>
      <li>Elektrik üretiminde yenilenebilir enerji kaynaklarının payını artırmak</li>
      <li>Batarya üretimini daha verimli ve çevre dostu hale getirmek</li>
      <li>Etkili geri dönüşüm ve ikinci hayat programları geliştirmek</li>
      <li>Daha hafif ve verimli araçlar tasarlamak</li>
    </ul>
    
    <p>Bu adımlar atılırsa, elektrikli araçlar gerçekten sürdürülebilir ulaşımın önemli bir parçası olabilir ve iklim değişikliğiyle mücadelede önemli bir rol oynayabilir.</p>
  `,
  author: {
    name: 'Ayşe Kaya',
    avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
    bio: 'Çevre mühendisi ve sürdürülebilir ulaşım danışmanı. 10 yılı aşkın süredir elektrikli araçlar ve yenilenebilir enerji konularında çalışmalar yapmaktadır.',
  },
  tags: ['Elektrikli Araçlar', 'Sürdürülebilirlik', 'Çevre', 'Batarya Teknolojisi', 'Karbon Ayak İzi'],
  relatedPosts: [
    {
      id: 3,
      title: 'Elektrikli Araç Bataryaları: Teknoloji, Ömür ve Bakım',
      imageUrl: 'https://images.unsplash.com/photo-1558857563-b0c1992e36d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVsZWN0cmljJTIwY2FyJTIwYmF0dGVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      category: 'Teknoloji'
    },
    {
      id: 2,
      title: '2023\'ün En İyi Elektrikli Araçları: Hangi Model Size Uygun?',
      imageUrl: 'https://images.unsplash.com/photo-1617469767053-8f97f10dfac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWxlY3RyaWMlMjBjYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      category: 'İnceleme'
    }
  ],
  comments: 12,
  likes: 48
};

const BlogPost = () => {
  const { id } = useParams();
  const [liked, setLiked] = React.useState(false);
  
  // In a real app, we would fetch the post data based on the ID
  const post = samplePost;
  
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-light-gray py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-green">Ana Sayfa</Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <Link to="/blog" className="text-gray-600 hover:text-green">Blog</Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-gray-900">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-green text-white">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-600 mb-6">
              <div className="flex items-center mr-6 mb-2 sm:mb-0">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">{post.publishDate}</span>
              </div>
              <div className="flex items-center mr-6 mb-2 sm:mb-0">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{post.readTime} dakika okuma</span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-1" />
                <span className="text-sm">{post.comments} yorum</span>
              </div>
            </div>
            
            {/* Author Info */}
            <div className="flex items-center mb-6">
              <img 
                src={post.author.avatarUrl} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <h3 className="font-medium">{post.author.name}</h3>
                <p className="text-sm text-gray-600">Yazar</p>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto"
            />
          </div>
          
          {/* Post Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Tags */}
          <div className="mb-8">
            <h3 className="font-bold mb-3">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Badge variant="outline" className="hover:bg-light-gray transition-colors">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Social Share */}
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Share2 size={18} className="mr-2" />
                <span className="font-medium">Bu yazıyı paylaş</span>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="bg-light-gray rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <img 
                src={post.author.avatarUrl} 
                alt={post.author.name} 
                className="w-20 h-20 rounded-full mb-4 sm:mb-0 sm:mr-6 object-cover"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                <p className="text-gray-600 mb-4">{post.author.bio}</p>
                <Button variant="outline" className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>Yazarın Diğer Yazıları</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Article Actions */}
          <div className="flex flex-wrap justify-center sm:justify-between gap-4 mb-12">
            <Button 
              variant={liked ? "default" : "outline"} 
              onClick={() => setLiked(!liked)}
              className={liked ? "bg-green hover:bg-green/90" : ""}
            >
              <Heart className={`mr-2 h-5 w-5 ${liked ? "fill-white" : ""}`} />
              <span>{liked ? post.likes + 1 : post.likes} Beğeni</span>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <BookmarkPlus className="mr-2 h-5 w-5" />
                <span>Kaydet</span>
              </Button>
              <Button>
                <MessageCircle className="mr-2 h-5 w-5" />
                <span>Yorum Yap</span>
              </Button>
            </div>
          </div>
          
          {/* Related Posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-all"
                >
                  <div className="sm:w-1/3">
                    <img 
                      src={relatedPost.imageUrl} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:w-2/3">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-bold mb-1 hover:text-green transition-colors">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-xs">
                      <ArrowRight size={12} className="mr-1" />
                      <span>Devamını Oku</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Comments Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Yorumlar ({post.comments})</h2>
            
            {/* Comment Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold mb-4">Yorum Yap</h3>
              <form>
                <div className="mb-4">
                  <textarea 
                    className="w-full p-3 border rounded-md" 
                    rows={4} 
                    placeholder="Yorumunuzu yazın..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-green hover:bg-green/90">
                    Yorum Gönder
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Sample Comment */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex items-start mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/85.jpg" 
                  alt="Commenter" 
                  className="w-10 h-10 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-medium">Okan Yılmaz</h4>
                  <p className="text-gray-500 text-sm">3 gün önce</p>
                </div>
              </div>
              <p className="text-gray-700">
                Çok bilgilendirici bir yazı olmuş. Elektrikli araçların üretim aşamasındaki karbon 
                ayak izini ilk kez bu kadar detaylı görüyorum. Türkiye'de yenilenebilir enerji 
                kaynaklarının artması, elektrikli araçların daha da çevre dostu olmasını sağlayacaktır.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/63.jpg" 
                  alt="Commenter" 
                  className="w-10 h-10 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-medium">Elif Demir</h4>
                  <p className="text-gray-500 text-sm">1 hafta önce</p>
                </div>
              </div>
              <p className="text-gray-700">
                Batarya teknolojisindeki gelişmeler bu konuda iyileşmeler sağlayacaktır. Ayrıca bataryaların 
                "second life" uygulamalarında kullanılması ve geri dönüşüm süreçlerinin iyileştirilmesi de 
                çok önemli. Umarım önümüzdeki yıllarda bu konularda daha fazla gelişme görürüz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
