const formEl = document.querySelector('form');
const tasksEl = document.querySelector('#tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
console.log(tasks);

tasksEl.addEventListener('click', (e)=>{
    const action = e.target.getAttribute('data-action');
    const index = e.target.getAttribute('data-index');
    console.log(action, index);

    if(action === 'delete'){
        tasks.splice(index, 1);
        saveAndRenderTasks(tasks);
    }
});

const saveAndRenderTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}

formEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    const value = formEl.elements['task'].value;
    
    tasks.push({title: value});
    formEl.reset();
    saveAndRenderTasks(tasks);

})

const renderTasks = (tasks) => {
    const tasksHTML = tasks.map((task, index) => {
        return `<li>${task.title} <button data-action = 'delete' data-index = ${index}>delete</button></li>`;
    }).join("");

    tasksEl.innerHTML = tasksHTML;
};

renderTasks(tasks);