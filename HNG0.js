let cardTitle = document.getElementById('cardTitle');
let description = document.getElementById('description');
let priority = document.getElementById('priorityControl');
let dueDate = document.getElementById('due-date');
let timeRem = document.getElementById('time-remaining');
let statusControl = document.getElementById('statusControl');
let toggleCheck = document.getElementById('toggleCheck');
let editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');
const titleSect = document.getElementById('titleSect');
const descSect = document.getElementById('descSect');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
let expandToggle = document.getElementById('expandToggle');
let priorityControl = document.getElementById(`priorityControl`);
let priorityText = document.getElementById(`priorityText`);


priorityControl.addEventListener(`change`, () => {
    if (priorityControl.value === `High`) {
        priorityText.style.backgroundColor = `red`;
    } else if (priorityControl.value === `Medium`){
        priorityText.style.backgroundColor = `yellow`;
    } else {
        priorityText.style.backgroundColor = `green`;
    }
});
const MAX_LENGTH = 70;


setInterval(() => {
    if (toggleCheck.checked ||statusControl.value === `Done`  ) {
        timeRem.textContent = `Completed`;
         timeRem.style.color = `green`
        return;

    }
    let dueDateValue = new Date(dueDate.value);
    let now = new Date();
    let diff = dueDateValue - now;

    if (diff < 0) {
        let overdueTime = Math.abs(diff);

        if (overdueTime < 3600000) {
            timeRem.textContent = `Overdue by ${Math.floor(overdueTime / 60000)} minutes`;
        } else if (overdueTime < 86400000) {
            timeRem.textContent = `Overdue by ${Math.floor(overdueTime / 3600000)} hours`;
        } else {
            timeRem.textContent = `Overdue by ${Math.floor(overdueTime / 86400000)} days`;
        }

    } else {
        if (diff < 3600000) {
            timeRem.textContent = `Due in ${Math.floor(diff / 60000)} minutes`;
        } else if (diff < 86400000) {
            timeRem.textContent = `Due in ${Math.floor(diff / 3600000)} hours`;
        } else {
            timeRem.textContent = `Due in ${Math.floor(diff / 86400000)} days`;
        }
    }
}, 1000);


function truncateDescription() {
    let fullText = description.dataset.full || description.textContent;

    if (fullText.length > MAX_LENGTH) {
        description.textContent = fullText.slice(0, MAX_LENGTH) + '...';
        expandToggle.style.display = 'inline';
    } else {
        description.textContent = fullText;
        expandToggle.style.display = 'none';
    }
}

// Store full text initially
description.dataset.full = description.textContent;
truncateDescription();


expandToggle.addEventListener('click', function () {
    const isExpanded = description.classList.contains('expanded');

    if (isExpanded) {
        description.classList.remove('expanded');
        truncateDescription();
        expandToggle.textContent = 'Show more';
        expandToggle.setAttribute('aria-expanded', 'false');
    } else {
        description.classList.add('expanded');
        description.textContent = description.dataset.full;
        expandToggle.textContent = 'Show less';
        expandToggle.setAttribute('aria-expanded', 'true');
    }
});

// edit mode
let recentTitle, recentDescription, recentDuedate, recentPriority;

editBtn.addEventListener('click', function () {
    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';
    deleteBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
    expandToggle.style.display = 'none'; 

    recentTitle = cardTitle.textContent;
    recentDescription = description.dataset.full;
    recentDuedate = dueDate.value;
    recentPriority = priority.value;

    cardTitle.style.display = 'none';
    description.style.display = 'none';

    let titleInp = document.createElement('input');
    titleInp.id = 'titleEdit';
    titleInp.value = recentTitle;
    titleInp.dataset.testid = `test-todo-edit-title-input`;
    titleSect.appendChild(titleInp);

    let descriptionInp = document.createElement('textarea');
    descriptionInp.id = 'descriptionEdit';
    descriptionInp.value = recentDescription;
    descriptionInp.dataset.testid = `test-todo-edit-description-input`;
    descSect.appendChild(descriptionInp);

    dueDate.disabled = false;
    descriptionInp.focus();
});


saveBtn.addEventListener('click', function () {
    const newTitle = document.getElementById('titleEdit');
    const newDesc = document.getElementById('descriptionEdit');

    cardTitle.textContent = newTitle.value;
    description.dataset.full = newDesc.value;

    newTitle.remove();
    newDesc.remove();

    cardTitle.style.display = 'block';
    description.style.display = 'block';

    dueDate.disabled = true;

    truncateDescription(); 
    editBtn.style.display = 'block';
    saveBtn.style.display = 'none';
    deleteBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
});


cancelBtn.addEventListener('click', function () {
    const newTitle = document.getElementById('titleEdit');
    const newDesc = document.getElementById('descriptionEdit');

    cardTitle.textContent = recentTitle;
    description.dataset.full = recentDescription;
    priority.value = recentPriority;
    dueDate.value = recentDuedate;

    newTitle.remove();
    newDesc.remove();

    cardTitle.style.display = 'block';
    description.style.display = 'block';

    truncateDescription();

    editBtn.style.display = 'block';
    saveBtn.style.display = 'none';
    deleteBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
});


statusControl.addEventListener('change', function () {
    if (statusControl.value === 'Done') {
        toggleCheck.checked = true;
        cardTitle.style.textDecoration = 'line-through';
    } else {
        toggleCheck.checked = false;
        cardTitle.style.textDecoration = 'none';
    }
});

toggleCheck.addEventListener('change', function () {
    if (toggleCheck.checked) {
        statusControl.value = 'Done';
        cardTitle.style.textDecoration = 'line-through';
     

    } else {
        statusControl.value = 'Pending';
        cardTitle.style.textDecoration = 'none';
    }
});



deleteBtn.addEventListener('click', function () {
    if (confirm('Delete this task?')) {
        document.getElementById('cardwrap').remove();
    }
});
