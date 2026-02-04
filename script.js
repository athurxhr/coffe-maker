const questions = [
  {
    text: "Profil rasa kopi yang kamu sukai?",
    options: [
      { label: "Asam & fruity", value: "acidic" },
      { label: "Seimbang", value: "balanced" },
      { label: "Pahit & bold", value: "bitter" }
    ]
  },
  {
    text: "Biasanya minum kopi kapan?",
    options: [
      { label: "Pagi", value: "morning" },
      { label: "Sore", value: "afternoon" },
      { label: "Malam / begadang", value: "night" }
    ]
  },
  {
    text: "Tujuan utama minum kopi?",
    options: [
      { label: "Fokus & produktif", value: "focus" },
      { label: "Santai", value: "relax" },
      { label: "Nahan ngantuk", value: "energy" }
    ]
  }
];

const coffeeDB = [
  {
    name: "Vietnamese Drip Coffee",
    emoji: "🇻🇳☕",
    tags: ["bitter", "energy", "night"],
    reason: "Robusta Vietnam memiliki body kuat dan kadar kafein tinggi, ideal untuk kebutuhan energi.",
    method: "Diseduh menggunakan phin filter. Air panas dituangkan perlahan, menghasilkan ekstraksi pekat."
  },
  {
    name: "Ethiopian Pour Over",
    emoji: "🌍☕",
    tags: ["acidic", "focus"],
    reason: "Single origin Ethiopia dikenal dengan acidity cerah dan aroma floral yang membantu fokus.",
    method: "Menggunakan metode pour over (V60) untuk menonjolkan kejernihan rasa."
  },
  {
    name: "Latte",
    emoji: "🥛☕",
    tags: ["balanced", "relax"],
    reason: "Perpaduan espresso dan susu menciptakan rasa lembut dan menenangkan.",
    method: "Espresso disajikan dengan steamed milk menggunakan mesin espresso."
  }
];

let currentStep = 0;
const userAnswers = [];

const contentEl = document.getElementById("appContent");
const progressEl = document.getElementById("progressFill");

function updateProgress() {
  const percent = (currentStep / questions.length) * 100;
  progressEl.style.width = percent + "%";
}

function renderQuestion() {
  updateProgress();

  const q = questions[currentStep];

  const wrapper = document.createElement("div");
  wrapper.className = "fade";

  const title = document.createElement("div");
  title.className = "question";
  title.textContent = q.text;

  const optionsBox = document.createElement("div");
  optionsBox.className = "options";

  q.options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "option-btn";
    btn.textContent = opt.label;

    btn.addEventListener("click", function () {
      userAnswers.push(opt.value);
      currentStep++;

      if (currentStep < questions.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    });

    optionsBox.appendChild(btn);
  });

  wrapper.appendChild(title);
  wrapper.appendChild(optionsBox);

  contentEl.innerHTML = "";
  contentEl.appendChild(wrapper);
}

function renderResult() {
  progressEl.style.width = "100%";

  let bestCoffee = coffeeDB[0];
  let bestScore = 0;

  coffeeDB.forEach(coffee => {
    let score = 0;
    coffee.tags.forEach(tag => {
      if (userAnswers.includes(tag)) score++;
    });

    if (score > bestScore) {
      bestScore = score;
      bestCoffee = coffee;
    }
  });

  const resultBox = document.createElement("div");
  resultBox.className = "result fade";

  resultBox.innerHTML = `
    <div style="font-size:48px">${bestCoffee.emoji}</div>
    <h2>${bestCoffee.name}</h2>
    <p>${bestCoffee.reason}</p>
    <div class="method-box">
      <strong>Metode Penyeduhan:</strong>
      <p>${bestCoffee.method}</p>
    </div>
  `;

  const restart = document.createElement("button");
  restart.className = "restart-btn";
  restart.textContent = "Ulangi Tes";

  restart.addEventListener("click", function () {
    currentStep = 0;
    userAnswers.length = 0;
    renderQuestion();
  });

  resultBox.appendChild(restart);

  contentEl.innerHTML = "";
  contentEl.appendChild(resultBox);
}

renderQuestion();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}