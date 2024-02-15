
CREATE TABLE Users
(
    user_id VARCHAR(100) PRIMARY KEY,
    userName VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(200) NOT NULL,
    isAdmin BIT default 0
)


SELECT * FROM Users

UPDATE Users
SET isAdmin = 1
WHERE email = 'ones@gmail.com'


ALTER TABLE Users
ADD isWelcomed BIT default 0

UPDATE Users 
SET isWelcomed = 0



DELETE FROM TASKS
WHERE task_id = '93bfccc0-e68f-4cd2-b311-4207aef9ef8b'


ALTER TABLE Users
ADD isDeleted BIT default 0

UPDATE Users 
SET isDeleted = 0






