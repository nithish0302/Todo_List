document.addEventListener('DOMContentLoaded', (event) => {
    let today = new Date().toISOString().split('T')[0];
    document.querySelector('.input_type_date').setAttribute('min', today);
});

let maintainTask = JSON.parse(localStorage.getItem('task')) || [];

let completedTask = [];

show();
function addList() {
    let taskget = document.querySelector('.input_type_text').value;
    let dateget = document.querySelector('.input_type_date').value;

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
    maintainTask.forEach((tasks, index) => {
        let html = `
            <div class="task-row">
                <div class="task-name">${tasks.task}</div>
                <div class="task-date">${tasks.date}</div>
                <div class="task-actions">
                    <button ><img src="edit.png" alt="Edit" style="width: 20px; height: 20px;"></button>
                    <button onclick=" complete(index)"><img src="accept.png" alt="Accept" style="width: 20px; height: 20px;"></button>
                </div>
            </div>`;
            
        combine += html;
    });
    document.querySelector('.tasks').innerHTML = combine;
}





