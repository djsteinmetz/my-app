-- Up
CREATE TABLE Users (
    interopID INTEGER PRIMARY KEY AUTOINCREMENT,
    ID TEXT,
    FullName TEXT,
    Email TEXT
);

CREATE TABLE Books (
    interopID INTEGER PRIMARY KEY AUTOINCREMENT,
    ID TEXT,
    Title TEXT,
    Genre TEXT,
    OwnerID TEXT REFERENCES Users(ID)
);

INSERT INTO Users (ID, FullName, Email) values ('djsteinmetz', 'DJ Steinmetz', 'steinmetz.dj@gmail.com');
INSERT INTO Users (ID, FullName, Email) values ('danabossen', 'Dana Bossen', 'dboss@gmail.com');
INSERT INTO Users (ID, FullName, Email) values ('kaitwilco', 'Kaitlynn Wilcoxson', 'kwilco@gmail.com');
INSERT INTO Users (ID, FullName, Email) values ('ewilco', 'Emily Wilcoxson', 'ewilco@gmail.com');
INSERT INTO Users (ID, FullName, Email) values ('killerkia', 'Kia Arendt', 'killerki@gmail.com');

INSERT INTO Books (ID, Title, Genre, OwnerID) values ('mockingbird', 'To Kill a Mockingbird', 'Fiction', 'djsteinmetz');
INSERT INTO Books (ID, Title, Genre, OwnerID) values ('crawdads', 'Where the Crawdads Sing', 'Fiction', 'danabossen');
INSERT INTO Books (ID, Title, Genre, OwnerID) values ('yellow', 'Yellow Bellied Woodpecker', 'Non-Fiction', 'djsteinmetz');
INSERT INTO Books (ID, Title, Genre, OwnerID) values ('2526246', 'Not Yet Another Book!', 'Memoir', 'ewilco');
INSERT INTO Books (ID, Title, Genre, OwnerID) values ('585873453', 'Magnolia Table', 'Cookbook', 'kaitwilco');


-- Down
DROP TABLE Users;
DROP TABLE Books;