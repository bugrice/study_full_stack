# DB 생성
DROP DATABASE IF EXISTS todo;
CREATE DATABASE todo;
USE todo;

# 테이블 생성
CREATE TABLE user (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_date DATE NOT NULL,
    updated_date DATE NOT NULL,
   	PRIMARY KEY (id)
);

CREATE TABLE task (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_date DATE NOT NULL,
    updated_date DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

# 데이터 생성
INSERT INTO USER SET 
name = '정현식', email = 'manssik0820@gmail.com', 
password = 'developer', created_date = now(), 
updated_date = now(); 

INSERT INTO task SET user_id = 1, title = '운동', 
description = '3분할 운동', is_completed = FALSE,
created_date = now(), updated_date = now();

INSERT INTO task SET user_id = 1, title = '공부', 
description = '코딩 알고리즘 및 영어 공부', is_completed = FALSE,
created_date = now(), updated_date = now();

INSERT INTO task SET user_id = 1, title = '집안일', 
description = '청소 및 설거지', is_completed = FALSE,
created_date = now(), updated_date = now();

# 해당 유저의 사용자 권한 및 비밀번호가 올바른지 확인
USE mysql;
SELECT user, host, authentication_string FROM user WHERE user='sbsst';

# mysql 사용자 권한 부여:
GRANT ALL PRIVILEGES ON *.* TO 'sbsst'@'localhost' IDENTIFIED BY 'sbs123414';
FLUSH PRIVILEGES;

