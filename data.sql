-- Dummy Data for Serenity AgriExport Hub

-- Reset sequences for consistent IDs on re-runs
ALTER SEQUENCE users_user_id_seq RESTART WITH 1;
ALTER SEQUENCE commodities_commodity_id_seq RESTART WITH 1;
ALTER SEQUENCE certifications_certification_id_seq RESTART WITH 1;
ALTER SEQUENCE partnerships_partnership_id_seq RESTART WITH 1;
ALTER SEQUENCE offers_offer_id_seq RESTART WITH 1;
ALTER SEQUENCE shipments_shipment_id_seq RESTART WITH 1;
ALTER SEQUENCE transactions_transaction_id_seq RESTART WITH 1;


-- 1. Users (20 users: 1 Admin, 5 Exporters, 8 Buyers, 6 Farmers)
INSERT INTO users (role, name, email, password_hash, id_number, address, nib, tax_number, photo_url, is_verified) VALUES
('admin', 'Admin Serenity', 'admin@serenity.com', 'hashed_password_placeholder', 'ADMIN-001', 'Jl. Jend. Sudirman Kav. 52-53, Jakarta', NULL, '01.111.222.3-444.000', 'https://placehold.co/100x100.png', true),
('exporter', 'Green Valley Exports', 'exporter@serenity.com', 'hashed_password_placeholder', 'EXP-001', 'Jl. Raya Bogor Km. 28, Jakarta Timur', '9120301234567', '02.345.678.9-101.000', 'https://placehold.co/100x100.png', true),
('exporter', 'Highland Coffee Co.', 'exporter2@serenity.com', 'hashed_password_placeholder', 'EXP-002', 'Jl. Asia Afrika No. 8, Bandung', '9120301234568', '02.345.678.9-102.000', 'https://placehold.co/100x100.png', true),
('exporter', 'Tropical Delights', 'exporter3@serenity.com', 'hashed_password_placeholder', 'EXP-003', 'Jl. Bypass Ngurah Rai, Denpasar', '9120301234569', '02.345.678.9-103.000', 'https://placehold.co/100x100.png', true),
('exporter', 'Andean Grains', 'exporter4@serenity.com', 'hashed_password_placeholder', 'EXP-004', 'Jl. Gatot Subroto, Medan', '9120301234570', '02.345.678.9-104.000', 'https://placehold.co/100x100.png', true),
('exporter', 'Italian Pantry', 'exporter5@serenity.com', 'hashed_password_placeholder', 'EXP-005', 'Jl. HR Rasuna Said, Jakarta Selatan', '9120301234571', '02.345.678.9-105.000', 'https://placehold.co/100x100.png', false),
('buyer', 'FreshMart EU', 'buyer@serenity.com', 'hashed_password_placeholder', 'BUY-001', '123 Market St, Rotterdam, Netherlands', NULL, 'NL123456789B01', 'https://placehold.co/100x100.png', true),
('buyer', 'The Coffee House', 'buyer2@serenity.com', 'hashed_password_placeholder', 'BUY-002', '456 Bean Ave, Seattle, USA', NULL, 'US987654321', 'https://placehold.co/100x100.png', true),
('buyer', 'Whole Foods', 'buyer3@serenity.com', 'hashed_password_placeholder', 'BUY-003', '789 Organic Blvd, Austin, USA', NULL, 'US192837465', 'https://placehold.co/100x100.png', true),
('buyer', 'Juice World Inc.', 'buyer4@serenity.com', 'hashed_password_placeholder', 'BUY-004', '101 Fruit Rd, London, UK', NULL, 'GB123456789', 'https://placehold.co/100x100.png', true),
('buyer', 'Super Fruct', 'buyer5@serenity.com', 'hashed_password_placeholder', 'BUY-005', '23 Orchard Ln, Paris, France', NULL, 'FR987654321', 'https://placehold.co/100x100.png', true),
('buyer', 'Tokyo Grocers', 'buyer6@serenity.com', 'hashed_password_placeholder', 'BUY-006', '5-1-2 Ginza, Chuo-ku, Tokyo, Japan', NULL, 'JP123456789', 'https://placehold.co/100x100.png', true),
('buyer', 'Dubai Imports', 'buyer7@serenity.com', 'hashed_password_placeholder', 'BUY-007', 'Sheikh Zayed Rd, Dubai, UAE', NULL, 'AE987654321', 'https://placehold.co/100x100.png', false),
('buyer', 'Agro Imports Inc.', 'buyer8@serenity.com', 'hashed_password_placeholder', 'BUY-008', '42 Agri Way, Toronto, Canada', NULL, 'CA123456789', 'https://placehold.co/100x100.png', false),
('farmer', 'Farm Fresh Organics', 'farmer@serenity.com', 'hashed_password_placeholder', 'FARM-001', 'Desa Subur, Kab. Makmur, Jawa Barat', NULL, '03.123.456.7-890.000', 'https://placehold.co/100x100.png', true),
('farmer', 'Sunrise Farms', 'farmer2@serenity.com', 'hashed_password_placeholder', 'FARM-002', 'Desa Sejahtera, Kab. Subur, Jawa Tengah', NULL, '03.123.456.7-891.000', 'https://placehold.co/100x100.png', true),
('farmer', 'Highland Coffee Farm', 'farmer3@serenity.com', 'hashed_password_placeholder', 'FARM-003', 'Pegunungan Gayo, Aceh', NULL, '03.123.456.7-892.000', 'https://placehold.co/100x100.png', true),
('farmer', 'Berry Fields', 'farmer4@serenity.com', 'hashed_password_placeholder', 'FARM-004', 'Dataran Tinggi Dieng, Jawa Tengah', NULL, '03.123.456.7-893.000', 'https://placehold.co/100x100.png', true),
('farmer', 'Java Spices', 'farmer5@serenity.com', 'hashed_password_placeholder', 'FARM-005', 'Lereng Gunung Bromo, Jawa Timur', NULL, '03.123.456.7-894.000', 'https://placehold.co/100x100.png', true),
('farmer', 'Sawah Hijau', 'farmer6@serenity.com', 'hashed_password_placeholder', 'FARM-006', 'Karawang, Jawa Barat', NULL, '03.123.456.7-895.000', 'https://placehold.co/100x100.png', false);


-- 2. Certifications (5 certifications)
INSERT INTO certifications (certification_name, issuing_body) VALUES
('USDA Organic', 'United States Department of Agriculture'),
('Fair Trade Certified', 'Fair Trade USA'),
('Rainforest Alliance', 'Rainforest Alliance'),
('Organik Indonesia', 'Lembaga Sertifikasi Organik Indonesia'),
('HACCP', 'Hazard Analysis and Critical Control Points');


-- 3. Commodities (15 commodities)
INSERT INTO commodities (exporter_id, name, description, price_per_kg, stock_kg, origin, image_url, image_hint, status) VALUES
(2, 'Organic Hass Avocado', 'Creamy, nutrient-rich avocados from certified organic farms.', 2.50, 1500, 'Mexico', '/images/Hass Avocado.png', 'avocado fruit', 'active'),
(3, 'Arabica Coffee Beans', 'High-altitude grown, medium roast with notes of chocolate and citrus.', 15.00, 800, 'Colombia', '/images/Arabica Coffee.png', 'coffee beans', 'active'),
(5, 'King Quinoa', 'Versatile and protein-packed quinoa, pre-washed and ready to cook.', 8.75, 2200, 'Peru', '/images/Royal Quinoa.png', 'quinoa seeds', 'archived'),
(6, 'Sun-dried Tomatoes', 'Rich, intense flavor. Perfect for pastas, salads, and sauces.', 12.20, 650, 'Italy', '/images/Sun-dried Tomatoes.png', 'dried tomatoes', 'active'),
(2, 'Organic Blueberries', 'Sweet and juicy blueberries, packed with antioxidants.', 7.00, 3000, 'Chile', 'https://placehold.co/600x400.png', 'blueberries', 'active'),
(3, 'Gayo Wine Coffee', 'Specialty coffee with a unique winey flavor profile from Aceh.', 25.00, 500, 'Indonesia', 'https://placehold.co/600x400.png', 'coffee beans', 'active'),
(4, 'Fresh Mangoes', 'Sweet and fragrant Harum Manis mangoes.', 1.20, 8000, 'Indonesia', 'https://placehold.co/600x400.png', 'mango fruit', 'active'),
(5, 'Peruvian Asparagus', 'Tender and flavorful green asparagus spears.', 5.50, 1200, 'Peru', 'https://placehold.co/600x400.png', 'asparagus', 'active'),
(2, 'California Almonds', 'Crunchy and nutritious almonds, perfect for snacking.', 10.00, 4000, 'USA', 'https://placehold.co/600x400.png', 'almonds nuts', 'active'),
(3, 'Sumatran Cloves', 'Aromatic whole cloves, ideal for spices and traditional medicine.', 18.00, 750, 'Indonesia', 'https://placehold.co/600x400.png', 'cloves spice', 'active'),
(4, 'Dragon Fruit', 'Vibrant pink dragon fruit with sweet, speckled pulp.', 3.50, 2500, 'Vietnam', 'https://placehold.co/600x400.png', 'dragon fruit', 'active'),
(5, 'Cashew Nuts WW320', 'Premium quality whole white cashew nuts.', 9.80, 5000, 'Vietnam', 'https://placehold.co/600x400.png', 'cashew nuts', 'active'),
(6, 'Balsamic Vinegar', 'Aged balsamic vinegar from Modena.', 30.00, 200, 'Italy', 'https://placehold.co/600x400.png', 'vinegar bottle', 'active'),
(2, 'Organic Bananas', 'Cavendish bananas grown without synthetic pesticides.', 0.80, 10000, 'Ecuador', 'https://placehold.co/600x400.png', 'bananas', 'archived'),
(3, 'Java Vanilla Beans', 'Grade A vanilla beans with a rich, creamy aroma.', 250.00, 50, 'Indonesia', 'https://placehold.co/600x400.png', 'vanilla beans', 'active');


-- 4. Product Certifications (20 relations)
INSERT INTO product_certifications (commodity_id, certification_id) VALUES
(1, 1), (1, 2), (2, 3), (3, 1), (4, 5),
(5, 1), (5, 2), (6, 3), (6, 4), (7, 4),
(8, 5), (9, 1), (10, 3), (11, 4), (12, 1),
(12, 5), (13, 5), (14, 1), (15, 3), (15, 4);


-- 5. Partnerships (10 partnerships)
INSERT INTO partnerships (exporter_id, farmer_id, status) VALUES
(2, 15, 'active'), (2, 16, 'active'), (3, 17, 'active'), (3, 19, 'active'),
(4, 18, 'active'), (4, 20, 'active'), (2, 18, 'pending'), (5, 15, 'negotiating'),
(3, 16, 'pending'), (2, 17, 'active');


-- 6. Offers (15 offers)
INSERT INTO offers (commodity_id, buyer_id, quantity_kg, total_price, status) VALUES
(1, 7, 5000, 12500.00, 'negotiating'),
(2, 8, 2000, 30000.00, 'accepted'),
(3, 9, 10000, NULL, 'request'),
(7, 10, 8000, 9600.00, 'sent'),
(5, 11, 3000, 21000.00, 'fulfilled'),
(6, 8, 500, 12500.00, 'sent'),
(9, 7, 2000, 20000.00, 'accepted'),
(11, 12, 1000, 3500.00, 'negotiating'),
(12, 9, 5000, 49000.00, 'fulfilled'),
(15, 13, 20, 5000.00, 'sent'),
(1, 14, 1000, NULL, 'request'),
(2, 10, 100, NULL, 'request'),
(10, 11, 250, 4500.00, 'cancelled'),
(5, 12, 1500, 10500.00, 'fulfilled'),
(8, 7, 500, 2750.00, 'accepted');


-- 7. Shipments (10 shipments)
INSERT INTO shipments (offer_id, tracking_number, status, origin, destination) VALUES
(2, 'SHP-67890', 'Delivered', 'Highland Coffee Farm, Colombia', 'The Coffee House, USA'),
(5, 'SHP-12345', 'In Transit to Buyer', 'Farm Fresh Organics, Mexico', 'FreshMart EU, Rotterdam'),
(7, 'SHP-ABCDE', 'Processing at Origin', 'California, USA', 'Tokyo Grocers, Japan'),
(9, 'SHP-FGHIJ', 'Delivered', 'Peru', 'Whole Foods, USA'),
(14, 'SHP-KLMNO', 'Delivered', 'Chile', 'Super Fruct, France'),
(15, 'SHP-PQRST', 'Shipped', 'Mexico', 'FreshMart EU, Rotterdam'),
(1, 'SHP-UVWXY', 'Pending', 'Mexico', 'FreshMart EU, Rotterdam'),
(4, 'SHP-Z1234', 'Pending', 'Indonesia', 'Juice World Inc., UK'),
(6, 'SHP-56789', 'Shipped', 'Indonesia', 'The Coffee House, USA'),
(8, 'SHP-13579', 'Processing at Origin', 'Vietnam', 'Dubai Imports, UAE');


-- 8. Transactions (10 transactions)
INSERT INTO transactions (offer_id, payment_method, total_value, platform_fee, status) VALUES
(2, 'Telegraphic Transfer', 30000.00, 1800.00, 'Completed'),
(5, 'Letter of Credit', 12500.00, 750.00, 'Payout to Exporter Complete'),
(9, 'Escrow', 49000.00, 2940.00, 'Completed'),
(14, 'Telegraphic Transfer', 10500.00, 630.00, 'Completed'),
(15, 'Escrow', 2750.00, 165.00, 'Payout to Exporter Complete'),
(7, 'Letter of Credit', 20000.00, 1200.00, 'Funds in Escrow'),
(1, 'Letter of Credit', 12500.00, 750.00, 'Pending Buyer Payment'),
(4, 'Escrow', 9600.00, 576.00, 'Pending Buyer Payment'),
(6, 'Telegraphic Transfer', 12500.00, 750.00, 'Funds in Escrow'),
(8, 'Escrow', 3500.00, 210.00, 'Pending Buyer Payment');


-- 9. More Users (10 users)
INSERT INTO users (role, name, email, password_hash, id_number, address, nib, tax_number, photo_url, is_verified) VALUES
('exporter', 'Nusantara Spices', 'exporter6@serenity.com', 'hashed_password_placeholder', 'EXP-006', 'Jl. Rempah No. 1, Ambon', '9120301234572', '02.345.678.9-106.000', 'https://placehold.co/100x100.png', true),
('buyer', 'Singaporean Traders', 'buyer9@serenity.com', 'hashed_password_placeholder', 'BUY-009', '1 Marina Bay, Singapore', NULL, 'SG123456789', 'https://placehold.co/100x100.png', true),
('farmer', 'Petani Rempah Maluku', 'farmer7@serenity.com', 'hashed_password_placeholder', 'FARM-007', 'Desa Cengkeh, Maluku', NULL, '03.123.456.7-896.000', 'https://placehold.co/100x100.png', true),
('exporter', 'Oceania Fresh Produce', 'exporter7@serenity.com', 'hashed_password_placeholder', 'EXP-007', 'Jl. Pelabuhan, Surabaya', '9120301234573', '02.345.678.9-107.000', 'https://placehold.co/100x100.png', true),
('buyer', 'Australian Fruit Co.', 'buyer10@serenity.com', 'hashed_password_placeholder', 'BUY-010', '100 George St, Sydney, Australia', NULL, 'AU987654321', 'https://placehold.co/100x100.png', true),
('farmer', 'Petani Buah Tropis', 'farmer8@serenity.com', 'hashed_password_placeholder', 'FARM-008', 'Desa Mangga, Jawa Timur', NULL, '03.123.456.7-897.000', 'https://placehold.co/100x100.png', true),
('exporter', 'Asian Grain Corp', 'exporter8@serenity.com', 'hashed_password_placeholder', 'EXP-008', 'Jl. Industri, Semarang', '9120301234574', '02.345.678.9-108.000', 'https://placehold.co/100x100.png', false),
('buyer', 'Seoul Food Imports', 'buyer11@serenity.com', 'hashed_password_placeholder', 'BUY-011', 'Gangnam-gu, Seoul, South Korea', NULL, 'KR123456789', 'https://placehold.co/100x100.png', true),
('farmer', 'Kelompok Tani Subur', 'farmer9@serenity.com', 'hashed_password_placeholder', 'FARM-009', 'Lembang, Jawa Barat', NULL, '03.123.456.7-898.000', 'https://placehold.co/100x100.png', true),
('farmer', 'Petani Kopi Mandiri', 'farmer10@serenity.com', 'hashed_password_placeholder', 'FARM-010', 'Toraja, Sulawesi Selatan', NULL, '03.123.456.7-899.000', 'https://placehold.co/100x100.png', false);


-- 10. More Product Certifications (10 relations)
INSERT INTO product_certifications (commodity_id, certification_id) VALUES
(1, 4), (2, 4), (6, 5), (7, 5), (10, 4),
(11, 2), (13, 1), (13, 2), (15, 5), (9, 4);

