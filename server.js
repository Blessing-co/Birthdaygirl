const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Playful roasts
const roasts = [
    "Are those glasses for seeing, or just for looking smart while failing the test? 😂",
    "With those glasses, you should have seen this joke coming! 🤓",
    "I'd ask you to read the board, but I don't have all day for you to clean your lenses. 👓",
    "Four eyes, zero excuses for missing the assignment! 📚",
    "Are you wearing those to protect your eyes from my brilliance? ✨",
    "Your glasses are so thick they can see into the future... too bad they couldn't predict this roast. 🔮",
    "You have HD vision now and you still can't find your pen? 🤦",
    "School's tough, but at least you can clearly see your grades dropping! Just kidding! 😜"
];

// API endpoint for random roasts
app.get('/api/roast', (req, res) => {
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    res.json({ message: randomRoast });
});

const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
