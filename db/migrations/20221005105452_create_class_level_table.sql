-- migrate:up
CREATE TABLE class_level (
  id INT NOT NULL AUTO_INCREMENT,
  level VARCHAR(10),
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE class_level;