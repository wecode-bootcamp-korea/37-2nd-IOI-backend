-- migrate:up
CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  class_id INT NOT NULL,
  content VARCHAR(200),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (class_id) REFERENCES classes (id)
);

-- migrate:down
DROP TABLE reviews;