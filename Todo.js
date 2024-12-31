document.addEventListener('DOMContentLoaded', (event) => {
    let today = new Date().toISOString().split('T')[0];
    document.querySelector('.input_type_date').setAttribute('min', today);
});

let maintainTask = JSON.parse(localStorage.getItem('task')) || [];

let completedTask = JSON.parse(localStorage.getItem('completed')) || [];

show();
function addList() {
    let taskget = document.querySelector('.input_type_text').value;
    if (!taskget) {
        alert("Enter the TaskName");
        return
    }

    let dateget = document.querySelector('.input_type_date').value;

    if (!dateget) {
        alert("Select the date ");
        return
    }
    maintainTask.push({
        task: taskget,
        date: dateget
    });


    localStorage.setItem('task', JSON.stringify(maintainTask));

    document.querySelector('.input_type_text').value = '';
    document.querySelector('.input_type_date').value = '';
    console.log(maintainTask);
    show();
}

function show() {
    let combine = '';

    maintainTask.sort((a, b) => {
        let dateOfA = new Date(a.date);
        let dateOfB = new Date(b.date);
        return dateOfA - dateOfB;
    })
    maintainTask.forEach((tasks, index) => {

        let dateObj = new Date(tasks.date);
        let formattedDate =
            String(dateObj.getDate()).padStart(2, '0') + '/' +
            String(dateObj.getMonth() + 1).padStart(2, '0') + '/' +
            dateObj.getFullYear();
        let html = `
            <div class="task-row">
                <div class="task-name"><h4>${tasks.task}</h4></div>
                <div class="task-date">${formattedDate}</div>
                <div class="task-actions">
                    <button onclick="edit(${index})"><img src="edit.png" alt="Edit" style="width: 20px; height: 20px;"></button>
                    <button onclick="complete(${index})"><img src="accept.png" alt="Accept" style="width: 20px; height: 20px;"></button>
                </div>
            </div>`;


        combine += html;
    });
    document.querySelector('.tasks').innerHTML = combine;
}


function complete(index) {
    const remove = maintainTask.splice(index, 1);
    if (remove.length > 0) {
        completedTask.push(remove[0]);
    }

    localStorage.setItem('task', JSON.stringify(maintainTask));
    localStorage.setItem('completed', JSON.stringify(completedTask));
    show();
}
let editindex = -1;
function edit(index) {
    let edittask = maintainTask[index];

    document.querySelector('.edit-task-name').value = edittask.task;
    document.querySelector('.edit-task-date').value = edittask.date;

    editindex = index;
    document.querySelector('.edit-popup').style.display = 'grid';

}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.close-popup').addEventListener('click', () => {
        document.querySelector('.edit-popup').style.display = 'none';
    });
});







