
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Globe, ArrowRight, Ship, Handshake, Leaf, ArrowUp, ArrowDown, FileText } from 'lucide-react'
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
    banner1Title: 'Connecting Global Agriculture Trade',
    banner1Subtitle: 'The trusted B2B marketplace for farmers, exporters, and buyers to trade agricultural commodities with confidence and transparency.',
    banner2Title: 'From Farm to Global Market',
    banner2Subtitle: 'Empowering local farmers by connecting their harvest with international buyers, ensuring quality and fair trade.',
    banner3Title: 'Seamless & Secure Logistics',
    banner3Subtitle: 'We handle the complexities of global shipping and documentation, so you can focus on your business.',
    banner4Title: 'Quality You Can Depend On',
    banner4Subtitle: 'Access a diverse range of high-quality agricultural products, sourced directly from verified and sustainable farms.',
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
    // Real-time prices
    realTimePricesTitle: 'Global Commodity Prices',
    realTimePricesSubtitle: 'Real-time price movements from global markets.',
    pricePerUnit: 'Price/Ton',
    dayChange: '24h Change',
    // Legal Basis
    legalBasisTitle: 'Legal Basis',
    legalBasisDesc: 'Our platform adheres to the latest food export and import regulations from the Indonesian government. Access a comprehensive list of regulations to ensure your trade compliance.',
    legalBasisButton: 'View Regulation Directory',
    // Footer
    footerRights: 'All rights reserved.',
  },
  id: {
    // Nav
    login: 'Masuk',
    signUp: 'Daftar',
    // Hero
    banner1Title: 'Menghubungkan Perdagangan Pertanian Global',
    banner1Subtitle: 'Marketplace B2B tepercaya bagi petani, eksportir, dan pembeli untuk memperdagangkan komoditas pertanian dengan keyakinan dan transparansi.',
    banner2Title: 'Dari Ladang ke Pasar Global',
    banner2Subtitle: 'Memberdayakan petani lokal dengan menghubungkan hasil panen mereka kepada pembeli internasional, menjamin kualitas dan perdagangan yang adil.',
    banner3Title: 'Logistik yang Mulus & Aman',
    banner3Subtitle: 'Kami menangani kerumitan pengiriman dan dokumentasi global, sehingga Anda dapat fokus pada bisnis Anda.',
    banner4Title: 'Kualitas yang Dapat Diandalkan',
    banner4Subtitle: 'Akses beragam produk pertanian berkualitas tinggi, yang bersumber langsung dari pertanian terverifikasi dan berkelanjutan.',
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
    // Real-time prices
    realTimePricesTitle: 'Harga Komoditas Global',
    realTimePricesSubtitle: 'Pergerakan harga real-time dari pasar global.',
    pricePerUnit: 'Harga/Ton',
    dayChange: 'Perubahan 24j',
    // Legal Basis
    legalBasisTitle: 'Dasar Hukum',
    legalBasisDesc: 'Platform kami mematuhi peraturan ekspor dan impor pangan terbaru dari pemerintah Indonesia. Akses daftar peraturan yang komprehensif untuk memastikan kepatuhan perdagangan Anda.',
    legalBasisButton: 'View Regulation Directory',
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
    realTimePricesTitle: 'Prix Mondiaux des Matières Premières', realTimePricesSubtitle: 'Mouvements des prix en temps réel sur les marchés mondiaux.', pricePerUnit: 'Prix/Tonne', dayChange: 'Chg 24h',
    legalBasisTitle: '[Titre Légal]', legalBasisDesc: '[Description Légal]', legalBasisButton: '[Bouton Légal]',
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
    realTimePricesTitle: '全球商品价格', realTimePricesSubtitle: '全球市场的实时价格变动。', pricePerUnit: '价格/吨', dayChange: '24小时变化',
    legalBasisTitle: '[法律依据]', legalBasisDesc: '[法律依据说明]', legalBasisButton: '[查看法规目录]',
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
    realTimePricesTitle: 'أسعار السلع العالمية', realTimePricesSubtitle: 'تحركات الأسعار في الوقت الفعلي من الأسواق العالمية.', pricePerUnit: 'السعر/طن', dayChange: 'تغير 24 ساعة',
    legalBasisTitle: '[الأساس القانوني]', legalBasisDesc: '[وصف الأساس القانوني]', legalBasisButton: '[عرض دليل التنظيم]',
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
    realTimePricesTitle: '世界の商品の価格', realTimePricesSubtitle: '世界市場からのリアルタイムの価格変動。', pricePerUnit: '価格/トン', dayChange: '24時間変動',
    legalBasisTitle: '[法的根拠]', legalBasisDesc: '[法的根拠の説明]', legalBasisButton: '[規制ディレクトリの表示]',
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
    realTimePricesTitle: 'Preços Globais de Commodities', realTimePricesSubtitle: 'Movimentos de preços em tempo real dos mercados globais.', pricePerUnit: 'Preço/Ton', dayChange: 'Mudança 24h',
    legalBasisTitle: '[Base Legal]', legalBasisDesc: '[Descrição da Base Legal]', legalBasisButton: '[Ver Diretório de Regulamentação]',
    footerRights: 'Todos os direitos reservados.',
  }
}

const heroSlides = [
  {
    titleKey: 'banner1Title',
    subtitleKey: 'banner1Subtitle',
    image: '/images/Hass Avocado.png',
    imageHint: 'global trade'
  },
  {
    titleKey: 'banner2Title',
    subtitleKey: 'banner2Subtitle',
    image: '/images/Arabica Coffee.png',
    imageHint: 'farm market'
  },
  {
    titleKey: 'banner3Title',
    subtitleKey: 'banner3Subtitle',
    image: '/images/Royal Quinoa.png',
    imageHint: 'shipping logistics'
  },
  {
    titleKey: 'banner4Title',
    subtitleKey: 'banner4Subtitle',
    image: '/images/Sun-dried Tomatoes.png',
    imageHint: 'quality produce'
  },
];

const featuredCommodities = [
  { id: 'avocado', nameKey: 'avocado', originKey: 'avocadoOrigin', image: '/images/Hass Avocado.png', imageHint: 'avocado fruit' },
  { id: 'coffee', nameKey: 'coffee', originKey: 'coffeeOrigin', image: '/images/Arabica Coffee.png', imageHint: 'coffee beans' },
  { id: 'quinoa', nameKey: 'quinoa', originKey: 'quinoaOrigin', image: '/images/Royal Quinoa.png', imageHint: 'quinoa seeds' },
  { id: 'tomatoes', nameKey: 'tomatoes', originKey: 'tomatoesOrigin', image: '/images/Sun-dried Tomatoes.png', imageHint: 'dried tomatoes' },
];

const howItWorksSteps = [
    { icon: Handshake, titleKey: 'step1Title', descKey: 'step1Desc' },
    { icon: Ship, titleKey: 'step2Title', descKey: 'step2Desc' },
    { icon: Leaf, titleKey: 'step3Title', descKey: 'step3Desc' },
]

const commodityPrices = [
  { name: 'Wheat (Chicago)', price: 420.50, change: '+1.25%', trend: 'up' },
  { name: 'Corn (CBOT)', price: 355.75, change: '-0.80%', trend: 'down' },
  { name: 'Soybeans (CBOT)', price: 1350.25, change: '+2.15%', trend: 'up' },
  { name: 'Arabica Coffee (ICE)', price: 1850.30, change: '-0.50%', trend: 'down' },
  { name: 'Palm Oil (Bursa)', price: 3900.00, change: '+0.75%', trend: 'up' },
  { name: 'Sugar (ICE)', price: 550.00, change: '+0.15%', trend: 'up' },
];


export default function LandingPage() {
    const [lang, setLang] = useState('en');
    const [showSplash, setShowSplash] = useState(true);
    const t = translations[lang as keyof typeof translations];
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    if (showSplash) {
        return (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background">
                <div className="animate-pulse">
                    <Logo size="large" />
                </div>
            </div>
        );
    }
    
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
                <section className="relative w-full">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full"
                        opts={{ loop: true }}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {heroSlides.map((slide, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative w-full h-[60vh] md:h-[70vh]">
                                        <Image
                                            src={slide.image}
                                            alt={t[slide.titleKey as keyof typeof t]}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={slide.imageHint}
                                            priority={index === 0}
                                        />
                                        <div className="absolute inset-0 bg-black/50" />
                                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
                                            <h1 className="text-4xl font-bold tracking-tight font-headline md:text-6xl drop-shadow-lg">{t[slide.titleKey as keyof typeof t]}</h1>
                                            <p className="mt-4 max-w-2xl mx-auto text-lg drop-shadow-md">{t[slide.subtitleKey as keyof typeof t]}</p>
                                            <div className="mt-8 flex justify-center gap-4">
                                                <Button size="lg" asChild>
                                                    <Link href="/commodities">{t.browseCommodities} <ArrowRight className="ml-2 h-5 w-5"/></Link>
                                                </Button>
                                                <Button size="lg" variant="secondary" asChild>
                                                    <Link href="/register">{t.registerNow}</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />
                    </Carousel>
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

                 {/* Global Commodity Prices Section */}
                 <section className="py-20 bg-secondary/50">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold font-headline">{t.realTimePricesTitle}</h2>
                            <p className="mt-2 text-muted-foreground">{t.realTimePricesSubtitle}</p>
                        </div>
                        <div className="mt-10 max-w-4xl mx-auto">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-baseline text-sm text-muted-foreground">
                                        <span>Commodity</span>
                                        <div className="flex gap-8">
                                            <span>{t.pricePerUnit} (USD)</span>
                                            <span>{t.dayChange}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <ul className="space-y-2">
                                        {commodityPrices.map(item => (
                                            <li key={item.name} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                                                <span className="font-medium text-base">{item.name}</span>
                                                <div className="flex items-center gap-8 font-mono">
                                                    <span className="w-24 text-right">{item.price.toFixed(2)}</span>
                                                    <span className={`w-20 text-right font-semibold flex items-center justify-end gap-1 ${item.trend === 'up' ? 'text-green-600' : 'text-destructive'}`}>
                                                        {item.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                                                        {item.change}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                 </section>

                {/* Legal Basis Section */}
                <section className="py-20">
                    <div className="container max-w-4xl mx-auto">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="flex justify-center mb-2">
                                    <FileText className="h-10 w-10 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">{t.legalBasisTitle}</CardTitle>
                                <CardDescription>
                                    {t.legalBasisDesc}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild>
                                    <a href="https://peraturan.bpk.go.id/Download/28501/UU%20Nomor%2018%20Tahun%202012.pdf" target="_blank" rel="noopener noreferrer">
                                        {t.legalBasisButton}
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
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

    