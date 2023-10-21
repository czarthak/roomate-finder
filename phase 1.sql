DROP DATABASE IF EXISTS inventory;
CREATE DATABASE IF NOT EXISTS inventory;

CREATE TABLE IF NOT EXISTS USER (
	pid INT AUTO_INCREMENT,
    lname VARCHAR(64) NOT NULL,
    fname VARCHAR(64) NOT NULL,
    password VARCHAR(32) NOT NULL,
    phoneNumber INT,
    email VARCHAR(128) NOT NULL,
    PRIMARY KEY (pid)
);

CREATE TABLE IF NOT EXISTS ORGANIZATION (
    organizationId INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(128) NOT NULL,
    description VARCHAR(1024),
    ownerPid INT NOT NULL,
    PRIMARY KEY (organizationId),
    CONSTRAINT fk_user_organization FOREIGN KEY (ownerPid) REFERENCES USER (pid)
);

CREATE TABLE IF NOT EXISTS MANAGER (
    userPid INT NOT NULL,
    organizationId INT NOT NULL,
    PRIMARY KEY (userPid, organizationId),
    CONSTRAINT fk_user_manager FOREIGN KEY (userPid) REFERENCES USER (pid),
    CONSTRAINT fk_organization_manager FOREIGN KEY (organizationId) REFERENCES ORGANIZATION (organizationId)
);

CREATE TABLE IF NOT EXISTS REQUEST (
	requestId INT NOT NULL,
    userPid INT NOT NULL,
    organizationId INT NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'DECLINED') NOT NULL,
    description VARCHAR(256),
    type ENUM('JOIN', 'ITEM') NOT NULL,
    PRIMARY KEY (requestId),
    CONSTRAINT fk_user_request FOREIGN KEY (userPid) REFERENCES USER (pid),
    CONSTRAINT fk_organization_request FOREIGN KEY (organizationId) REFERENCES ORGANIZATION (organizationId)
);

CREATE TABLE IF NOT EXISTS LOCATION (
	locationId INT AUTO_INCREMENT,
    location VARCHAR(256),
    organizationId INT NOT NULL,
    PRIMARY KEY (locationId),
    CONSTRAINT fk_organization_location FOREIGN KEY (organizationId) REFERENCES ORGANIZATION (organizationId)
);

CREATE TABLE IF NOT EXISTS ITEM (
    itemId INT AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(256),
    ownerPid INT,
    quantity INT NOT NULL,
    category VARCHAR(128),
    status ENUM('AVAILABLE', 'BORROWED', 'LISTED', 'SOLD') NOT NULL,
    locationId INT NOT NULL,
    organizationId INT NOT NULL,
    PRIMARY KEY (itemId),
    CONSTRAINT fk_location_item FOREIGN KEY (locationId) REFERENCES LOCATION (locationId),
    CONSTRAINT fk_organiztion_item FOREIGN KEY (organizationId) REFERENCES ORGANIZATION (organizationId)
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
    userPid INT NOT NULL,
    listingId INT NOT NULL,
    PRIMARY KEY (userPid, listingId),
    CONSTRAINT fk_user_favorite FOREIGN KEY (userPid) REFERENCES USER (pid),
    CONSTRAINT fk_listing_favorite FOREIGN KEY (listingId) REFERENCES LISTING (listingId)
);

