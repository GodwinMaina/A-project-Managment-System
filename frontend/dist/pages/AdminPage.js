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
//fetch projects from backened and display in
const AllProjects = document.querySelector(".projectTabs tbody");
const allProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    // Select the table body element
    const AllProjects = document.querySelector(".projectTabs tbody");
    // Check if the element exists before proceeding
    if (AllProjects) {
        try {
            const response = yield fetch('http://localhost:5000/projects', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem("token")
                },
            });
            console.log(response);
            const projects = yield response.json();
            console.log(projects);
            projects.forEach((project) => {
                const elementProject = document.createElement("tr");
                elementProject.innerHTML = `

              <style>
  /* Button styles */
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom:1px;
    transition: background-color 0.3s ease;
  }

  /* Pending button style */
  .pending {
    background-color:#FF6347;
    color: #fff;
  }

  /* Done button style */
  .done {
    background-color: #5cb85c;
    color: #fff;
  }

  /* Edit button style */
  .edit {
    background-color: #5bc0de;
    color: #fff;
  }

  /* Delete button style */
  .delete {
    background-color: #d9534f;
    color: #fff;
  }

  /* Hover effect */
  button:hover {
    opacity: 0.8;
  }
</style>


                  <td>${project.taskName}</td>
                  <td>${project.assignee}</td>
                  <td>${project.taskType}</td>
                 <td>${project.description}</td>
                  <td>${project.startDate}</td>
                  <td>${project.endDate}</td>
                  <!--<td> <button class="pending">pending</button> <button class="done">done</button></td> -->
                  <td> <button class="edit">Edit</button> <button class="delete">delete</button> </td>

              `;
                // Append the project element to the table body
                AllProjects.appendChild(elementProject);
            });
        }
        catch (error) {
            console.error('Error fetching projects:', error);
        }
    }
    else {
        console.error("Element with class '.projectTabs tbody' not found");
    }
});
// Call the function to fetch and display projects
allProjects();
