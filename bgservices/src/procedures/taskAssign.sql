CREATE PROCEDURE taskAssign
AS
BEGIN
    SELECT *
    FROM Users
    WHERE isAssigned = 0 and isDeleted = 0
END
