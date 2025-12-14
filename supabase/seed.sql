-- Seed data for Mo'edim
-- 12 Biblical Feasts + 54 Torah Portions

-- ============================================
-- FEAST CONTENT (12 Feasts)
-- ============================================

INSERT INTO feast_content (code, name, hebrew_name, month, start_day, duration, category, scripture_refs, description, observance_notes) VALUES

-- SPRING FEASTS
('pesach', 'Passover', 'Pesach', 1, 14, 1, 'spring',
 '["Exodus 12:1-14", "Leviticus 23:5", "Numbers 28:16"]'::jsonb,
 'Commemorates the deliverance of Israel from Egypt when the destroying angel passed over the houses marked with lamb''s blood.',
 'Observed on the 14th day of the first month at twilight. Sacrifice and consume the Passover lamb. Remove all leaven from homes.'),

('unleavened_bread', 'Feast of Unleavened Bread', 'Chag HaMatzot', 1, 15, 7, 'spring',
 '["Exodus 12:15-20", "Leviticus 23:6-8", "Numbers 28:17-25"]'::jsonb,
 'Seven-day feast beginning the day after Passover, eating unleavened bread to remember the haste of the Exodus.',
 'No leaven in homes for 7 days. Holy convocations on first and seventh days. Offerings presented daily.'),

('firstfruits', 'Feast of Firstfruits', 'Yom HaBikkurim', 1, 18, 1, 'spring',
 '["Leviticus 23:9-14"]'::jsonb,
 'Offering of the first sheaf of barley harvest, waved before YHWH on the day after the weekly Sabbath during Unleavened Bread.',
 'Wave offering of firstfruits. Counting of the omer begins (50 days to Shavuot).'),

-- SUMMER FEASTS
('shavuot', 'Feast of Weeks (Pentecost)', 'Shavuot', 3, 8, 1, 'summer',
 '["Leviticus 23:15-21", "Deuteronomy 16:9-12"]'::jsonb,
 'Celebrated 50 days after Firstfruits. Wheat harvest celebration and giving of the Torah at Sinai.',
 'Holy convocation. Two loaves of leavened bread waved. Commemorates covenant at Sinai and outpouring of the Spirit.'),

('new_wine', 'Festival of New Wine', 'Chag HaTirosh', 5, 3, 1, 'summer',
 '["Numbers 18:12", "Deuteronomy 18:4"]'::jsonb,
 'Celebration of the grape harvest and firstfruits of new wine.',
 'Firstfruits of wine offered. Begins the season of ripening grapes.'),

('new_oil', 'Festival of New Oil', 'Chag HaYitzhar', 6, 22, 1, 'summer',
 '["Exodus 23:16", "Numbers 18:12"]'::jsonb,
 'Celebration of the olive harvest and firstfruits of new oil.',
 'Firstfruits of oil offered. Marks the completion of the agricultural cycle.'),

('wood_offering', 'Day of Wood Offering', 'Qorban HaEtzim', 6, 23, 1, 'summer',
 '["Nehemiah 10:34", "Leviticus 6:12-13"]'::jsonb,
 'Day appointed for bringing wood to maintain the perpetual fire on the altar.',
 'Families bring wood for the altar fire. Community celebration.'),

-- FALL FEASTS
('trumpets', 'Day of Trumpets', 'Yom Teruah', 7, 1, 1, 'fall',
 '["Leviticus 23:23-25", "Numbers 29:1-6"]'::jsonb,
 'Holy convocation marked by blowing of trumpets/shofars. Day of remembrance and awakening.',
 'No laborious work. Memorial of blowing trumpets. Day of shouting and awakening.'),

('atonement', 'Day of Atonement', 'Yom Kippur', 7, 10, 1, 'fall',
 '["Leviticus 16", "Leviticus 23:26-32", "Numbers 29:7-11"]'::jsonb,
 'Most solemn day of the year. Day of fasting, repentance, and atonement for sin.',
 'Sabbath of complete rest. Afflict your souls (fast). High Priest enters Holy of Holies. Scapegoat sent into wilderness.'),

('sukkot', 'Feast of Tabernacles', 'Sukkot', 7, 15, 7, 'fall',
 '["Leviticus 23:33-43", "Numbers 29:12-34", "Deuteronomy 16:13-15"]'::jsonb,
 'Seven-day feast of rejoicing, dwelling in temporary shelters to remember wilderness wandering.',
 'Dwell in sukkot (booths). Daily offerings. Great rejoicing. Waving of the lulav and etrog.'),

('eighth_day', 'The Eighth Day Assembly', 'Shemini Atzeret', 7, 22, 1, 'fall',
 '["Leviticus 23:36", "Numbers 29:35-38"]'::jsonb,
 'Solemn assembly on the day following Sukkot. Day of intimate gathering with YHWH.',
 'Holy convocation. No laborious work. Final assembly of the feast season.'),

('dedication', 'Feast of Dedication', 'Hanukkah', 9, 25, 8, 'fall',
 '["John 10:22", "1 Maccabees 4:52-59"]'::jsonb,
 'Commemorates the rededication of the Temple after the Maccabean victory. Festival of Lights.',
 'Eight days. Lighting of the menorah. Remembrance of Temple purification and miracle of oil.');

-- ============================================
-- TORAH PORTIONS (54 Portions)
-- ============================================

-- GENESIS (Beresheet)
INSERT INTO torah_portions (number, name, hebrew, torah_reading, haftarah, brit_chadasha, summary) VALUES
(1, 'In the Beginning', 'Beresheet', 'Genesis 1:1-6:8', 'Isaiah 42:5-43:10', 'John 1:1-14', 'Creation of the world, Adam and Eve, Cain and Abel, genealogies to Noah'),
(2, 'Noah', 'Noach', 'Genesis 6:9-11:32', 'Isaiah 54:1-55:5', 'Matthew 24:36-44', 'The Flood, Noah''s ark, covenant with Noah, Tower of Babel'),
(3, 'Go Forth', 'Lech Lecha', 'Genesis 12:1-17:27', 'Isaiah 40:27-41:16', 'Acts 7:1-8', 'Abram''s call, journey to Canaan, covenant, circumcision'),
(4, 'He Appeared', 'Vayera', 'Genesis 18:1-22:24', '2 Kings 4:1-37', 'Luke 17:26-37', 'Three visitors, Sodom destroyed, Isaac''s birth, Akedat Yitzchak'),
(5, 'Sarah''s Life', 'Chayei Sarah', 'Genesis 23:1-25:18', '1 Kings 1:1-31', '1 Corinthians 15:50-57', 'Sarah''s death, finding wife for Isaac, Abraham''s death'),
(6, 'Generations', 'Toldot', 'Genesis 25:19-28:9', 'Malachi 1:1-2:7', 'Romans 9:6-16', 'Jacob and Esau, Isaac''s deception, birthright and blessing'),
(7, 'He Went Out', 'Vayetzei', 'Genesis 28:10-32:3', 'Hosea 12:13-14:10', 'John 1:43-51', 'Jacob''s ladder, marrying Leah and Rachel, birth of children'),
(8, 'He Sent', 'Vayishlach', 'Genesis 32:4-36:43', 'Obadiah 1:1-21', 'Hebrews 11:11-20', 'Wrestling with angel, reconciliation with Esau, Dinah incident'),
(9, 'He Settled', 'Vayeshev', 'Genesis 37:1-40:23', 'Amos 2:6-3:8', 'Acts 7:9-16', 'Joseph''s dreams, sold into slavery, Judah and Tamar, Joseph in prison'),
(10, 'At the End', 'Miketz', 'Genesis 41:1-44:17', '1 Kings 3:15-4:1', 'Acts 7:9-16', 'Pharaoh''s dreams, Joseph becomes viceroy, brothers come to Egypt'),
(11, 'He Drew Near', 'Vayigash', 'Genesis 44:18-47:27', 'Ezekiel 37:15-28', 'Acts 7:9-16', 'Judah pleads, Joseph reveals himself, family moves to Egypt'),
(12, 'He Lived', 'Vayechi', 'Genesis 47:28-50:26', '1 Kings 2:1-12', 'Hebrews 11:21-22', 'Jacob blesses sons, death of Jacob and Joseph');

-- EXODUS (Shemot)
INSERT INTO torah_portions (number, name, hebrew, torah_reading, haftarah, brit_chadasha, summary) VALUES
(13, 'Names', 'Shemot', 'Exodus 1:1-6:1', 'Isaiah 27:6-28:13', 'Matthew 2:1-15', 'Oppression in Egypt, birth of Moses, burning bush'),
(14, 'I Appeared', 'Vaera', 'Exodus 6:2-9:35', 'Ezekiel 28:25-29:21', 'Romans 9:14-17', 'First seven plagues, Pharaoh''s hardened heart'),
(15, 'Come', 'Bo', 'Exodus 10:1-13:16', 'Jeremiah 46:13-28', 'Luke 2:22-24', 'Final three plagues, Passover instituted, Exodus begins'),
(16, 'When He Sent', 'Beshalach', 'Exodus 13:17-17:16', 'Judges 4:4-5:31', '1 Corinthians 10:1-13', 'Crossing Red Sea, Song of Moses, manna and quail'),
(17, 'Jethro', 'Yitro', 'Exodus 18:1-20:23', 'Isaiah 6:1-7:6', 'Matthew 5:1-20', 'Jethro''s advice, Ten Commandments given at Sinai'),
(18, 'Judgments', 'Mishpatim', 'Exodus 21:1-24:18', 'Jeremiah 34:8-22', 'Matthew 5:38-42', 'Civil laws, Covenant ceremony, Moses ascends mountain'),
(19, 'Offering', 'Terumah', 'Exodus 25:1-27:19', '1 Kings 5:26-6:13', 'Hebrews 8:1-6', 'Instructions for Tabernacle, ark, table, lampstand, curtains'),
(20, 'You Shall Command', 'Tetzaveh', 'Exodus 27:20-30:10', 'Ezekiel 43:10-27', 'Philippians 4:10-20', 'Priestly garments, consecration of priests, incense altar'),
(21, 'When You Take', 'Ki Tisa', 'Exodus 30:11-34:35', '1 Kings 18:1-39', '2 Corinthians 3:7-18', 'Census, golden calf, Moses intercedes, new tablets'),
(22, 'He Assembled', 'Vayakhel', 'Exodus 35:1-38:20', '1 Kings 7:40-50', '2 Corinthians 9:1-11', 'Sabbath command, Tabernacle construction begins'),
(23, 'Accountings', 'Pekudei', 'Exodus 38:21-40:38', '1 Kings 7:51-8:21', 'Revelation 21:1-27', 'Tabernacle inventory, completion, God''s glory fills');

-- LEVITICUS (Vayikra)
INSERT INTO torah_portions (number, name, hebrew, torah_reading, haftarah, brit_chadasha, summary) VALUES
(24, 'He Called', 'Vayikra', 'Leviticus 1:1-5:26', 'Isaiah 43:21-44:23', 'Hebrews 10:1-18', 'Laws of sacrifices: burnt, grain, peace, sin, guilt offerings'),
(25, 'Command', 'Tzav', 'Leviticus 6:1-8:36', 'Jeremiah 7:21-8:3', 'Hebrews 7:23-8:6', 'Priestly duties, consecration of Aaron and sons'),
(26, 'Eighth Day', 'Shemini', 'Leviticus 9:1-11:47', '2 Samuel 6:1-7:17', 'Mark 7:1-23', 'First offerings, Nadab and Abihu, clean and unclean animals'),
(27, 'Infected', 'Tazria', 'Leviticus 12:1-13:59', '2 Kings 4:42-5:19', 'Luke 2:22-24', 'Childbirth purification, skin diseases, priestly examination'),
(28, 'Skin Disease', 'Metzora', 'Leviticus 14:1-15:33', '2 Kings 7:3-20', 'Matthew 8:1-4', 'Purification of skin disease, house contamination, bodily discharges'),
(29, 'After the Death', 'Acharei Mot', 'Leviticus 16:1-18:30', 'Ezekiel 22:1-19', 'Hebrews 9:11-28', 'Yom Kippur service, blood prohibition, sexual prohibitions'),
(30, 'Holy', 'Kedoshim', 'Leviticus 19:1-20:27', 'Amos 9:7-15', '1 Peter 1:13-21', 'Holiness code, loving neighbor, forbidden practices'),
(31, 'Say', 'Emor', 'Leviticus 21:1-24:23', 'Ezekiel 44:15-31', 'Luke 14:12-24', 'Priestly regulations, appointed times, blasphemer'),
(32, 'In Mount', 'Behar', 'Leviticus 25:1-26:2', 'Jeremiah 32:6-27', 'Luke 4:16-21', 'Sabbatical year, Jubilee, redemption of property'),
(33, 'In My Statutes', 'Bechukotai', 'Leviticus 26:3-27:34', 'Jeremiah 16:19-17:14', 'John 14:15-21', 'Blessings and curses, vows and dedications');

-- NUMBERS (Bamidbar)
INSERT INTO torah_portions (number, name, hebrew, torah_reading, haftarah, brit_chadasha, summary) VALUES
(34, 'In the Wilderness', 'Bamidbar', 'Numbers 1:1-4:20', 'Hosea 2:1-22', 'Romans 9:22-33', 'Census, camp arrangement, Levite duties'),
(35, 'Lift Up', 'Nasso', 'Numbers 4:21-7:89', 'Judges 13:2-25', 'John 7:53-8:11', 'Levite census, Nazarite vow, priestly blessing, tribal offerings'),
(36, 'When You Set Up', 'Beha''alotcha', 'Numbers 8:1-12:16', 'Zechariah 2:14-4:7', 'John 19:31-37', 'Menorah, Levite consecration, Passover, cloud and fire, complaints'),
(37, 'Send', 'Shelach', 'Numbers 13:1-15:41', 'Joshua 2:1-24', 'Hebrews 3:7-19', 'Spies sent, evil report, 40 years decreed, tzitzit command'),
(38, 'Korah', 'Korach', 'Numbers 16:1-18:32', '1 Samuel 11:14-12:22', 'Jude 1:5-11', 'Korah''s rebellion, earth swallows rebels, Aaron''s rod buds'),
(39, 'Statute', 'Chukat', 'Numbers 19:1-22:1', 'Judges 11:1-33', 'John 3:1-21', 'Red heifer, Moses strikes rock, bronze serpent'),
(40, 'Balak', 'Balak', 'Numbers 22:2-25:9', 'Micah 5:6-6:8', 'Revelation 2:12-17', 'Balaam hired to curse, donkey speaks, blessing instead'),
(41, 'Phinehas', 'Pinchas', 'Numbers 25:10-30:1', '1 Kings 18:46-19:21', 'Matthew 26:1-30', 'Phinehas'' zeal, second census, daughters of Zelophehad, offerings'),
(42, 'Tribes', 'Matot', 'Numbers 30:2-32:42', 'Jeremiah 1:1-2:3', 'Matthew 5:33-37', 'Vows, Midian war, Reuben and Gad settle east'),
(43, 'Journeys', 'Masei', 'Numbers 33:1-36:13', 'Jeremiah 2:4-28', 'James 4:1-12', 'Wilderness journey summary, boundaries, Levite cities, inheritance');

-- DEUTERONOMY (Devarim)
INSERT INTO torah_portions (number, name, hebrew, torah_reading, haftarah, brit_chadasha, summary) VALUES
(44, 'Words', 'Devarim', 'Deuteronomy 1:1-3:22', 'Isaiah 1:1-27', 'Acts 9:1-21', 'Moses begins recounting wilderness, appointing judges, spies'),
(45, 'I Pleaded', 'Vaetchanan', 'Deuteronomy 3:23-7:11', 'Isaiah 40:1-26', 'Matthew 22:33-40', 'Moses'' plea, Shema, Ten Commandments repeated'),
(46, 'Because', 'Eikev', 'Deuteronomy 7:12-11:25', 'Isaiah 49:14-51:3', 'Romans 8:31-39', 'Blessings for obedience, not by bread alone, remember wilderness'),
(47, 'See', 'Re''eh', 'Deuteronomy 11:26-16:17', 'Isaiah 54:11-55:5', '1 Corinthians 5:9-13', 'Blessing and curse, false prophets, clean and unclean, tithes, feasts'),
(48, 'Judges', 'Shoftim', 'Deuteronomy 16:18-21:9', 'Isaiah 51:12-52:12', 'Matthew 5:38-42', 'Judges, kings, Levites, prophets, cities of refuge, warfare'),
(49, 'When You Come', 'Ki Teitzei', 'Deuteronomy 21:10-25:19', 'Isaiah 54:1-10', '1 Corinthians 9:4-12', 'Family laws, property, ethics, weights and measures, Amalek'),
(50, 'When You Enter', 'Ki Tavo', 'Deuteronomy 26:1-29:8', 'Isaiah 60:1-22', 'Romans 11:1-15', 'Firstfruits, tithes, covenant ceremony, blessings and curses'),
(51, 'You Stand', 'Nitzavim', 'Deuteronomy 29:9-30:20', 'Isaiah 61:10-63:9', 'Romans 10:1-13', 'Covenant standing, repentance, choose life'),
(52, 'He Went', 'Vayelech', 'Deuteronomy 31:1-30', 'Hosea 14:2-10', 'Hebrews 13:5-8', 'Joshua commissioned, Torah reading command, Song'),
(53, 'Give Ear', 'Ha''azinu', 'Deuteronomy 32:1-52', '2 Samuel 22:1-51', 'Romans 12:14-21', 'Song of Moses, Moses'' death foretold'),
(54, 'This is the Blessing', 'V''Zot HaBerachah', 'Deuteronomy 33:1-34:12', 'Joshua 1:1-18', 'Matthew 17:1-9', 'Moses blesses tribes, death of Moses, Joshua leads');

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Seed data inserted: 12 feasts and 54 Torah portions';
END $$;
