
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function ExporterGuidePage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Panduan Lengkap Eksportir</h1>
        <p className="text-muted-foreground">Semua yang perlu Anda ketahui untuk memulai ekspor komoditas Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Panduan Sukses Ekspor</CardTitle>
          <CardDescription>
            Dari persiapan dokumen hingga strategi penjualan, temukan informasi penting di sini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-semibold">
                1. Dokumen Legal Wajib untuk Ekspor
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Pastikan Anda memiliki semua dokumen berikut sebelum memulai proses ekspor untuk kelancaran di bea cukai:</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Invoice & Packing List</h4>
                      <p>Invoice komersial sebagai bukti transaksi dan Packing List yang merinci isi, berat, dan volume kemasan.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Pemberitahuan Ekspor Barang (PEB)</h4>
                      <p>Dokumen pabean yang wajib diajukan ke kantor Bea Cukai sebelum barang dimuat ke kapal/pesawat.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Bill of Lading (B/L) atau Airway Bill (AWB)</h4>
                      <p>Surat bukti pengiriman barang yang dikeluarkan oleh pihak maskapai pelayaran atau penerbangan.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Certificate of Origin (COO) / Surat Keterangan Asal (SKA)</h4>
                      <p>Dokumen yang menyatakan negara asal barang, seringkali dibutuhkan untuk mendapatkan fasilitas bea masuk di negara tujuan.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Sertifikat Karantina (Phytosanitary/Health Certificate)</h4>
                      <p>Wajib untuk produk pertanian dan makanan untuk memastikan bebas dari hama dan penyakit.</p>
                    </div>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-semibold">
                2. Cara dan Alur Proses Ekspor
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <strong className="text-foreground">Dapatkan Penawaran & Negosiasi:</strong> Buat penawaran (offer) untuk komoditas Anda di platform ini. Tanggapi permintaan (request) dari buyer dan lakukan negosiasi harga, volume, dan jadwal pengiriman.
                  </li>
                  <li>
                    <strong className="text-foreground">Buat Kontrak Penjualan (Sales Contract):</strong> Setelah kesepakatan tercapai, buatlah kontrak penjualan yang mengikat dan merinci semua kesepakatan dengan buyer.
                  </li>
                  <li>
                    <strong className="text-foreground">Siapkan Barang dan Kemasan:</strong> Siapkan komoditas sesuai spesifikasi pesanan. Gunakan kemasan standar ekspor yang kuat dan aman untuk perjalanan jauh.
                  </li>
                  <li>
                    <strong className="text-foreground">Urus Dokumen Ekspor:</strong> Kumpulkan dan urus semua dokumen legal yang disebutkan di bagian pertama. Bekerjasama dengan Freight Forwarder dapat sangat membantu proses ini.
                  </li>
                   <li>
                    <strong className="text-foreground">Pengurusan Bea Cukai & Pengiriman:</strong> Ajukan PEB, dapatkan Nota Pelayanan Ekspor (NPE), lalu muat barang ke kontainer/pesawat. Pihak pengangkut akan menerbitkan B/L atau AWB.
                  </li>
                  <li>
                    <strong className="text-foreground">Kirim Dokumen & Terima Pembayaran:</strong> Kirim salinan dokumen ke buyer sebagai bukti pengiriman. Pembayaran akan diproses sesuai metode yang disepakati (L/C, T/T, Escrow).
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base font-semibold">
                3. Tips Penjualan dan Pemasaran Efektif
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                 <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong className="text-foreground">Profil Perusahaan yang Profesional:</strong> Lengkapi profil perusahaan Anda di platform ini dengan informasi yang jelas, foto produk berkualitas tinggi, dan deskripsi yang menarik. Ini adalah etalase digital Anda.
                  </li>
                  <li>
                    <strong className="text-foreground">Responsif Terhadap Buyer:</strong> Jawab pertanyaan dan permintaan dari calon buyer dengan cepat dan profesional. Kecepatan respon menunjukkan keseriusan Anda.
                  </li>
                  <li>
                    <strong className="text-foreground">Tawarkan Harga Kompetitif:</strong> Lakukan riset pasar untuk mengetahui harga standar. Gunakan fitur "Rekomendasi Harga Jual" di dashboard Anda sebagai acuan.
                  </li>
                   <li>
                    <strong className="text-foreground">Tonjolkan Keunggulan Produk:</strong> Apakah produk Anda organik? Punya sertifikasi Fair Trade? Atau berasal dari daerah yang terkenal? Sebutkan semua keunggulan ini dalam deskripsi produk.
                  </li>
                  <li>
                    <strong className="text-foreground">Bangun Reputasi Baik:</strong> Pastikan setiap transaksi berjalan lancar dan buyer puas. Ulasan positif dari buyer akan meningkatkan kepercayaan calon buyer lain.
                  </li>
                   <li>
                    <strong className="text-foreground">Manfaatkan Fitur Platform:</strong> Gunakan fitur seperti "Demand Prediction" untuk melihat tren pasar dan "Find Market" untuk menemukan negara tujuan ekspor baru yang potensial.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
