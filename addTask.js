// call function
const createElement = function(taskList) {
    const elem = document.getElementById('task-list');
    let newTable;

    for (i = 0; i < taskList.length; i++) {
        const taskTemplate = `
        <tr>
            <td>${i}</td>
            <td>${taskList[i]['comment']}</td>
            <td>
                <button>${taskList[i]['status']}</button>
                <button>削除</button>
            </td>
        </tr>`

        if (i === 0) {
            newTable = taskTemplate
        } else {
            newTable = newTable + taskTemplate
        }
        elem.innerHTML = newTable;
    }
}

const addTaskList = function(taskList) {
    let comment = document.getElementById('comment');
    const task = {
        comment: comment.value,
        status: '作業中',
    }
    comment.value = '';
    taskList.push(task);
}

// main Logic
const taskList = [];

function clickBtn() {
    addTaskList(taskList);
    createElement(taskList);
}