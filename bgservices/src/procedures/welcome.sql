create PROCEDURE WelcomeExisting
AS
BEGIN
    SELECT *
    FROM Users
    WHERE isWelcomed = 0 and isDeleted = 0
END