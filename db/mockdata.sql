-- Insert mock data

-- Mock Profiles (Users)
INSERT INTO profile (email, password_hash, role, company_name) VALUES
('john.doe@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'customer', 'Acme Corp'),
('jane.smith@logistics.com', '$2b$10$zyxwvutsrqponmlkjihgfedcba', 'carrier', 'FastDelivery AB'),
('admin@logi.com', '$2b$10$1234567890abcdefghijklmnop', 'admin', 'Logi Systems'),
('erik.karlsson@company.se', '$2b$10$qwertyuiopasdfghjklzxcvbnm', 'customer', 'Tech Solutions'),
('maria.olsson@transport.se', '$2b$10$mnbvcxzlkjhgfdsapoiuytrewq', 'carrier', 'Nordic Transport'),
('customer@test.com', '$2b$10$testhashedpassword123456789', 'customer', 'Test Company');

-- Mock Addresses
INSERT INTO address (street, city, postal_code, country) VALUES
('Kungsgatan 1', 'Stockholm', '11143', 'Sweden'),
('Götgatan 25', 'Stockholm', '11621', 'Sweden'),
('Avenyn 15', 'Göteborg', '41136', 'Sweden'),
('Malmövägen 8', 'Malmö', '21120', 'Sweden'),
('Storgatan 42', 'Uppsala', '75311', 'Sweden'),
('Hamngatan 3', 'Helsingborg', '25221', 'Sweden'),
('Drottninggatan 88', 'Stockholm', '11136', 'Sweden'),
('Vasagatan 12', 'Göteborg', '41137', 'Sweden');

-- Mock Contact Info
INSERT INTO contactInfo (profile_id, phone, address) VALUES
(1, '+46701234567', 'Kungsgatan 1, Stockholm'),
(2, '+46709876543', 'Götgatan 25, Stockholm'),
(3, '+46705555555', 'Avenyn 15, Göteborg'),
(4, '+46701111111', 'Malmövägen 8, Malmö'),
(5, '+46702222222', 'Storgatan 42, Uppsala'),
(6, '+46703333333', 'Hamngatan 3, Helsingborg');

-- Mock Packages
INSERT INTO package (sender_id, receiver_id, sender_address_id, receiver_address_id, current_carrier_id, status, tracking_code, eta) VALUES
(1, 4, 1, 4, 'CARRIER001', 'in_transit', 'TRK123456789', '2024-09-10 14:30:00'),
(4, 1, 4, 1, 'CARRIER002', 'delivered', 'TRK987654321', '2024-09-05 10:15:00'),
(1, 6, 1, 6, 'CARRIER001', 'pending', 'TRK555666777', '2024-09-12 16:00:00'),
(6, 4, 6, 4, 'CARRIER003', 'in_transit', 'TRK111222333', '2024-09-11 09:45:00'),
(4, 1, 4, 7, 'CARRIER002', 'out_for_delivery', 'TRK444555666', '2024-09-08 13:20:00'),
(1, 6, 7, 8, 'CARRIER001', 'pending', 'TRK777888999', '2024-09-15 11:30:00');

-- Mock Location Data (GPS tracking)
INSERT INTO location (package_id, lat, lng, created_at) VALUES
-- Package 1 (in transit Stockholm -> Malmö)
(1, 59.334591, 18.063240, '2024-09-07 08:00:00'), -- Stockholm start
(1, 58.756416, 16.628838, '2024-09-07 12:30:00'), -- Norrköping
(1, 55.604981, 13.003822, '2024-09-07 18:45:00'), -- Malmö (current)

-- Package 2 (delivered)
(2, 55.604981, 13.003822, '2024-09-04 09:00:00'), -- Malmö start
(2, 59.334591, 18.063240, '2024-09-04 15:30:00'), -- Stockholm delivered

-- Package 4 (in transit)
(4, 56.048889, 12.694444, '2024-09-08 07:15:00'), -- Helsingborg start
(4, 57.708870, 11.974560, '2024-09-08 11:45:00'), -- Göteborg
(4, 55.604981, 13.003822, '2024-09-08 16:20:00'), -- Malmö (current)

-- Package 5 (out for delivery)
(5, 55.604981, 13.003822, '2024-09-06 06:30:00'), -- Malmö start
(5, 59.334591, 18.063240, '2024-09-06 14:15:00'); -- Stockholm (out for delivery)

-- Mock Temperature Data
INSERT INTO temperature (package_id, temperature, created_at) VALUES
-- Package 1 temperature monitoring
(1, 2.5, '2024-09-07 08:00:00'),
(1, 2.8, '2024-09-07 10:00:00'),
(1, 3.2, '2024-09-07 12:00:00'),
(1, 2.9, '2024-09-07 14:00:00'),
(1, 2.7, '2024-09-07 16:00:00'),

-- Package 2 temperature monitoring
(2, -1.2, '2024-09-04 09:00:00'),
(2, -0.8, '2024-09-04 11:00:00'),
(2, -1.5, '2024-09-04 13:00:00'),
(2, -1.0, '2024-09-04 15:00:00'),

-- Package 4 temperature monitoring
(4, 4.5, '2024-09-08 07:15:00'),
(4, 5.1, '2024-09-08 09:15:00'),
(4, 5.8, '2024-09-08 11:15:00'),
(4, 6.2, '2024-09-08 13:15:00'),

-- Package 5 temperature monitoring
(5, 1.8, '2024-09-06 06:30:00'),
(5, 2.1, '2024-09-06 08:30:00'),
(5, 2.4, '2024-09-06 10:30:00'),
(5, 2.0, '2024-09-06 12:30:00');

-- Mock Humidity Data
INSERT INTO humidity (package_id, humidity, created_at) VALUES
-- Package 1 humidity monitoring
(1, 45.2, '2024-09-07 08:00:00'),
(1, 47.8, '2024-09-07 10:00:00'),
(1, 52.1, '2024-09-07 12:00:00'),
(1, 48.9, '2024-09-07 14:00:00'),
(1, 46.5, '2024-09-07 16:00:00'),

-- Package 2 humidity monitoring
(2, 38.5, '2024-09-04 09:00:00'),
(2, 41.2, '2024-09-04 11:00:00'),
(2, 39.8, '2024-09-04 13:00:00'),
(2, 42.1, '2024-09-04 15:00:00'),

-- Package 4 humidity monitoring
(4, 55.8, '2024-09-08 07:15:00'),
(4, 58.3, '2024-09-08 09:15:00'),
(4, 61.7, '2024-09-08 11:15:00'),
(4, 59.2, '2024-09-08 13:15:00'),

-- Package 5 humidity monitoring
(5, 43.8, '2024-09-06 06:30:00'),
(5, 45.1, '2024-09-06 08:30:00'),
(5, 47.4, '2024-09-06 10:30:00'),
(5, 44.9, '2024-09-06 12:30:00');