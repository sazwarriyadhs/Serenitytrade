'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Globe, ArrowRight, Ship, Handshake, Leaf } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

// --- Data for i18n ---
const languages = [
  { value: 'en', label: 'English (USD)' },
  { value: 'id', label: 'Bahasa Indonesia (IDR)' },
  { value: 'fr', label: 'Français (EUR)' },
  { value: 'zh', label: '中文 (CNY)' },
  { value: 'ar', label: 'العربية (SAR)' },
  { value: 'ja', label: '日本語 (JPY)' },
  { value: 'pt', label: 'Português (BRL)' },
]

const translations = {
  en: {
    // Nav
    login: 'Login',
    signUp: 'Sign Up',
    // Hero
    heroTitle: 'Connecting Global Agriculture Trade',
    heroSubtitle: 'The trusted B2B marketplace for farmers, exporters, and buyers to trade agricultural commodities with confidence and transparency.',
    browseCommodities: 'Browse Commodities',
    registerNow: 'Register Now',
    // Featured
    featuredTitle: 'Featured Commodities',
    featuredSubtitle: 'Explore high-quality products from verified exporters around the world.',
    avocado: 'Hass Avocado',
    avocadoOrigin: 'Origin: Mexico',
    coffee: 'Arabica Coffee',
    coffeeOrigin: 'Origin: Colombia',
    quinoa: 'Royal Quinoa',
    quinoaOrigin: 'Origin: Peru',
    tomatoes: 'Sun-dried Tomatoes',
    tomatoesOrigin: 'Origin: Italy',
    viewAll: 'View All',
    // How it Works
    howItWorksTitle: 'Simple, Transparent, Efficient',
    howItWorksSubtitle: 'A streamlined process from sourcing to delivery.',
    step1Title: 'Find & Negotiate',
    step1Desc: 'Browse a wide catalog of commodities, connect with sellers, and negotiate terms directly on the platform.',
    step2Title: 'Secure & Ship',
    step2Desc: 'Utilize secure payment options like L/C and Escrow. We handle logistics and documentation for smooth shipping.',
    step3Title: 'Receive & Grow',
    step3Desc: 'Receive high-quality products at your destination port and grow your business with reliable supply chains.',
    // Footer
    footerRights: 'All rights reserved.',
  },
  id: {
    // Nav
    login: 'Masuk',
    signUp: 'Daftar',
    // Hero
    heroTitle: 'Menghubungkan Perdagangan Pertanian Global',
    heroSubtitle: 'Marketplace B2B tepercaya bagi petani, eksportir, dan pembeli untuk memperdagangkan komoditas pertanian dengan keyakinan dan transparansi.',
    browseCommodities: 'Jelajahi Komoditas',
    registerNow: 'Daftar Sekarang',
    // Featured
    featuredTitle: 'Komoditas Unggulan',
    featuredSubtitle: 'Jelajahi produk berkualitas tinggi dari eksportir terverifikasi di seluruh dunia.',
    avocado: 'Alpukat Hass',
    avocadoOrigin: 'Asal: Meksiko',
    coffee: 'Kopi Arabika',
    coffeeOrigin: 'Asal: Kolombia',
    quinoa: 'Quinoa Royal',
    quinoaOrigin: 'Asal: Peru',
    tomatoes: 'Tomat Kering',
    tomatoesOrigin: 'Asal: Italia',
    viewAll: 'Lihat Semua',
    // How it Works
    howItWorksTitle: 'Sederhana, Transparan, Efisien',
    howItWorksSubtitle: 'Proses yang disederhanakan dari sumber hingga pengiriman.',
    step1Title: 'Cari & Negosiasi',
    step1Desc: 'Jelajahi katalog komoditas yang luas, terhubung dengan penjual, dan negosiasikan persyaratan langsung di platform.',
    step2Title: 'Aman & Kirim',
    step2Desc: 'Gunakan opsi pembayaran yang aman seperti L/C dan Escrow. Kami menangani logistik dan dokumentasi untuk pengiriman yang lancar.',
    step3Title: 'Terima & Kembangkan',
    step3Desc: 'Terima produk berkualitas tinggi di pelabuhan tujuan Anda dan kembangkan bisnis Anda dengan rantai pasokan yang andal.',
    // Footer
    footerRights: 'Hak cipta dilindungi.',
  },
  fr: {
    login: 'Connexion', signUp: 'S\'inscrire',
    heroTitle: '[Titre en Français]', heroSubtitle: '[Sous-titre en Français]',
    browseCommodities: 'Parcourir', registerNow: 'S\'inscrire',
    featuredTitle: '[Titre des produits en Français]', featuredSubtitle: '[Sous-titre des produits en Français]',
    avocado: 'Avocat Hass', avocadoOrigin: 'Origine: Mexique', coffee: 'Café Arabica', coffeeOrigin: 'Origine: Colombie', quinoa: 'Quinoa Royal', quinoaOrigin: 'Origine: Pérou', tomatoes: 'Tomates séchées', tomatoesOrigin: 'Origine: Italie', viewAll: 'Voir tout',
    howItWorksTitle: '[Titre fonctionnement en Français]', howItWorksSubtitle: '[Sous-titre fonctionnement en Français]',
    step1Title: 'Trouver & Négocier', step1Desc: '[Description étape 1 en Français]',
    step2Title: 'Sécuriser & Expédier', step2Desc: '[Description étape 2 en Français]',
    step3Title: 'Recevoir & Croître', step3Desc: '[Description étape 3 en Français]',
    footerRights: 'Tous droits réservés.',
  },
  zh: {
    login: '登录', signUp: '注册',
    heroTitle: '[中文标题]', heroSubtitle: '[中文副标题]',
    browseCommodities: '浏览商品', registerNow: '立即注册',
    featuredTitle: '[中文特色商品标题]', featuredSubtitle: '[中文特色商品副标题]',
    avocado: '哈斯牛油果', avocadoOrigin: '产地：墨西哥', coffee: '阿拉比卡咖啡', coffeeOrigin: '产地：哥伦比亚', quinoa: '皇家藜麦', quinoaOrigin: '产地：秘鲁', tomatoes: '晒干的西红柿', tomatoesOrigin: '产地：意大利', viewAll: '查看全部',
    howItWorksTitle: '[中文运作方式标题]', howItWorksSubtitle: '[中文运作方式副标题]',
    step1Title: '寻找与谈判', step1Desc: '[中文步骤1描述]',
    step2Title: '安全与运输', step2Desc: '[中文步骤2描述]',
    step3Title: '接收与发展', step3Desc: '[中文步骤3描述]',
    footerRights: '版权所有。',
  },
  ar: {
    login: 'تسجيل الدخول', signUp: 'اشتراك',
    heroTitle: '[العنوان باللغة العربية]', heroSubtitle: '[العنوان الفرعي باللغة العربية]',
    browseCommodities: 'تصفح السلع', registerNow: 'سجل الآن',
    featuredTitle: '[عنوان المنتجات المميزة بالعربية]', featuredSubtitle: '[عنوان فرعي للمنتجات المميزة بالعربية]',
    avocado: 'أفوكادو هاس', avocadoOrigin: 'الأصل: المكسيك', coffee: 'بن أرابيكا', coffeeOrigin: 'الأصل: كولومبيا', quinoa: 'الكينوا الملكية', quinoaOrigin: 'الأصل: بيرو', tomatoes: 'طماطم مجففة', tomatoesOrigin: 'الأصل: إيطاليا', viewAll: 'عرض الكل',
    howItWorksTitle: '[عنوان كيفية العمل بالعربية]', howItWorksSubtitle: '[عنوان فرعي لكيفية العمل بالعربية]',
    step1Title: 'البحث والتفاوض', step1Desc: '[وصف الخطوة 1 بالعربية]',
    step2Title: 'التأمين والشحن', step2Desc: '[وصف الخطوة 2 بالعربية]',
    step3Title: 'الاستلام والنمو', step3Desc: '[وصف الخطوة 3 بالعربية]',
    footerRights: 'كل الحقوق محفوظة.',
  },
  ja: {
    login: 'ログイン', signUp: '登録',
    heroTitle: '[日本語のタイトル]', heroSubtitle: '[日本語のサブタイトル]',
    browseCommodities: '商品を見る', registerNow: '今すぐ登録',
    featuredTitle: '[日本語の注目商品タイトル]', featuredSubtitle: '[日本語の注目商品サブタイトル]',
    avocado: 'ハスアボカド', avocadoOrigin: '原産地: メキシコ', coffee: 'アラビカコーヒー', coffeeOrigin: '原産地: コロンビア', quinoa: 'ロイヤルキヌア', quinoaOrigin: '原産地: ペルー', tomatoes: 'サンドライトマト', tomatoesOrigin: '原産地: イタリア', viewAll: 'すべて表示',
    howItWorksTitle: '[日本語の仕組みタイトル]', howItWorksSubtitle: '[日本語の仕組みサブタイトル]',
    step1Title: '検索と交渉', step1Desc: '[日本語のステップ1説明]',
    step2Title: '確保と発送', step2Desc: '[日本語のステップ2説明]',
    step3Title: '受け取りと成長', step3Desc: '[日本語のステップ3説明]',
    footerRights: '無断複写・転載を禁じます。',
  },
  pt: {
    login: 'Entrar', signUp: 'Registrar',
    heroTitle: '[Título em Português]', heroSubtitle: '[Subtítulo em Português]',
    browseCommodities: 'Procurar Commodities', registerNow: 'Registre-se Agora',
    featuredTitle: '[Título de Produtos em Destaque em Português]', featuredSubtitle: '[Subtítulo de Produtos em Destaque em Português]',
    avocado: 'Abacate Hass', avocadoOrigin: 'Origem: México', coffee: 'Café Arábica', coffeeOrigin: 'Origem: Colômbia', quinoa: 'Quinoa Real', quinoaOrigin: 'Origem: Peru', tomatoes: 'Tomate Seco', tomatoesOrigin: 'Origem: Itália', viewAll: 'Ver Todos',
    howItWorksTitle: '[Título de Como Funciona em Português]', howItWorksSubtitle: '[Subtítulo de Como Funciona em Português]',
    step1Title: 'Encontrar & Negociar', step1Desc: '[Descrição do Passo 1 em Português]',
    step2Title: 'Segurança & Envio', step2Desc: '[Descrição do Passo 2 em Português]',
    step3Title: 'Receber & Crescer', step3Desc: '[Descrição do Passo 3 em Português]',
    footerRights: 'Todos os direitos reservados.',
  }
}

const featuredCommodities = [
  { id: 'avocado', nameKey: 'avocado', originKey: 'avocadoOrigin', image: 'https://placehold.co/600x400.png', imageHint: 'avocado fruit' },
  { id: 'coffee', nameKey: 'coffee', originKey: 'coffeeOrigin', image: 'https://placehold.co/600x400.png', imageHint: 'coffee beans' },
  { id: 'quinoa', nameKey: 'quinoa', originKey: 'quinoaOrigin', image: 'https://placehold.co/600x400.png', imageHint: 'quinoa seeds' },
  { id: 'tomatoes', nameKey: 'tomatoes', originKey: 'tomatoesOrigin', image: 'https://placehold.co/600x400.png', imageHint: 'dried tomatoes' },
];

const howItWorksSteps = [
    { icon: Handshake, titleKey: 'step1Title', descKey: 'step1Desc' },
    { icon: Ship, titleKey: 'step2Title', descKey: 'step2Desc' },
    { icon: Leaf, titleKey: 'step3Title', descKey: 'step3Desc' },
]

const bannerImages = [
  { src: '/images/pangan/banner-1.png', alt: 'Fresh agricultural produce being harvested', hint: 'agriculture harvest field' },
  { src: '/images/pangan/banner-2.png', alt: 'Global trade and logistics with shipping containers', hint: 'shipping containers port' },
  { src: '/images/pangan/banner-3.png', alt: 'Farmer smiling in a field of crops', hint: 'farmer smiling field' }
]

export default function LandingPage() {
    const [lang, setLang] = useState('en');
    const t = translations[lang as keyof typeof translations];
    const plugin = useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
    )
    
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <Select onValueChange={setLang} defaultValue="en">
                            <SelectTrigger className="w-auto gap-2 border-0 focus:ring-0">
                                <Globe className="h-4 w-4" />
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map(l => (
                                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="hidden sm:flex gap-2">
                             <Button variant="ghost" asChild>
                                <Link href="/login">{t.login}</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">{t.signUp}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative w-full h-[60vh] md:h-[70vh] group">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full h-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        opts={{
                          loop: true,
                        }}
                    >
                        <CarouselContent>
                            {bannerImages.map((img, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={img.hint}
                                            priority={index === 0}
                                        />
                                        <div className="absolute inset-0 bg-black/50" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Carousel>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-4">
                        <h1 className="text-4xl font-bold tracking-tight font-headline md:text-6xl drop-shadow-lg">{t.heroTitle}</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg drop-shadow-md">{t.heroSubtitle}</p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button size="lg" asChild>
                                <Link href="/commodities">{t.browseCommodities} <ArrowRight className="ml-2 h-5 w-5"/></Link>
                            </Button>
                             <Button size="lg" variant="secondary" asChild>
                                <Link href="/register">{t.registerNow}</Link>
                            </Button>
                        </div>
                    </div>
                </section>
                
                {/* Featured Commodities Section */}
                <section className="py-20 bg-secondary/50">
                    <div className="container">
                        <div className="text-center">
                             <h2 className="text-3xl font-bold font-headline">{t.featuredTitle}</h2>
                            <p className="mt-2 text-muted-foreground">{t.featuredSubtitle}</p>
                        </div>
                        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredCommodities.map(item => (
                                <Card key={item.id} className="overflow-hidden">
                                     <CardHeader className="p-0">
                                         <Image src={item.image} alt={t[item.nameKey as keyof typeof t]} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={item.imageHint} />
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <CardTitle className="text-lg font-headline">{t[item.nameKey as keyof typeof t]}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{t[item.originKey as keyof typeof t]}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                             <Button variant="outline" asChild>
                                <Link href="/commodities">{t.viewAll}</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                 {/* How It Works Section */}
                 <section className="py-20">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold font-headline">{t.howItWorksTitle}</h2>
                            <p className="mt-2 text-muted-foreground">{t.howItWorksSubtitle}</p>
                        </div>
                        <div className="mt-12 grid gap-10 md:grid-cols-3">
                           {howItWorksSteps.map((step, index) => (
                               <div key={index} className="text-center">
                                    <div className="flex justify-center items-center mx-auto h-16 w-16 rounded-full bg-primary/10 text-primary">
                                       <step.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold font-headline">{t[step.titleKey as keyof typeof t]}</h3>
                                    <p className="mt-2 text-muted-foreground">{t[step.descKey as keyof typeof t]}</p>
                               </div>
                           ))}
                        </div>
                    </div>
                 </section>
            </main>

            {/* Footer */}
            <footer className="border-t">
                <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
                    <Logo />
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Serenity AgriExport Hub. {t.footerRights}
                    </p>
                </div>
            </footer>
        </div>
    )
}
