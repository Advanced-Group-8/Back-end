-- V1__add_device_and_update_existing_tables.sql

-- Create device table
CREATE TABLE IF NOT EXISTS device (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add device_id to package table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='package' AND column_name='device_id'
    ) THEN
        ALTER TABLE package
        ADD COLUMN device_id BIGINT REFERENCES device(id);
    END IF;
END$$;

-- Add device_id to package_tracking table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='package_tracking' AND column_name='device_id'
    ) THEN
        ALTER TABLE package_tracking
        ADD COLUMN device_id BIGINT REFERENCES device(id);
    END IF;
END$$;
