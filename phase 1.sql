DROP DATABASE IF EXISTS inventory;

CREATE DATABASE IF NOT EXISTS inventory;

USE inventory;

CREATE TABLE IF NOT EXISTS USER (
    email VARCHAR(128) NOT NULL, lname VARCHAR(64) NOT NULL, fname VARCHAR(64) NOT NULL, password VARCHAR(32) NOT NULL, phone_number VARCHAR(14), year VARCHAR(255), major VARCHAR(255), bio TEXT, existing_apart VARCHAR(255), prefer_apart VARCHAR(255), budget DECIMAL(10, 2), personal_trait VARCHAR(255), PRIMARY KEY (email)
);

INSERT INTO
    USER (
        email, lname, fname, password, phone_number, year, major, bio, existing_apart, prefer_apart, budget, personal_trait
    )
VALUES (
        'johnsmith@example.com', 'Smith', 'John', 'password123', '123-456-7890', 'freshman', 'engineering', 'An enthusiastic freshman exploring engineering.', 'Pine Valley Apartments', 'Maple Heights Apartments', 1200, 'ENTPA'
    ),
    (
        'alicedoe@example.com', 'Doe', 'Alice', 'securepass', '987-654-3210', 'sophomore', 'business', 'Sophomore with a passion for business.', 'Oakwood Residence', 'Riverdale Apartments', 1300, 'INFJA'
    ),
    (
        'lukebrown@example.com', 'Brown', 'Luke', 'securepass1', '987-654-3211', 'junior', 'finance', 'Junior in finance, aspiring to be an investment banker.', 'Cedar Park Apartments', 'Lakeside Villas', 1400, 'ISTJA'
    ),
    (
        'oliviabell@example.com', 'Bell', 'Olivia', 'securepass2', '987-654-3212', 'senior', 'computer science', 'Senior computer science student interested in AI.', 'The Grove Apartments', 'Sunset Apartments', 1500, 'ISFTP'
    ),
    (
        'melissajones@example.com', 'Jones', 'Melissa', 'securepass3', '987-654-3213', 'masters', 'engineering', 'Masters student focusing on sustainable engineering.', 'Highland Apartments', 'Crestview Apartments', 1600, 'ISFPA'
    ),
    (
        'emilyjohnson@example.com', 'Johnson', 'Emily', 'sciencePass', '8888888888', 'phd', 'computer science', 'PhD candidate researching in computational theory.', 'Evergreen Estates', 'Pinnacle Point Apartments', 1700, 'ENFPT'
    ),
    (
        'davidwhite@example.com', 'White', 'David', 'mypassword5', '123-456-7891', 'freshman', 'business', 'Freshman eager to dive into the world of entrepreneurship.', 'Brookside Apartments', 'Grandview Apartments', 1100, 'ENTPA'
    ),
    (
        'sophiawilliams@example.com', 'Williams', 'Sophia', 'password6', '123-456-7892', 'sophomore', 'finance', 'Sophomore finance major, keen on stock market trends.', 'Lakeshore Apartments', 'Summit Ridge Apartments', 1250, 'ENFJA'
    ),
    (
        'jamesdavis@example.com', 'Davis', 'James', 'helloWorld7', '123-456-7893', 'junior', 'computer science', 'Aspiring software developer in junior year.', 'Willow Creek Apartments', 'Vista Ridge Apartments', 1350, 'INTJA'
    ),
    (
        'isabellamiller@example.com', 'Miller', 'Isabella', 'pass1234', '123-456-7894', 'senior', 'engineering', 'Senior engineering student with a love for robotics.', 'Pebblebrook Apartments', 'Skyline Apartments', 1450, 'ENTPT'
    );