import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function BuyerInfoPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Informasi untuk Buyer</h1>
        <p className="text-muted-foreground">Panduan lengkap mengenai dokumen, produk, dan proses ekspor.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Panduan Ekspor</CardTitle>
          <CardDescription>
            Berikut adalah rincian informasi penting yang dibutuhkan oleh pembeli (buyer) dalam proses ekspor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-semibold">
                Dokumen & Informasi yang Dibutuhkan
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc space-y-3 pl-5">
                  <li>
                    <h4 className="font-medium text-foreground">Invoice & Packing List</h4>
                    <p>Invoice adalah tagihan dari eksportir, sedangkan Packing List berisi rincian isi kiriman seperti berat, volume, dan deskripsi barang.</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">Bill of Lading / Airway Bill</h4>
                    <p>Dokumen pengiriman dari perusahaan pelayaran atau kargo yang digunakan untuk mengambil barang di pelabuhan atau bandara tujuan.</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">Certificate of Origin (COO)</h4>
                    <p>Sertifikat asal barang yang penting untuk pembebasan atau pengurangan bea masuk di negara tujuan.</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">Sertifikat Kesehatan / Phytosanitary Certificate</h4>
                    <p>Menyatakan bahwa produk bebas hama dan aman dikonsumsi, dikeluarkan oleh dinas karantina atau pertanian.</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">Sertifikasi Khusus (jika diminta)</h4>
                    <p>Contohnya termasuk Sertifikat Halal, Organik, HACCP, ISO, atau GAP, tergantung permintaan buyer dan standar keamanan pangan.</p>
                  </li>
                  <li>
                    <h4 className="font-medium text-foreground">Shipping Instruction & Tracking</h4>
                    <p>Informasi detail mengenai jadwal dan metode pengiriman, beserta nomor pelacakan untuk memantau posisi kiriman.</p>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-semibold">
                Informasi Produk yang Wajib Diketahui
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Nama dan jenis komoditas (contoh: beras premium IR64, kopi robusta grade A)</li>
                  <li>Asal daerah / negara</li>
                  <li>Volume dan berat bersih</li>
                  <li>Kualitas / grading</li>
                  <li>Kemasan (sack, vacuum, box, kontainer)</li>
                  <li>Harga FOB atau CIF (tergantung kesepakatan)</li>
                  <li>Estimasi waktu pengiriman</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base font-semibold">
                Hal Lain yang Biasanya Diminta Buyer
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Sample produk sebelum melakukan pemesanan dalam jumlah besar (PO).</li>
                  <li>Foto atau video produk, serta proses panen dan pengemasan.</li>
                  <li>Informasi mengenai kapasitas produksi bulanan, terutama untuk kontrak jangka panjang.</li>
                  <li>Negosiasi harga dan termin pembayaran (DP, L/C, TT, dll).</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base font-semibold">
                Contoh Skema Pembayaran
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium text-foreground">Telegraphic Transfer (TT):</span> Metode transfer bank internasional.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Letter of Credit (L/C):</span> Instrumen pembayaran yang diterbitkan oleh bank untuk menjamin pembayaran kepada eksportir.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Down Payment (DP) + Pelunasan:</span> Pembayaran uang muka di awal, dengan sisa pembayaran dilunasi setelah dokumen pengiriman diterima.
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
