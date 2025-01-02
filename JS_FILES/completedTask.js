function completeTask() {
    let combine = '';
    let completedTask = JSON.parse(localStorage.getItem('completed')) || [];

    completedTask.sort((a, b) => new Date(a.date) - new Date(b.date));

    completedTask.forEach((tasks, index) => {
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
                    <button onclick="edit(${index})"><img src="../IMAGES/edit.png" alt="Edit" style="width: 21px; height: 23px;"></button>
                </div>
            </div>`;
        combine += html;

    });
    document.querySelector('.completedTask').innerHTML = combine;

}
completeTask();