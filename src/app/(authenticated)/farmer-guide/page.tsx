
'use client'

import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Loader2 } from 'lucide-react';

const FarmerGuideContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Standar Pengemasan Produk Pertanian</CardTitle>
      <CardDescription>
        Pahami aspek penting pengemasan untuk menjaga kualitas hasil tani dan menarik minat pasar.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base font-semibold">1. Keamanan Pangan (Food Safety)</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">Prioritas utama adalah memastikan kemasan tidak membahayakan konsumen.</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-foreground">Bahan Kemasan Aman (Food Grade):</strong> Gunakan bahan yang tidak beracun dan tidak melepaskan zat berbahaya ke dalam makanan.</li>
              <li><strong className="text-foreground">Mencegah Migrasi Zat Berbahaya:</strong> Pastikan tidak ada senyawa kimia dari bahan kemasan yang berpindah ke dalam produk.</li>
              <li><strong className="text-foreground">Perlindungan dari Kontaminasi:</strong> Kemasan harus melindungi produk dari bakteri, jamur, dan benda asing.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-base font-semibold">2. Perlindungan Produk Pertanian</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">Kemasan berfungsi sebagai pelindung utama hasil tani selama distribusi dan penyimpanan.</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-foreground">Bentuk dan Ukuran Sesuai:</strong> Kemasan harus pas dengan produk, tidak terlalu besar atau kecil.</li>
              <li><strong className="text-foreground">Kekuatan Kemasan:</strong> Kemasan harus kuat untuk melindungi dari benturan, tekanan, dan kerusakan fisik.</li>
              <li><strong className="text-foreground">Sirkulasi Udara:</strong> Untuk sayur dan buah segar, pastikan ada ventilasi untuk mencegah pembusukan.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-base font-semibold">3. Contoh Penerapan untuk Hasil Tani</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
              <ul className="list-disc pl-5 space-y-3">
                 <li><strong className="text-foreground">Sayuran Daun:</strong> Kemasan plastik transparan dengan lubang ventilasi untuk menjaga kesegaran.</li>
                 <li><strong className="text-foreground">Biji-bijian (Beras, Jagung):</strong> Karung plastik atau goni dengan lapisan dalam untuk melindungi dari kelembaban dan serangga.</li>
                 <li><strong className="text-foreground">Umbi-umbian (Kentang, Ubi):</strong> Jaring (waring) atau karung berventilasi untuk sirkulasi udara.</li>
                 <li><strong className="text-foreground">Rempah Kering:</strong> Kemasan kedap udara dan cahaya (kantong foil/botol gelap) untuk menjaga aroma.</li>
                 <li><strong className="text-foreground">Buah-buahan:</strong> Kotak karton dengan sekat atau *pulp tray* untuk mengurangi benturan.</li>
              </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
);

const PeternakGuideContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Standar Produk Peternakan</CardTitle>
        <CardDescription>Panduan untuk menjaga kualitas produk ternak dari peternakan hingga ke tangan eksportir.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-semibold">1. Kesehatan dan Kesejahteraan Hewan</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Kondisi hewan yang baik adalah kunci kualitas produk akhir.</p>
                <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Manajemen Pakan:</strong> Pastikan pakan berkualitas tinggi, bergizi, dan bebas dari kontaminan.</li>
                    <li><strong className="text-foreground">Kandang yang Layak:</strong> Sediakan lingkungan yang bersih, tidak terlalu padat, dengan ventilasi dan suhu yang baik.</li>
                    <li><strong className="text-foreground">Vaksinasi & Biosekuriti:</strong> Lakukan program vaksinasi rutin dan terapkan biosekuriti ketat untuk mencegah penyakit.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-semibold">2. Penanganan Pasca-Produksi</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                 <p className="mb-4">Proses setelah produksi sangat menentukan kualitas dan keamanan produk.</p>
                 <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Rantai Dingin (Cold Chain):</strong> Untuk daging dan susu, jaga suhu tetap dingin (0-4°C) dari pemotongan/pemerahan hingga pengiriman.</li>
                    <li><strong className="text-foreground">Kebersihan (Hygiene):</strong> Terapkan standar kebersihan tinggi pada semua peralatan dan personel.</li>
                    <li><strong className="text-foreground">Sortir Telur:</strong> Lakukan sortir telur berdasarkan ukuran, kebersihan cangkang, dan pastikan tidak ada keretakan.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-semibold">3. Sertifikasi Penting</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                 <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Sertifikat Halal:</strong> Wajib untuk produk daging yang akan diekspor ke negara-negara Muslim.</li>
                    <li><strong className="text-foreground">Nomor Kontrol Veteriner (NKV):</strong> Bukti bahwa unit usaha telah memenuhi standar kelayakan dasar jaminan keamanan pangan.</li>
                     <li><strong className="text-foreground">Sertifikat Bebas Brucellosis:</strong> Diperlukan untuk sapi perah untuk menunjukkan bebas dari penyakit Brucellosis.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
);

const NelayanGuideContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Standar Kualitas Hasil Tangkapan</CardTitle>
        <CardDescription>Panduan bagi nelayan untuk menjaga mutu hasil laut agar memenuhi standar ekspor.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-semibold">1. Penanganan di Atas Kapal</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Kualitas ikan ditentukan sejak pertama kali ditangkap.</p>
                <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Pendinginan Cepat:</strong> Segera dinginkan ikan dengan es curah yang cukup (rasio es dan ikan minimal 1:1) untuk menghambat pertumbuhan bakteri.</li>
                    <li><strong className="text-foreground">Hindari Kontaminasi:</strong> Jaga kebersihan dek kapal. Jangan campur ikan dengan bahan bakar, oli, atau kotoran.</li>
                    <li><strong className="text-foreground">Penanganan yang Baik:</strong> Angkat ikan dengan hati-hati, jangan dilempar atau diinjak untuk menghindari kerusakan fisik.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-semibold">2. Praktik Penangkapan Berkelanjutan</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                 <p className="mb-4">Pasar internasional semakin peduli dengan keberlanjutan sumber daya laut.</p>
                 <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Alat Tangkap Selektif:</strong> Gunakan alat tangkap yang ramah lingkungan dan tidak merusak terumbu karang.</li>
                    <li><strong className="text-foreground">Ukuran Ikan:</strong> Hindari menangkap ikan yang masih kecil (di bawah ukuran layak tangkap).</li>
                    <li><strong className="text-foreground">Sertifikasi "Dolphin Safe":</strong> Penting untuk ekspor tuna, menunjukkan proses penangkapan tidak membahayakan lumba-lumba.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-semibold">3. Dokumen & Persyaratan Ekspor</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                 <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Health Certificate (HC):</strong> Diterbitkan oleh BKIPM, menyatakan produk perikanan aman dan layak konsumsi.</li>
                    <li><strong className="text-foreground">Sertifikat Asal (COO):</strong> Menyatakan negara asal produk untuk keperluan bea cukai.</li>
                    <li><strong className="text-foreground">Hasil Uji Laboratorium:</strong> Beberapa pembeli mungkin meminta hasil uji bebas logam berat atau histamin (untuk tuna).</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
);

const KebunGuideContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Panduan Pengelolaan Hasil Kebun</CardTitle>
        <CardDescription>Praktik terbaik untuk produk perkebunan agar sesuai standar mutu ekspor.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-semibold">1. Praktik Perkebunan yang Baik (GAP)</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Pemilihan Bibit Unggul:</strong> Gunakan bibit yang tahan penyakit dan memiliki produktivitas tinggi.</li>
                    <li><strong className="text-foreground">Manajemen Tanah & Air:</strong> Lakukan pemupukan berimbang dan pengelolaan air yang efisien.</li>
                    <li><strong className="text-foreground">Pengendalian Hama Terpadu:</strong> Prioritaskan metode pengendalian hayati untuk mengurangi residu pestisida.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-semibold">2. Penanganan Pasca-Panen Kunci</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                 <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Kopi & Kakao:</strong> Proses fermentasi dan pengeringan yang terkontrol sangat penting untuk membentuk cita rasa.</li>
                    <li><strong className="text-foreground">Kelapa Sawit:</strong> Tandan Buah Segar (TBS) harus segera diolah (kurang dari 24 jam) untuk menekan kadar Asam Lemak Bebas (ALB).</li>
                    <li><strong className="text-foreground">Rempah-rempah:</strong> Proses pengeringan harus tepat untuk mencapai kadar air di bawah 12% dan mencegah jamur.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-semibold">3. Sertifikasi Standar Global</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                 <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">RSPO (Roundtable on Sustainable Palm Oil):</strong> Standar wajib untuk ekspor minyak sawit ke pasar Eropa dan Amerika.</li>
                    <li><strong className="text-foreground">Rainforest Alliance / UTZ:</strong> Sertifikasi untuk kopi, kakao, dan teh yang menunjukkan praktik pertanian berkelanjutan.</li>
                    <li><strong className="text-foreground">Organic Certification (USDA, EU):</strong> Diperlukan jika produk akan dipasarkan sebagai produk organik.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
);

const HutanGuideContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Panduan Pengelolaan Hasil Hutan</CardTitle>
        <CardDescription>Praktik legal dan berkelanjutan untuk produk hasil hutan yang berorientasi ekspor.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-semibold">1. Legalitas dan Ketertelusuran Kayu</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Pasar global (terutama Eropa, AS, Australia) sangat ketat terhadap isu pembalakan liar.</p>
                <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">SVLK (Sistem Verifikasi Legalitas Kayu):</strong> Wajib dimiliki oleh semua eksportir produk kayu dari Indonesia. Ini adalah jaminan legalitas.</li>
                    <li><strong className="text-foreground">FSC (Forest Stewardship Council):</strong> Sertifikasi sukarela yang diakui secara global sebagai standar tertinggi pengelolaan hutan yang bertanggung jawab.</li>
                    <li><strong className="text-foreground">Chain of Custody (CoC):</strong> Kemampuan untuk melacak asal kayu dari hutan hingga ke produk akhir.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-semibold">2. Hasil Hutan Bukan Kayu (HHBK)</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                 <p className="mb-4">Potensi besar selain kayu yang harus dikelola dengan baik.</p>
                 <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Rotan:</strong> Pastikan rotan dipanen pada usia yang cukup dan telah melalui proses pengawetan yang benar untuk menghindari jamur.</li>
                    <li><strong className="text-foreground">Madu Hutan & Getah:</strong> Pemanenan harus dilakukan tanpa merusak pohon induk untuk keberlanjutan produksi.</li>
                    <li><strong className="text-foreground">Izin Pemanfaatan:</strong> Pastikan memiliki izin yang sah dari otoritas kehutanan setempat untuk memanen HHBK.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-semibold">3. Standar Kualitas & Pengolahan</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                 <ul className="list-disc pl-5 space-y-3">
                    <li><strong className="text-foreground">Pengeringan Kayu (Kiln Dry):</strong> Kayu untuk ekspor harus dikeringkan hingga kadar air 8-12% untuk mencegah retak atau melengkung.</li>
                    <li><strong className="text-foreground">Fumigasi:</strong> Wajib untuk banyak negara tujuan untuk memastikan produk bebas dari hama atau serangga.</li>
                     <li><strong className="text-foreground">Pengolahan Minimal:</strong> Beberapa buyer lebih menyukai bahan baku yang diproses secara minimal untuk diolah lebih lanjut di negara mereka.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
);


const roleGuideMapping: { [key: string]: React.FC } = {
    farmer: FarmerGuideContent,
    peternak: PeternakGuideContent,
    nelayan: NelayanGuideContent,
    pengelola_hasil_kebun: KebunGuideContent,
    pengelola_hasil_hutan: HutanGuideContent,
};

export default function ProducerGuidePage() {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    const GuideComponent = userRole ? roleGuideMapping[userRole] : null;

    return (
        <div className="grid gap-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Panduan untuk Produsen</h1>
                <p className="text-muted-foreground">Informasi penting untuk meningkatkan kualitas produksi, pengemasan, dan kemitraan.</p>
            </div>

            {GuideComponent ? (
                <GuideComponent />
            ) : (
                <Card>
                    <CardContent className="p-6 flex items-center justify-center">
                        {userRole === null ? (
                             <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
                        ) : (
                            <p>Panduan untuk peran Anda tidak tersedia.</p>
                        )}
                       
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

    