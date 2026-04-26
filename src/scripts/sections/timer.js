document.addEventListener("DOMContentLoaded", () => {
  const timerElements = document.querySelectorAll(".timer");
  const endTimeString = document
    .querySelector("#endtime")
    .getAttribute("data-end-time");

  function parseDateTime(str) {
  str = str.trim().replace(/\u00A0|\u2000-\u200B/g, " ");
  const parts = str.split(/\s+/);
  if (parts.length < 2) return null;

  let datePart = parts[0];
  let timePart = parts[1].replace(/[-,]/g, ":");

  if (datePart.includes(".")) {
    // Russian format: DD.MM.YYYY
    const [day, month, year] = datePart.split(".");
    if (!day || !month || !year) return null;
    const [hour, minute] = timePart.split(":");
    // Use array form, subtract 1 from month
    const dateObj = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      0
    );
    if (isNaN(dateObj.getTime())) return null;
    return dateObj;
  } else if (datePart.includes("-")) {
    // English/Uzbek format: YYYY-MM-DD
    const formattedDate = datePart;
    const isoString = `${formattedDate}T${timePart}:00`;
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return null;
    return dateObj;
  } else {
    return null;
  }
}

  const endTime = parseDateTime(endTimeString);
  console.log("end", endTime)

  if (!endTime) {
    console.error("Failed to parse date:", endTimeString);
    return;
  }

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