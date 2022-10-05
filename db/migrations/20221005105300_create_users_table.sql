-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  account_email VARCHAR(50),
  name VARCHAR(20),
  point DECIMAL(10,0) default 50000,
  kakao_id BIGINT UNIQUE,
  profile_image VARCHAR(100),
  is_subscribe BOOLEAN,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE users;