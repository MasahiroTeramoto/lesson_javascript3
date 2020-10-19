// call function
const displayTaskList = function(taskList) {
    const elem = document.getElementById('task-list');

    // Delete previous displayed task list
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }

    // filter taskList
    filteredTaskList = getFilteredTaskList(taskList);

    // Display task list
    filteredTaskList.forEach(function(task, index) {
        const tableRow = document.createElement('tr');
        const idData = document.createElement('td');
        const commentData = document.createElement('td');
        const statusData = document.createElement('td');
        const progressButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        deleteButton.textContent = '削除';
        idData.textContent = index;
        commentData.textContent = task['comment'];
        progressButton.textContent = task['status'];

        statusData.appendChild(progressButton);
        statusData.appendChild(deleteButton);

        tableRow.appendChild(idData);
        tableRow.appendChild(commentData);
        tableRow.appendChild(statusData);

        elem.appendChild(tableRow);

        deleteButton.addEventListener(
            'click', { taskList, index, handleEvent: deleteTask },
            false
        );
        progressButton.addEventListener(
            'click', { taskList, index, handleEvent: changeTaskProgress },
            false
        );
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

const filterTaskList = function(taskList, status) {
    let filteredTaskList = [];

    taskList.forEach(function(task) {
        if (task['status'] === status) {
            filteredTaskList.push(task);
        }
    });

    return filteredTaskList;
};

const getCheckedFilterStatus = function() {
    let filterStatus;
    let statusList = document.querySelectorAll('input[type=radio]');

    statusList.forEach(function(status) {
        if (status.checked) filterStatus = status.value;
    });

    return filterStatus;
};

const getFilteredTaskList = function(taskList) {
    let status = getCheckedFilterStatus();

    if (status === 'すべて') {
        return taskList;
    } else {
        return filterTaskList(taskList, status);
    }
};

// event logic
const deleteTask = function(e) {
    this.taskList.splice(this.index, 1);
    displayTaskList(this.taskList);
};

const changeTaskProgress = function(e) {
    let status = this.taskList[this.index]['status'];
    if (status === '作業中') {
        status = '完了';
    } else if (status === '完了') {
        status = '作業中';
    }
    this.taskList[this.index]['status'] = status;
    displayTaskList(this.taskList);
};

function changeTaskStatus(e) {
    displayTaskList(this.taskList);
}

// onload Logic
window.onload = function() {
    let statusList = document.querySelectorAll('input[type=radio]');
    statusList.forEach(function(status) {
        status.addEventListener(
            'click', { taskList, handleEvent: changeTaskStatus },
            false
        );
    });
};

// main Logic
const taskList = [];

function addTaskButton() {
    addTaskList(taskList);
    displayTaskList(taskList);
}