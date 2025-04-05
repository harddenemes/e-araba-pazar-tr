
// Mock kullanıcı veritabanı
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  joinDate: string;
  passwordHash: string;
}

interface Listing {
  id: string;
  userId: string;
  title: string;
  status: 'active' | 'pending' | 'sold' | 'suspended';
  views: number;
  likes: number;
  createdAt: string;
}

interface Favorite {
  id: string;
  userId: string;
  carId: string;
  title: string;
  price: number;
  imageUrl: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'Demo Kullanıcı',
    email: 'demo@example.com',
    phone: '555-123-4567',
    location: 'İstanbul, Türkiye',
    avatarUrl: 'https://i.pravatar.cc/150?u=demo',
    joinDate: '2023-01-15',
    passwordHash: 'hashed_password'
  }
];

const listings: Listing[] = [
  {
    id: '101',
    userId: '1',
    title: 'Tesla Model 3 2022',
    status: 'active',
    views: 145,
    likes: 24,
    createdAt: '2024-03-10',
  },
  {
    id: '102',
    userId: '1',
    title: 'Porsche Taycan 2021',
    status: 'sold',
    views: 203,
    likes: 37,
    createdAt: '2024-02-22',
  }
];

const favorites: Favorite[] = [
  {
    id: '201',
    userId: '1',
    carId: '301',
    title: 'BMW i4 2023',
    price: 1250000,
    imageUrl: 'https://placehold.co/600x400/ECEFF1/263238?text=BMW+i4',
  },
  {
    id: '202',
    userId: '1',
    carId: '302',
    title: 'Audi e-tron GT 2022',
    price: 2450000,
    imageUrl: 'https://placehold.co/600x400/ECEFF1/263238?text=Audi+e-tron',
  }
];

// User Authentication
export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => u.email === email);
  
  // Gerçek uygulamada şifre hash'i kontrol edilir
  if (user) {
    const { passwordHash, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  }
  
  return { success: false, message: 'Geçersiz e-posta veya şifre' };
};

// Get Current User
export const getCurrentUser = () => {
  // Normalde JWT token veya session'dan kullanıcı alınır
  const { passwordHash, ...userWithoutPassword } = users[0];
  return userWithoutPassword;
};

// Get User Listings
export const getUserListings = (userId: string) => {
  return listings.filter(listing => listing.userId === userId);
};

// Get User Favorites
export const getUserFavorites = (userId: string) => {
  return favorites.filter(favorite => favorite.userId === userId);
};

// Update User Profile
export const updateUserProfile = (userId: string, userData: Partial<User>) => {
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userData };
    const { passwordHash, ...userWithoutPassword } = users[userIndex];
    return { success: true, user: userWithoutPassword };
  }
  
  return { success: false, message: 'Kullanıcı bulunamadı' };
};

// Update Password
export const updatePassword = (userId: string, currentPassword: string, newPassword: string) => {
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    // Gerçek uygulamada şifre hash'i kontrol edilir
    users[userIndex].passwordHash = 'new_hashed_password';
    return { success: true };
  }
  
  return { success: false, message: 'Kullanıcı bulunamadı' };
};

// Add or Remove Favorite
export const toggleFavorite = (userId: string, carId: string, carData?: any) => {
  const existingIndex = favorites.findIndex(f => f.userId === userId && f.carId === carId);
  
  if (existingIndex !== -1) {
    favorites.splice(existingIndex, 1);
    return { success: true, action: 'removed' };
  } else if (carData) {
    favorites.push({
      id: `fav-${Date.now()}`,
      userId,
      carId,
      title: carData.title,
      price: carData.price,
      imageUrl: carData.imageUrl
    });
    return { success: true, action: 'added' };
  }
  
  return { success: false, message: 'İşlem gerçekleştirilemedi' };
};
