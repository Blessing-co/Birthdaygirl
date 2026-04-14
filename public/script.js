// Smooth scrolling
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Chat logic
const chatMessages = [
    { sender: 'cronos', text: 'Hey four eyes! 👀' },
    { sender: 'four-eyes', text: 'mtchew, what do you want? 🙄' },
    { sender: 'cronos', text: 'Just checking if you can read this message without squinting 😂' },
    { sender: 'four-eyes', text: 'you\'re sick 😒' },
    { sender: 'cronos', text: 'Did you forget your glasses at home again today? 👓' },
    { sender: 'four-eyes', text: 'Leave me alone! It\'s my birthday! 🎂' },
    { sender: 'cronos', text: 'Oh right! Well, happy birthday! May your vision be 20/20 today! 🎉' }
];

const chatBox = document.getElementById('chatBox');
let messageIndex = 0;

// Create typing indicator
const typingIndicator = document.createElement('div');
typingIndicator.className = 'typing-indicator';
typingIndicator.textContent = 'typing...';
chatBox.appendChild(typingIndicator);

function showNextMessage() {
    if (messageIndex < chatMessages.length) {
        typingIndicator.style.display = 'block';
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const msg = chatMessages[messageIndex];
            const msgEl = document.createElement('div');
            msgEl.className = `message ${msg.sender}`;
            msgEl.textContent = msg.text;

            // Insert before typing indicator
            chatBox.insertBefore(msgEl, typingIndicator);
            chatBox.scrollTop = chatBox.scrollHeight;

            messageIndex++;
            setTimeout(showNextMessage, 1500 + Math.random() * 1000); // Random delay 1.5s - 2.5s
        }, 1000); // Typing delay
    }
}

// Vision Test Logic
const visionBtn = document.getElementById('visionBtn');
const visionText = document.getElementById('visionText');
const teaseLines = document.querySelectorAll('.tease-line');
const sweetLines = document.querySelectorAll('.sweet-line');

visionBtn.addEventListener('click', () => {
    visionText.classList.add('clear');
    visionBtn.disabled = true;
    visionBtn.textContent = 'Much better...';

    // After text clears, swap tease for sweet message
    setTimeout(() => {
        teaseLines.forEach(el => {
            el.classList.add('hidden');
            setTimeout(() => el.style.display = 'none', 1000);
        });

        setTimeout(() => {
            sweetLines.forEach(el => {
                el.classList.remove('hidden');
                el.classList.add('show');
            });
        }, 1000);
    }, 2500);
});

// Random Roast Logic
const roastBtn = document.getElementById('roastBtn');
const roastMessage = document.getElementById('roastMessage');

roastBtn.addEventListener('click', async () => {
    // Hide current message briefly for effect
    roastMessage.classList.remove('fade-in-roast');
    roastMessage.classList.add('hidden-roast');
    roastBtn.disabled = true;

    try {
        const response = await fetch('/api/roast');
        const data = await response.json();

        setTimeout(() => {
            roastMessage.textContent = data.message;
            roastMessage.classList.remove('hidden-roast');
            roastMessage.classList.add('fade-in-roast');
            roastBtn.disabled = false;
        }, 300);
    } catch (error) {
        console.error('Error fetching roast:', error);
        roastMessage.textContent = "Oops, the roast machine broke. You got lucky! 🍀";
        roastMessage.classList.remove('hidden-roast');
        roastMessage.classList.add('fade-in-roast');
        roastBtn.disabled = false;
    }
});

// Intersection Observer for Chat trigger and Final section fade-in
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

let chatStarted = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger chat if in view
            if (entry.target.id === 'chat' && !chatStarted) {
                chatStarted = true;
                setTimeout(showNextMessage, 1000);
            }
            // Trigger fade-in elements
            if (entry.target.classList.contains('fade-in-section')) {
                entry.target.classList.add('is-visible');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
document.querySelectorAll('.fade-in-section').forEach(el => {
    observer.observe(el);
});
