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

CREATE TABLE IF NOT EXISTS ORGANIZATION (
    organization_id INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(128) NOT NULL,
    description VARCHAR(1024),
    owner VARCHAR(128),
    category ENUM('ACADEMIC', 'RECREATION', 'TECHNOLOGY', 'POLITICS', 'GREEK LIFE'),
    memberCount INT DEFAULT 1,
    PRIMARY KEY (organization_id),
    CONSTRAINT fk_user_organization FOREIGN KEY (owner) REFERENCES USER (email)
);

CREATE TABLE IF NOT EXISTS MANAGER (
    userEmail VARCHAR(128) NOT NULL,
    organization_id INT NOT NULL,
    PRIMARY KEY (userEmail, organization_id),
    CONSTRAINT fk_user_manager FOREIGN KEY (userEmail) REFERENCES USER (email),
    CONSTRAINT fk_organization_manager FOREIGN KEY (organization_id) REFERENCES ORGANIZATION (organization_id)
);

CREATE TABLE IF NOT EXISTS REQUEST (
	requestId INT AUTO_INCREMENT NOT NULL,
    userEmail VARCHAR(128) NOT NULL,
    organization_id INT NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'DECLINED') NOT NULL,
    description VARCHAR(256),
    type ENUM('JOIN', 'ITEM') NOT NULL,
    PRIMARY KEY (requestId),
    CONSTRAINT fk_user_request FOREIGN KEY (userEmail) REFERENCES USER (email),
    CONSTRAINT fk_organization_request FOREIGN KEY (organization_id) REFERENCES ORGANIZATION (organization_id)
);

CREATE TABLE IF NOT EXISTS LOCATION (
	locationId INT AUTO_INCREMENT,
    location VARCHAR(256),
    organization_id INT NOT NULL,
    PRIMARY KEY (locationId),
    CONSTRAINT fk_organization_location FOREIGN KEY (organization_id) REFERENCES ORGANIZATION (organization_id)
);

CREATE TABLE IF NOT EXISTS ITEM (
    itemId INT AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(256),
    ownerEmail VARCHAR(128),
    quantity INT NOT NULL,
    category VARCHAR(128),
    status ENUM('AVAILABLE', 'BORROWED', 'LISTED', 'SOLD') NOT NULL,
    locationId INT NOT NULL,
    organization_id INT NOT NULL,
    PRIMARY KEY (itemId),
    CONSTRAINT fk_location_item FOREIGN KEY (locationId) REFERENCES LOCATION (locationId),
    CONSTRAINT fk_organiztion_item FOREIGN KEY (organization_id) REFERENCES ORGANIZATION (organization_id)
);

CREATE TABLE IF NOT EXISTS LISTING (
    listingId INT AUTO_INCREMENT,
    itemId INT NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    status ENUM('AVAILABLE', 'SOLD') NOT NULL,
    dateListed TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    PRIMARY KEY (listingId),
    CONSTRAINT fk_item_listing FOREIGN KEY (itemId) REFERENCES ITEM (itemId)
);

CREATE TABLE IF NOT EXISTS FAVORITE (
    userEmail VARCHAR(128) NOT NULL,
    listingId INT NOT NULL,
    PRIMARY KEY (userEmail, listingId),
    CONSTRAINT fk_user_favorite FOREIGN KEY (userEmail) REFERENCES USER (email),
    CONSTRAINT fk_listing_favorite FOREIGN KEY (listingId) REFERENCES LISTING (listingId)
);