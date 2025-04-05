import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Car, Heart, Settings, Lock, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { getCurrentUser, getUserListings, getUserFavorites, updateUserProfile, updatePassword } from '@/services/userService';
import { toast } from '@/components/ui/use-toast';

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

const ProfileManagement = ({ user: propUser, listings: propListings, favorites: propFavorites }: ProfileManagementProps) => {
  // State for user data
  const [user, setUser] = useState(propUser || {
    id: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    avatarUrl: '',
    joinDate: '',
  });
  
  const [listings, setListings] = useState(propListings || []);
  const [favorites, setFavorites] = useState(propFavorites || []);
  
  // Password change state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    location: user.location || '',
  });

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Fetch data if not provided via props
  useEffect(() => {
    if (!propUser) {
      const userData = getCurrentUser();
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        location: userData.location || '',
      });
    }
    
    if (!propListings) {
      const userListings = getUserListings();
      setListings(userListings);
    }
    
    if (!propFavorites) {
      const userFavorites = getUserFavorites();
      setFavorites(userFavorites);
    }
  }, [propUser, propListings, propFavorites]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [id.replace('password-', '')]: value
    }));
    
    // Calculate password strength
    if (id === 'password-new') {
      calculatePasswordStrength(value);
    }
  };
  
  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    // Simple password strength calculator
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 20;
    
    setPasswordStrength(strength);
  };
  
  // Get strength color based on score
  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 80) return 'bg-orange-500';
    return 'bg-green';
  };
  
  // Handle profile save
  const handleProfileSave = () => {
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Geçersiz e-posta adresi",
        description: "Lütfen geçerli bir e-posta adresi girin.",
        variant: "destructive",
      });
      return;
    }
    
    // Update profile
    const result = updateUserProfile(user.id, formData);
    
    if (result.success) {
      setUser({
        ...user,
        ...formData
      });
      setIsEditing(false);
      toast({
        title: "Profil güncellendi",
        description: "Bilgileriniz başarıyla güncellendi.",
      });
    } else {
      toast({
        title: "Hata",
        description: "Profil güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };
  
  // Handle password update
  const handlePasswordUpdate = () => {
    // Validate passwords
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Şifreler eşleşmiyor",
        description: "Yeni şifre ve şifre onayı aynı olmalıdır.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwords.new.length < 8) {
      toast({
        title: "Şifre çok kısa",
        description: "Şifreniz en az 8 karakter uzunluğunda olmalıdır.",
        variant: "destructive",
      });
      return;
    }
    
    // Update password
    const result = updatePassword(user.id, passwords.current, passwords.new);
    
    if (result.success) {
      setPasswords({
        current: '',
        new: '',
        confirm: '',
      });
      setPasswordStrength(0);
      toast({
        title: "Şifre güncellendi",
        description: result.message || "Şifreniz başarıyla güncellendi.",
      });
    } else {
      toast({
        title: "Hata",
        description: "Şifre güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };
  
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={user.avatarUrl || 'https://i.pravatar.cc/150?u=default'} 
                alt={user.name} 
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
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.location}</p>
            <p className="text-gray-500 text-xs">Üyelik: {formatDate(user.joinDate || '2023-01-01')}</p>
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
                        <Input 
                          id="name" 
                          value={formData.name} 
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input 
                          id="email" 
                          value={formData.email} 
                          onChange={handleInputChange}
                          type="email" 
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input 
                          id="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Konum</Label>
                        <Input 
                          id="location" 
                          value={formData.location} 
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isEditing ? (
                      <div className="flex gap-2 ml-auto">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          İptal
                        </Button>
                        <Button className="bg-green hover:bg-green/90" onClick={handleProfileSave}>
                          Değişiklikleri Kaydet
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="ml-auto bg-green hover:bg-green/90"
                        onClick={() => setIsEditing(true)}
                      >
                        Düzenle
                      </Button>
                    )}
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
                      {listings.length > 0 ? (
                        listings.map(listing => (
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
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          Henüz ilan oluşturmadınız.
                        </div>
                      )}
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
                      {favorites.length > 0 ? (
                        favorites.map(favorite => (
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
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8 text-gray-500">
                          Henüz favori ilan eklemediniz.
                        </div>
                      )}
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
                        <Label htmlFor="password-current">Mevcut Şifre</Label>
                        <Input 
                          id="password-current" 
                          type="password" 
                          value={passwords.current}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-new">Yeni Şifre</Label>
                        <Input 
                          id="password-new" 
                          type="password" 
                          value={passwords.new}
                          onChange={handlePasswordChange}
                        />
                        {passwords.new && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Şifre Gücü</span>
                              <span>{passwordStrength}%</span>
                            </div>
                            <Progress 
                              value={passwordStrength} 
                              className="h-1" 
                              indicatorClassName={getStrengthColor()}
                            />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-confirm">Şifreyi Onayla</Label>
                        <Input 
                          id="password-confirm" 
                          type="password" 
                          value={passwords.confirm}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <Button 
                        className="mt-2 bg-green hover:bg-green/90"
                        onClick={handlePasswordUpdate}
                        disabled={!passwords.current || !passwords.new || !passwords.confirm}
                      >
                        Şifreyi Güncelle
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
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
                    
                    <Separator />
                    
                    <div className="space-y-4">
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
  );
};

export default ProfileManagement;
