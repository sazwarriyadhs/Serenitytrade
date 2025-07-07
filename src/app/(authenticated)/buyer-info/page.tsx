
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"


export default function BuyerInfoPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Panduan Ekspor Lengkap</h1>
        <p className="text-muted-foreground">Informasi wajib, dokumen, dan langkah teknis untuk eksportir.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Panduan untuk Eksportir & Buyer</CardTitle>
          <CardDescription>
            Rincian lengkap mengenai dokumen, sertifikasi, dan proses yang dibutuhkan dalam perdagangan ekspor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-semibold">
                1. Dokumen Ekspor Wajib dari Eksportir
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-none space-y-4 pl-1">
                  <li>
                    <h4 className="font-medium text-foreground">✅ Surat Izin Usaha</h4>
                    <p className="pl-6">NIB (Nomor Induk Berusaha) dari OSS dan Surat Izin Usaha Ekspor (jika diperlukan).</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">✅ Invoice & Packing List</h4>
                    <p className="pl-6">Invoice berisi detail pembelian; Packing List menjelaskan isi kemasan, volume, dan berat.</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">✅ Pemberitahuan Ekspor Barang (PEB)</h4>
                    <p className="pl-6">Diajukan melalui sistem INATRADE atau CEISA Bea Cukai untuk keperluan bea cukai.</p>
                  </li>
                   <li>
                    <h4 className="font-medium text-foreground">✅ Bill of Lading / Airway Bill</h4>
                    <p className="pl-6">Dikeluarkan oleh perusahaan pengangkutan (laut/udara) untuk mengurus pengangkutan.</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">✅ Certificate of Origin (COO) / Surat Keterangan Asal (SKA)</h4>
                    <p className="pl-6">Dokumen yang menyatakan negara asal barang, diajukan via portal e-SKA, dan wajib untuk mendapatkan fasilitas bea masuk di negara tujuan (FTA).</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">✅ Sertifikat Karantina (Phytosanitary/Health Certificate)</h4>
                    <p className="pl-6">Sertifikat Phytosanitary (pertanian) atau Health Certificate (pangan) yang diterbitkan oleh Badan Karantina/BPOM untuk menjamin produk bebas hama dan penyakit.</p>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-semibold">
                2. Sertifikasi Tambahan (Opsional)
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Sertifikasi ini biasanya diperlukan berdasarkan permintaan spesifik dari buyer atau negara tujuan.</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jenis Sertifikat</TableHead>
                      <TableHead>Keterangan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Halal Certificate</TableCell>
                      <TableCell>Untuk negara Islam (contoh: Malaysia, UAE).</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium">HACCP / ISO 22000</TableCell>
                      <TableCell>Untuk standar keamanan pangan internasional.</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium">Organic Certificate</TableCell>
                      <TableCell>Jika buyer meminta produk dengan sertifikasi organik.</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium">Good Agricultural Practice (GAP)</TableCell>
                      <TableCell>Untuk produk pertanian segar dan berkualitas tinggi.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base font-semibold">
                3. Informasi & Syarat Perdagangan Internasional
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground">📍 Informasi Barang</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Nama produk, jenis, mutu (grading), kemasan, dan HS Code.</li>
                      <li>Volume/stok, asal daerah, dan metode pengemasan.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">🛳️ Shipping Terms (Incoterms 2020)</h4>
                     <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><span className="font-semibold text-foreground">FOB (Free on Board):</span> Penjual bertanggung jawab sampai barang di atas kapal di pelabuhan muat. Biaya asuransi dan pengiriman selanjutnya ditanggung buyer.</li>
                      <li><span className="font-semibold text-foreground">CIF (Cost, Insurance, Freight):</span> Penjual menanggung biaya, asuransi, dan pengiriman sampai pelabuhan tujuan. Paling umum digunakan dan memberikan kemudahan bagi buyer.</li>
                      <li><span className="font-semibold text-foreground">CNF/CFR (Cost and Freight):</span> Sama seperti CIF, tapi penjual tidak menanggung asuransi. Buyer harus mengurus asuransi sendiri.</li>
                    </ul>
                  </div>
                   <div>
                    <h4 className="font-medium text-foreground">💳 Metode Pembayaran Internasional</h4>
                     <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><span className="font-semibold text-foreground">Telegraphic Transfer (T/T):</span> Transfer bank internasional. Umumnya memerlukan DP (Down Payment) 30-50% di muka, dan pelunasan setelah dokumen pengapalan dikirim.</li>
                      <li><span className="font-semibold text-foreground">Letter of Credit (L/C):</span> Jaminan pembayaran dari bank. Sangat aman bagi kedua pihak. L/C yang paling umum adalah L/C at Sight (pembayaran setelah dokumen diverifikasi bank).</li>
                      <li><span className="font-semibold text-foreground">Escrow Service:</span> Pembayaran melalui pihak ketiga yang netral (seperti marketplace). Dana dilepaskan ke eksportir setelah buyer mengonfirmasi penerimaan barang.</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base font-semibold">
                4. Prosedur Ekspor Internasional (Langkah demi Langkah)
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                 <ol className="list-decimal pl-5 space-y-4">
                    <li>
                        <strong className="text-foreground">Negosiasi & Kontrak:</strong> Eksportir dan buyer menyepakati spesifikasi produk, harga, Incoterms, dan metode pembayaran. Dituangkan dalam Sales Contract yang kemudian akan divalidasi oleh admin sesuai ketentuan yang berlaku di Indonesia.
                    </li>
                    <li>
                        <strong className="text-foreground">Persiapan Barang & Dokumen:</strong> Eksportir menyiapkan barang sesuai pesanan, pengemasan standar ekspor, serta mengurus semua dokumen (Invoice, Packing List, COO).
                    </li>
                    <li>
                        <strong className="text-foreground">Pemberitahuan Pabean:</strong> Eksportir mengajukan Pemberitahuan Ekspor Barang (PEB) ke Bea Cukai. Setelah disetujui, terbit Nota Pelayanan Ekspor (NPE) sebagai izin muat.
                    </li>
                    <li>
                        <strong className="text-foreground">Pengiriman Barang:</strong> Barang dimuat ke kapal/pesawat. Perusahaan pelayaran akan menerbitkan Bill of Lading (B/L) atau Airway Bill (AWB) sebagai bukti kepemilikan dan pengiriman.
                    </li>
                    <li>
                        <strong className="text-foreground">Proses Pembayaran & Dokumen:</strong> Eksportir mengirimkan salinan dokumen ke buyer sebagai bukti kirim. Buyer melakukan sisa pembayaran (jika T/T) atau bank mencairkan L/C. Dokumen asli lalu dikirim via kurir.
                    </li>
                    <li>
                        <strong className="text-foreground">Penerimaan Barang:</strong> Buyer menggunakan dokumen asli untuk mengurus bea cukai impor dan mengambil barang di pelabuhan/bandara tujuan.
                    </li>
                 </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base font-semibold">
                📌 Tips Tambahan
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Prioritaskan eksportir dengan rating tinggi. Mereka biasanya melampirkan dokumen penting seperti SKA, PEB, dan Sertifikat Karantina yang lengkap, yang menunjukkan profesionalisme dan kelancaran proses.</li>
                  <li>Daftarkan perusahaan Anda di marketplace B2B global seperti Alibaba, TradeMap, atau TradeHub.</li>
                  <li>Gunakan portal resmi seperti SIPPO, INATRADE, atau situs Kementerian Perdagangan sebagai panduan.</li>
                  <li>Selalu simpan cadangan (backup) digital dari semua dokumen ekspor untuk arsip dan keamanan.</li>
                  <li>Gunakan jasa Freight Forwarder untuk menyederhanakan proses logistik dan pengurusan dokumen pabean.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
