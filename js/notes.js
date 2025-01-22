// ...existing code...

function editNote(noteId, newContent) {
    const note = document.getElementById(noteId);
    if (note) {
        note.innerHTML = newContent;
    } else {
        console.error('Note not found');
    }
}

async function exportNoteAsPDF(noteId) {
    const note = document.getElementById(noteId);
    if (note) {
        const { PDFDocument, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();
        page.drawText(note.innerText, {
            x: 50,
            y: height - 50,
            size: 20,
            color: rgb(0, 0, 0),
        });
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.innerText}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        console.error('Note not found');
    }
}

// ...existing code...
