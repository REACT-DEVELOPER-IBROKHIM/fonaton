document.addEventListener("DOMContentLoaded", () => {
  const timerElements = document.querySelectorAll(".timer");
  const endTimeString = document
    .querySelector("#endtime")
    .getAttribute("data-end-time");

  let cleanedString = endTimeString.trim();
  cleanedString = cleanedString.replace(/\u00A0|\u2000-\u200B/g, " ");

  const parts = cleanedString.split(/\s+/);
  if (parts.length < 2) {
    console.error("Invalid date format:", endTimeString);
    return;
  }

  let datePart = parts[0];
  let timePart = parts[1];

  // Detect Russian format (DD.MM.YYYY)
  let formattedDate;
  if (datePart.includes(".")) {
    // Russian format: DD.MM.YYYY
    const [day, month, year] = datePart.split(".");
    formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  } else {
    // English/Uzbek format: YYYY-MM-DD
    formattedDate = datePart;
  }

  // Ensure time format is HH:MM by replacing any hyphens or commas with colons
  const formattedTime = timePart.replace(/[-,]/g, ":");
  const formattedString = `${formattedDate}T${formattedTime}:00`;

  const endTime = new Date(formattedString);

  timerElements.forEach(() => {
    function updateTimer() {
      const currentTime = new Date();
      const timeRemaining = endTime - currentTime;

      if (timeRemaining <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        const timerSection = document.querySelector(".section-timer");
        if (timerSection) {
          timerSection.style.display = "none";
        }
        return;
      }

      const totalSeconds = Math.floor(timeRemaining / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      document.getElementById("days").textContent = String(days).padStart(2, "0");
      document.getElementById("hours").textContent = String(hours).padStart(2, "0");
      document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
      document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  });
});