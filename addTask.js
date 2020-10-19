// call function
const displayTaskList = function(taskList) {
    const elem = document.getElementById('task-list');

    // Delete previous displayed task list
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }

    // filter taskList
    const selectedStatus = getSelectedStatus();

    // Display task list
    taskList.forEach(function(task, index) {
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
            'click', {
                taskList,
                index,
                handleEvent: deleteTask,
            },
            false
        );

        progressButton.addEventListener(
            'click', {
                taskList,
                index,
                handleEvent: changeTaskProgress,
            },
            false
        );

        if (task['status'] !== selectedStatus && selectedStatus !== "すべて") {
            tableRow.style.display = 'none';
        }

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

const getSelectedStatus = function() {
    let selectedStatus;
    const statusList = document.querySelectorAll('input[type=radio]');

    statusList.forEach(function(status) {
        if (status.checked) selectedStatus = status.value;
    });

    return selectedStatus;
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
    const statusList = document.querySelectorAll('input[type=radio]');
    statusList.forEach(function(status) {
        status.addEventListener(
            'click', {
                taskList,
                handleEvent: changeTaskStatus,
            },
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