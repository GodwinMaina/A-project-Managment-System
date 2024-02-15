
//CREATE TASK LOGIC
const createTask = document.querySelector(".taskForm") as HTMLFormElement
const taskName = document.querySelector(".taskName") as HTMLInputElement
const taskType =  document.querySelector(".taskType") as HTMLInputElement
const description =  document.querySelector(".description") as HTMLInputElement
const startDate = document.querySelector(".startDate") as HTMLInputElement
const endDate = document.querySelector(".endDate") as HTMLInputElement
const select  =  document.getElementById("selectUser") as HTMLInputElement

createTask.addEventListener('submit', async  (event) => {
    event.preventDefault(); 

    //getting values from the form and assigning them to variables
    const taskNameVal = taskName.value;
    const taskTypeVal= taskType.value;
    const descriptionVal = description.value;
    const startDateVal = startDate.value;
    const endDateVal = endDate.value;
    const selectVal = select.value;

    //object to send as json to the API
    const newTask = {
      taskName: taskNameVal,
      taskType: taskTypeVal,
      description: descriptionVal,
      startDate: startDateVal,
      endDate: endDateVal,
      select: selectVal
    };
  
    try {

      const response = await fetch("http://localhost:5000/createTask", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const taskData = await response.json();
      console.log('task at Backend', taskData);

      alert(`TASK ASSIGNED TO + ${select.value}`)

   
    taskName.value = '';
    taskType.value = '';
    description.value = '';
    startDate.value = '';
    endDate.value = '';
    select.value = '';
    }
    
    catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

});



interface User {
  userName: string;
  isAdmin: boolean;
}

 const userSelect = async () => {
  try {
      const response = await fetch('http://localhost:5000');
      const data = await response.json();

      const users: User[] = data.users.filter((user: User) => !user.isAdmin);


  const defaultOption = document.createElement('option');
  defaultOption.text = 'Select a user'; // Change this text to your desired default option text
 defaultOption.disabled = true;
  defaultOption.selected = true;

// Append the default option to the select element
select.appendChild(defaultOption)

      select.innerHTML = '';

      users.forEach((user: User) => {
          const option = document.createElement('option');
          option.value = user.userName; 
          option.textContent = user.userName;
          select.appendChild(option);
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

userSelect();

