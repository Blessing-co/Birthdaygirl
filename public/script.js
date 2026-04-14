document.addEventListener('DOMContentLoaded', () => {
    // 1. Chat bubble scroll animation
    const bubbles = document.querySelectorAll('.message-bubble');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    bubbles.forEach(b => observer.observe(b));

    // 2. Vision Test Toggle
    const visionBtn = document.getElementById('vision-btn');
    if (visionBtn) {
        visionBtn.addEventListener('click', function() {
            document.getElementById('vision-text').classList.toggle('vision-clear');
            document.getElementById('reveal-text').classList.remove('hidden');
            this.classList.add('hidden');
        });
    }

    // 3. Fetch Random Roast from Backend
    const fetchRoastBtn = document.getElementById('fetch-roast-btn');
    const roastDisplay = document.getElementById('roast-display');

    if (fetchRoastBtn && roastDisplay) {
        fetchRoastBtn.addEventListener('click', async () => {
            fetchRoastBtn.disabled = true;
            roastDisplay.style.opacity = 0.5; // simple loading state

            try {
                const response = await fetch('/api/roast');
                const data = await response.json();
                roastDisplay.innerText = data.message;
            } catch (err) {
                console.error("Error fetching roast:", err);
                roastDisplay.innerText = "Error: Roast machine broke. You got lucky! 🍀";
            } finally {
                roastDisplay.style.opacity = 1;
                fetchRoastBtn.disabled = false;
            }
        });
    }
});