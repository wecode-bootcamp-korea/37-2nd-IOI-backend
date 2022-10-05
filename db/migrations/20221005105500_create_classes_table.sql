-- migrate:up
CREATE TABLE classes (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(30),
  price DECIMAL(10, 2),
  thumbnail_image VARCHAR(1000),
  sub_category_id INT NOT NULL,
  discription VARCHAR(100),
  content TEXT,
  about_creater VARCHAR(100),
  level_id INT NOT NULL,
  like_count INT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id),
  FOREIGN KEY (level_id) REFERENCES class_level (id)
);

-- migrate:down
DROP TABLE classes;