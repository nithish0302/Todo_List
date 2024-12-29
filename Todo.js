document.addEventListener('DOMContentLoaded', (event) => {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('datePicker').setAttribute('min', today);
});

let maintainTask = JSON.parse(localStorage.getItem('task')) || [];

function addList() {
    let taskInput = document.querySelector('.input_type_text');
    let dateInput = document.querySelector('.input_type_date');
    
    let taskget = taskInput.value;
    let dateget = dateInput.value;

    maintainTask.push({
        task: taskget,
        date: dateget
    });

    localStorage.setItem('task', JSON.stringify(maintainTask));

    // Reset the input fields
    taskInput.value = '';
    dateInput.value = '';

    console.log(maintainTask);
}
