-- Drop existing types and tables in reverse order of dependency to avoid errors
DROP TABLE IF EXISTS "notifications";
DROP TABLE IF EXISTS "value_chain_logs";
DROP TABLE IF EXISTS "payments";
DROP TABLE IF EXISTS "shipments";
DROP TABLE IF EXISTS "offers";
DROP TABLE IF EXISTS "partnerships";
DROP TABLE IF EXISTS "certifications";
DROP TABLE IF EXISTS "commodities";
DROP TABLE IF EXISTS "users";

DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS offer_status;
DROP TYPE IF EXISTS partnership_status;
DROP TYPE IF EXISTS shipment_status;
DROP TYPE IF EXISTS payment_status;

-- Define ENUM types
CREATE TYPE user_role AS ENUM ('admin', 'exporter', 'buyer', 'farmer', 'peternak', 'nelayan', 'pengelola_hasil_hutan', 'pengelola_hasil_kebun');
CREATE TYPE offer_status AS ENUM ('pending', 'accepted', 'rejected', 'negotiating', 'fulfilled');
CREATE TYPE partnership_status AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE shipment_status AS ENUM ('pending', 'in_transit', 'delivered', 'delayed');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'in_escrow');

-- Create tables
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "role" user_role NOT NULL,
  "address" TEXT,
  "id_number" VARCHAR(255) UNIQUE,
  "tax_number" VARCHAR(255) UNIQUE,
  "photo_url" VARCHAR(255),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "commodities" (
  "id" SERIAL PRIMARY KEY,
  "exporter_id" INTEGER REFERENCES "users"("id"),
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "origin" VARCHAR(255),
  "price_per_kg" NUMERIC(10, 2),
  "stock_kg" NUMERIC(10, 2),
  "status" VARCHAR(50) DEFAULT 'active',
  "image_url" VARCHAR(255),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "certifications" (
  "id" SERIAL PRIMARY KEY,
  "commodity_id" INTEGER REFERENCES "commodities"("id"),
  "user_id" INTEGER REFERENCES "users"("id"),
  "name" VARCHAR(255) NOT NULL,
  "issuing_body" VARCHAR(255),
  "valid_until" DATE,
  "document_url" VARCHAR(255),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "partnerships" (
  "id" SERIAL PRIMARY KEY,
  "exporter_id" INTEGER REFERENCES "users"("id"),
  "farmer_id" INTEGER REFERENCES "users"("id"),
  "status" partnership_status DEFAULT 'pending',
  "start_date" DATE,
  "end_date" DATE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("exporter_id", "farmer_id")
);

CREATE TABLE "offers" (
  "id" SERIAL PRIMARY KEY,
  "commodity_id" INTEGER REFERENCES "commodities"("id"),
  "buyer_id" INTEGER REFERENCES "users"("id"),
  "exporter_id" INTEGER REFERENCES "users"("id"),
  "quantity_kg" NUMERIC(10, 2),
  "total_price" NUMERIC(12, 2),
  "status" offer_status DEFAULT 'pending',
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "shipments" (
  "id" SERIAL PRIMARY KEY,
  "offer_id" INTEGER REFERENCES "offers"("id"),
  "tracking_number" VARCHAR(255) UNIQUE,
  "shipping_partner" VARCHAR(255),
  "status" shipment_status DEFAULT 'pending',
  "estimated_delivery" DATE,
  "actual_delivery" DATE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "payments" (
  "id" SERIAL PRIMARY KEY,
  "offer_id" INTEGER REFERENCES "offers"("id"),
  "amount" NUMERIC(12, 2),
  "status" payment_status DEFAULT 'pending',
  "payment_method" VARCHAR(255),
  "transaction_id" VARCHAR(255) UNIQUE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "value_chain_logs" (
  "id" SERIAL PRIMARY KEY,
  "shipment_id" INTEGER REFERENCES "shipments"("id"),
  "step_name" VARCHAR(255),
  "location" VARCHAR(255),
  "timestamp" TIMESTAMP WITH TIME ZONE,
  "notes" TEXT
);

CREATE TABLE "notifications" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "users"("id"),
  "title" VARCHAR(255),
  "message" TEXT,
  "is_read" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX ON "commodities" ("exporter_id");
CREATE INDEX ON "certifications" ("commodity_id");
CREATE INDEX ON "partnerships" ("exporter_id", "farmer_id");
CREATE INDEX ON "offers" ("buyer_id", "exporter_id");
CREATE INDEX ON "shipments" ("offer_id");
CREATE INDEX ON "payments" ("offer_id");
CREATE INDEX ON "notifications" ("user_id");
