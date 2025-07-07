-- Clear existing data
TRUNCATE TABLE "notifications", "value_chain_logs", "payments", "shipments", "offers", "partnerships", "certifications", "commodities", "users" RESTART IDENTITY CASCADE;

-- Insert dummy data for users
INSERT INTO "users" ("id", "name", "email", "password", "role", "address", "id_number", "tax_number", "photo_url", "created_at", "updated_at") VALUES
-- Admins (2)
(1, 'Admin User', 'admin@serenity.com', 'hashed_password', 'admin', '123 Admin St, Jakarta', 'ADM001', '01.111.111.1-111.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(2, 'Super Admin', 'super.admin@serenity.com', 'hashed_password', 'admin', '456 Admin Ave, Jakarta', 'ADM002', '02.222.222.2-222.000', 'https://placehold.co/100x100.png', NOW(), NOW()),

-- Exporters (10)
(3, 'Green Valley Exports', 'exporter@serenity.com', 'hashed_password', 'exporter', 'Export Building, Surabaya', 'EXP001', '03.333.333.3-333.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(4, 'Highland Coffee Co.', 'highland@serenity.com', 'hashed_password', 'exporter', 'Coffee District, Bandung', 'EXP002', '04.444.444.4-444.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(5, 'Italian Pantry', 'italian.pantry@example.com', 'hashed_password', 'exporter', 'Gourmet Plaza, Medan', 'EXP003', '05.555.555.5-555.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(6, 'Andean Grains', 'andean.grains@example.com', 'hashed_password', 'exporter', 'Grain Tower, Makassar', 'EXP004', '06.666.666.6-666.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(7, 'Tropical Delights', 'tropical.delights@example.com', 'hashed_password', 'exporter', 'Fruit Center, Denpasar', 'EXP005', '07.777.777.7-777.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(8, 'Berry Fields', 'berry.fields@example.com', 'hashed_password', 'exporter', 'Berry Lane, Lembang', 'EXP006', '08.888.888.8-888.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(9, 'Java Spices', 'java.spices@example.com', 'hashed_password', 'exporter', 'Spice Market, Semarang', 'EXP007', '09.999.999.9-999.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(10, 'Green Farms Ltd.', 'green.farms@example.com', 'hashed_password', 'exporter', 'Farming Hub, Bogor', 'EXP008', '10.101.010.1-010.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(11, 'Tropical Fruits Co.', 'tropical.fruits@example.com', 'hashed_password', 'exporter', 'Exotic Fruits Center, Manado', 'EXP009', '11.111.111.1-111.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(12, 'My Export Company', 'my.export@example.com', 'hashed_password', 'exporter', 'My Office, Jakarta', 'EXP010', '12.121.212.1-212.000', 'https://placehold.co/100x100.png', NOW(), NOW()),

-- Buyers (10)
(13, 'FreshMart EU', 'buyer@serenity.com', 'hashed_password', 'buyer', '10 Market St, Rotterdam', 'BUY001', 'EU123456789', 'https://placehold.co/100x100.png', NOW(), NOW()),
(14, 'The Coffee House', 'coffee.house@example.com', 'hashed_password', 'buyer', '25 Pike Pl, Seattle', 'BUY002', 'US987654321', 'https://placehold.co/100x100.png', NOW(), NOW()),
(15, 'Whole Foods', 'whole.foods@example.com', 'hashed_password', 'buyer', '550 Bowie St, Austin', 'BUY003', 'US192837465', 'https://placehold.co/100x100.png', NOW(), NOW()),
(16, 'Juice World Inc.', 'juice.world@example.com', 'hashed_password', 'buyer', '1 Juice Ave, Los Angeles', 'BUY004', 'US574839201', 'https://placehold.co/100x100.png', NOW(), NOW()),
(17, 'Super Fruct', 'super.fruct@example.com', 'hashed_password', 'buyer', 'Fruct Aleja 1, Warsaw', 'BUY005', 'PL564738291', 'https://placehold.co/100x100.png', NOW(), NOW()),
(18, 'Agro Imports Inc.', 'agro.imports@example.com', 'hashed_password', 'buyer', 'Import Dock 5, Hamburg', 'BUY006', 'DE812345678', 'https://placehold.co/100x100.png', NOW(), NOW()),
(19, 'Tokyo Fresh Market', 'tokyo.fresh@example.com', 'hashed_password', 'buyer', '1-1 Toyosu, Koto City, Tokyo', 'BUY007', 'JP123456789012', 'https://placehold.co/100x100.png', NOW(), NOW()),
(20, 'Dubai Dates & Co.', 'dubai.dates@example.com', 'hashed_password', 'buyer', 'Sheikh Zayed Rd, Dubai', 'BUY008', 'AE1002003004005', 'https://placehold.co/100x100.png', NOW(), NOW()),
(21, 'Seoul Kimchi House', 'seoul.kimchi@example.com', 'hashed_password', 'buyer', '123 Kimchi-ro, Seoul', 'BUY009', 'KR123-45-67890', 'https://placehold.co/100x100.png', NOW(), NOW()),
(22, 'Singapore Spices', 'sg.spices@example.com', 'hashed_password', 'buyer', '21 Spice Lane, Singapore', 'BUY010', 'SG202312345A', 'https://placehold.co/100x100.png', NOW(), NOW()),

-- Farmers (10)
(23, 'Farm Fresh Organics', 'farmer@serenity.com', 'hashed_password', 'farmer', 'Organic Valley, Lembang', 'FARM001', '31.123.456.7-890.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(24, 'Sunrise Farms', 'sunrise.farms@example.com', 'hashed_password', 'farmer', 'Desa Makmur, Cianjur', 'FARM002', '32.234.567.8-901.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(25, 'Highland Coffee Farm', 'highland.farm@example.com', 'hashed_password', 'farmer', 'Gayo Highlands, Aceh', 'FARM003', '33.345.678.9-012.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(26, 'Tani Sejahtera', 'tani.sejahtera@example.com', 'hashed_password', 'farmer', 'Sawah Subur, Karawang', 'FARM004', '34.456.789.0-123.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(27, 'Kebun Buah Tropis', 'kebun.tropis@example.com', 'hashed_password', 'farmer', 'Jl. Buah No. 5, Bogor', 'FARM005', '35.567.890.1-234.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(28, 'Sayur Hijau Lestari', 'sayur.hijau@example.com', 'hashed_password', 'farmer', 'Lembah Hijau, Ciwidey', 'FARM006', '36.678.901.2-345.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(29, 'Sumber Pangan', 'sumber.pangan@example.com', 'hashed_password', 'farmer', 'Kampung Berkah, Sukabumi', 'FARM007', '37.789.012.3-456.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(30, 'Petani Muda Maju', 'petani.muda@example.com', 'hashed_password', 'farmer', 'Inkubator Tani, Sleman', 'FARM008', '38.890.123.4-567.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(31, 'Sawah Luas', 'sawah.luas@example.com', 'hashed_password', 'farmer', 'Hamparan Padi, Indramayu', 'FARM009', '39.901.234.5-678.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(32, 'Ladang Emas', 'ladang.emas@example.com', 'hashed_password', 'farmer', 'Bukit Jagung, Lampung', 'FARM010', '40.012.345.6-789.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(101, 'Peternak Jaya', 'peternak@serenity.com', 'hashed_password', 'peternak', 'Jalan Ternak No. 1, Desa Sapi, Boyolali', '1234567890123456', '09.876.543.2-101.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(102, 'Nelayan Sejahtera', 'nelayan@serenity.com', 'hashed_password', 'nelayan', 'Desa Pesisir, Kecamatan Pantai, Indramayu', '2345678901234567', '09.876.543.2-102.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(103, 'Hutan Lestari', 'hutan@serenity.com', 'hashed_password', 'pengelola_hasil_hutan', 'Kawasan Hutan Damar, Lampung Barat', '3456789012345678', '09.876.543.2-103.000', 'https://placehold.co/100x100.png', NOW(), NOW()),
(104, 'Kebun Karet Makmur', 'kebun@serenity.com', 'hashed_password', 'pengelola_hasil_kebun', 'Desa Getah, Kecamatan Karet, Sumatera Selatan', '4567890123456789', '09.876.543.2-104.000', 'https://placehold.co/100x100.png', NOW(), NOW());


-- Insert dummy data for commodities
INSERT INTO "commodities" ("id", "exporter_id", "name", "description", "origin", "price_per_kg", "stock_kg", "status", "image_url") VALUES
(1, 3, 'Organic Hass Avocado', 'Creamy, nutrient-rich avocados from certified organic farms.', 'Mexico', 2.50, 1500, 'active', '/images/Hass Avocado.png'),
(2, 4, 'Arabica Coffee Beans', 'High-altitude grown, medium roast with notes of chocolate and citrus.', 'Colombia', 15.00, 800, 'active', '/images/Arabica Coffee.png'),
(3, 6, 'King Quinoa', 'Versatile and protein-packed quinoa, pre-washed and ready to cook.', 'Peru', 8.75, 2200, 'archived', '/images/Royal Quinoa.png'),
(4, 5, 'Sun-dried Tomatoes', 'Rich, intense flavor. Perfect for pastas, salads, and sauces.', 'Italy', 12.20, 650, 'active', '/images/Sun-dried Tomatoes.png'),
(5, 7, 'Fresh Mangoes', 'Sweet and juicy Kent mangoes, perfect for desserts and smoothies.', 'Indonesia', 1.20, 8000, 'active', 'https://placehold.co/600x400.png'),
(6, 8, 'Organic Blueberries', 'Plump and sweet organic blueberries, hand-picked at peak ripeness.', 'Chile', 7.00, 3000, 'active', 'https://placehold.co/600x400.png'),
(7, 9, 'Cloves', 'Aromatic and flavorful whole cloves, sourced from Java.', 'Indonesia', 18.50, 500, 'active', 'https://placehold.co/600x400.png'),
(8, 10, 'Organic Spinach', 'Fresh organic spinach, triple-washed and ready to eat.', 'USA', 3.50, 1000, 'active', 'https://placehold.co/600x400.png'),
(9, 11, 'Dragon Fruit', 'Vibrant and exotic dragon fruit with a sweet, mild flavor.', 'Vietnam', 4.80, 2500, 'active', 'https://placehold.co/600x400.png'),
(10, 3, 'Peruvian Quinoa', 'High-quality white quinoa from the Andes.', 'Peru', 8.50, 10000, 'active', '/images/Royal Quinoa.png'),
(11, 4, 'Cashew Nuts WW320', 'Premium quality whole white cashew nuts.', 'Vietnam', 9.20, 15000, 'active', 'https://placehold.co/600x400.png');


-- Insert dummy data for certifications
INSERT INTO "certifications" ("commodity_id", "user_id", "name", "issuing_body", "valid_until") VALUES
(1, 3, 'USDA Organic', 'USDA National Organic Program', '2025-12-31'),
(1, 3, 'Fair Trade', 'Fair Trade International', '2025-06-30'),
(2, 4, 'Rainforest Alliance', 'Rainforest Alliance', '2026-01-15'),
(3, 6, 'Non-GMO Project', 'The Non-GMO Project', '2024-11-20'),
(1, 23, 'Organik Indonesia', 'LSO-002-IDN', '2025-08-01'),
(2, 25, 'Fair Trade', 'Fair Trade International', '2025-09-10');


-- Insert dummy data for partnerships
INSERT INTO "partnerships" ("exporter_id", "farmer_id", "status", "start_date") VALUES
(3, 23, 'active', '2023-10-15'),
(4, 25, 'active', '2023-09-01'),
(3, 24, 'pending', '2023-10-29');


-- Insert dummy data for offers
INSERT INTO "offers" ("commodity_id", "buyer_id", "exporter_id", "quantity_kg", "total_price", "status") VALUES
(1, 13, 3, 5000, 12500, 'negotiating'),
(2, 14, 4, 2000, 30000, 'accepted'),
(10, 15, 6, 10000, 85000, 'pending'), -- Buyer Request
(5, 16, 7, 8000, 9600, 'pending'),
(6, 17, 8, 3000, 21000, 'fulfilled');


-- Insert dummy data for shipments
INSERT INTO "shipments" ("offer_id", "tracking_number", "shipping_partner", "status", "estimated_delivery", "actual_delivery") VALUES
(1, 'SHP-12345', 'Global Freight Forwarders', 'in_transit', '2023-11-20', NULL),
(2, 'SHP-67890', 'Skyway Cargo', 'delivered', '2023-10-26', '2023-10-26'),
(5, 'SHP-ABCDE', 'Oceanic Express Lines', 'delivered', '2023-09-14', '2023-09-15');

-- Insert dummy data for payments
INSERT INTO "payments" ("offer_id", "amount", "status", "payment_method", "transaction_id") VALUES
(1, 12500, 'in_escrow', 'Letter of Credit', 'TXN-98765'),
(2, 30000, 'paid', 'Telegraphic Transfer', 'TXN-12345'),
(5, 21000, 'paid', 'Escrow', 'TXN-54321');


-- Insert dummy data for value_chain_logs
INSERT INTO "value_chain_logs" ("shipment_id", "step_name", "location", "timestamp") VALUES
(1, 'Harvest Logged', 'Oaxaca, Mexico', '2023-11-01 08:00:00'),
(1, 'Picked up by Exporter', 'Oaxaca, Mexico', '2023-11-02 09:00:00'),
(1, 'Received at Warehouse', 'Veracruz, Mexico', '2023-11-03 14:00:00'),
(1, 'Export Processing', 'Port of Veracruz', '2023-11-04 11:00:00'),
(1, 'Shipped', 'Port of Veracruz', '2023-11-05 18:00:00'),
(1, 'In Transit to Buyer', 'Atlantic Ocean', '2023-11-06 00:00:00'),
(2, 'Harvest Logged', 'Salento, Colombia', '2023-10-15 07:30:00'),
(2, 'Shipped', 'Port of Cartagena', '2023-10-19 20:00:00'),
(2, 'Delivered', 'The Coffee House, Miami', '2023-10-26 10:00:00');

-- Insert dummy data for notifications
INSERT INTO "notifications" ("user_id", "title", "message", "is_read") VALUES
(3, 'Offer #OFF-002 Accepted', 'Your offer for Arabica Coffee Beans has been accepted by The Coffee House.', false),
(3, 'New Negotiation Message', 'FreshMart EU sent a new message regarding offer #OFF-001.', false),
(13, 'New Commodity Added', 'Sun-dried Tomatoes from Italy is now available for export offers.', true),
(3, 'Export Fulfilled', 'Your export of Organic Blueberries to Super Fruct has been marked as fulfilled.', true);
