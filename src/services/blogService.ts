
// Blog tipi tanımı
export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorTitle?: string;
  publishDate: string;
  coverImage: string;
  tags: string[];
  readTimeMinutes: number;
}

// Mock veritabanı
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Elektrikli Araçların Geleceği: 2025 ve Sonrası',
    summary: 'Elektrikli araç teknolojisi hızla gelişiyor. Peki bundan sonra bizi neler bekliyor? 2025 ve sonrasında elektrikli araçlar dünyasında neler olacak?',
    content: `
      <p>Elektrikli araçlar, ulaşım sektöründeki karbon emisyonlarını azaltmak için kritik bir rol oynamaktadır. Son yıllarda, elektrikli araç teknolojisi hızla gelişti ve bu trend önümüzdeki yıllarda da devam edecek gibi görünüyor.</p>

      <h2>Batarya Teknolojisindeki İlerlemeler</h2>
      <p>2025 yılına kadar, katı hal bataryaları gibi yeni nesil batarya teknolojilerinin ticarileştirilmesi bekleniyor. Bu bataryalar, daha yüksek enerji yoğunluğuna sahip olacak ve elektrikli araçların menzilini önemli ölçüde artıracak. Ayrıca, şarj süreleri de dramatik bir şekilde azalacak.</p>

      <h2>Şarj Altyapısının Gelişimi</h2>
      <p>Elektrikli araçların yaygınlaşmasının önündeki en büyük engellerden biri şarj altyapısının yetersizliğidir. Ancak, hükümetler ve özel şirketler şarj istasyonlarının sayısını artırmak için büyük yatırımlar yapıyor. 2025 yılına kadar, şehirlerarası yollarda ve şehir merkezlerinde çok daha fazla hızlı şarj istasyonu göreceğiz.</p>

      <h2>Fiyatların Düşmesi</h2>
      <p>Elektrikli araçların fiyatları, batarya maliyetlerinin düşmesi ve üretim ölçeğinin artması ile birlikte düşmeye devam edecek. 2025 yılında, elektrikli araçların fiyatları içten yanmalı motorlu araçların fiyatlarına yaklaşacak ve hatta bazı segmentlerde daha uygun hale gelebilir.</p>

      <h2>Otonom Sürüş Teknolojileri</h2>
      <p>Elektrikli araçlar ve otonom sürüş teknolojileri el ele ilerliyor. 2025 yılına kadar, birçok elektrikli araç, gelişmiş otonom sürüş özellikleri ile donatılmış olacak. Bu, sürüş güvenliğini artıracak ve sürüş deneyimini dönüştürecek.</p>

      <h2>Sonuç</h2>
      <p>Elektrikli araçların geleceği parlak görünüyor. Teknolojik ilerlemeler, fiyatların düşmesi ve şarj altyapısının gelişmesi ile birlikte, elektrikli araçların pazar payı önümüzdeki yıllarda hızla artacak. 2030 yılına kadar, birçok ülkede yeni satılan araçların çoğunluğunun elektrikli olması bekleniyor.</p>
    `,
    author: 'Ahmet Yılmaz',
    authorTitle: 'Otomotiv Analisti',
    publishDate: '2024-03-15',
    coverImage: 'https://placehold.co/1200x800/ECEFF1/263238?text=Elektrikli+Araçların+Geleceği',
    tags: ['elektrikli araçlar', 'teknoloji', 'batarya', 'gelecek'],
    readTimeMinutes: 7
  },
  {
    id: '2',
    title: 'Elektrikli Araç Batarya Sağlığını Koruma Rehberi',
    summary: 'Elektrikli aracınızın batarya ömrünü uzatmak için yapmanız ve kaçınmanız gereken şeyler. Bu rehberde, batarya sağlığını korumanın püf noktalarını bulabilirsiniz.',
    content: `
      <p>Elektrikli araçların en önemli ve en pahalı bileşeni bataryalarıdır. Bataryanın sağlığını korumak, aracınızın performansını ve değerini uzun süre koruması için kritik öneme sahiptir. İşte elektrikli araç bataryanızın ömrünü uzatmak için bazı ipuçları:</p>

      <h2>Şarj Alışkanlıkları</h2>
      <p>Bataryanızı her zaman %20-80 aralığında tutmaya çalışın. Bataryanın tamamen boşalması veya sürekli %100 şarjda tutulması, batarya ömrünü kısaltabilir. Günlük kullanım için %100 şarja gerek yoktur, seyahatlere çıkmadan önce tam şarj yapabilirsiniz.</p>

      <h2>Hızlı Şarj Kullanımı</h2>
      <p>Hızlı şarj istasyonları, acil durumlarda çok kullanışlıdır, ancak sürekli kullanımı batarya ömrünü olumsuz etkileyebilir. Mümkün olduğunca evde veya işyerinde yavaş şarj etmeyi tercih edin.</p>

      <h2>Sıcaklık Yönetimi</h2>
      <p>Bataryalar, aşırı sıcak veya soğuk koşullarda verimliliklerini kaybeder ve zarar görebilir. Mümkünse, aracınızı aşırı sıcak veya soğuk koşullarda park etmekten kaçının. Kapalı garajlar, bataryanızı korumak için idealdir.</p>

      <h2>Düzenli Yazılım Güncellemeleri</h2>
      <p>Araç üreticileri, batarya yönetim sistemlerini optimize etmek için düzenli olarak yazılım güncellemeleri yayınlar. Bu güncellemeleri düzenli olarak yapın.</p>

      <h2>Doğru Sürüş Teknikleri</h2>
      <p>Ani hızlanmalar ve frenlemeler batarya ömrünü olumsuz etkiler. Yumuşak hızlanma ve yavaşlama, not just your battery life but also your driving range.</p>

      <h2>Uzun Süreli Park</h2>
      <p>Aracınızı uzun süre park edecekseniz, bataryayı %50 civarında şarj edin. Tam dolu veya tam boş bırakmak, uzun vadede bataryanın bozulmasına neden olabilir.</p>

      <h2>Düzenli Kontrol</h2>
      <p>Batarya sağlığınızı düzenli olarak kontrol edin. Birçok elektrikli araçta, batarya sağlığını gösteren araçlar bulunur. Anormal bir düşüş fark ederseniz, servise başvurun.</p>

      <p>Bu ipuçlarını uygulayarak, elektrikli aracınızın batarya ömrünü uzatabilir ve yatırımınızın değerini koruyabilirsiniz.</p>
    `,
    author: 'Zeynep Kaya',
    authorTitle: 'EV Teknolojileri Uzmanı',
    publishDate: '2024-02-28',
    coverImage: 'https://placehold.co/1200x800/ECEFF1/263238?text=Batarya+Sağlığı+Rehberi',
    tags: ['batarya sağlığı', 'elektrikli araçlar', 'bakım', 'ipuçları'],
    readTimeMinutes: 5
  },
  {
    id: '3',
    title: 'Türkiye\'de Elektrikli Araç Şarj İstasyonları Haritası',
    summary: 'Türkiye\'deki elektrikli araç şarj istasyonlarının güncel durumu, nerelerde bulunduğu ve gelecekteki planlar hakkında detaylı bir rehber.',
    content: `
      <p>Elektrikli araç kullanıcılarının en büyük endişelerinden biri, yolda kalmaktır. Bu endişeyi gidermek için, Türkiye'deki şarj istasyonlarının haritasını ve durumunu bu makalede derledik.</p>

      <h2>Mevcut Durum</h2>
      <p>Türkiye'de elektrikli araç şarj istasyonlarının sayısı hızla artmaktadır. 2023 sonu itibariyle, ülke genelinde 2,500'den fazla şarj noktası bulunmaktadır. Bu istasyonların çoğu büyük şehirlerde ve otoyollar üzerinde yer almaktadır.</p>

      <h2>Şarj İstasyonu Ağları</h2>
      <p>Türkiye'de ZES, Eşarj, Sharz.net ve Voltrun gibi birçok şarj istasyonu ağı bulunmaktadır. Bu ağların her biri kendi mobil uygulamaları ve ödeme sistemleri ile hizmet vermektedir.</p>

      <h2>İstanbul'daki Şarj İstasyonları</h2>
      <p>İstanbul, Türkiye'nin en fazla şarj istasyonuna sahip şehridir. Avrupa ve Anadolu yakasında toplam 800'den fazla şarj noktası bulunmaktadır. AVM'ler, otoparklar ve ana caddeler üzerinde şarj istasyonları yaygındır.</p>

      <h2>Diğer Büyük Şehirlerdeki Şarj İstasyonları</h2>
      <p>Ankara, İzmir, Bursa ve Antalya gibi diğer büyük şehirlerde de önemli sayıda şarj istasyonu mevcuttur. Bu şehirlerdeki istasyonlar genellikle şehir merkezlerinde ve ana yollar üzerinde bulunmaktadır.</p>

      <h2>Şehirlerarası Yollardaki Şarj İstasyonları</h2>
      <p>Şehirlerarası yolculuk yapmayı planlıyorsanız, önceden rota üzerindeki şarj istasyonlarını kontrol etmeniz önemlidir. İstanbul-Ankara, İstanbul-İzmir ve Ankara-Antalya gibi popüler rotalarda düzenli aralıklarla şarj istasyonları bulunmaktadır.</p>

      <h2>Şarj İstasyonu Bulma İpuçları</h2>
      <p>Şarj istasyonları için en iyi navigasyon uygulamaları arasında Plugshare, Chargemap ve şarj ağlarının kendi uygulamaları yer alır. Bu uygulamalar, istasyonların konumunu, müsaitlik durumunu ve şarj fiyatlarını gösterir.</p>

      <h2>Gelecek Planları</h2>
      <p>Türkiye hükümeti ve özel şirketler, şarj istasyonu ağını genişletmek için büyük yatırımlar yapmaktadır. 2025 yılına kadar, ülke genelinde 10,000'den fazla şarj noktasına ulaşılması hedeflenmektedir.</p>

      <p>Elektrikli araç kullanıcıları için şarj istasyonlarının erişilebilirliği her geçen gün artmaktadır. Planlı hareket ederek ve doğru uygulamaları kullanarak, Türkiye'nin her yerine elektrikli araçla seyahat etmek mümkündür.</p>
    `,
    author: 'Murat Demir',
    authorTitle: 'EV Altyapı Uzmanı',
    publishDate: '2024-01-20',
    coverImage: 'https://placehold.co/1200x800/ECEFF1/263238?text=Şarj+İstasyonları+Haritası',
    tags: ['şarj istasyonları', 'harita', 'altyapı', 'elektrikli araçlar', 'Türkiye'],
    readTimeMinutes: 6
  },
  {
    id: '4',
    title: 'Elektrikli Araç Alırken Dikkat Edilmesi Gerekenler',
    summary: 'İlk elektrikli aracınızı almayı mı düşünüyorsunuz? Bu makalede, elektrikli araç satın alırken göz önünde bulundurmanız gereken en önemli faktörleri ele alıyoruz.',
    content: `
      <p>Elektrikli bir araç satın almak, geleneksel bir içten yanmalı motorlu araç satın almaktan oldukça farklıdır. Farklı özellikler ve gereksinimler göz önünde bulundurulmalıdır. İşte elektrikli araç satın alırken dikkat etmeniz gereken en önemli faktörler:</p>

      <h2>Menzil</h2>
      <p>Elektrikli bir aracın menzili, tek bir şarjla ne kadar mesafe kat edebileceğini gösterir. Günlük kullanım alışkanlıklarınızı ve tipik seyahat mesafelerinizi değerlendirin. Günlük işe gidiş geliş mesafeniz kısa ise, düşük menzilli bir araç yeterli olabilir. Ancak, sık sık uzun yolculuklar yapıyorsanız, daha uzun menzilli bir araç veya hızlı şarj özelliği olan bir model düşünmelisiniz.</p>

      <h2>Batarya Sağlığı (İkinci El Araçlar İçin)</h2>
      <p>İkinci el bir elektrikli araç alıyorsanız, batarya sağlığını kontrol etmek çok önemlidir. Batarya sağlığı, aracın orijinal menzilinin ne kadarını koruduğunu gösterir. %80'in üzerinde bir batarya sağlığı iyi bir değerdir. Bazı araçlarda batarya sağlığı aracın bilgi ekranından kontrol edilebilir, diğerleri için bir teknisyene ihtiyacınız olabilir.</p>

      <h2>Şarj Seçenekleri</h2>
      <p>Aracınızı nerede ve nasıl şarj edeceğinizi düşünün. Evde bir garajınız veya özel park alanınız varsa, ev şarj istasyonu kurabilirsiniz. Apartman dairesinde yaşıyorsanız veya sokakta park ediyorsanız, halka açık şarj istasyonlarına erişiminiz olup olmadığını kontrol edin. Ayrıca, aracın desteklediği şarj türlerini (AC, DC hızlı şarj, vb.) ve şarj hızlarını da göz önünde bulundurun.</p>

      <h2>Toplam Sahip Olma Maliyeti</h2>
      <p>Elektrikli araçların satın alma fiyatı genellikle geleneksel araçlardan yüksektir, ancak işletme maliyetleri daha düşüktür. Elektrik maliyeti, vergi avantajları, bakım maliyetleri ve potansiyel değer kaybını hesaba katarak toplam sahip olma maliyetini değerlendirin.</p>

      <h2>Özellikler ve Teknoloji</h2>
      <p>Elektrikli araçlar genellikle teknolojik özellikleri ile öne çıkar. Sürüş destek sistemleri, infotainment özellikleri ve uzaktan kontrol gibi özelliklerin ihtiyaçlarınıza uygun olup olmadığını değerlendirin.</p>

      <h2>Deneme Sürüşü</h2>
      <p>Elektrikli araçlar, içten yanmalı motorlu araçlardan farklı bir sürüş deneyimi sunar. Hızlı ivmelenme, sessiz çalışma ve rejeneratif frenleme gibi özelliklere alışmak için mutlaka deneme sürüşü yapın.</p>

      <h2>Garanti</h2>
      <p>Elektrikli araçların batarya garantilerine özellikle dikkat edin. Çoğu üretici, 8 yıl veya 160,000 km gibi uzun batarya garantileri sunar.</p>

      <h2>Servis ve Yedek Parça</h2>
      <p>Elektrikli aracınızı servis edebilecek yetkili servis noktalarının varlığını ve yedek parça bulunabilirliğini kontrol edin.</p>

      <p>Bu faktörleri değerlendirerek, ihtiyaçlarınıza ve bütçenize en uygun elektrikli aracı bulabilirsiniz.</p>
    `,
    author: 'Deniz Şahin',
    authorTitle: 'Otomotiv Gazetecisi',
    publishDate: '2024-04-01',
    coverImage: 'https://placehold.co/1200x800/ECEFF1/263238?text=Elektrikli+Araç+Alma+Rehberi',
    tags: ['satın alma rehberi', 'elektrikli araçlar', 'ipuçları', 'menzil', 'batarya'],
    readTimeMinutes: 8
  }
];

// Tüm blog yazılarını getir
export const getAllBlogPosts = () => {
  return blogPosts;
};

// ID'ye göre blog yazısı getir
export const getBlogPostById = (id: string) => {
  return blogPosts.find(post => post.id === id) || null;
};

// Blog yazılarını filtreleme
export const filterBlogPosts = (searchTerm: string = '', tag: string = '') => {
  let filteredPosts = [...blogPosts];
  
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.summary.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower)
    );
  }
  
  if (tag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.includes(tag)
    );
  }
  
  return filteredPosts;
};

// Benzersiz etiketleri getir
export const getUniqueTags = () => {
  const allTags: string[] = [];
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });
  return allTags.sort();
};

// Benzer blog yazılarını getir
export const getSimilarPosts = (postId: string, limit: number = 3) => {
  const currentPost = getBlogPostById(postId);
  if (!currentPost) return [];
  
  // Etiket benzerliğine göre filtreleme
  const otherPosts = blogPosts.filter(post => post.id !== postId);
  
  // Her yazı için benzerlik puanı hesapla (ortak etiket sayısı)
  const postsWithSimilarity = otherPosts.map(post => {
    const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    return {
      ...post,
      similarityScore: commonTags.length
    };
  });
  
  // Benzerlik puanına göre sırala ve limit kadar döndür
  return postsWithSimilarity
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit);
};

// Blog yazısı ekle (admin için)
export const addBlogPost = (postData: Omit<BlogPost, 'id' | 'publishDate'>) => {
  const newPost: BlogPost = {
    ...postData,
    id: `post-${Date.now()}`,
    publishDate: new Date().toISOString().split('T')[0]
  };
  
  blogPosts.push(newPost);
  return newPost;
};

// Blog yazısı güncelle (admin için)
export const updateBlogPost = (id: string, postData: Partial<BlogPost>) => {
  const postIndex = blogPosts.findIndex(post => post.id === id);
  
  if (postIndex !== -1) {
    blogPosts[postIndex] = { ...blogPosts[postIndex], ...postData };
    return blogPosts[postIndex];
  }
  
  return null;
};

// Blog yazısı sil (admin için)
export const deleteBlogPost = (id: string) => {
  const postIndex = blogPosts.findIndex(post => post.id === id);
  
  if (postIndex !== -1) {
    const deletedPost = blogPosts[postIndex];
    blogPosts.splice(postIndex, 1);
    return deletedPost;
  }
  
  return null;
};
