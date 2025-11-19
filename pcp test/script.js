/* PCP 50-MCQ Quiz — Frontend logic
   Replace GOOGLE_SCRIPT_URL if you change Apps Script deployment.
*/
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziHK4mSW2rvmYrZIAyeSEt91n1HBfExOY5w1q3wgpSexrP_AzYeot1TZSz3N9C07rz1w/exec";

// 50 MCQs (Units I - VII) — options array and answer index (0-based)
const quiz = [
  // 1-5 Unit I
  {q:"Which impurity is commonly present in raw cotton?", options:["Sericin","Wax & pectin","Grease (lanolin)","Lignin"], answer:1},
  {q:"What is the main objective of pretreatment (preparatory) processing?", options:["Add hydrophobic finish","Remove impurities & make fabric absorbent","Increase stiffness","Reduce dye uptake"], answer:1},
  {q:"Which machine is typically used for singeing?", options:["Kier","Singeing machine","Jigger","Stenter"], answer:1},
  {q:"Which machine sets the width of fabric after drying?", options:["Winch","Jigger","Stenter","Kier"], answer:2},
  {q:"Which instrument checks whiteness/reflectance of fabric?", options:["Drop test","Reflectance/whiteness meter","Tensile test","Bursting test"], answer:1},

  // 6-15 Unit II
  {q:"Desizing primarily removes which material?", options:["Grease","Starch/PVA sizing","Dyes","Sericin"], answer:1},
  {q:"Which enzyme is commonly used for enzymatic desizing?", options:["Cellulase","Protease","Amylase","Lipase"], answer:2},
  {q:"Typical temperature range for enzyme desizing is:", options:["10–20 °C","50–70 °C","90–100 °C","0–10 °C"], answer:1},
  {q:"Which reagent is commonly used for scouring cotton?", options:["NaOH + Na2CO3","HCl","Acetic acid","NaCl"], answer:0},
  {q:"Scouring typically raises pH to about:", options:["3–4","7–8","11–12","5–6"], answer:2},
  {q:"Which bleaching agent is used around 30–40 °C?", options:["NaOCl (sodium hypochlorite)","H2O2","NaClO2","Sulfuric acid"], answer:0},
  {q:"Which bleaching agent is commonly used at high temp (90–95 °C)?", options:["NaOCl","H2O2","NaClO2","HCl"], answer:1},
  {q:"Enzymatic desizing primarily removes:", options:["Grease","Starch sizing","Dyes","Sericin"], answer:1},
  {q:"A common reducing bleach is:", options:["H2O2","NaOCl","Sodium hydrosulphite","NaClO2"], answer:2},
  {q:"Singeing commonly uses which heat source?", options:["Gas flame","Enzyme bath","Cold water spray","Steam"], answer:0},

  // 16-23 Unit III Mercerization
  {q:"Mercerization uses which reagent?", options:["H2O2","NaOH","HCl","NH3"], answer:1},
  {q:"Typical NaOH concentration for mercerization is around:", options:["1–5%","18–30%","50–60%","0.5%"], answer:1},
  {q:"Mercerization is performed under tension to:", options:["Increase shrinkage","Prevent shrinkage & produce lustre","Remove dyes","Make hydrophobic"], answer:1},
  {q:"Neutralization after mercerization commonly uses:", options:["Sulfuric acid","Sodium carbonate","Acetic acid","Hydrochloric acid"], answer:2},
  {q:"One main effect of mercerization is:", options:["Decrease in luster","Increase in luster & strength","Removal of sizing","Make fiber elastic"], answer:1},
  {q:"Typical mercerization temperature range:", options:["15–25 °C","80–95 °C","0–5 °C","60–70 °C"], answer:0},
  {q:"Mercerization improves:", options:["Dye affinity","Water repellency","Fiber melting point","Odour"], answer:0},
  {q:"If mercerization done without tension it may cause:", options:["Better luster","Excessive shrinkage & poor luster","Becoming hydrophobic","Color fastness increase"], answer:1},

  // 24-31 Unit IV Wool, Silk & Synthetics
  {q:"Wool scouring commonly uses:", options:["Strong acids","Soap + Na2CO3","NaOH 30%","Enzymatic amylase"], answer:1},
  {q:"Carbonizing of wool uses which acid?", options:["HCl","H2SO4","Acetic acid","HNO3"], answer:1},
  {q:"Typical concentration range for carbonizing acid:", options:["0.5%","5–7%","25%","40%"], answer:1},
  {q:"Carbonizing is performed at approx:", options:["20–30 °C","90–100 °C","200 °C","10 °C"], answer:1},
  {q:"Silk degumming removes:", options:["Pectin","Sericin","Grease","Lignin"], answer:1},
  {q:"Silk degumming often occurs around:", options:["20–30 °C","90–95 °C","200 °C","0–10 °C"], answer:1},
  {q:"Bleaching synthetic fibers commonly uses:", options:["H2O2 only","NaClO2 (sodium chlorite)","Acetic acid","Enzymes"], answer:1},
  {q:"Carbonizing purpose is to:", options:["Dye wool","Remove vegetable matter (burrs)","Add lubricant","Apply finish"], answer:1},

  // 32-37 Unit V After-Treatment
  {q:"Purpose of washing after processing is to:", options:["Add more chemicals","Remove residual chemicals & impurities","Shrink fabric intentionally","Apply sizing"], answer:1},
  {q:"Common washing temperature to remove chemicals is:", options:["60–80 °C","0–10 °C","200 °C","30 °C"], answer:0},
  {q:"Which drying method uses IR radiation?", options:["Cylinder drying","Infrared drying","Stentering","Winch drying"], answer:1},
  {q:"Typical drying temp range listed is:", options:["10–30 °C","100–130 °C","300–350 °C","40–50 °C"], answer:1},
  {q:"Stentering temperature range mentioned:", options:["20–40 °C","160–200 °C","80–100 °C","300 °C"], answer:1},
  {q:"Stentering is used for:", options:["Applying dyes","Setting width & shape of fabric","Degumming silk","Carbonizing"], answer:1},

  // 38-43 Unit VI Machineries
  {q:"Kier boiler typically works at which pressure range?", options:["0.1 bar","2–3 bar","10–12 bar","No pressure"], answer:1},
  {q:"J-Box is primarily used for:", options:["Singeing","Continuous scouring/desizing","Printing","Stentering"], answer:1},
  {q:"Jigger action involves:", options:["Rope immersion only","Open-width forward & backward motion","Singeing flame","Stentering pins"], answer:1},
  {q:"Winch dyeing is most suitable for:", options:["Package dyeing","Rope-form goods requiring gentle treatment","Metal dyeing","Printing"], answer:1},
  {q:"Which machine is best for high-temperature scouring under pressure?", options:["Winch","Jigger","Kier","Stenter"], answer:2},
  {q:"A jigger is used for:", options:["Open-width fabric dyeing by forward/backward motion","Rope dyeing","Package dyeing","Screen printing"], answer:0},

  // 44-50 Unit VII Evaluation & mixed
  {q:"A drop absorbency test <5 s indicates:", options:["Poor absorbency","Good absorbency","High stiffness","Low whiteness"], answer:1},
  {q:"Whiteness is measured by:", options:["pH meter","Reflectance/whiteness meter","Tensile tester","Bursting tester"], answer:1},
  {q:"Acceptable tensile strength loss after pretreatment is:", options:[">50% loss","No loss","≤ 15% loss","100% loss"], answer:2},
  {q:"Martindale tester measures:", options:["Air permeability","Abrasion resistance","Tensile strength","pH"], answer:1},
  {q:"Colour fastness to rubbing checks for:", options:["Strength","Color transfer by rubbing (crocking)","Whiteness","Absorbency"], answer:1},
  {q:"Evenness tester is used to measure:", options:["Fabric whiteness","Yarn irregularity/evenness","Bursting strength","pH"], answer:1},
  {q:"Moisture regain is determined by:", options:["Tensile test","Conditioning oven & weight method","Reflectance meter","Baer sorter"], answer:1}
];

// App state
let student = { name: "", roll: "" };
const answers = new Array(quiz.length).fill(null);

// DOM refs
const startPanel = document.getElementById("startPanel");
const quizPanel = document.getElementById("quizPanel");
const nameInput = document.getElementById("nameInput");
const rollInput = document.getElementById("rollInput");
const startBtn = document.getElementById("startBtn");
const questionsArea = document.getElementById("questionsArea");
const answeredCountEl = document.getElementById("answeredCount");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const displayName = document.getElementById("displayName");
const resultModal = document.getElementById("resultModal");
const resultMsg = document.getElementById("resultMsg");
const resultScore = document.getElementById("resultScore");
const closeResultBtn = document.getElementById("closeResultBtn");

// Start
startBtn.addEventListener("click", () => {
  const nm = nameInput.value.trim();
  if (!nm) { alert("Please enter your name to start."); nameInput.focus(); return; }
  student.name = nm;
  student.roll = rollInput.value.trim();
  displayName.textContent = student.name + (student.roll ? ` (${student.roll})` : "");
  startPanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  buildQuestions();
});

// Build UI for all questions
function buildQuestions() {
  questionsArea.innerHTML = "";
  quiz.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "qCard";
    card.innerHTML = `
      <div class="qNo">${idx+1}</div>
      <div class="qBody">
        <div class="qTitle">${escapeHtml(item.q)}</div>
        <div id="opts-${idx}" class="opts"></div>
      </div>
    `;
    questionsArea.appendChild(card);
    const optsEl = document.getElementById(`opts-${idx}`);
    item.options.forEach((opt, i) => {
      const o = document.createElement("div");
      o.className = "opt";
      o.innerHTML = `<div style="width:26px;font-weight:800">${String.fromCharCode(65+i)}</div><div>${escapeHtml(opt)}</div>`;
      o.addEventListener("click", () => handleChoose(idx, i));
      optsEl.appendChild(o);
    });
  });
  updateAnsweredCount();
}

// Handle one-time choice
function handleChoose(qIndex, optIndex) {
  if (answers[qIndex] !== null) return; // already answered
  answers[qIndex] = optIndex;
  const optsEl = document.getElementById(`opts-${qIndex}`);
  const correct = quiz[qIndex].answer;
  Array.from(optsEl.children).forEach((el, i) => {
    el.classList.add("locked");
    el.style.pointerEvents = "none";
    if (i === correct) el.classList.add("correct");
    if (i === optIndex && i !== correct) el.classList.add("wrong");
  });
  updateAnsweredCount();
}

// Update answered count + enable submit when all answered
function updateAnsweredCount() {
  const cnt = answers.filter(a => a !== null).length;
  answeredCountEl.textContent = cnt;
  submitBtn.disabled = (cnt !== quiz.length);
}

// Reset answers (local)
resetBtn.addEventListener("click", () => {
  if (!confirm("Reset all your answers?")) return;
  for (let i = 0; i < answers.length; i++) answers[i] = null;
  buildQuestions();
  updateAnsweredCount();
});

// Final submit
submitBtn.addEventListener("click", async () => {
  if (!confirm("Submit answers? Once submitted, result will be sent and you cannot change answers.")) return;
  const correctCount = answers.reduce((acc, a, idx) => acc + ((a === quiz[idx].answer) ? 1 : 0), 0);
  const percent = ((correctCount / quiz.length) * 100).toFixed(1);

  // Prepare payload
  const payload = {
    name: student.name + (student.roll ? ` (${student.roll})` : ""),
    score: correctCount,
    percent: percent
  };

  // Send to Google Apps Script; if CORS blocks, fallback uses no-cors
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log("Data sent to Google Sheet:", text);
  } catch (err) {
    console.error("Send failed (trying no-cors):", err);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log("Data sent with no-cors fallback (may not show response).");
    } catch (e) {
      console.error("Fallback send failed:", e);
    }
  }

  // Show result modal
  resultMsg.textContent = `Hi ${student.name}. Your score has been submitted (if backend configured).`;
  resultScore.textContent = `${correctCount} / ${quiz.length} (${percent}%)`;
  resultModal.classList.remove("hidden");
});

// Close result
closeResultBtn.addEventListener("click", () => {
  resultModal.classList.add("hidden");
});

// Helper: escape HTML
function escapeHtml(s) {
  return (s || "").toString().replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
