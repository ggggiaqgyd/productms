CREATE TABLE MENU(
  id int PRIMARY KEY auto_increment,
  text VARCHAR(30) not NULL,
  parent_id INT not null,
  url VARCHAR(100),
  order_by INT,
  is_leaf INT
)
  COLLATE='utf8_general_ci'
  ENGINE=InnoDB
  AUTO_INCREMENT=2;


CREATE TABLE `USER` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `role_id` INT(11) NOT NULL,
  `name_cn` VARCHAR(30) NOT NULL,
  `status` INT(11) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username`)
)
  COLLATE='utf8_general_ci'
  ENGINE=InnoDB
  AUTO_INCREMENT=2;



CREATE TABLE `PRODUCT` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '商品ID' ,
  `prod_name` VARCHAR(45) NOT NULL,
  `prod_status` TINYINT(1) NOT NULL COMMENT '商品状态:上架，下架',
  `prod_base_price` DECIMAL(12,2) NULL COMMENT '商品进价',
  `prod_store` INT NOT NULL COMMENT '商品库存',
  `prod_code` VARCHAR(45) NULL COMMENT '商品编码',
  `img_url` VARCHAR(100) NULL COMMENT '图片地址',
  `prod_sale_price` DECIMAL(12,2) NULL COMMENT '商品售价',
  `prod_sale_price_type` TINYINT(1) NULL COMMENT '售价类型',
  `prod_type` INT  COMMENT '商品类型',
  `oder_id` INT  COMMENT '排序ID',
  PRIMARY KEY (`id`))
    COLLATE='utf8_general_ci'
  ENGINE=InnoDB
  AUTO_INCREMENT=2;
--dictionary;
CREATE TABLE `DICTIONARY` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '字典主键ID' ,
  `dict_name` VARCHAR(45) NOT NULL COMMENT '字典名',
  `field_name` VARCHAR(45) NOT NULL COMMENT '字段名',
  `dict_value` VARCHAR(45) NOT NULL COMMENT '字典值',
  PRIMARY KEY (`id`))
    COLLATE='utf8_general_ci'
  ENGINE=InnoDB
  AUTO_INCREMENT=2;

CREATE TABLE `ORDER_M` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '订单主键ID' ,
  `order_code` VARCHAR(50) NOT NULL COMMENT '订单编号',
  `order_time` DATETIME COMMENT '下单时间',
  `order_status` INT NOT NULL COMMENT '订单状态',
  `customer_id` INT  NOT NULL COMMENT '下单用户',
  `userId` INT  NOT NULL COMMENT '操作员',
  PRIMARY KEY (`id`))
    COLLATE='utf8_general_ci'
  ENGINE=InnoDB
  AUTO_INCREMENT=2;

  CREATE TABLE `CUSTOMER` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '客户ID' ,
  `custom_name` VARCHAR(45) NOT NULL COMMENT '客户名',
  `telephone` VARCHAR(45) NOT NULL COMMENT '客户电话',
  `level` INT NOT NULL COMMENT '客户等级',
  PRIMARY KEY (`id`))
    COLLATE='utf8_general_ci'
  ENGINE=InnoDB
  AUTO_INCREMENT=0;

  CREATE TABLE `ORDER_PRODUCT` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '订单商品主键ID' ,
  `order_code` VARCHAR(50) NOT NULL COMMENT '订单编号',
  `product_id` INT NOT NULL COMMENT '商品ID',
  `sell_price` DECIMAL(12,2) NOT NULL COMMENT '实际售价',
  `sell_count` INT  NOT NULL COMMENT '销售数量',
  PRIMARY KEY (`id`))
    COLLATE='utf8_general_ci'
  ENGINE=InnoDB
  AUTO_INCREMENT=2;

    CREATE TABLE `USER_MENU` (
  `user_id` INT NOT NULL COMMENT '用户ID' ,
  `menu_id` INT  NOT NULL COMMENT '菜单ID')
    COLLATE='utf8_general_ci'
  ENGINE=InnoDB;