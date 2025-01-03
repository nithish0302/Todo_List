// let completedTask = JSON.parse(localStorage.getItem('completed')) || [];
// let missedTask = JSON.parse(localStorage.getItem('missed')) || [];
// let maintainTask = JSON.pa   rse(localStorage.getItem('task')) || [];


function today_task() {
    let combine = '';

    let today = new Date();
    let todayFormatted =
        String(today.getDate()).padStart(2, '0') + '/' +
        String(today.getMonth() + 1).padStart(2, '0') + '/' +
        today.getFullYear();
    console.log("Today's date: " + todayFormatted);


    maintainTask.sort((a, b) => new Date(a.date) - new Date(b.date));
    maintainTask.forEach((tasks, index) => {
        let dateObj = new Date(tasks.date);
        let formattedDate =
            String(dateObj.getDate()).padStart(2, '0') + '/' +
            String(dateObj.getMonth() + 1).padStart(2, '0') + '/' +
            dateObj.getFullYear();

        if (formattedDate === todayFormatted) {
            console.log("Matching task found:", tasks);
            let html = `
                <div class="task-row">
                    <div class="task-name">${tasks.task}</div>
                    <div class="task-date">${formattedDate}</div>
                    <div class="task-actions">
                        <button onclick="edit(${index})"><img src="../IMAGES/edit.png" alt="Edit" style="width: 21px; height: 23px;"></button>
                        <button onclick="complete(${index})"><img src="../IMAGES/accept.png" alt="Accept" style="width: 23px; height: 23px;"></button>
                    </div>
                </div>`;
            combine += html;
        }
    });

    document.querySelector('.today_task').innerHTML = combine;
}

today_task();
function complete(index) {
    const removedTask = maintainTask.splice(index, 1);
    if (removedTask.length > 0) {
        completedTask.push(removedTask[0]);
    }

    localStorage.setItem('task', JSON.stringify(maintainTask));
    localStorage.setItem('completed', JSON.stringify(completedTask));
    today_task();
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
        today_task();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.close-popup').addEventListener('click', () => {
        document.querySelector('.edit-popup').style.display = 'none';
    });
});
