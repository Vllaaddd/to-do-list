const taskInput = document.querySelector('.task_input');
const tasksList = document.querySelector('.tasks_list');
const tasksForm = document.querySelector('.tasks_form');
const deleteAllBtn = document.querySelector('.delete_all');

const tasksArr = JSON.parse(localStorage.getItem('tasksList')) || [];

tasksForm.addEventListener('submit', e => {
    e.preventDefault();

    const newTask = taskInput.value;

    const task = document.createElement('p')
    task.textContent = newTask;
    task.classList.add('task')

    const checkboxInput = document.createElement('input')
    checkboxInput.type = 'checkbox'
    checkboxInput.classList.add('checkbox')

    const deleteIcon = document.createElement('img')
    deleteIcon.src = "./delete.svg"
    deleteIcon.classList.add('delete_icon')

    const taskLi = document.createElement('li')
    taskLi.append(task, checkboxInput, deleteIcon)

    tasksList.append(taskLi)

    deleteIcon.addEventListener('click', e => {
        e.preventDefault();

        taskLi.remove();
        const index = tasksArr.indexOf(newTask)
        tasksArr.splice(index, 1)
        localStorage.setItem('tasksList', JSON.stringify(tasksArr))
    })

    checkboxInput.addEventListener('change', e => {
        if (checkboxInput.checked){
            taskLi.classList.add('completed')
        }else{
            taskLi.classList.remove('completed')
        }
    })

    tasksArr.push(newTask)
    localStorage.setItem('tasksList', JSON.stringify(tasksArr))

    taskInput.value = '';
})

for (let i = 0; i < tasksArr.length; i++) {

    const deleteIcon = document.createElement('img')
    deleteIcon.classList.add('delete_icon')
    deleteIcon.src = "./delete.svg"

    const checkboxInput = document.createElement('input')
    checkboxInput.type = 'checkbox'
    checkboxInput.classList.add('checkbox')

    const task = document.createElement('p')
    task.textContent = tasksArr[i]
    task.classList.add('task')

    const taskLi = document.createElement('li')
    taskLi.append(task, checkboxInput, deleteIcon)
    
    tasksList.append(taskLi)

    checkboxInput.addEventListener('change', e => {
        if (checkboxInput.checked){
            taskLi.classList.add('completed')
        }else{
            taskLi.classList.remove('completed')
        }
    })

    deleteIcon.addEventListener('click', e => {
        e.preventDefault();

        taskLi.remove();
        tasksArr.splice(i, 1)
        localStorage.setItem('tasksList', JSON.stringify(tasksArr))
    })
}

deleteAllBtn.addEventListener('click', e => {

    window.location.reload();

    localStorage.clear()

})