CREATE TABLE IF NOT EXISTS profile (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS address (
    id BIGSERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS package (
    id BIGSERIAL PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    sender_address_id BIGINT NOT NULL,
    receiver_address_id BIGINT NOT NULL,
    current_carrier_id BIGINT NOT NULL,
    device_id VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    tracking_code VARCHAR(100) NOT NULL,
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
    profile_id BIGINT NOT NULL,
    address_id BIGINT NOT NULL,
    phone VARCHAR(20),
    FOREIGN KEY (profile_id) REFERENCES profile (id) FOREIGN KEY (address_id) REFERENCES address (id)
);
CREATE TABLE IF NOT EXISTS package_tracking (
    id BIGSERIAL PRIMARY KEY,
    device_id VARCHAR(100) NOT NULL,
    lat DECIMAL(9, 6) NOT NULL,
    lng DECIMAL(9, 6) NOT NULL,
    temperature DOUBLE PRECISION NOT NULL,
    humidity DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);