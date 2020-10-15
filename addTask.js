// call function
const displayTaskList = function(taskList) {
    const elem = document.getElementById('task-list');

    // Delete previous displayed task list
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }

    // Display task list
    taskList.forEach(function(task) {
        const tableRow = document.createElement('tr');
        const idData = document.createElement('td');
        const commentData = document.createElement('td');
        const statusData = document.createElement('td');
        const progressButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        deleteButton.textContent = '削除';
        idData.textContent = task['id'];
        commentData.textContent = task['comment'];
        progressButton.textContent = task['status'];

        statusData.appendChild(progressButton);
        statusData.appendChild(deleteButton);

        tableRow.appendChild(idData);
        tableRow.appendChild(commentData);
        tableRow.appendChild(statusData);

        elem.appendChild(tableRow);
    });
};

const addTaskList = function(taskList) {
    let comment = document.getElementById('comment');
    const task = {
        comment: comment.value,
        status: '作業中',
    };
    comment.value = '';
    taskList.push(task);
};

// main Logic
const taskList = [];

function addTaskButton() {
    addTaskList(taskList);
    displayTaskList(taskList);
}