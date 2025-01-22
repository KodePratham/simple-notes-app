document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.querySelector('.note-form');
    const notesContainer = document.getElementById('notesContainer');
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');
    const addNoteBtn = document.getElementById('addNote');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function displayNotes() {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content.substring(0, 150)}${note.content.length > 150 ? '...' : ''}</p>
            `;
            noteElement.addEventListener('click', () => viewNote(index));
            notesContainer.appendChild(noteElement);
        });
    }

    window.viewNote = (index) => {
        window.location.href = `note.html?id=${index}`;
    };

    window.deleteNote = (index) => {
        if (confirm('Are you sure you want to delete this note?')) {
            notes.splice(index, 1);
            saveNotes();
            displayNotes();
        }
    };

    addNoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            alert('Please fill in both title and content!');
            return;
        }

        const note = {
            title,
            content,
            date: new Date().toLocaleString()
        };

        notes.push(note);
        saveNotes();
        displayNotes();

        titleInput.value = '';
        contentInput.value = '';
    });

    displayNotes();
});
