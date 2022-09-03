SELECT * FROM ademicon_users;

CREATE TABLE ademicon_users (
 id INT PRIMARY KEY auto_increment,
 name_user VARCHAR(255) NOT NULL,
 email_user VARCHAR(255) UNIQUE NOT NULL,
 password_user VARCHAR(255) NOT NULL
 );