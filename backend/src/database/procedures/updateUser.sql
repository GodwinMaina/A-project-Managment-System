CREATE PROCEDURE updateUser(
    @user_id VARCHAR(100),
    @UserName VARCHAR(200),
@email VARCHAR(200),
@Password VARCHAR(100)
)

AS
BEGIN
UPDATE Users SET user_id = @user_id, userName = @userName, email = @email ,Password = @Password
END



