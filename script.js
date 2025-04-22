let targetDate = null;

const dateInput = document.getElementById("dateInput");
const countdown = document.getElementById("countdown");
const resetButton = document.getElementById("resetButton");

// Cargar fecha guardada si existe
const savedDate = localStorage.getItem("targetDate");
if (savedDate) {
  targetDate = new Date(savedDate).getTime();
  dateInput.value = new Date(savedDate).toISOString().slice(0, 16);
}

// Detectar cambios en el input y guardar
dateInput.addEventListener("change", (e) => {
  const userDate = new Date(e.target.value);
  if (!isNaN(userDate.getTime())) {
    targetDate = userDate.getTime();
    localStorage.setItem("targetDate", userDate.toISOString());
    updateCountdown();
  }
});

// Botón para borrar fecha
resetButton.addEventListener("click", () => {
  localStorage.removeItem("targetDate");
  targetDate = null;
  dateInput.value = "";
  countdown.innerHTML = `
    <span id="days">00</span> días
    <span id="hours">00</span> horas
    <span id="minutes">00</span> minutos
    <span id="seconds">00</span> segundos
  `;
});

function updateCountdown() {
  if (!targetDate) return;

  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdown.innerHTML = "🎉 ¡El evento ha comenzado!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
