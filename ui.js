// ui.js

import { notes, saveNotes } from './notes.js';
import { openModal } from './modal.js';

const notesList = document.querySelector('#notes-list');
const form = document.querySelector('#note_form');
const modalTitle = document.querySelector('#modal_title');

// 🔹 which note (by id) we're currently editing; null means "adding"
export let editingId = null;

// Render ALL notes to the screen
export function renderNotes() {
    const html = notes.map(note => {
        return `
            <li data-id="${note.id}">
                <strong>${note.title}</strong><br>
                <small>${note.category}</small><br>
                <button class="edit-note">Edit</button>
                <button class="delete-note">Delete</button>
            </li>
        `;
    }).join("");

    notesList.innerHTML = html;
}

// 🔹 Put the form into "edit mode" and pre-fill it
export function startEditingNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    editingId = id;

    form.note_title.value = note.title;
    form.note_description.value = note.description;
    form.note_category.value = note.category;

    modalTitle.textContent = 'Edit Note';
    openModal();
}

// 🔹 Reset form/mode back to "Add Note"
export function resetFormMode() {
    editingId = null;
    modalTitle.textContent = 'Add a New Note';
    form.reset();
}

// Handle clicking Edit / Delete buttons
export function initNoteListEvents() {
    notesList.addEventListener('click', e => {
        const li = e.target.closest('li');
        if (!li) return;

        const id = Number(li.dataset.id);

        // Delete
        if (e.target.classList.contains('delete-note')) {
            const confirmed = window.confirm('Are you sure you want to delete this note?');
            if (!confirmed) return;

            const index = notes.findIndex(n => n.id === id);
            if (index !== -1) {
                notes.splice(index, 1);
                saveNotes();
                renderNotes();
            }
        }

        // Edit
        if (e.target.classList.contains('edit-note')) {
            startEditingNote(id);
        }
    });
}

// Collect all unique categories in notes
function getCategories() {
    const categories = notes
        .map(note => note.category.trim())
        .filter(cat => cat !== ""); // remove empty

    return ["All Categories", ...new Set(categories)];
}

export function renderCategoryDropdown() {
    const select = document.querySelector('#category_filter');
    if (!select) return;

    const categories = getCategories();

    select.innerHTML = categories
        .map(cat => `<option value="${cat}">${cat}</option>`)
        .join("");
}

export function initCategoryFilter() {
    const select = document.querySelector('#category_filter');
    if (!select) return;

    select.addEventListener('change', () => {
        const chosen = select.value;

        if (chosen === "All Categories") {
            renderNotes();
            return;
        }

        const filtered = notes.filter(n => n.category === chosen);

        const html = filtered.map(note => {
            return `
                <li data-id="${note.id}">
                    <strong>${note.title}</strong><br>
                    <small>${note.category}</small><br>
                    <button class="edit-note">Edit</button>
                    <button class="delete-note">Delete</button>
                </li>
            `;
        }).join("");

        notesList.innerHTML = html;
    });
}



