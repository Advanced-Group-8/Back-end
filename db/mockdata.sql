-- Mock Profiles (Users)
INSERT INTO profile (email, password_hash, role, company_name)
VALUES (
        'john.doe@example.com',
        '$2b$10$abcdefghijklmnopqrstuvwxyz',
        'customer',
        'Acme AB'
    ),
    (
        'jane.smith@logistics.com',
        '$2b$10$zyxwvutsrqponmlkjihgfedcba',
        'carrier',
        'SnabbTransport AB'
    ),
    (
        'admin@logi.com',
        '$2b$10$1234567890abcdefghijklmnop',
        'admin',
        'Logi Systems'
    ),
    (
        'erik.karlsson@company.se',
        '$2b$10$qwertyuiopasdfghjklzxcvbnm',
        'customer',
        'Tech Solutions AB'
    ),
    (
        'maria.olsson@transport.se',
        '$2b$10$mnbvcxzlkjhgfdsapoiuytrewq',
        'carrier',
        'Nordic Transport AB'
    ),
    (
        'customer@test.com',
        '$2b$10$testhashedpassword123456789',
        'customer',
        'Test Företag'
    );
-- Mock Addresses
INSERT INTO address (street, city, postal_code, country)
VALUES ('Kungsgatan 1', 'Stockholm', '11143', 'Sweden'),
    ('Götgatan 25', 'Stockholm', '11621', 'Sweden'),
    ('Avenyn 15', 'Göteborg', '41136', 'Sweden'),
    ('Malmövägen 8', 'Malmö', '21120', 'Sweden'),
    ('Storgatan 42', 'Uppsala', '75311', 'Sweden'),
    ('Hamngatan 3', 'Helsingborg', '25221', 'Sweden'),
    (
        'Drottninggatan 88',
        'Stockholm',
        '11136',
        'Sweden'
    ),
    ('Vasagatan 12', 'Göteborg', '41137', 'Sweden');
-- Mock Contact Info
INSERT INTO contactInfo (profile_id, phone, address)
VALUES (1, '+46701234567', 'Kungsgatan 1, Stockholm'),
    (2, '+46709876543', 'Götgatan 25, Stockholm'),
    (3, '+46705555555', 'Avenyn 15, Göteborg'),
    (4, '+46701111111', 'Malmövägen 8, Malmö'),
    (5, '+46702222222', 'Storgatan 42, Uppsala'),
    (6, '+46703333333', 'Hamngatan 3, Helsingborg');
-- Mock Packages
INSERT INTO package (
        sender_id,
        receiver_id,
        sender_address_id,
        receiver_address_id,
        current_carrier_id,
        device_id,
        status,
        tracking_code,
        eta
    )
VALUES (
        1,
        4,
        1,
        4,
        2,
        'DEVICE001',
        'in_transit',
        'TRK1234-5678-9012-3456',
        '2024-09-10 14:30:00'
    ),
    (
        4,
        1,
        4,
        1,
        5,
        'DEVICE002',
        'delivered',
        'TRK9876-5432-1098-7654',
        '2024-09-05 10:15:00'
    ),
    (
        1,
        6,
        1,
        6,
        2,
        'DEVICE003',
        'pending',
        'TRK5555-6666-7777-8888',
        '2024-09-12 16:00:00'
    ),
    (
        6,
        4,
        6,
        4,
        5,
        'DEVICE004',
        'in_transit',
        'TRK1111-2222-3333-4444',
        '2024-09-11 09:45:00'
    ),
    (
        4,
        1,
        4,
        7,
        2,
        'DEVICE005',
        'out_for_delivery',
        'TRK4444-5555-6666-7777',
        '2024-09-08 13:20:00'
    );
-- Mock Package Tracking (GPS + temperature + humidity)
INSERT INTO package_tracking (
        device_id,
        lat,
        lng,
        temperature,
        humidity,
        created_at
    )
VALUES -- Package 1 tracking
    (
        'DEVICE001',
        59.334591,
        18.063240,
        2.5,
        45.2,
        '2024-09-07 08:00:00'
    ),
    (
        'DEVICE001',
        58.756416,
        16.628838,
        2.8,
        47.8,
        '2024-09-07 12:30:00'
    ),
    (
        'DEVICE001',
        55.604981,
        13.003822,
        3.2,
        52.1,
        '2024-09-07 18:45:00'
    ),
    -- Package 2 tracking
    (
        'DEVICE002',
        55.604981,
        13.003822,
        -1.2,
        38.5,
        '2024-09-04 09:00:00'
    ),
    (
        'DEVICE002',
        59.334591,
        18.063240,
        -0.8,
        41.2,
        '2024-09-04 15:30:00'
    ),
    -- Package 4 tracking
    (
        'DEVICE004',
        56.048889,
        12.694444,
        4.5,
        55.8,
        '2024-09-08 07:15:00'
    ),
    (
        'DEVICE004',
        57.708870,
        11.974560,
        5.1,
        58.3,
        '2024-09-08 11:45:00'
    ),
    (
        'DEVICE004',
        55.604981,
        13.003822,
        5.8,
        61.7,
        '2024-09-08 16:20:00'
    ),
    -- Package 5 tracking
    (
        'DEVICE005',
        55.604981,
        13.003822,
        1.8,
        43.8,
        '2024-09-06 06:30:00'
    ),
    (
        'DEVICE005',
        59.334591,
        18.063240,
        2.1,
        45.1,
        '2024-09-06 14:15:00'
    );