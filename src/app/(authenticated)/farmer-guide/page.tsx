import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function FarmerGuidePage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Panduan untuk Petani</h1>
        <p className="text-muted-foreground">Informasi penting untuk meningkatkan kualitas panen, pengemasan, dan kemitraan.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Standar Pengemasan Produk Pangan</CardTitle>
          <CardDescription>
            Pahami aspek penting pengemasan untuk menjaga kualitas produk dan menarik minat pasar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-semibold">
                1. Keamanan Pangan (Food Safety)
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Prioritas utama adalah memastikan kemasan tidak membahayakan konsumen.</p>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong className="text-foreground">Bahan Kemasan Aman (Food Grade):</strong> Kemasan harus terbuat dari bahan yang tidak beracun dan tidak melepaskan zat berbahaya ke dalam makanan.
                  </li>
                  <li>
                    <strong className="text-foreground">Mencegah Migrasi Zat Berbahaya:</strong> Pastikan tidak ada senyawa kimia dari bahan kemasan yang berpindah ke dalam produk pangan.
                  </li>
                  <li>
                    <strong className="text-foreground">Perlindungan dari Kontaminasi:</strong> Kemasan harus mampu melindungi produk dari kontaminasi bakteri, jamur, dan benda asing lainnya.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-semibold">
                2. Perlindungan Produk
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Kemasan berfungsi sebagai pelindung utama produk Anda selama distribusi dan penyimpanan.</p>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong className="text-foreground">Bentuk dan Ukuran Sesuai:</strong> Kemasan harus pas dengan produk, tidak terlalu besar atau kecil, serta mudah dibawa dan disimpan.
                  </li>
                  <li>
                    <strong className="text-foreground">Kekuatan Kemasan:</strong> Kemasan harus cukup kuat untuk melindungi produk dari benturan, tekanan, dan kerusakan fisik.
                  </li>
                  <li>
                    <strong className="text-foreground">Kedap Air dan Udara:</strong> Untuk produk tertentu, kemasan kedap air dan udara sangat penting untuk menjaga kualitas, aroma, dan kesegarannya.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base font-semibold">
                3. Daya Tarik Konsumen
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Kemasan adalah "wajah" dari produk Anda di hadapan konsumen.</p>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong className="text-foreground">Informasi Produk Jelas:</strong> Cantumkan informasi penting seperti nama produk, berat bersih, komposisi, tanggal kadaluwarsa, dan asal produk.
                  </li>
                  <li>
                    <strong className="text-foreground">Desain Menarik:</strong> Desain kemasan yang baik dapat menarik perhatian konsumen dan membedakan produk Anda dari kompetitor.
                  </li>
                  <li>
                    <strong className="text-foreground">Label Sertifikasi (Halal/SNI):</strong> Jika produk Anda memiliki sertifikasi, menampilkannya pada kemasan akan meningkatkan kepercayaan konsumen.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base font-semibold">
                4. Standar Lainnya & Contoh Penerapan
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium text-foreground">Standar Tambahan</h4>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                          <li><strong>Kemasan Ramah Lingkungan:</strong> Pertimbangkan penggunaan bahan yang dapat didaur ulang untuk menarik konsumen yang sadar lingkungan.</li>
                          <li><strong>Kemasan Vakum/Aseptik:</strong> Untuk produk tertentu, kemasan ini dapat memperpanjang umur simpan secara signifikan.</li>
                          <li><strong>Kesesuaian dengan Pasar:</strong> Pilih jenis kemasan yang paling sesuai dengan target pasar dan preferensi konsumen.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-foreground">Contoh Penerapan</h4>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                           <li><strong>Produk Sayuran:</strong> Kemasan plastik transparan dengan lubang ventilasi untuk menjaga kesegaran.</li>
                           <li><strong>Produk Biji-bijian:</strong> Kemasan kedap udara dengan lapisan aluminium foil untuk melindungi dari kelembaban dan serangga.</li>
                           <li><strong>Produk Cair:</strong> Botol plastik atau kaca dengan tutup yang rapat dapat digunakan untuk mengemas produk cair seperti susu atau jus.</li>
                        </ul>
                    </div>
                    <p className="pt-4 text-sm font-medium">Dengan menerapkan standar pengemasan yang tepat, petani dapat meningkatkan kualitas, memperpanjang umur simpan, dan menaikkan daya saing produk mereka di pasaran.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
