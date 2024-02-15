
//fetch projects from backened and display in
const AllProjects= document.querySelector(".projectTabs tbody") as HTMLTableElement


interface Task{
  taskName:string,
  assignee:string,
  taskType:string,
  description:string,
  startDate:string,
  endDate:string,
}
const allProjects = async () => {
  // Select the table body element
  const AllProjects = document.querySelector(".projectTabs tbody");

  // Check if the element exists before proceeding
  if (AllProjects) {
      try {
          const response = await fetch('http://localhost:5000/projects',{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token") as string
              },
          });
          console.log(response);
          
   
          const projects = await response.json();
          console.log(projects);

          projects.forEach((project: Task) => {
              const elementProject = document.createElement("tr") as HTMLTableRowElement;
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
      } catch (error) {
          console.error('Error fetching projects:', error);
      }
  } else {
      console.error("Element with class '.projectTabs tbody' not found");
  }
};

// Call the function to fetch and display projects
allProjects();


