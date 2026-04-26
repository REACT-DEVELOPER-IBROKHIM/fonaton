document.addEventListener("DOMContentLoaded", () => {
  const timerElements = document.querySelectorAll(".timer");
  const endTimeString = document
    .querySelector("#endtime")
    .getAttribute("data-end-time");
  
  // Handle various date formats - clean up the string to ensure proper parsing
  let cleanedString = endTimeString.trim();
  // Replace any non-ASCII spaces or special characters with regular space
  cleanedString = cleanedString.replace(/\u00A0|\u2000-\u200B/g, " ");
  
  const parts = cleanedString.split(/\s+/);
  if (parts.length < 2) {
    console.error("Invalid date format:", endTimeString);
    return;
  }
  
  const datePart = parts[0];
  const timePart = parts[1];
  
  // Ensure time format is HH:MM by replacing any hyphens with colons
  const formattedTime = timePart.replace(/[-,]/g, ":");
  const formattedString = `${datePart}T${formattedTime}:00`;
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
        // Hide the timer section when the countdown ends
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

      document.getElementById("days").textContent = String(days).padStart(
        2,
        "0",
      );
      document.getElementById("hours").textContent = String(hours).padStart(
        2,
        "0",
      );
      document.getElementById("minutes").textContent = String(minutes).padStart(
        2,
        "0",
      );
      document.getElementById("seconds").textContent = String(seconds).padStart(
        2,
        "0",
      );
    }

    updateTimer();

    setInterval(updateTimer, 1000);
  });
});
