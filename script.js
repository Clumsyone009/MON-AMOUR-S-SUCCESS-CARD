const intro = document.getElementById("intro");
const letterScreen = document.getElementById("letterScreen");
const finalScreen = document.getElementById("finalScreen");
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const finalBtn = document.getElementById("finalBtn");
const replayBtn = document.getElementById("replayBtn");
const shareBtn = document.getElementById("shareBtn");
const shareStatus = document.getElementById("shareStatus");
const confetti = document.getElementById("confetti");

function showScreen(screen) {
  [intro, letterScreen, finalScreen].forEach((item) => {
    const active = item === screen;
    item.classList.toggle("hidden", !active);
    item.setAttribute("aria-hidden", String(!active));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function celebrate() {
  const symbols = ["♥", "♡", "✦", "✿"];
  const colors = ["#c5285b", "#e78da3", "#d7a04d", "#a84e70", "#f4a8b8"];
  for (let i = 0; i < 28; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--duration", `${2.2 + Math.random() * 2.2}s`);
    piece.style.setProperty("--drift", `${Math.random() * 150 - 75}px`);
    piece.style.setProperty("--piece-color", colors[Math.floor(Math.random() * colors.length)]);
    piece.style.setProperty("--size", `${12 + Math.random() * 17}px`);
    piece.style.animationDelay = `${Math.random() * .65}s`;
    confetti.appendChild(piece);
    window.setTimeout(() => piece.remove(), 5200);
  }
}

openBtn.addEventListener("click", () => {
  openBtn.disabled = true;
  intro.classList.add("opening");
  openBtn.innerHTML = 'Opening your little surprise… <span class="arrow">♡</span>';
  window.setTimeout(() => {
    showScreen(letterScreen);
    celebrate();
    openBtn.disabled = false;
  }, 1150);
});

finalBtn.addEventListener("click", () => {
  showScreen(finalScreen);
  celebrate();
});

replayBtn.addEventListener("click", () => {
  intro.classList.remove("opening");
  openBtn.innerHTML = '<span>♡</span> Open your gift <span class="arrow">→</span>';
  shareStatus.textContent = "";
  showScreen(intro);
});

shareBtn.addEventListener("click", async () => {
  const shareData = {
    title: "A little gift for Ayshuu ♡",
    text: "A little KCSE good-luck surprise, made with love. ♡"
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = "Thanks for sharing the love. ♡";
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(window.location.href);
      shareStatus.textContent = "Card link copied! You can paste it into Instagram. ♡";
    } else {
      shareStatus.textContent = "Copy this page's link from your browser and send it in an Instagram DM. ♡";
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      shareStatus.textContent = "Copy this page's link from your browser and send it in an Instagram DM. ♡";
    }
  }
});
