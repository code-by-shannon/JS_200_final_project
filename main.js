const formEl = document.querySelector('form');
const taskEl = document.querySelector('#tasks');


formEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    const value = formEl.elements['task'].value;
    console.log(value);
})