# DB 생성
DROP DATABASE IF EXISTS wise_saying;
CREATE DATABASE wise_saying;
USE wise_saying;

# 테이블 생성
CREATE TABLE wise_saying (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reg_date DATETIME NOT NULL,
    content VARCHAR(200) NOT NULL,
    author VARCHAR(50) NOT NULL
);

# 데이터 생성
INSERT INTO wise_saying
SET reg_date = NOW(),
`content` = '나는 산적이다.',
author = '임꺽정';

INSERT INTO wise_saying
SET reg_date = NOW(),
`content` = '나는 의적이다.',
author = '홍길동';

INSERT INTO wise_saying
SET reg_date = NOW(),
`content` = '나는 조선의 국모다.',
author = '명성황후';

# 해당 유저의 사용자 권한 및 비밀번호가 올바른지 확인
USE mysql;
SELECT user, host, authentication_string FROM user WHERE user='sbsst';

# mysql 사용자 권한 부여:
GRANT ALL PRIVILEGES ON *.* TO 'sbsst'@'localhost' IDENTIFIED BY 'sbs123414';
FLUSH PRIVILEGES;

