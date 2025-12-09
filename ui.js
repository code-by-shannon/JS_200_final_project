// ui.js
import { notes, saveNotes } from './notes.js';
import { openModal } from './modal.js';

// DOM references
const notesList = document.querySelector('#notes-list');
const form = document.querySelector('#note_form');
const modalTitle = document.querySelector('#modal_title');

const detailView = document.querySelector('#detail_view');
const detailTitle = document.querySelector('#detail_title');
const detailDescription = document.querySelector('#detail_description');
const detailCategory = document.querySelector('#detail_category');
const notesContainer = document.querySelector('#notes-container');

const categoryFilter = document.querySelector('#category_filter');

// Track which note is being edited
export let editingId = null;

/* ---------------------------------------------------------
   RENDER NOTES LIST
--------------------------------------------------------- */
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

    // update category dropdown after rendering
    renderCategoryDropdown();
}

/* ---------------------------------------------------------
   START EDIT MODE
--------------------------------------------------------- */
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

/* ---------------------------------------------------------
   RESET TO ADD MODE
--------------------------------------------------------- */
export function resetFormMode() {
    editingId = null;
    modalTitle.textContent = 'Add a New Note';
    form.reset();
}

/* ---------------------------------------------------------
   DETAIL VIEW
--------------------------------------------------------- */
export function showDetailView(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    detailTitle.textContent = note.title;
    detailDescription.textContent = note.description;
    detailCategory.textContent = note.category;

    notesContainer.style.display = 'none';
    detailView.style.display = 'block';
}

export function initDetailViewEvents() {
    const backButton = document.querySelector('#detail_back');

    backButton.addEventListener('click', () => {
        detailView.style.display = 'none';
        notesContainer.style.display = 'block';
    });
}

/* ---------------------------------------------------------
   HANDLE EDIT & DELETE & CLICK-LI-FOR-DETAIL
--------------------------------------------------------- */
export function initNoteListEvents() {
    notesList.addEventListener('click', e => {
        const li = e.target.closest('li');
        if (!li) return;

        const id = Number(li.dataset.id);

        // ⭐ Clicked the LI itself → open detail view
        if (e.target.tagName !== 'BUTTON') {
            showDetailView(id);
            return;
        }

        // ⭐ Delete
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

        // ⭐ Edit
        if (e.target.classList.contains('edit-note')) {
            startEditingNote(id);
        }
    });
}

/* ---------------------------------------------------------
   CATEGORY FILTER
--------------------------------------------------------- */

function getCategories() {
    const categories = notes
        .map(n => n.category.trim())
        .filter(c => c !== '');

    return ['All Categories', ...new Set(categories)];
}

export function renderCategoryDropdown() {
    if (!categoryFilter) return;

    const cats = getCategories();

    categoryFilter.innerHTML = cats
        .map(cat => `<option value="${cat}">${cat}</option>`)
        .join('');
}

export function initCategoryFilter() {
    if (!categoryFilter) return;

    categoryFilter.addEventListener('change', () => {
        const chosen = categoryFilter.value;

        if (chosen === 'All Categories') {
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
