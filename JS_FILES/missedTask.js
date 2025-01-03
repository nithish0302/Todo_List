function missed() {
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

        if (formattedDate < todayFormatted) {
            let html = `
                <div class="task-row">
                    <div class="task-name">${tasks.task}</div>
                    <div class="task-date">${formattedDate}</div>
                   
                </div>`;
            combine += html;
        }
    });

    document.querySelector('.today_task').innerHTML = combine;
}
missed();