document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    summarizeText();
});

function summarizeText() {
    const text = document.getElementById('inputText').value;

    // Split the text into sentences
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
    if (!sentences) {
        document.getElementById('summary').innerText = "Please enter valid text.";
        return;
    }

    // Calculate word frequencies
    const wordCounts = {};
    const words = text.match(/\w+/g);
    words.forEach(word => {
        word = word.toLowerCase();
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    // Score sentences based on word frequencies
    const sentenceScores = sentences.map(sentence => {
        const words = sentence.match(/\w+/g) || [];
        let score = 0;
        words.forEach(word => {
            word = word.toLowerCase();
            if (wordCounts[word]) {
                score += wordCounts[word];
            }
        });
        return { sentence, score };
    });

    // Sort sentences by score and select the top ones
    const sortedSentences = sentenceScores.sort((a, b) => b.score - a.score);
    const summary = sortedSentences.slice(0, 3).map(item => item.sentence).join(' ');

    // Display the summary
    document.getElementById('summary').innerText = summary;
}
