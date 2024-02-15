CREATE PROCEDURE getOneUser(
    @user_id VARCHAR(100)
)
AS
BEGIN
SELECT * FROM Users where user-id =@user_id; 
END