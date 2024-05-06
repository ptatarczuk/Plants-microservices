INSERT INTO plants (id, name, description, photo, watering_interval)
VALUES ('begonia', 'Begonia', 'Begonia Martha Stewart',
        'https://perenual.com/storage/species_image/1211_begonia_martha_stewart/regular/52599838828_d48aa4283c_b.jpg',
        3),
       ('jewe_plant', 'Jewel Plant', 'Bertolonia maculata',
        'https://perenual.com/storage/species_image/1272_bertolonia_maculata/regular/Bertolonia_maculata_2019-04-16_0864.jpg',
        4),
       ('angelwings', 'Angel Wings', 'Caladium bicolor',
        'https://perenual.com/storage/species_image/1457_caladium_bicolor/regular/25575875658_d782fb76f1_b.jpg', 5),
       ('rattlesnake_plant', 'Rattlesnake Plant', 'Calathea lancifolia',
        'https://perenual.com/storage/species_image/1469_calathea_lancifolia/regular/3676781257_2e8730f471_b.jpg', 5),
       ('peacock_plant', 'Peacock Plant', 'Calathea makoyana',
        'https://perenual.com/storage/species_image/1470_calathea_makoyana/regular/5455983461_9d5ac395aa_b.jpg', 5),
       ('zebra_plant', 'Zebra Plant', 'Calathea zebrina',
        'https://perenual.com/storage/species_image/1471_calathea_zebrina/regular/24798559861_0c6830ba26_b.jpg', 5),
       ('ornamental_pepper', 'Ornamental Pepper', 'Capsicum annuum Black Pearl',
        'https://perenual.com/storage/species_image/1597_capsicum_annuum_black_pearl/regular/2560px-Capsicum_annuum_Black_Pearl_6zz.jpg',
        5),
       ('orchid', 'Orchid', 'Cattleya (group)',
        'https://perenual.com/storage/species_image/1716_cattleya_group/regular/orchid-flower-colombia-flowers.jpg', 5),
       ('parlor_palm', 'Parlor Palm', 'Chamaedorea elegans',
        'https://perenual.com/storage/species_image/1820_chamaedorea_elegans/regular/24981394791_176142abd3_b.jpg', 5),
       ('chamaedorea', 'Chamaedorea', 'Chamaedorea microspadix',
        'https://perenual.com/storage/species_image/1821_chamaedorea_microspadix/regular/26815590515_805ab5b081_b.jpg',
        5);

-- UUID()

INSERT INTO users (id, email, password, role, username)
VALUES ('john', 'john@gmail.com', '$2a$10$lk.DIEDro0p2WrP9YapebO0r7zT1G88KD4rznH6GqSCv2MTmi.gzC', 'USER', 'john'),
       ('susy', 'susy@gmail.com', '$2a$10$jNlbUwAC7sYsPqtw60A19uGWNJrmGIVdNuw2iZhS8bdaK7L/CtSZi', 'USER', 'susy'),
       ('olga', 'olga@gmail.com', '$2a$10$nJG/HmHsSf/rASXht9u41eXaExVWA7m218ueIkbQfHi0pXQWx8FhW', 'USER', 'olga');

INSERT INTO users_plants (next_watering, user_id, plant_id)
VALUES ('2024-03-18 21:41:34.585887', 'john', 'chamaedorea'),
       ('2024-03-18 21:41:34.585887', 'john', 'ornamental_pepper'),
       ('2024-03-18 21:41:34.585887', 'john', 'rattlesnake_plant'),
       ('2024-03-18 21:41:34.585887', 'susy', 'rattlesnake_plant'),
       ('2024-03-18 21:41:34.585887', 'susy', 'zebra_plant'),
       ('2024-03-18 21:41:34.585887', 'susy', 'begonia'),
       ('2024-03-18 21:41:34.585887', 'susy', 'begonia'),
       ('2024-03-18 21:41:34.585887', 'susy', 'peacock_plant'),
       ('2024-03-18 21:41:34.585887', 'susy', 'orchid'),
       ('2024-03-18 21:41:34.585887', 'susy', 'jewe_plant');
