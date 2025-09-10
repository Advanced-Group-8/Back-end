CREATE TABLE IF NOT EXISTS profile (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    company_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- address MÅSTE komma före package (dependency)
CREATE TABLE IF NOT EXISTS address (
    id BIGSERIAL PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100)
);
-- Nu kan package referera till både profile och address
CREATE TABLE IF NOT EXISTS package (
    id BIGSERIAL PRIMARY KEY,
    sender_id BIGINT,
    receiver_id BIGINT,
    sender_address_id BIGINT,
    receiver_address_id BIGINT,
    current_carrier_id BIGINT,
    device_id VARCHAR(100) NOT NULL,
    status VARCHAR(50),
    tracking_code VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    eta TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES profile (id),
    FOREIGN KEY (receiver_id) REFERENCES profile (id),
    FOREIGN KEY (current_carrier_id) REFERENCES profile (id),
    FOREIGN KEY (sender_address_id) REFERENCES address (id),
    FOREIGN KEY (receiver_address_id) REFERENCES address (id)
);
CREATE TABLE IF NOT EXISTS contactInfo (
    id BIGSERIAL PRIMARY KEY,
    profile_id BIGINT,
    phone VARCHAR(20),
    address VARCHAR(255),
    FOREIGN KEY (profile_id) REFERENCES profile (id)
);
CREATE TABLE IF NOT EXISTS package_tracking (
    id BIGSERIAL PRIMARY KEY,
    device_id VARCHAR(100) NOT NULL,
    lat DECIMAL(9, 6),
    lng DECIMAL(9, 6),
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);