-- migrate:up
CREATE TABLE main_categories (
  id INT NOT NULL AUTO_INCREMENT,
  category varchar(30),
  PRIMARY KEY (id)
);


-- migrate:down
DROP TABLE main_categories;