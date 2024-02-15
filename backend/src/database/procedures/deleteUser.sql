CREATE or ALTER PROCEDURE deleteUser(@user_id VARCHAR(100))
AS
BEGIN
DELETE FROM Users WHERE user_id = @user_id
END