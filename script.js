// الساعة
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours.toString().padStart(2, "0");
  const el = document.getElementById("clock");
  if (el) el.textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateTime, 1000);
updateTime();

// فتح التطبيقات
const icons = document.querySelectorAll(".app-icon");
icons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const name = btn.dataset.app;

    if (name === "github") {
      e.preventDefault();
      window.open(
        "https://github.com/MohamedGa3fer",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    if (name === "linkedin") {
      e.preventDefault();
      window.open(
        "https://www.linkedin.com/in/mohamed-ga3fer-915034255",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    openApp(name);
  });
});

const ANIM_MS = 400;
function openApp(name) {
  const screen = document.getElementById(`app-${name}`);
  if (!screen) return;
  document.querySelectorAll(".app-screen.active").forEach((s) => {
    if (s === screen) return;
    s.classList.add("closing");
    setTimeout(() => {
      s.classList.remove("closing");
      s.classList.remove("active");
    }, ANIM_MS);
  });
  screen.classList.remove("closing");
  requestAnimationFrame(() => {
    screen.classList.add("active");
  });
}

function goHome() {
  document.querySelectorAll(".app-screen.active").forEach((s) => {
    s.classList.add("closing");
    setTimeout(() => {
      s.classList.remove("closing");
      s.classList.remove("active");
    }, ANIM_MS);
  });
}

// زر Home فقط
const homeBtn = document.createElement("button");
homeBtn.className = "home-btn";
homeBtn.innerHTML = '<i class="fas fa-home"></i> Home';
homeBtn.onclick = goHome;
document.querySelector(".bezel").appendChild(homeBtn);

// تحديث ظهور الزر حسب التطبيقات المفتوحة
function updateHomeBtn() {
  const anyAppActive =
    document.querySelectorAll(".app-screen.active").length > 0;
  if (anyAppActive) homeBtn.classList.add("show");
  else homeBtn.classList.remove("show");
}

const observer = new MutationObserver(updateHomeBtn);
document.querySelectorAll(".app-screen").forEach((screen) => {
  observer.observe(screen, { attributes: true, attributeFilter: ["class"] });
});

updateHomeBtn();

// Chatbot
const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");

chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    const userMsg = document.createElement("div");
    userMsg.classList.add("message");
    userMsg.textContent = chatInput.value;
    chatWindow.appendChild(userMsg);

    // رد البوت
    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot");
    botMsg.textContent = "I'm just a demo bot. You said: " + chatInput.value;
    chatWindow.appendChild(botMsg);

    chatWindow.scrollTop = chatWindow.scrollHeight;
    chatInput.value = "";
  }
});

// Make status bar hide content when scrolling
const statusBar = document.querySelector(".status-bar");
const homeScreen = document.getElementById("home");
const appScreens = document.querySelectorAll(".app-screen");

homeScreen.addEventListener("scroll", function () {
  if (homeScreen.scrollTop > 20) {
    statusBar.style.background = "rgba(0, 0, 0, 0.7)";
    statusBar.style.backdropFilter = "blur(20px)";
  } else {
    statusBar.style.background = "rgba(0, 0, 0, 0.3)";
    statusBar.style.backdropFilter = "blur(10px)";
  }
});

// Add the same for app screens
appScreens.forEach((screen) => {
  screen.addEventListener("scroll", function () {
    if (screen.scrollTop > 20) {
      statusBar.style.background = "rgba(0, 0, 0, 0.7)";
      statusBar.style.backdropFilter = "blur(20px)";
    } else {
      statusBar.style.background = "rgba(0, 0, 0, 0.3)";
      statusBar.style.backdropFilter = "blur(10px)";
    }
  });
});
