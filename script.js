// --- AI DATA MATRIX (FEB 2026) ---
const aiModels = [
    {
        id: 1,
        name: "GPT-5.2 (Orion)",
        maker: "OpenAI",
        capabilities: ["Reasoning Lvl 5", "Deep Agentic Workflows", "Instant Audio/Video"],
        description: "The reigning champion of general reasoning. GPT-5.2 introduces 'Deep Research' agents that can autonomously browse and synthesize reports over hours. Now features native 'thinking' mode for math/code.",
        future: "Rumors of 'GPT-6' training run completing in late 2026. Expected to integrate with humanoid robotics partners. Focus shifting to self-improving code generation.",
        link: "https://openai.com",
        color: "#10a37f"
    },
    {
        id: 2,
        name: "Gemini 3 Pro",
        maker: "Google",
        capabilities: ["10M Token Context", "Native Multimodal", "Real-time Video Analysis"],
        description: "Google's powerhouse. Can process entire codebases or hour-long movies in seconds. The 'Ultra' variant is currently leading the medical diagnosis benchmarks.",
        future: "Project Astra integration into smart glasses imminent. Speculation about 'infinite memory' personal assistants launching in Q3 2026.",
        link: "https://deepmind.google/technologies/gemini/",
        color: "#4285f4"
    },
    {
        id: 3,
        name: "Claude Opus 4.5",
        maker: "Anthropic",
        capabilities: ["Nuanced Writing", "Safety/Constitution", "Complex Coding"],
        description: "The developer's favorite. Opus 4.5 drastically reduced refusal rates while maintaining safety. Known for writing code that works on the first try and 'feeling' more human.",
        future: "Anthropic is pushing hard on 'Constitutional AI' for government contracts. Expected to release a standalone coding IDE that replaces VS Code.",
        link: "https://www.anthropic.com",
        color: "#d97757"
    },
    {
        id: 4,
        name: "Grok 4.1",
        maker: "xAI",
        capabilities: ["Real-time X Data", "Uncensored Mode", "Visual Reasoning"],
        description: "The rebel AI. Integrates real-time news from X (formerly Twitter). Grok 4.1 has significantly improved math capabilities and offers a 'Fun Mode' that roasts users.",
        future: "Deep integration with Tesla Optimus robots and FSD v14. Musk promises 'TruthGPT' updates to combat perceived bias in other models.",
        link: "https://x.ai",
        color: "#fff"
    },
    {
        id: 5,
        name: "Llama 4 (405B)",
        maker: "Meta",
        capabilities: ["Open Weights", "On-Device Distillation", "Multilingual"],
        description: "The open-source king. Llama 4 405B rivals GPT-5 in quality but can be hosted privately. It has spawned a massive ecosystem of fine-tunes for specific industries.",
        future: "Zuckerberg aims for AGI via open source. Llama 5 is rumored to be trained on video data from Ray-Ban Meta glasses.",
        link: "https://llama.meta.com",
        color: "#0668E1"
    },
    {
        id: 6,
        name: "Qwen 3-Max",
        maker: "Alibaba",
        capabilities: ["Math/Coding Specialist", "Vision-Language", "Low Latency"],
        description: "China's leading model. Qwen 3 dominates math benchmarks and has surprisingly strong English proficiency. Optimized for mobile and edge deployment.",
        future: "Expansion into robotics control for manufacturing. Alibaba is building a 'Model-as-a-Service' platform to rival Azure.",
        link: "https://qwenlm.github.io",
        color: "#615ced"
    },
    {
        id: 7,
        name: "Mistral Large 3",
        maker: "Mistral AI",
        capabilities: ["Efficiency", "European Compliance", "JSON Mode"],
        description: "The European efficiency master. Matches GPT-4 class performance with half the compute. Highly optimized for RAG (Retrieval Augmented Generation) pipelines.",
        future: "Focus on 'sovereign AI' for EU governments. Developing specialized models for legal and financial auditing.",
        link: "https://mistral.ai",
        color: "#f3c623"
    },
    {
        id: 8,
        name: "DeepSeek-V4",
        maker: "DeepSeek",
        capabilities: ["Coding 90% Pass Rate", "MoE Architecture", "Free/Cheap API"],
        description: "The market disruptor. Offers GPT-5 level coding performance at 1/10th the cost. Its 'Mixture-of-Experts' architecture is the most efficient in the industry.",
        future: "Rumors of a fully autonomous software engineer agent that creates apps from a single prompt.",
        link: "https://www.deepseek.com",
        color: "#4d6bfe"
    }
];

// --- DOM ELEMENTS ---
const gridContainer = document.getElementById('gridContainer');
const searchInput = document.getElementById('searchInput');
const makerFilters = document.getElementById('makerFilters');

// --- INITIALIZATION ---
function init() {
    generateFilterButtons();
    renderCards(aiModels);
}

// --- RENDER LOGIC ---
function renderCards(models) {
    gridContainer.innerHTML = '';
    
    if (models.length === 0) {
        gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-dim); margin-top: 2rem;">NO SIGNAL DETECTED...</div>`;
        return;
    }

    models.forEach(model => {
        const card = document.createElement('article');
        card.className = 'ai-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-header">
                    <h2 class="model-name">${model.name}</h2>
                    <span class="maker-badge" style="border: 1px solid ${model.color}; color: ${model.color}">${model.maker}</span>
                </div>
                
                <div class="capabilities">
                    ${model.capabilities.map(cap => `<span class="cap-tag">${cap}</span>`).join('')}
                </div>
                
                <p class="desc-text">${model.description}</p>
                
                <button class="expand-btn" onclick="toggleFuture(this)">
                    <span class="arrow">▼</span> PREDICT_FUTURE.exe
                </button>
                
                <div class="future-section">
                    <div class="future-content">
                        <strong>// UPCOMING DATA:</strong><br>
                        ${model.future}
                    </div>
                </div>

                <a href="${model.link}" target="_blank" class="visit-btn">INITIALIZE LINK</a>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

// --- DYNAMIC FILTER BUTTONS ---
function generateFilterButtons() {
    const makers = [...new Set(aiModels.map(m => m.maker))];
    makers.forEach(maker => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.innerText = maker;
        btn.onclick = () => filterByMaker(maker, btn);
        makerFilters.appendChild(btn);
    });
}

// --- INTERACTIVITY FUNCTIONS ---
window.toggleFuture = function(btn) {
    const section = btn.nextElementSibling;
    const arrow = btn.querySelector('.arrow');
    
    section.classList.toggle('open');
    arrow.classList.toggle('rotate-arrow');
    
    if (section.classList.contains('open')) {
        btn.innerHTML = `<span class="arrow rotate-arrow">▼</span> CLOSE_STREAM`;
    } else {
        btn.innerHTML = `<span class="arrow">▼</span> PREDICT_FUTURE.exe`;
    }
};

function filterByMaker(maker, btn) {
    // UI Update
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Logic
    const filtered = aiModels.filter(m => m.maker === maker);
    renderCards(filtered);
}

document.querySelector('.filter-btn[data-filter="all"]').addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderCards(aiModels);
});

// --- SEARCH LOGIC ---
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    
    const filtered = aiModels.filter(model => 
        model.name.toLowerCase().includes(term) || 
        model.maker.toLowerCase().includes(term) ||
        model.capabilities.some(cap => cap.toLowerCase().includes(term))
    );
    
    renderCards(filtered);
});

// Start System
init();
