function shareOnTwitter() {
    const text = "Check out NotionPad - Best notetaking app on the go!";
    const url = "https://notionpad.vercel.app";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
}

function shareOnLinkedIn() {
    const url = "https://notionpad.vercel.app";
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
}