DROP DATABASE IF EXISTS inventory;
CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;
CREATE TABLE IF NOT EXISTS USER (
	email VARCHAR(128) NOT NULL,
    lname VARCHAR(64) NOT NULL,
    fname VARCHAR(64) NOT NULL,
    password VARCHAR(32) NOT NULL,
    phone_number VARCHAR(14),
    PRIMARY KEY (email)
);

INSERT INTO USER (email, lname, fname, password, phone_number) VALUES
('johnsmith@example.com', 'Smith', 'John', 'password123', '123-456-7890'),
('alicedoe@example.com', 'Doe', 'Alice', 'securepass', '987-654-3210'),
('emilyjohnson@example.com', 'Johnson', 'Emily', 'sciencePass', '8888888888');

# SELECT * FROM USER;
-- DELETE FROM USER;

CREATE TABLE IF NOT EXISTS ORGANIZATION (
    organization_id INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(128) NOT NULL,
    description VARCHAR(1024),
    owner_email VARCHAR(128) NOT NULL,
    category ENUM('ACADEMIC', 'RECREATION', 'TECHNOLOGY', 'POLITICS', 'GREEKLIFE'),
    member_count INT DEFAULT 1,
    PRIMARY KEY (organization_id),
    CONSTRAINT fk_user_organization FOREIGN KEY (owner_email) REFERENCES USER (email)
);

INSERT INTO ORGANIZATION (name, email, description, owner_email, category, member_count) VALUES
('Coding Club', 'coding@example.com', 'Club for programming enthusiasts', 'johnsmith@example.com', 'TECHNOLOGY', 15),
('Chess Society', 'chesssociety@example.com', 'Organization for chess lovers', 'alicedoe@example.com', 'RECREATION', 20),
('Science Association', 'science@example.com', 'Encouraging scientific exploration', 'johnsmith@example.com', 'ACADEMIC', 30),
('Political Discussion Group', 'politics@example.com', 'Discussions on current political affairs', 'alicedoe@example.com', 'POLITICS', 25),
('Greek Life Association', 'greeklife@example.com', 'Promoting Greek culture and traditions', 'emilyjohnson@example.com', 'GREEKLIFE', 40);

CREATE TABLE IF NOT EXISTS ORGANIZATION_ROSTER (
    roster_id INT AUTO_INCREMENT NOT NULL,
    user_email VARCHAR(128) NOT NULL,
    organization_id INT NOT NULL,
    type ENUM('MEMBER', 'MANAGER', 'OWNER') NOT NULL,
    PRIMARY KEY (roster_id),
    CONSTRAINT fk_user_manager FOREIGN KEY (user_email) REFERENCES USER (email),
    CONSTRAINT fk_organization_manager FOREIGN KEY (organization_id) REFERENCES ORGANIZATION (organization_id) 
);

INSERT INTO ORGANIZATION_ROSTER (user_email, organization_id, type)
SELECT owner_email, organization_id, 'OWNER'
FROM ORGANIZATION;

INSERT INTO ORGANIZATION_ROSTER (user_email, organization_id, type)
VALUES
    ('johnsmith@example.com', 2, 'MEMBER'),
    ('johnsmith@example.com', 4, 'MANAGER'),
    ('alicedoe@example.com', 5, 'MEMBER'),
    ('emilyjohnson@example.com', 2, 'MANAGER');

# INSERT INTO ORGANIZATION_ROSTER(user_email, organization_id, type)
# VALUES
#     ('johnsmith@example.com', 2, 'MEMBER'),
#     ('emilyjohnson@example.com', 2, 'MANAGER');

UPDATE ORGANIZATION o
SET member_count = (
    SELECT COUNT(DISTINCT user_email)
    FROM ORGANIZATION_ROSTER
    WHERE organization_id = o.organization_id
)
WHERE true;



# SELECT DISTINCT o.*
# FROM ORGANIZATION o
#          JOIN ORGANIZATION_ROSTER r ON o.organization_id = r.organization_id
# WHERE r.user_email = 'emilyjohnson@example.com'
#    OR o.owner_email = 'emilyjohnson@example.com';

# DROP TABLE REQUEST; DROP TABLE FAVORITE; DROP TABLE LISTING; DROP TABLE ITEM; DROP TABLE LOCATION;
CREATE TABLE IF NOT EXISTS REQUEST (
	request_id INT AUTO_INCREMENT NOT NULL,
    user_email VARCHAR(128) NOT NULL,
    organization_id INT NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'DECLINED') NOT NULL,
    description VARCHAR(256),
    type ENUM('JOIN', 'ITEM') NOT NULL,
    PRIMARY KEY (request_id),
    CONSTRAINT fk_user_request FOREIGN KEY (user_email) REFERENCES USER (email) ON DELETE CASCADE,
    CONSTRAINT fk_organization_request FOREIGN KEY (organization_id) REFERENCES ORGANIZATION (organization_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS LOCATION (
	location_id INT AUTO_INCREMENT,
    location VARCHAR(256),
    organization_id INT NOT NULL,
    PRIMARY KEY (location_id),
    CONSTRAINT fk_organization_location FOREIGN KEY (organization_id) REFERENCES ORGANIZATION (organization_id) ON DELETE CASCADE
);

INSERT INTO LOCATION (location, organization_id)
VALUES
      ('Student Storage Unit 343', 2),
      ('Club Room Rack A', 2),
      ('Club Room Rack B', 2),
      ('Borrowed', 2);


CREATE TABLE IF NOT EXISTS ITEM (
    item_id INT AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(256),
    owner_email VARCHAR(128),
    quantity INT NOT NULL,
    category ENUM('STATIONERY', 'MARKETING', 'ELECTRONICS', 'SUPPLIES', 'PERISHABLES', 'MERCHANDISE', 'TOOLS', 'CHEMICALS', 'FLAMMABLE', 'OTHER', 'UNIQUE', 'BOOKS'),
    status ENUM('AVAILABLE', 'BORROWED', 'LISTED', 'SOLD') NOT NULL,
    location_id INT NOT NULL,
    organization_id INT NOT NULL,
    PRIMARY KEY (item_id),
    CONSTRAINT fk_location_item FOREIGN KEY (location_id) REFERENCES LOCATION (location_id),
    CONSTRAINT fk_organization_item FOREIGN KEY (organization_id) REFERENCES ORGANIZATION (organization_id) ON DELETE CASCADE
);

INSERT INTO ITEM (name, description, owner_email, quantity, category, status, location_id, organization_id)
VALUES
    ('Chess Set 1', 'Standard chess set with board', 'chesssociety@example.com', 5, 'TOOLS', 'AVAILABLE', 1, 2),
    ('Chess Clock', 'Digital chess clock for tournaments', 'chesssociety@example.com', 2, 'ELECTRONICS', 'AVAILABLE', 2, 2),
    ('Chess Strategy Book', 'Guide to advanced chess strategies', 'chesssociety@example.com', 3, 'BOOKS', 'AVAILABLE', 3, 2),
    ('Chess Tactics Guide', 'Book on improving chess tactics', 'chesssociety@example.com', 4, 'BOOKS', 'AVAILABLE', 1, 2),
    ('Chess Magazine', 'Latest issue of chess magazine', 'chesssociety@example.com', 1, 'BOOKS', 'AVAILABLE', 2, 2),
    ('Chess Puzzle Set', 'Collection of challenging chess puzzles', 'chesssociety@example.com', 6, 'TOOLS', 'AVAILABLE', 3, 2),
    ('Chess Club T-Shirt', 'Official Chess Society T-Shirt', 'chesssociety@example.com', 10, 'MERCHANDISE', 'AVAILABLE', 1, 2),
    ('Chess Trophy', 'Tournament winner trophy', 'chesssociety@example.com', 1, 'UNIQUE', 'AVAILABLE', 2, 2),
    ('Chess Analysis Board', 'Board for analyzing game positions', 'chesssociety@example.com', 2, 'TOOLS', 'AVAILABLE', 3, 2),
    ('Chess Membership Card', 'Official membership card for Chess Society', 'chesssociety@example.com', 1, 'OTHER', 'AVAILABLE', 1, 2);

CREATE TABLE IF NOT EXISTS LISTING (
    listing_id INT AUTO_INCREMENT,
    item_id INT NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    status ENUM('AVAILABLE', 'SOLD') NOT NULL,
    date_listed TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (listing_id),
    CONSTRAINT fk_item_listing FOREIGN KEY (item_id) REFERENCES ITEM (item_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FAVORITE (
    user_email VARCHAR(128) NOT NULL,
    listing_id INT NOT NULL,
    PRIMARY KEY (user_email, listing_id),
    CONSTRAINT fk_user_favorite FOREIGN KEY (user_email) REFERENCES USER (email),
    CONSTRAINT fk_listing_favorite FOREIGN KEY (listing_id) REFERENCES LISTING (listing_id)
);