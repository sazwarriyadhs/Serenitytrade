import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


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
                    <h4 className="font-medium text-foreground">✅ Certificate of Origin (COO)</h4>
                    <p className="pl-6">Dikeluarkan oleh KADIN/Disperindag untuk menunjukkan asal barang (penting untuk FTA).</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">✅ Dokumen Karantina dan Sertifikasi</h4>
                    <p className="pl-6">Sertifikat Phytosanitary (pertanian) atau Health Certificate (pangan) dari Badan Karantina/BPOM.</p>
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
                3. Informasi & Syarat Perdagangan
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground">📍 Informasi Barang</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Nama produk, jenis, mutu (grading), kemasan, dan HS Code.</li>
                      <li>Volume/stok, asal daerah, dan metode pengemasan.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">🛳️ Shipping Terms (Incoterms)</h4>
                     <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><span className="font-semibold text-foreground">FOB (Free on Board):</span> Penjual bertanggung jawab sampai barang di atas kapal.</li>
                      <li><span className="font-semibold text-foreground">CIF (Cost Insurance Freight):</span> Penjual menanggung biaya, asuransi, dan pengiriman sampai pelabuhan tujuan.</li>
                      <li><span className="font-semibold text-foreground">CNF (Cost and Freight):</span> Sama seperti CIF tapi tanpa asuransi.</li>
                    </ul>
                  </div>
                   <div>
                    <h4 className="font-medium text-foreground">💳 Metode Pembayaran</h4>
                     <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><span className="font-semibold text-foreground">TT (Telegraphic Transfer):</span> Transfer bank internasional.</li>
                      <li><span className="font-semibold text-foreground">L/C (Letter of Credit):</span> Jaminan pembayaran dari bank.</li>
                      <li><span className="font-semibold text-foreground">Escrow:</span> Pembayaran melalui pihak ketiga yang netral.</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base font-semibold">
                4. Langkah Teknis Eksportir
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                 <ol className="list-decimal pl-5 space-y-2">
                    <li>Cari buyer luar negeri (manual / marketplace ekspor).</li>
                    <li>Tanda tangan kontrak jual-beli (sales contract).</li>
                    <li>Siapkan produk, dokumen, dan pengemasan.</li>
                    <li>Ajukan PEB ke Bea Cukai via sistem CEISA.</li>
                    <li>Lakukan pengapalan barang.</li>
                    <li>Kirim dokumen ekspor ke buyer (via DHL/scan PDF).</li>
                    <li>Terima pembayaran sesuai kesepakatan.</li>
                 </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base font-semibold">
                📌 Tips Tambahan
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Daftarkan perusahaan Anda di marketplace B2B global seperti Alibaba, TradeMap, atau TradeHub.</li>
                  <li>Gunakan portal resmi seperti SIPPO, INATRADE, atau situs Kementerian Perdagangan sebagai panduan.</li>
                  <li>Selalu simpan cadangan (backup) digital dari semua dokumen ekspor untuk arsip dan keamanan.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
