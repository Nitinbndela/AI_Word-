// AI Data - Elaborated details for each model (update as needed)
const aiModels = [
  {
    name: "GPT-5.2",
    maker: "OpenAI",
    description: "The balanced beast: Tops intelligence benchmarks, handles massive reasoning chains.",
    details: "Capabilities: Writes novels, debugs code, multimodal (text/image/video), 400K+ context. Best for creative projects or PhD-level analysis. Crushes GPQA and math evals."
  },
  {
    name: "Gemini 3 Pro",
    maker: "Google",
    description: "Multimodal king: Videos, images, long-form reasoning.",
    details: "Capabilities: Analyzes media, excels in general knowledge and science. Tops GPQA, math, and visual tasks. Great for research or content creation with visuals."
  },
  {
    name: "Claude Opus 4.5",
    maker: "Anthropic",
    description: "Coder's god: Nuanced writing, safe and human-like.",
    details: "Capabilities: Leads in software engineering (SWE-bench 80.9%), mimics tones perfectly. Best for coding, stories, or ethical AI discussions. Avoids hallucinations like a pro."
  },
  {
    name: "Grok 4.1",
    maker: "xAI",
    description: "Unhinged truth-teller: Real-time X data, dark humor.",
    details: "Capabilities: Pulls from X ecosystem, no corporate filter. Excels in real-time events, multi-faceted reasoning. Tops Chat Arena for raw vibe."
  },
  {
    name: "Qwen 3",
    maker: "Alibaba",
    description: "Fast multilingual monster: Cheap and efficient.",
    details: "Capabilities: Handles multiple languages, quick inference. Tops Arena-Hard (89+). Ideal for global apps or budget-conscious devs."
  }
  // Add more AIs here, e.g., { name: "Llama 4", maker: "Meta", ... }
];

// Function to render cards
function renderCards(models) {
  const grid = document.getElementById('aiGrid');
  grid.innerHTML = '';
  models.forEach(model => {
    const card = document.createElement('div');
    card.classList.add('ai-card');
    card.innerHTML = `
      <h2>${model.name}</h2>
      <p><strong>Maker:</strong> ${model.maker}</p>
      <p>${model.description}</p>
      <div class="details">${model.details}</div>
    `;
    card.addEventListener('click', () => card.classList.toggle('expanded'));
    grid.appendChild(card);
  });
}

// Initial render
renderCards(aiModels);

// Search functionality
document.getElementById('searchInput').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = aiModels.filter(model => 
    model.name.toLowerCase().includes(query) || 
    model.maker.toLowerCase().includes(query) || 
    model.description.toLowerCase().includes(query) || 
    model.details.toLowerCase().includes(query)
  );
  renderCards(filtered);
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const filtered = (filter === 'all') ? aiModels : aiModels.filter(model => model.maker === filter);
    renderCards(filtered);
  });
});
