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
//CREATE TASK LOGIC
const createTask = document.querySelector(".taskForm");
const taskName = document.querySelector(".taskName");
const taskType = document.querySelector(".taskType");
const description = document.querySelector(".description");
const startDate = document.querySelector(".startDate");
const endDate = document.querySelector(".endDate");
const select = document.getElementById("selectUser");
createTask.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    //getting values from the form and assigning them to variables
    const taskNameVal = taskName.value;
    const taskTypeVal = taskType.value;
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
        const response = yield fetch("http://localhost:5000/createTask", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const taskData = yield response.json();
        console.log('task at Backend', taskData);
        alert(`TASK ASSIGNED TO + ${select.value}`);
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
}));
const userSelect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:5000');
        const data = yield response.json();
        const users = data.users.filter((user) => !user.isAdmin);
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Select a user'; // Change this text to your desired default option text
        defaultOption.disabled = true;
        defaultOption.selected = true;
        // Append the default option to the select element
        select.appendChild(defaultOption);
        select.innerHTML = '';
        users.forEach((user) => {
            const option = document.createElement('option');
            option.value = user.userName;
            option.textContent = user.userName;
            select.appendChild(option);
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
});
userSelect();
