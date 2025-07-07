
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle2, FileWarning, Ban } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const commodityExamples = [
  { no: 1, commodity: "Beras organik", category: "Pangan pokok", exportForm: "Beras kemasan", destination: "Singapura, Uni Emirat Arab, Jepang" },
  { no: 2, commodity: "Jagung", category: "Pangan pokok", exportForm: "Jagung pipil kering", destination: "Malaysia, Filipina, Korea Selatan" },
  { no: 3, commodity: "Kacang mete", category: "Kacang-kacangan", exportForm: "Kernel kacang mete", destination: "India, Vietnam, Belanda" },
  { no: 4, commodity: "Kedelai", category: "Kacang-kacangan", exportForm: "Kedelai organik, non-GMO", destination: "Jepang, Taiwan, Jerman" },
  { no: 5, commodity: "Bawang merah", category: "Sayuran", exportForm: "Bawang merah segar/olahan", destination: "Thailand, Malaysia, Vietnam" },
  { no: 6, commodity: "Cabai", category: "Sayuran", exportForm: "Cabai segar/kering/olah", destination: "Korea Selatan, Jepang, Hongkong" },
  { no: 7, commodity: "Nanas", category: "Buah-buahan", exportForm: "Nanas segar, kalengan, jus", destination: "Tiongkok, Uni Emirat Arab, Rusia" },
  { no: 8, commodity: "Mangga", category: "Buah-buahan", exportForm: "Mangga segar, puree", destination: "Tiongkok, Timur Tengah, Eropa" },
  { no: 9, commodity: "Salak", category: "Buah-buahan", exportForm: "Salak segar, manisan, keripik", destination: "Belanda, Singapura, Malaysia" },
  { no: 10, commodity: "Kopi", category: "Perkebunan pangan", exportForm: "Biji kopi sangrai, bubuk kopi", destination: "AS, Italia, Jepang, Inggris" },
  { no: 11, commodity: "Kakao", category: "Perkebunan pangan", exportForm: "Biji kakao, bubuk, pasta", destination: "Jerman, AS, Belgia, Belanda" },
  { no: 12, commodity: "Jahe", category: "Rempah-rempah", exportForm: "Jahe segar, kering, bubuk", destination: "India, Bangladesh, Timur Tengah" },
  { no: 13, commodity: "Lada hitam/putih", category: "Rempah-rempah", exportForm: "Lada kering, bubuk", destination: "Vietnam, AS, Tiongkok" },
  { no: 14, commodity: "Ikan beku (tuna)", category: "Produk hewani", exportForm: "Fillet beku, utuh, kalengan", destination: "Jepang, AS, Thailand" },
  { no: 15, commodity: "Udang", category: "Produk hewani", exportForm: "Udang beku, kupas, olahan", destination: "AS, Jepang, Uni Eropa" },
];


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
                    2. Klasifikasi Komoditas Ekspor
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">Penting untuk mengetahui bahwa tidak semua komoditas bisa diekspor dengan bebas. Pemerintah mengklasifikasikan komoditas ekspor menjadi tiga kategori:</p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-medium text-foreground">Ekspor Bebas</h4>
                                <p>Komoditas yang dapat diekspor tanpa memerlukan izin khusus, namun tetap harus memenuhi dokumen ekspor umum.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <FileWarning className="h-5 w-5 text-yellow-600 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-medium text-foreground">Ekspor Dibatasi</h4>
                                <p>Komoditas yang ekspornya diatur dan dibatasi oleh kuota atau memerlukan izin khusus untuk menjaga pasokan domestik.</p>
                                <p className="mt-2 text-xs font-semibold">Contoh: Kopi, produk hasil hutan, beras, dan inti minyak sawit.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Ban className="h-5 w-5 text-destructive mt-1 shrink-0" />
                            <div>
                                <h4 className="font-medium text-foreground">Ekspor Dilarang</h4>
                                <p>Komoditas yang dilarang ekspor untuk melindungi sumber daya alam atau industri dalam negeri.</p>
                                <p className="mt-2 text-xs font-semibold">Contoh: Rotan mentah dan karet bongkah (rubber lumps).</p>
                            </div>
                        </li>
                    </ul>
                    <p className="mt-4 text-sm font-medium">Selalu periksa peraturan terbaru dari Kementerian Perdagangan sebelum melakukan ekspor.</p>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base font-semibold">
                3. Cara dan Alur Proses Ekspor
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <strong className="text-foreground">Dapatkan Penawaran & Negosiasi:</strong> Buat penawaran (offer) untuk komoditas Anda di platform ini. Tanggapi permintaan (request) dari buyer dan lakukan negosiasi harga, volume, dan jadwal pengiriman.
                  </li>
                  <li>
                    <strong className="text-foreground">Buat Kontrak Penjualan (Sales Contract):</strong> Setelah kesepakatan tercapai, buatlah kontrak penjualan yang mengikat dan merinci semua kesepakatan dengan buyer. Semua perjanjian akan divalidasi oleh admin untuk memastikan kesesuaian dengan ketentuan yang berlaku di Indonesia.
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
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base font-semibold">
                4. Tips Penjualan dan Pemasaran Efektif
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

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base font-semibold">
                5. Regulasi Terkait Volume Pangan
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Meskipun tidak ada batasan volume minimum/maksimum yang eksplisit untuk semua komoditas, beberapa regulasi berikut secara tidak langsung mempengaruhi volume dalam perdagangan pangan di Indonesia:</p>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong className="text-foreground">Undang-Undang No. 18/2012 tentang Pangan:</strong>
                    <p>Menjadi dasar hukum utama yang mengatur produksi, distribusi, dan pengawasan untuk menjamin ketersediaan pangan nasional.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">Peraturan Pemerintah & Menteri:</strong>
                    <p>Peraturan turunan seringkali mengatur lebih detail komoditas strategis (misalnya beras, gula), yang bisa mencakup kebijakan stok atau distribusi.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">Ketahanan Pangan (PP No. 68/2002):</strong>
                    <p>Menekankan pentingnya ketersediaan pangan yang cukup dan terjangkau bagi masyarakat, yang mempengaruhi kebijakan ekspor-impor.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">Regulasi Produksi:</strong>
                    <p>Kebijakan terkait luas lahan tanam atau alokasi pupuk untuk komoditas tertentu dapat mempengaruhi total volume produksi yang tersedia untuk pasar domestik dan ekspor.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">Perdagangan Berjangka Komoditi:</strong>
                    <p>Untuk komoditas yang diperdagangkan di bursa berjangka (diawasi BAPPEBTI), terdapat aturan spesifik mengenai volume kontrak perdagangan.</p>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-base font-semibold">
                6. Aspek Penting Pengemasan Produk Pangan
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground">1. Bahan Kemasan</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><strong>Food Grade:</strong> Bahan kemasan harus aman bersentuhan dengan makanan dan tidak melepaskan zat berbahaya.</li>
                      <li><strong>Perlindungan:</strong> Kemasan harus mampu melindungi produk dari kontaminasi, kerusakan fisik, dan perubahan suhu.</li>
                      <li><strong>Jenis Kemasan:</strong> Pertimbangkan kemasan vakum, aseptik, kaleng, atau gelas sesuai karakteristik produk dan persyaratan negara tujuan.</li>
                      <li><strong>Ramah Lingkungan:</strong> Perhatikan dampak lingkungan dari bahan kemasan, terutama jika negara tujuan memiliki regulasi terkait keberlanjutan.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">2. Label Kemasan</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><strong>Informasi Produk:</strong> Cantumkan nama produk, komposisi, berat bersih, tanggal kedaluwarsa, nomor batch, produsen, dan informasi nutrisi.</li>
                      <li><strong>Instruksi Penggunaan:</strong> Sertakan petunjuk penggunaan, penyimpanan, dan penanganan produk.</li>
                      <li><strong>Peringatan:</strong> Jika ada potensi alergen, cantumkan peringatan yang jelas dan mudah dilihat.</li>
                      <li><strong>Standar Negara Tujuan:</strong> Pastikan label sesuai dengan standar di negara tujuan, termasuk bahasa yang digunakan.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">3. Desain Kemasan</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><strong>Fungsionalitas:</strong> Kemasan harus mudah dibuka, ditutup, dan digunakan oleh konsumen.</li>
                      <li><strong>Estetika:</strong> Desain yang menarik dapat meningkatkan daya tarik produk.</li>
                      <li><strong>Ketahanan:</strong> Pastikan kemasan kuat untuk menahan tekanan selama pengiriman.</li>
                      <li><strong>Informasi:</strong> Label harus mudah dibaca, informatif, dan menyertakan logo merek.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">4. Standar Tambahan</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><strong>ISO:</strong> Beberapa negara mungkin mensyaratkan standar ISO tertentu untuk kemasan.</li>
                      <li><strong>Sertifikasi Halal:</strong> Diperlukan jika produk ditujukan untuk negara dengan mayoritas penduduk muslim.</li>
                      <li><strong>Sertifikasi SNI:</strong> Di Indonesia, beberapa produk mungkin memerlukan sertifikasi SNI (Standar Nasional Indonesia).</li>
                      <li><strong>Dokumen Pendukung:</strong> Pastikan Anda memiliki semua dokumen ekspor yang relevan seperti invoice, packing list, dan Bill of Lading.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">5. Contoh Penerapan per Kategori Komoditas</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><strong>Kopi, Kakao, Biji-bijian:</strong> Menggunakan karung goni yang dilapisi kantong plastik kedap udara (seperti GrainPro) untuk melindungi dari kelembaban dan menjaga aroma khas.</li>
                      <li><strong>Buah-buahan Segar (Mangga, Manggis):</strong> Dikemas dalam kotak karton bergelombang (corrugated box) dengan sekat individual untuk mencegah benturan dan lubang ventilasi untuk sirkulasi udara.</li>
      <li><strong>Hasil Laut Beku (Ikan, Udang):</strong> Kemasan vakum primer untuk mencegah dehidrasi, kemudian dimasukkan ke dalam kotak styrofoam atau karton berlapis lilin untuk menjaga suhu rendah selama transportasi.</li>
                      <li><strong>Rempah-rempah (Lada, Cengkeh):</strong> Kemasan vakum dalam kantong aluminium foil untuk pengiriman massal guna melindungi dari cahaya dan udara. Untuk ritel, botol kaca gelap lebih diutamakan.</li>
                      <li><strong>Produk Olahan (Keripik, Makanan Ringan):</strong> Menggunakan kemasan fleksibel multilayer (plastik/foil) yang diisi dengan nitrogen (Nitrogen Flushing) untuk menjaga kerenyahan dan memperpanjang umur simpan.</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-base font-semibold">
                7. Contoh Komoditas Pangan Ekspor Unggulan Indonesia
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">No</TableHead>
                      <TableHead>Komoditi Pangan</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Bentuk Produk Ekspor</TableHead>
                      <TableHead>Negara Tujuan Utama</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commodityExamples.map((item) => (
                      <TableRow key={item.no}>
                        <TableCell className="font-medium">{item.no}</TableCell>
                        <TableCell>{item.commodity}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.exportForm}</TableCell>
                        <TableCell>{item.destination}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-base font-semibold">
                8. Spesifikasi Produk Ekspor Unggulan
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Berikut adalah contoh spesifikasi standar untuk beberapa komoditas ekspor unggulan Indonesia yang umum diminta oleh pasar internasional. Spesifikasi ini dapat bervariasi tergantung permintaan buyer.</p>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium text-foreground">Kopi Arabika (Specialty Grade)</h4>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Asal:</strong> Gayo, Kintamani, Toraja (Single Origin)</li>
                            <li><strong>Ukuran Biji (Screen Size):</strong> 16-18</li>
                            <li><strong>Kadar Air (Moisture Content):</strong> 10% - 12.5%</li>
                            <li><strong>Tingkat Cacat (Defect Value):</strong> Maksimal 5 cacat per 300 gram sampel</li>
                            <li><strong>Proses:</strong> Washed (Giling Basah), Semi-Washed, Natural</li>
                            <li><strong>Catatan Rasa (Cupping Notes):</strong> Deskripsi profil rasa (e.g., fruity, floral, spicy)</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-foreground">Udang Windu (Black Tiger Shrimp)</h4>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Bentuk:</strong> Head-On Shell-On (HOSO), Headless Shell-On (HLSO), Peeled and Deveined (PND)</li>
                            <li><strong>Ukuran (Size per lb):</strong> 16/20, 21/25, 26/30</li>
                            <li><strong>Glasir (Glazing):</strong> 10% - 20% (sesuai permintaan buyer)</li>
                            <li><strong>Kualitas:</strong> Tidak ada black spots, daging kenyal, warna seragam</li>
                            <li><strong>Pembekuan:</strong> Individually Quick Frozen (IQF)</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-foreground">Nanas (MD2 / Queen)</h4>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Tingkat Kematangan:</strong> 75% - 85% (warna kulit dominan kuning)</li>
                            <li><strong>Tingkat Brix (Kemanisan):</strong> Minimal 12°</li>
                            <li><strong>Berat per Buah:</strong> 1.2 - 2.0 kg</li>
                            <li><strong>Kondisi:</strong> Bebas dari memar, busuk, dan kerusakan hama</li>
                            <li><strong>Mahkota:</strong> Segar, hijau, tidak layu</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-foreground">Kernel Kacang Mete</h4>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Grade:</strong> WW240, WW320 (Whole White)</li>
                            <li><strong>Kadar Air:</strong> Maksimal 5%</li>
                            <li><strong>Kondisi:</strong> Utuh, tidak ada serangga hidup atau mati, bebas dari bau apek</li>
                            <li><strong>Kemasan:</strong> Vakum dalam kantong plastik dan dikemas dalam karton</li>
                        </ul>
                    </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
