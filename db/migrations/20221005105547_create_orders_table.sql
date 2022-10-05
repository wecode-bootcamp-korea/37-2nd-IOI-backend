-- migrate:up
CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  class_id INT NOT NULL,
  price DECIMAL(10, 2),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (class_id) REFERENCES classes (id)
);

-- migrate:down
DROP TABLE orders;