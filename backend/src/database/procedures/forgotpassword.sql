CREATE OR ALTER PROCEDURE resetPassword(@email VARCHAR(200), @password VARCHAR(100))
AS
BEGIN
    UPDATE Users SET Password = @password WHERE email=@email
END