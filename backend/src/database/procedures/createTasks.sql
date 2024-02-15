
CREATE PROCEDURE createTasks
   (
    @task_id NVARCHAR(100),
    @taskName NVARCHAR(200),
    @taskType NVARCHAR(200),
    @description NVARCHAR(200),
    @startDate NVARCHAR(200),
    @endDate NVARCHAR(200),
    @assignee NVARCHAR(200)
    )
AS

BEGIN
    INSERT INTO TASKS (task_id ,taskName,taskType,description,startDate,endDate,assignee)

    VALUES (@task_id, @taskName, @taskType, @description, @startDate, @endDate, @assignee)
END


drop Procedure createTasks