
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, User, Mail, Eye, EyeOff } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Account = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Hata!",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      toast({
        title: "Hata!",
        description: "Lütfen geçerli bir e-posta adresi girin.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would send the login data to an API
    // For now, we'll just show a success message and redirect
    toast({
      title: "Başarılı!",
      description: "Başarıyla giriş yaptınız.",
    });
    
    // Simulate redirect after login
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast({
        title: "Hata!",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      toast({
        title: "Hata!",
        description: "Lütfen geçerli bir e-posta adresi girin.",
        variant: "destructive"
      });
      return;
    }

    // Password validation
    if (registerData.password.length < 8) {
      toast({
        title: "Hata!",
        description: "Şifre en az 8 karakter olmalıdır.",
        variant: "destructive"
      });
      return;
    }

    // Password match validation
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Hata!",
        description: "Şifreler eşleşmiyor.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would send the register data to an API
    // For now, we'll just show a success message and redirect to login
    toast({
      title: "Başarılı!",
      description: "Hesabınız oluşturuldu. Şimdi giriş yapabilirsiniz.",
    });
    
    // Switch to login tab
    setIsLogin(true);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Hesap İşlemleri</h1>
              <p className="text-gray-600">Giriş yapın veya yeni hesap oluşturun</p>
            </div>

            <Tabs defaultValue={isLogin ? "login" : "register"} onValueChange={(value) => setIsLogin(value === "login")}>
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">Giriş Yap</TabsTrigger>
                <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Mail size={18} />
                      </div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="E-posta adresi"
                        className="pl-10"
                        value={loginData.email}
                        onChange={handleLoginChange}
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock size={18} />
                      </div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Şifre"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                      <div 
                        className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="rounded text-green mr-2"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-600">
                          Beni hatırla
                        </label>
                      </div>
                      <a href="#" className="text-sm text-green hover:underline">
                        Şifremi unuttum
                      </a>
                    </div>
                    
                    <Button type="submit" className="w-full bg-green hover:bg-green/90">
                      Giriş Yap
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit}>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <User size={18} />
                      </div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Ad Soyad"
                        className="pl-10"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Mail size={18} />
                      </div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="E-posta adresi"
                        className="pl-10"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock size={18} />
                      </div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Şifre"
                        className="pl-10 pr-10"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                      />
                      <div 
                        className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock size={18} />
                      </div>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Şifre Tekrar"
                        className="pl-10 pr-10"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                      />
                      <div 
                        className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                    
                    {/* Password strength indicator */}
                    {registerData.password && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Şifre gücü</span>
                          <span>
                            {registerData.password.length < 6 ? 'Zayıf' : 
                            registerData.password.length < 10 ? 'Orta' : 'Güçlü'}
                          </span>
                        </div>
                        <div className="h-1 rounded-full bg-gray-200 overflow-hidden">
                          <div 
                            className={`h-full ${
                              registerData.password.length < 6 ? 'bg-red-500 w-1/3' : 
                              registerData.password.length < 10 ? 'bg-orange w-2/3' : 'bg-green w-full'
                            }`}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded text-green mr-2"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        <span>Kullanım şartları</span>nı ve <span>gizlilik politikası</span>nı kabul ediyorum
                      </label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-green hover:bg-green/90">
                      Kayıt Ol
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Henüz hesabınız yok mu? " : "Zaten hesabınız var mı? "}
                <button
                  type="button"
                  className="text-green hover:underline font-medium"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Kayıt Ol" : "Giriş Yap"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
