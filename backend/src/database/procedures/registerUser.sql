CREATE PROCEDURE registerUser
   ( @user_id NVARCHAR(100),
    @UserName NVARCHAR(200),
    @email NVARCHAR(255),
    @Password NVARCHAR(200)
    )
AS
BEGIN
    INSERT INTO Users (user_id, userName, email, Password)
    VALUES (@user_id, @UserName, @email, @Password)
END
