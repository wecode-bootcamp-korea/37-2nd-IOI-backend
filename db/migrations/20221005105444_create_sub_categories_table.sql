-- migrate:up
CREATE TABLE sub_categories (
  id INT NOT NULL AUTO_INCREMENT,
  main_category_id INT NOT NULL,
  category VARCHAR(30),
  PRIMARY KEY (id),
  FOREIGN KEY (main_category_id)REFERENCES main_categories (id)
);


-- migrate:down
DROP TABLE sub_categories;