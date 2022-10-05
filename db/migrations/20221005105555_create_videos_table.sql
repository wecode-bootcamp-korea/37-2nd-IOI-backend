-- migrate:up
CREATE TABLE videos (
  id INT NOT NULL AUTO_INCREMENT,
  class_id INT NOT NULL,
  video_url VARCHAR(1000),
  name VARCHAR(50),
  content VARCHAR(300),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (class_id) REFERENCES classes (id)
);


-- migrate:down
DROP TABLE videos;