// --- 1. Data Source (Simulated API) ---
const modelsData = [
    {
        name: "GPT-5.2 (Orion)",
        arch: "MoE Transformer",
        tags: ["Reasoning", "Coding"],
        score: 98.5,
        status: "Active"
    },
    {
        name: "Gemini 3 Pro",
        arch: "Multimodal Native",
        tags: ["Video", "10M Context"],
        score: 97.2,
        status: "Active"
    },
    {
        name: "Claude Opus 4.5",
        arch: "Dense Transformer",
        tags: ["Safety", "Nuance"],
        score: 96.8,
        status: "Training"
    },
    {
        name: "Grok 4.1",
        arch: "Sparse Attention",
        tags: ["Real-time", "Uncensored"],
        score: 91.5,
        status: "Active"
    },
    {
        name: "Llama 5 (400B)",
        arch: "Open Weights",
        tags: ["Local", "Efficient"],
        score: 89.4,
        status: "Beta"
    },
    {
        name: "Mistral Large 3",
        arch: "MoE",
        tags: ["EU Compliant", "Fast"],
        score: 88.9,
        status: "Active"
    }
];

// --- 2. Render Logic ---
const tableBody = document.getElementById('tableBody');
const totalModelsDisplay = document.getElementById('totalModels');

function renderTable(data) {
    tableBody.innerHTML = ""; // Clear existing

    data.forEach(model => {
        // Generate Tags HTML
        const tagsHtml = model.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Create Row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="font-weight: 600; color: #fff;">${model.name}</div>
            </td>
            <td style="color: var(--text-muted);">${model.arch}</td>
            <td>${tagsHtml}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span>${model.score}%</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${model.score}%"></div>
                    </div>
                </div>
            </td>
            <td>
                <span style="color: ${model.status === 'Active' ? '#00ff88' : '#ffcc00'}">● ${model.status}</span>
            </td>
        `;
        tableBody.appendChild(row);
    });

    totalModelsDisplay.innerText = data.length;
}

// Initial Render
renderTable(modelsData);


// --- 3. Search & Sort Logic ---
const searchInput = document.getElementById('searchInput');
const sortBtn = document.getElementById('sortBtn');
let isSorted = false;

searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = modelsData.filter(model => 
        model.name.toLowerCase().includes(term) || 
        model.arch.toLowerCase().includes(term)
    );
    renderTable(filtered);
});

sortBtn.addEventListener('click', () => {
    let sortedData = [...modelsData];
    if (!isSorted) {
        sortedData.sort((a, b) => b.score - a.score); // High to Low
        sortBtn.innerHTML = '<i class="fa-solid fa-sort-down"></i> Score (High-Low)';
    } else {
        sortedData.sort((a, b) => a.score - b.score); // Low to High
        sortBtn.innerHTML = '<i class="fa-solid fa-sort-up"></i> Score (Low-High)';
    }
    isSorted = !isSorted;
    renderTable(sortedData);
});


// --- 4. Background Animation (Canvas Particles) ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 60;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 242, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 242, 255, ${0.1 - distance/1500})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize Handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
