"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userTasks = document.querySelector(".projectTable tbody");
function fetchTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:5000/userTask', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem("token")
                },
            });
            const tasks = yield response.json();
            console.log(tasks);
            // Clear existing table rows
            userTasks.innerHTML = '';
            // Append tasks to the table
            tasks.forEach((task) => {
                const row = document.createElement('tr');
                row.innerHTML = `
        <td>${task.taskName}</td>
        <td>${task.taskType}</td>
        <td>${task.description}</td>
        <td>${task.startDate}</td>
        <td>${task.endDate}</td>
        <td>${task.email}</td>
      `;
                userTasks.appendChild(row);
            });
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}
// Call the fetchTasks function when needed
fetchTasks();
// try {
//   try 
//   {      const response = await fetch('http://localhost:5000/userTask', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//    const pool = await mssql.connect(sqlConfig);
//    // Query to find a user by email
//    const result = await pool.request()
//    .query('SELECT * FROM Users WHERE email = @email');
//    console.log(result);
//     const tasks = await response.json();
//    console.log('Tasks:', tasks);
//   if (result.recordset.length > 0) {
//       const userName = result.recordset[0].userName;
//       console.log('UserName:', userName); // Log user name for debugging
//       const taskResult = await pool.request()
//           .input('userName', mssql.VarChar, userName)
//           .query('SELECT * FROM Tasks WHERE assignee = @userName');
//       if (taskResult.recordset.length > 0) {
//           const tasks = taskResult.recordset;
//           return res.json(tasks);
//       } else {
//           return res.status(404).json({ error: 'No tasks found for the user' });
//       }
//   } else {
//       return res.status(404).json({ error: 'User not found' });
//   }
// } catch (error) {
//   console.error('Error:', error); // Log any errors for debugging
//   return res.status(500).json({ error: 'Internal server error' });
// }  
// }
// catch (error) {
// console.error('Error:', error); // Log any errors for debugging
// return res.status(500).json({ error: 'Internal server error' });
// }
