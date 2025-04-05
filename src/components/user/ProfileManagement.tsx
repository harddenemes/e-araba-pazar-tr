
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Car, Heart, Settings, Lock, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface ProfileManagementProps {
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatarUrl?: string;
    joinDate: string;
  };
  listings?: Array<{
    id: string;
    title: string;
    status: 'active' | 'pending' | 'sold' | 'suspended';
    views: number;
    likes: number;
    createdAt: string;
  }>;
  favorites?: Array<{
    id: string;
    title: string;
    price: number;
    imageUrl: string;
  }>;
}

const ProfileManagement = ({ user, listings = [], favorites = [] }: ProfileManagementProps) => {
  // In a real application, these would come from an API or authentication context
  const demoUser = user || {
    id: '1',
    name: 'Demo Kullanıcı',
    email: 'demo@example.com',
    phone: '555-123-4567',
    location: 'İstanbul, Türkiye',
    avatarUrl: 'https://i.pravatar.cc/150?u=demo',
    joinDate: '2023-01-15',
  };

  const demoListings = listings.length ? listings : [
    {
      id: '101',
      title: 'Tesla Model 3 2022',
      status: 'active' as const,
      views: 145,
      likes: 24,
      createdAt: '2024-03-10',
    },
    {
      id: '102',
      title: 'Porsche Taycan 2021',
      status: 'sold' as const,
      views: 203,
      likes: 37,
      createdAt: '2024-02-22',
    },
  ];

  const demoFavorites = favorites.length ? favorites : [
    {
      id: '201',
      title: 'BMW i4 2023',
      price: 1250000,
      imageUrl: 'https://placehold.co/600x400/ECEFF1/263238?text=BMW+i4',
    },
    {
      id: '202',
      title: 'Audi e-tron GT 2022',
      price: 2450000,
      imageUrl: 'https://placehold.co/600x400/ECEFF1/263238?text=Audi+e-tron',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green text-white';
      case 'pending': return 'bg-orange text-white';
      case 'sold': return 'bg-blue text-white';
      case 'suspended': return 'bg-red-500 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('tr-TR').format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR').format(price);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="relative mb-4">
                <img 
                  src={demoUser.avatarUrl} 
                  alt={demoUser.name} 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Settings size={16} />
                </Button>
              </div>
              <h2 className="text-xl font-bold">{demoUser.name}</h2>
              <p className="text-gray-600 text-sm">{demoUser.location}</p>
              <p className="text-gray-500 text-xs">Üyelik: {formatDate(demoUser.joinDate)}</p>
            </div>
            
            <div className="md:w-3/4">
              <Tabs defaultValue="profile">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="profile">
                    <User size={16} className="mr-2" />
                    <span className="hidden sm:inline">Profil</span>
                  </TabsTrigger>
                  <TabsTrigger value="listings">
                    <Car size={16} className="mr-2" />
                    <span className="hidden sm:inline">İlanlarım</span>
                  </TabsTrigger>
                  <TabsTrigger value="favorites">
                    <Heart size={16} className="mr-2" />
                    <span className="hidden sm:inline">Favorilerim</span>
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <Lock size={16} className="mr-2" />
                    <span className="hidden sm:inline">Güvenlik</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profil Bilgileri</CardTitle>
                      <CardDescription>
                        Kişisel bilgilerinizi güncelleyebilirsiniz.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ad Soyad</Label>
                          <Input id="name" defaultValue={demoUser.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-posta</Label>
                          <Input id="email" defaultValue={demoUser.email} type="email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefon</Label>
                          <Input id="phone" defaultValue={demoUser.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Konum</Label>
                          <Input id="location" defaultValue={demoUser.location} />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto bg-green hover:bg-green/90">
                        Değişiklikleri Kaydet
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="listings">
                  <Card>
                    <CardHeader>
                      <CardTitle>İlanlarım</CardTitle>
                      <CardDescription>
                        Tüm ilanlarınızı buradan yönetebilirsiniz.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {demoListings.map(listing => (
                          <div 
                            key={listing.id}
                            className="border rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{listing.title}</h3>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(listing.status)}`}>
                                  {listing.status === 'active' ? 'Aktif' : 
                                   listing.status === 'pending' ? 'Onay Bekliyor' :
                                   listing.status === 'sold' ? 'Satıldı' : 'Askıya Alındı'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                <span>Eklenme: {formatDate(listing.createdAt)}</span>
                                <span className="mx-2">•</span>
                                <span>{listing.views} görüntüleme</span>
                                <span className="mx-2">•</span>
                                <span>{listing.likes} beğeni</span>
                              </div>
                            </div>
                            <div className="flex gap-2 self-end md:self-center">
                              <Button variant="outline" size="sm">Düzenle</Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Kaldır</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-green hover:bg-green/90">
                        Yeni İlan Ekle
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="favorites">
                  <Card>
                    <CardHeader>
                      <CardTitle>Favorilerim</CardTitle>
                      <CardDescription>
                        Favori ilanlarınız burada listelenir.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {demoFavorites.map(favorite => (
                          <div 
                            key={favorite.id}
                            className="border rounded-md overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <img 
                              src={favorite.imageUrl} 
                              alt={favorite.title} 
                              className="w-full h-36 object-cover"
                            />
                            <div className="p-3">
                              <h3 className="font-medium">{favorite.title}</h3>
                              <p className="text-green font-bold mt-1">{formatPrice(favorite.price)} ₺</p>
                              <div className="flex justify-between mt-3">
                                <Button variant="outline" size="sm">İncele</Button>
                                <Button variant="outline" size="sm">
                                  <Heart size={16} className="text-red-500 fill-red-500" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Güvenlik Ayarları</CardTitle>
                      <CardDescription>
                        Şifrenizi değiştirebilir ve güvenlik ayarlarınızı yönetebilirsiniz.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Şifre Değiştir</h3>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Mevcut Şifre</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Yeni Şifre</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Şifreyi Onayla</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="mt-2 bg-green hover:bg-green/90">
                          Şifreyi Güncelle
                        </Button>
                      </div>
                      
                      <div className="border-t pt-6 space-y-4">
                        <h3 className="font-medium">İki Faktörlü Kimlik Doğrulama</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Hesabınızı daha güvenli hale getirmek için iki faktörlü kimlik doğrulamayı etkinleştirin.
                            </p>
                          </div>
                          <Button variant="outline">Etkinleştir</Button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6 space-y-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <ShieldAlert size={18} className="text-orange" />
                          Hesap Güvenliği
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Hesabınızı kalıcı olarak silmek istiyor musunuz?
                            </p>
                            <p className="text-xs text-red-500 mt-1">
                              Bu işlem geri alınamaz ve tüm verileriniz silinecektir.
                            </p>
                          </div>
                          <Button variant="outline" className="text-red-500 hover:text-red-600 border-red-200">
                            Hesabı Sil
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
