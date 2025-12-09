
const modal = document.querySelector('#note_modal');
const addNoteButton = document.querySelector('#add_note');
const cancelButton = document.querySelector('#cancel_button');




export function openModal() {
    modal.style.display = 'block';
}


export function closeModal() {
    modal.style.display = 'none';
}


export function initModal() {
    
    addNoteButton.addEventListener('click', openModal);

   
    cancelButton.addEventListener('click', closeModal);
}
