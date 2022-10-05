-- migrate:up
CREATE TABLE coupons (
  id INT NOT NULL AUTO_INCREMENT,
  point DECIMAL(10, 2),
  code INT UNIQUE,
  is_useable BOOLEAN,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE coupons;