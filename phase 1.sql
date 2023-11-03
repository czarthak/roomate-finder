DROP DATABASE IF EXISTS inventory;
CREATE DATABASE IF NOT EXISTS inventory;

CREATE TABLE IF NOT EXISTS USER (
	email VARCHAR(128) NOT NULL,
    lname VARCHAR(64) NOT NULL,
    fname VARCHAR(64) NOT NULL,
    password VARCHAR(32) NOT NULL,
    phone_number VARCHAR(14),
    PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS ORGANIZATION (
    organizationId INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(128) NOT NULL,
    description VARCHAR(1024),
    ownerEmail VARCHAR(128) NOT NULL,
    PRIMARY KEY (organizationId),
    CONSTRAINT fk_user_organization FOREIGN KEY (ownerEmail) REFERENCES USER (email)
);

CREATE TABLE IF NOT EXISTS MANAGER (
    userEmail VARCHAR(128) NOT NULL,
    organizationId INT NOT NULL,
    PRIMARY KEY (userPid, organizationId),
    CONSTRAINT fk_user_manager FOREIGN KEY (userEmail) REFERENCES USER (email),
    CONSTRAINT fk_organization_manager FOREIGN KEY (organizationId) REFERENCES ORGANIZATION (organizationId)
);

CREATE TABLE IF NOT EXISTS REQUEST (
	requestId INT AUTO_INCREMENT NOT NULL,
    userEmail VARCHAR(128) NOT NULL,
    organizationId INT NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'DECLINED') NOT NULL,
    description VARCHAR(256),
    type ENUM('JOIN', 'ITEM') NOT NULL,
    PRIMARY KEY (requestId),
    CONSTRAINT fk_user_request FOREIGN KEY (userEmail) REFERENCES USER (email),
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
    userEmail VARCHAR(128) NOT NULL,
    listingId INT NOT NULL,
    PRIMARY KEY (userEmail, listingId),
    CONSTRAINT fk_user_favorite FOREIGN KEY (userEmail) REFERENCES USER (email),
    CONSTRAINT fk_listing_favorite FOREIGN KEY (listingId) REFERENCES LISTING (listingId)
);

INSERT INTO USER (lname, fname, password, phoneNumber, email)
VALUES
    ('Doe', 'John', 'password1', '1234567890', 'john.doe@example.com'),
    ('Smith', 'Jane', 'password2', '9876543210', 'jane.smith@example.com'),
    ('Johnson', 'Robert', 'password3', '5555555555', 'robert.johnson@example.com'),
    ('Brown', 'Mary', 'password4', '1111111111', 'mary.brown@example.com'),
    ('Williams', 'David', 'password5', '2222222222', 'david.williams@example.com'),
    ('Lee', 'Sarah', 'password6', '3333333333', 'sarah.lee@example.com'),
    ('Davis', 'Emily', 'password7', '4444444444', 'emily.davis@example.com'),
    ('Garcia', 'Michael', 'password8', '6666666666', 'michael.garcia@example.com'),
    ('Martinez', 'Sophia', 'password9', '7777777777', 'sophia.martinez@example.com'),
    ('Lopez', 'James', 'password10', '9999999999', 'james.lopez@example.com'),
    ('Harris', 'Anna', 'password11', '3333333333', 'anna.harris@example.com'),
    ('Clark', 'Matthew', 'password12', '4444444444', 'matthew.clark@example.com'),
    ('Turner', 'Olivia', 'password13', '5555555555', 'olivia.turner@example.com'),
    ('Moore', 'Daniel', 'password14', '6666666666', 'daniel.moore@example.com'),
    ('Scott', 'Emma', 'password15', '7777777777', 'emma.scott@example.com'),
    ('Hall', 'William', 'password16', '8888888888', 'william.hall@example.com'),
    ('Young', 'Lily', 'password17', '9999999999', 'lily.young@example.com'),
    ('Jackson', 'Christopher', 'password18', '1111111111', 'christopher.jackson@example.com'),
    ('White', 'Ava', 'password19', '2222222222', 'ava.white@example.com'),
    ('Adams', 'Daniel', 'password20', '3333333333', 'daniel.adams@example.com');

INSERT INTO ORGANIZATION (name, email, description, ownerPid)
VALUES
    ('Company A', 'contact@companyA.com', 'Organization A', 1),
    ('Company B', 'contact@companyB.com', 'Organization B', 2),
    ('Startup X', 'info@startupX.com', 'Tech Startup', 3),
    ('Nonprofit Y', 'info@nonprofitY.org', 'Community Service', 4),
    ('Restaurant Z', 'reservations@restaurantZ.com', 'Fine Dining', 5),
    ('Consulting Firm Q', 'contact@consultingQ.com', 'Management Consulting', 6),
    ('Retail Store R', 'info@storeR.com', 'Clothing and Accessories', 7),
    ('Fitness Center F', 'info@fitnessF.com', 'Gym and Fitness', 8),
    ('Art Gallery G', 'info@galleryG.com', 'Contemporary Art', 9),
    ('Real Estate Agency L', 'info@realestateL.com', 'Property Management', 10),
    ('Technology Company M', 'careers@techM.com', 'Software Development', 11),
    ('Education Center E', 'info@eduE.com', 'Tutoring and Education', 12),
    ('Construction Company C', 'contact@constructionC.com', 'Building and Construction', 13),
    ('Event Planning P', 'info@eventsP.com', 'Event Management', 14),
    ('Travel Agency T', 'info@travelT.com', 'Vacation Planning', 15),
    ('Automotive Shop S', 'info@autoS.com', 'Vehicle Repair', 16),
    ('Bookstore B', 'info@bookstoreB.com', 'Books and Literature', 17),
    ('Cafe W', 'info@cafeW.com', 'Coffee and Pastries', 18),
    ('Farmers Market', 'info@marketF.com', 'Fresh Produce', 19),
    ('Design Studio D', 'info@studioD.com', 'Graphic Design', 20);

INSERT INTO MANAGER (userPid, organizationId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (11, 11),
    (12, 12),
    (13, 13),
    (14, 14),
    (15, 15),
    (16, 16),
    (17, 17),
    (18, 18),
    (19, 19),
    (20, 20);

INSERT INTO REQUEST (userPid, organizationId, status, description, type)
VALUES
    (1, 1, 'PENDING', 'Join request for Organization 1', 'JOIN'),
    (2, 2, 'PENDING', 'Join request for Organization 2', 'JOIN'),
    (3, 3, 'ACCEPTED', 'Item request for Organization 3', 'ITEM'),
    (4, 4, 'PENDING', 'Join request for Organization 4', 'JOIN'),
    (5, 5, 'DECLINED', 'Join request for Organization 5', 'JOIN'),
    (6, 6, 'PENDING', 'Item request for Organization 6', 'ITEM'),
    (7, 7, 'ACCEPTED', 'Join request for Organization 7', 'JOIN'),
    (8, 8, 'PENDING', 'Join request for Organization 8', 'JOIN'),
    (9, 9, 'PENDING', 'Item request for Organization 9', 'ITEM'),
    (10, 10, 'PENDING', 'Join request for Organization 10', 'JOIN'),
    (11, 11, 'ACCEPTED', 'Item request for Organization 11', 'ITEM'),
    (12, 12, 'PENDING', 'Join request for Organization 12', 'JOIN'),
    (13, 13, 'DECLINED', 'Join request for Organization 13', 'JOIN'),
    (14, 14, 'PENDING', 'Item request for Organization 14', 'ITEM'),
    (15, 15, 'ACCEPTED', 'Join request for Organization 15', 'JOIN'),
    (16, 16, 'PENDING', 'Join request for Organization 16', 'JOIN'),
    (17, 17, 'PENDING', 'Item request for Organization 17', 'ITEM'),
    (18, 18, 'PENDING', 'Join request for Organization 18', 'JOIN'),
    (19, 19, 'ACCEPTED', 'Item request for Organization 19', 'ITEM'),
    (20, 20, 'PENDING', 'Join request for Organization 20', 'JOIN');

INSERT INTO LOCATION (location, organizationId)
VALUES
    ('Location A', 1),
    ('Location B', 2),
    ('Location C', 3),
    ('Location D', 4),
    ('Location E', 5),
    ('Location F', 6),
    ('Location G', 7),
    ('Location H', 8),
    ('Location I', 9),
    ('Location J', 10),
    ('Location K', 11),
    ('Location L', 12),
    ('Location M', 13),
    ('Location N', 14),
    ('Location O', 15),
    ('Location P', 16),
    ('Location Q', 17),
    ('Location R', 18),
    ('Location S', 19),
    ('Location T', 20);

INSERT INTO ITEM (name, description, ownerPid, quantity, category, status, locationId, organizationId)
VALUES
    ('Item 1', 'Description for Item 1', 1, 10, 'Category A', 'AVAILABLE', 1, 1),
    ('Item 2', 'Description for Item 2', 2, 5, 'Category B', 'AVAILABLE', 2, 2),
    ('Item 3', 'Description for Item 3', 3, 8, 'Category C', 'BORROWED', 3, 3),
    ('Item 4', 'Description for Item 4', 4, 15, 'Category D', 'AVAILABLE', 4, 4),
    ('Item 5', 'Description for Item 5', 5, 20, 'Category E', 'BORROWED', 5, 5),
    ('Item 6', 'Description for Item 6', 6, 5, 'Category F', 'AVAILABLE', 6, 6),
    ('Item 7', 'Description for Item 7', 7, 12, 'Category G', 'LISTED', 7, 7),
    ('Item 8', 'Description for Item 8', 8, 9, 'Category H', 'BORROWED', 8, 8),
    ('Item 9', 'Description for Item 9', 9, 7, 'Category I', 'AVAILABLE', 9, 9),
    ('Item 10', 'Description for Item 10', 10, 6, 'Category J', 'AVAILABLE', 10, 10),
    ('Item 11', 'Description for Item 11', 11, 3, 'Category K', 'LISTED', 11, 11),
    ('Item 12', 'Description for Item 12', 12, 17, 'Category L', 'BORROWED', 12, 12),
    ('Item 13', 'Description for Item 13', 13, 20, 'Category M', 'AVAILABLE', 13, 13),
    ('Item 14', 'Description for Item 14', 14, 9, 'Category N', 'AVAILABLE', 14, 14),
    ('Item 15', 'Description for Item 15', 15, 11, 'Category O', 'BORROWED', 15, 15),
    ('Item 16', 'Description for Item 16', 16, 6, 'Category P', 'LISTED', 16, 16),
    ('Item 17', 'Description for Item 17', 17, 8, 'Category Q', 'AVAILABLE', 17, 17),
    ('Item 18', 'Description for Item 18', 18, 12, 'Category R', 'BORROWED', 18, 18),
    ('Item 19', 'Description for Item 19', 19, 7, 'Category S', 'LISTED', 19, 19),
    ('Item 20', 'Description for Item 20', 20, 5, 'Category T', 'AVAILABLE', 20, 20);


INSERT INTO LISTING (itemId, price, status)
VALUES
    (1, 50.00, 'AVAILABLE'),
    (2, 75.00, 'AVAILABLE'),
    (3, 30.00, 'AVAILABLE'),
    (4, 100.00, 'SOLD'),
    (5, 40.00, 'AVAILABLE'),
    (6, 20.00, 'SOLD'),
    (7, 60.00, 'AVAILABLE'),
    (8, 45.00, 'SOLD'),
    (9, 70.00, 'AVAILABLE'),
    (10, 25.00, 'AVAILABLE'),
    (11, 90.00, 'SOLD'),
    (12, 35.00, 'AVAILABLE'),
    (13, 55.00, 'AVAILABLE'),
    (14, 80.00, 'SOLD'),
    (15, 65.00, 'AVAILABLE'),
    (16, 70.00, 'AVAILABLE'),
    (17, 60.00, 'SOLD'),
    (18, 40.00, 'AVAILABLE'),
    (19, 75.00, 'AVAILABLE'),
    (20, 50.00, 'SOLD');

INSERT INTO FAVORITE (userPid, listingId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (11, 11),
    (12, 12),
    (13, 13),
    (14, 14),
    (15, 15),
    (16, 16),
    (17, 17),
    (18, 18),
    (19, 19),
    (20, 20);
