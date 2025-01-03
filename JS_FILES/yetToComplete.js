function show() {
    let combine = '';

    let today = new Date();
    let todayFormatted =
        String(today.getDate()).padStart(2, '0') + '/' +
        String(today.getMonth() + 1).padStart(2, '0') + '/' +
        today.getFullYear();


    maintainTask.sort((a, b) => new Date(a.date) - new Date(b.date));
    maintainTask.forEach((tasks, index) => {
        let dateObj = new Date(tasks.date);
        let formattedDate =
            String(dateObj.getDate()).padStart(2, '0') + '/' +
            String(dateObj.getMonth() + 1).padStart(2, '0') + '/' +
            dateObj.getFullYear();
        if (todayFormatted <= formattedDate) {
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
    // document.querySelector('.tasks').innerHTML = combine;
    document.querySelector('.yet_to_complete').innerHTML = combine;
    console.log(combine);

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

    let dateObj = new Date(editTask.date);
    let formattedDate =
        dateObj.getFullYear() + '-' +
        String(dateObj.getMonth() + 1).padStart(2, '0') + '-' +
        String(dateObj.getDate()).padStart(2, '0');
    document.querySelector('.edit-task-date').value = formattedDate;

    document.querySelector('.edit-popup').style.display = 'grid';

    document.querySelector('.save-edit').onclick = function () {
        let taskName = document.querySelector('.edit-task-name').value.trim();
        let taskDates = document.querySelector('.edit-task-date').value.trim();

        if (!taskName || !taskDates) {
            alert("Both Task Name and Date are required.");
            return;
        }
        let taskDate = new Date(taskDates);
        if (isNaN(taskDate.getTime())) {
            alert("Invalid date format. Please select a valid date.");
            return;
        }

        let formattedDate =
            taskDate.getFullYear() + '/' +
            String(taskDate.getMonth() + 1).padStart(2, '0') + '/' +
            String(taskDate.getDate()).padStart(2, '0');

        maintainTask[index] = { task: taskName, date: formattedDate };
        localStorage.setItem('task', JSON.stringify(maintainTask));

        document.querySelector('.edit-popup').style.display = 'none';
        show();
    };
}

document.querySelector('.close-popup').onclick = function () {
    document.querySelector('.edit-popup').style.display = 'none';
};



document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.close-popup').addEventListener('click', () => {
        document.querySelector('.edit-popup').style.display = 'none';
    });
});
show();