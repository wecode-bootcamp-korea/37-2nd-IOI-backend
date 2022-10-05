-- migrate:up
CREATE TABLE detail_images (
  id INT NOT NULL AUTO_INCREMENT,
  class_id INT NOT NULL,
  image_url VARCHAR(1000),
  PRIMARY KEY (id),
  FOREIGN KEY (class_id) REFERENCES classes (id)
);

-- migrate:down
DROP TABLE detail_images;