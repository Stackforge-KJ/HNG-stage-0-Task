
const title = document.getElementById('cardhead');
const description = document.getElementById('description');
const priority = document.getElementById('priority');
const dueDate = document.getElementById('due-date');
const timeRem = document.getElementById('time-remaining');
const status = document.getElementById('status');
const checkbox = document.getElementById('toggleCheck');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');



setInterval(() => {
    let dueDateValue = new Date('2026-04-11');
    let now = new Date();
    let diff = dueDateValue - now;

    if (diff < 0) {
        let overdueTime = Math.abs(diff);
        if (overdueTime < 3600000) {
            let overdueMinutes = Math.floor(overdueTime / 60000);
            timeRem.textContent = `Overdue by ${overdueMinutes} minutes`

        } else if (overdueTime < 86400000) {
            let overdueHour = Math.floor(overdueTime / 3600000);
            timeRem.textContent = `Overdue by ${overdueHour} hours`

        } else {
            let overdueDays = Math.floor(overdueTime / 86400000);
            timeRem.textContent = `Overdue by ${overdueDays} days`

        }

    } else {
        if (diff < 3600000) {
            let dueMinutes = Math.floor(diff / 60000);
            timeRem.textContent = `Due in ${dueMinutes} minutes`



        } else if (diff < 86400000) {
            let dueHour = Math.floor(diff / 3600000);
            timeRem.textContent = `Due in ${dueHour} hour`

        } else {
            let dueDays = Math.floor(diff / 86400000);
            timeRem.textContent = `Due in ${dueDays} days`;
            

        }
    }


}, 100);


// TOGGLECHECK


checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        title.classList.add('completed');
        description.classList.add('completed');
        status.textContent = 'Done';
        status.classList.add('done');
    } else {
        title.classList.remove('completed');
        description.classList.remove('completed');
        status.textContent = 'Pending';
        status.classList.remove('done');
    }
});

//  EDIT AND DELETE BTN

 editBtn.addEventListener('click', function () {
    let isEditing = description.getAttribute('contenteditable') === 'true';

    if (!isEditing) {
        
        description.setAttribute('contenteditable', 'true');
        description.focus();
        editBtn.textContent = 'Update';

    } else {
        description.setAttribute('contenteditable', 'false');
        editBtn.textContent = 'Edit';
    }
});
 
// DELETEBTN
deleteBtn.addEventListener('click', function () {
    if (confirm('Delete this task?')) {
        document.getElementById('cardwrap').remove();
    }
});









