// Masquer le loader dès que la vidéo est prête
document.querySelector("video").addEventListener("loadeddata", function () {
  document.getElementById("loader").style.opacity = "0";
  document.getElementById("loader").style.visibility = "hidden";
});

// Masquer le loader après un délai maximum (5 secondes)
setTimeout(function () {
  document.getElementById("loader").style.opacity = "0";
  document.getElementById("loader").style.visibility = "hidden";
}, 5000);

// Function to start the countdown
function startCountdown(durationInSeconds, displayElement) {
  let remainingTime = durationInSeconds;

  function updateCountdown() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    displayElement.textContent = `ends in ${minutes}m ${seconds}s`;

    if (remainingTime > 0) {
      remainingTime--;
      setTimeout(updateCountdown, 1000);
    } else {
      displayElement.textContent = "Offer expired";
    }
  }

  updateCountdown();
}

// Function to get the user's country
async function getUserCountry() {
  const locationElement = document.getElementById("userLocation");

  try {
    const response = await fetch("https://ipinfo.io/json?token=66f28dec47e92e");
    const data = await response.json();
    const country = data.country;
    const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(
      country
    );
    locationElement.textContent = countryName;
  } catch (error) {
    console.error("Error fetching location data:", error);
    locationElement.textContent = "";
  }
}

// Start the countdown and fetch the user's country when the page loads
window.addEventListener("DOMContentLoaded", function () {
  let countdownElement = document.getElementById("countdown");
  startCountdown(300, countdownElement);
  getUserCountry();
});
