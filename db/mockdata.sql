-- mockdata.sql
-- Clear existing data
TRUNCATE TABLE package_tracking RESTART IDENTITY CASCADE;
TRUNCATE TABLE package RESTART IDENTITY CASCADE;
TRUNCATE TABLE contactInfo RESTART IDENTITY CASCADE;
TRUNCATE TABLE address RESTART IDENTITY CASCADE;
TRUNCATE TABLE profile RESTART IDENTITY CASCADE;
TRUNCATE TABLE device RESTART IDENTITY CASCADE;

-- Insert devices
INSERT INTO device (created_at) VALUES
('2024-10-01 08:00:00'),  -- DEVICE 1
('2024-10-01 09:00:00'),  -- DEVICE 2
('2024-10-01 10:00:00');  -- DEVICE 3

-- Insert profiles
INSERT INTO profile (email, name, password_hash, role, company_name)
VALUES
('john.doe@example.com','John Doe','$2b$10$abcdefghijklmnopqrstuvwxyz','customer','Acme AB'),
('jane.smith@logistics.com','Jane Smith','$2b$10$zyxwvutsrqponmlkjihgfedcba','carrier','SnabbTransport AB'),
('admin@logi.com','Admin User','$2b$10$1234567890abcdefghijklmnop','admin','Logi Systems'),
('erik.karlsson@company.se','Erik Karlsson','$2b$10$qwertyuiopasdfghjklzxcvbnm','customer','Tech Solutions AB'),
('maria.olsson@transport.se','Maria Olsson','$2b$10$mnbvcxzlkjhgfdsapoiuytrewq','carrier','Nordic Transport AB'),
('customer@test.com','Test Customer','$2b$10$testhashedpassword123456789','customer','Test Företag');

-- Insert addresses
INSERT INTO address (street, city, postal_code, country)
VALUES
('Kungsgatan 1', 'Stockholm', '11143', 'Sweden'),
('Götgatan 25', 'Stockholm', '11621', 'Sweden'),
('Avenyn 15', 'Göteborg', '41136', 'Sweden'),
('Malmövägen 8', 'Malmö', '21120', 'Sweden'),
('Storgatan 42', 'Uppsala', '75311', 'Sweden'),
('Hamngatan 3', 'Helsingborg', '25221', 'Sweden'),
('Drottninggatan 88', 'Stockholm', '11136', 'Sweden'),
('Vasagatan 12', 'Göteborg', '41137', 'Sweden');

-- Insert contact info
INSERT INTO contactInfo (profile_id, address_id, phone)
VALUES
(1, 1, '+46701234567'),
(2, 2, '+46709876543'),
(3, 3, '+46705555555'),
(4, 4, '+46701111111'),
(5, 5, '+46702222222'),
(6, 6, '+46703333333');

-- Insert packages (device_id references device.id)
INSERT INTO package (sender_id, receiver_id, sender_address_id, receiver_address_id, current_carrier_id, device_id, status, tracking_code, eta)
VALUES
(1, 4, 1, 4, 2, 1, 'in_transit', 'TRK1234-5678-9012-3456', '2024-09-10 14:30:00'),
(4, 1, 4, 1, 5, 2, 'delivered', 'TRK9876-5432-1098-7654', '2024-09-05 10:15:00'),
(1, 6, 1, 6, 2, 3, 'pending', 'TRK5555-6666-7777-8888', '2024-09-12 16:00:00');

-- Insert package tracking
INSERT INTO package_tracking (device_id, lat, lng, temperature, humidity, created_at)
VALUES
-- DEVICE 1
(1, 59.334591, 18.063240, 2.5, 0.452, '2024-09-07 08:00:00'),
(1, 59.335000, 18.064000, 2.7, 0.460, '2024-09-07 12:00:00'),
(1, 59.336000, 18.065500, 3.0, 0.475, '2024-09-07 16:00:00'),
-- DEVICE 2
(2, 55.604981, 13.003822, -1.2, 0.385, '2024-09-04 09:00:00'),
(2, 55.605500, 13.004500, -0.8, 0.400, '2024-09-04 13:30:00'),
(2, 55.606200, 13.005200, -0.5, 0.412, '2024-09-04 18:00:00'),
-- DEVICE 3
(3, 59.250000, 17.000000, 1.5, 0.500, '2024-09-12 08:00:00'),
(3, 59.251000, 17.001500, 1.7, 0.510, '2024-09-12 12:00:00');
