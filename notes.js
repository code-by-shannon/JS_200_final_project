// notes.js

// load notes from localStorage or start empty
export let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Save notes to localStorage
export function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Create a new note object
export function addNote(title, description, category) {
    const newNote = {
        id: Date.now(),        // unique id
        title,
        description,
        category
    };

    notes.push(newNote);
    saveNotes();
}


export function updateNote(id, title, description, category) {
    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            description,
            category
        };
        saveNotes();
    }
}