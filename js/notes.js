// ...existing code...

// Helper function to modify note content
function editNote(noteId, newContent) {
    const note = document.getElementById(noteId);
    if (note) {
        note.innerHTML = newContent;
    } else {
        console.error('Note not found');
    }
}

// Export note content to PDF format
async function exportNoteAsPDF(noteId) {
    const note = document.getElementById(noteId);
    if (note) {
        // Initialize PDF document
        const { PDFDocument, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        
        // Configure page settings
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();
        
        // Add note content to PDF
        page.drawText(note.innerText, {
            x: 50,
            y: height - 50,
            size: 20,
            color: rgb(0, 0, 0),
        });

        // Generate and download PDF file
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Create temporary link and trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.innerText}.pdf`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        console.error('Note not found');
    }
}

// ...existing code...
