let maintainTask = JSON.parse(localStorage.getItem('task')) || [];
let completedTask = JSON.parse(localStorage.getItem('completed')) || [];

document.addEventListener('DOMContentLoaded', () => {
    let today = new Date().toISOString().split('T')[0];
    document.querySelector('.input_type_date').setAttribute('min', today);
    show();
});

function addList() {
    let taskName = document.querySelector('.input_type_text').value.trim();
    let taskDate = document.querySelector('.input_type_date').value;

    if (!taskName) {
        alert("Enter the Task Name");
        return;
    }

    if (!taskDate) {
        alert("Select the Date");
        return;
    }

    maintainTask.push({ task: taskName, date: taskDate });
    localStorage.setItem('task', JSON.stringify(maintainTask));

    document.querySelector('.input_type_text').value = '';
    document.querySelector('.input_type_date').value = '';
    show();
}

function show() {
    let combine = '';

    maintainTask.sort((a, b) => new Date(a.date) - new Date(b.date));
    maintainTask.forEach((tasks, index) => {
        let dateObj = new Date(tasks.date);
        let formattedDate =
            String(dateObj.getDate()).padStart(2, '0') + '/' +
            String(dateObj.getMonth() + 1).padStart(2, '0') + '/' +
            dateObj.getFullYear();

        let html = `
            <div class="task-row">
                <div class="task-name">${tasks.task}</div>
                <div class="task-date">${formattedDate}</div>
                <div class="task-actions">
                    <button onclick="edit(${index})"><img src="edit.png" alt="Edit" style="width: 23px; height: 23px;"></button>
                    <button onclick="complete(${index})"><img src="accept.png" alt="Accept" style="width: 23px; height: 23px;"></button>
                </div>
            </div>`;
        combine += html;
    });

    document.querySelector('.tasks').innerHTML = combine;
}

function complete(index) {
    const removedTask = maintainTask.splice(index, 1);
    if (removedTask.length > 0) {
        completedTask.push(removedTask[0]);
    }

    localStorage.setItem('task', JSON.stringify(maintainTask));
    localStorage.setItem('completed', JSON.stringify(completedTask));
    show();
}

function edit(index) {
    let editTask = maintainTask[index];
    document.querySelector('.edit-task-name').value = editTask.task;
    document.querySelector('.edit-task-date').value = editTask.date;
    document.querySelector('.edit-popup').style.display = 'grid';


    document.querySelector('.save-edit').onclick = function () {
        let taskName = document.querySelector('.edit-task-name').value.trim();
        let taskDate = document.querySelector('.edit-task-date').value;

        if (!taskName || !taskDate) {
            alert("Both Task Name and Date are required.");
            return;
        }

        maintainTask[index] = { task: taskName, date: taskDate };
        localStorage.setItem('task', JSON.stringify(maintainTask));
        document.querySelector('.edit-popup').style.display = 'none';
        show();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.close-popup').addEventListener('click', () => {
        document.querySelector('.edit-popup').style.display = 'none';
    });
});
