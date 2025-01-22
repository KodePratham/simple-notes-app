// Initialize event listeners when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for better performance
    const noteForm = document.querySelector('.note-form');
    const notesContainer = document.getElementById('notesContainer');
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');
    const addNoteBtn = document.getElementById('addNote');

    // Initialize notes array from localStorage or empty array if none exists
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Persist notes to localStorage
    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Render all notes in the container
    function displayNotes() {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            // Create note element with title, content, and timestamp
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <small>Created: ${note.date}</small>
            `;
            noteElement.addEventListener('click', () => viewNote(index));
            notesContainer.appendChild(noteElement);
        });
    }

    // Navigate to note detail view
    window.viewNote = (index) => {
        window.location.href = `note.html?id=${index}`;
    };

    // Handle note deletion with confirmation
    window.deleteNote = (index) => {
        if (confirm('Are you sure you want to delete this note?')) {
            notes.splice(index, 1);
            saveNotes();
            displayNotes();
        }
    };

    // Handle new note creation
    addNoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Validate input fields
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            alert('Please fill in both title and content!');
            return;
        }

        // Create new note object
        const note = {
            title,
            content,
            date: new Date().toLocaleString()
        };

        // Add note and update UI
        notes.push(note);
        saveNotes();
        displayNotes();

        // Clear form
        titleInput.value = '';
        contentInput.value = '';
    });

    // Initial notes display
    displayNotes();
});
