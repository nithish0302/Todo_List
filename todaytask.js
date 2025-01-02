function today_task() {
    let combine = '';

    let today = new Date();
    let todayFormatted =
        String(today.getDate()).padStart(2, '0') + '/' +
        String(today.getMonth() + 1).padStart(2, '0') + '/' +
        today.getFullYear();
    console.log("Today's date: " + todayFormatted);

    let maintainTask = JSON.parse(localStorage.getItem('task')) || [];

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
                        <button onclick="edit(${index})"><img src="edit.png" alt="Edit" style="width: 23px; height: 23px;"></button>
                        <button onclick="complete(${index})"><img src="accept.png" alt="Accept" style="width: 23px; height: 23px;"></button>
                    </div>
                </div>`;
            combine += html;
        }
    });

    document.querySelector('.today_task').innerHTML = combine;
}

today_task();
