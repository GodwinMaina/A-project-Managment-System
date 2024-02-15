

CREATE PROCEDURE UserTasks

   (
    @task_id NVARCHAR(100),
    @taskName NVARCHAR(200),
    @taskType NVARCHAR(200),
    @description NVARCHAR(200),
    @startDate NVARCHAR(200),
    @endDate NVARCHAR(200),
    @email NVARCHAR(200)
    )
AS

BEGIN
    INSERT INTO UserTask (task_id, taskName, taskType, description, startDate, endDate, email)
    VALUES (@task_id, @taskName, @taskType, @description, @startDate, @endDate, @email);
END


