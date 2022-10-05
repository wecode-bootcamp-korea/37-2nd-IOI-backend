-- migrate:up
CREATE TABLE likes (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  class_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (class_id) REFERENCES classes (id)
);

-- migrate:down
DROP TABLE likes;