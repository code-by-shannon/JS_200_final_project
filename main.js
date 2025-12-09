// main.js

import { initModal, closeModal } from './modal.js';
import { addNote, updateNote } from './notes.js';
import { renderNotes, initNoteListEvents, editingId, resetFormMode } from './ui.js';
import { renderCategoryDropdown, initCategoryFilter } from './ui.js';
import { initDetailViewEvents } from './ui.js';
import { showDetailView } from './ui.js';





// Initialize modal and list event handlers
initModal();
initNoteListEvents();
initDetailViewEvents();

// Render any existing notes from localStorage on first load
renderNotes();

// Select the form
const form = document.querySelector('#note_form');

// Handle adding / editing notes
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = form.note_title.value.trim();
    const description = form.note_description.value.trim();
    const category = form.note_category.value.trim();

    // basic validation (you may later swap this for your npm validation lib)
    if (!title || !description || !category) {
        alert('All fields are required.');
        return;
    }

    if (editingId !== null) {
        // EDIT existing note
        updateNote(editingId, title, description, category);
    } else {
        // ADD new note
        addNote(title, description, category);
    }

    // Re-render list
    renderNotes();
    renderCategoryDropdown();
    initCategoryFilter();


    // Reset form + mode, then close modal
    resetFormMode();
    closeModal();
});
