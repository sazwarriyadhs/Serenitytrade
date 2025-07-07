-- Serenity AgriExport Hub Database Schema
-- This script defines the structure for the PostgreSQL database.

-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define ENUM types for status fields to ensure data consistency
CREATE TYPE user_role AS ENUM ('farmer', 'exporter', 'buyer', 'admin');
CREATE TYPE user_status AS ENUM ('Pending Verification', 'Verified', 'Suspended');
CREATE TYPE commodity_status AS ENUM ('active', 'archived');
CREATE TYPE partnership_status AS ENUM ('Pending', 'Active', 'Terminated');
CREATE TYPE offer_type AS ENUM ('Offer', 'Request');
CREATE TYPE offer_status AS ENUM ('Finding Exporters', 'Offer Sent', 'Negotiating', 'Offer Received', 'Offer Accepted', 'Fulfilled', 'Cancelled');
CREATE TYPE transaction_status AS ENUM ('Pending', 'In Escrow', 'Payout Complete', 'Failed', 'Completed', 'Processed');
CREATE TYPE shipment_status AS ENUM ('Harvest Logged', 'Picked up by Exporter', 'Received at Warehouse', 'Export Processing', 'Shipped', 'In Transit to Buyer', 'Customs Clearance', 'Delivered');

-- Users Table
-- Stores information about all users on the platform, regardless of role.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL,
    status user_status DEFAULT 'Pending Verification',
    address TEXT,
    id_number VARCHAR(100), -- For national ID or registration number
    nib VARCHAR(100), -- Business Identification Number (for companies)
    tax_number VARCHAR(100), -- NPWP
    photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partnerships Table
-- Manages the many-to-many relationship between exporters and farmers.
-- Constraints (1 farmer to 1 exporter, 1 exporter to max 10 farmers) are handled at the application level.
CREATE TABLE partnerships (
    exporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status partnership_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (exporter_id, farmer_id)
);

-- Commodities Table
-- Stores all commodities listed by exporters.
CREATE TABLE commodities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_kg NUMERIC(10, 2) NOT NULL,
    stock_kg NUMERIC(12, 2) NOT NULL,
    origin VARCHAR(255),
    image_url TEXT,
    status commodity_status DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Certifications Table
-- Stores certifications linked to a specific commodity or farmer's product.
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Linked to the user (farmer) who owns it
    commodity_id UUID REFERENCES commodities(id) ON DELETE CASCADE, -- Can also be linked directly to a commodity listing
    name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    verified_at TIMESTAMPTZ, -- Null if not yet verified by admin
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Offers Table
-- Central table for managing both offers from exporters and requests from buyers.
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type offer_type NOT NULL, -- 'Offer' or 'Request'
    commodity_name VARCHAR(255) NOT NULL, -- Denormalized for flexibility, especially for requests
    commodity_id UUID REFERENCES commodities(id) ON DELETE SET NULL, -- Nullable if it's a new request
    buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exporter_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Nullable for initial buyer requests
    quantity_kg NUMERIC(12, 2) NOT NULL,
    total_price NUMERIC(12, 2), -- Nullable for initial requests
    status offer_status NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Shipments Table
-- Tracks the physical movement of goods for a fulfilled offer.
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offer_id UUID UNIQUE NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
    tracking_id VARCHAR(100) UNIQUE NOT NULL,
    status shipment_status NOT NULL,
    estimated_delivery_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Shipment History Table
-- Logs each step of the shipment process.
CREATE TABLE shipment_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
    step shipment_status NOT NULL,
    location VARCHAR(255),
    event_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT
);

-- Transactions Table
-- Tracks the financial flow for each transaction.
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offer_id UUID UNIQUE NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    platform_fee NUMERIC(10, 2) NOT NULL,
    exporter_payout NUMERIC(12, 2) NOT NULL,
    farmer_payout NUMERIC(12, 2), -- Payout from exporter to farmer
    status transaction_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for foreign keys to improve query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_partnerships_farmer_id ON partnerships(farmer_id);
CREATE INDEX idx_commodities_exporter_id ON commodities(exporter_id);
CREATE INDEX idx_certifications_user_id ON certifications(user_id);
CREATE INDEX idx_offers_buyer_id ON offers(buyer_id);
CREATE INDEX idx_offers_exporter_id ON offers(exporter_id);
CREATE INDEX idx_shipments_offer_id ON shipments(offer_id);
CREATE INDEX idx_shipment_history_shipment_id ON shipment_history(shipment_id);
CREATE INDEX idx_transactions_offer_id ON transactions(offer_id);

-- Auto-update the 'updated_at' column on any change
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with an 'updated_at' column
CREATE TRIGGER set_timestamp_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_partnerships BEFORE UPDATE ON partnerships FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_commodities BEFORE UPDATE ON commodities FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_offers BEFORE UPDATE ON offers FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_shipments BEFORE UPDATE ON shipments FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_transactions BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
