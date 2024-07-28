// Fonction pour mettre à jour l'affichage de la cagnotte
function updateJackpotDisplay(jackpot) {
    document.getElementById('jackpotDisplay').innerText = jackpot;
}

// Obtenir la cagnotte actuelle depuis le serveur
function getJackpot() {
    fetch('http://localhost:3000/jackpot')
        .then(response => response.json())
        .then(data => {
            updateJackpotDisplay(data.jackpot);
        })
        .catch(error => console.error('Erreur:', error));
}

// Fonction pour ajouter des points au jackpot
function addPoints() {
    fetch('http://localhost:3000/jackpot/add', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        alert("10 points ajoutés au jackpot !");
        updateJackpotDisplay(data.jackpot);
    })
    .catch(error => console.error('Erreur:', error));
}

// Fonctionnalité de réinitialisation avec un code secret
document.getElementById('resetButton').addEventListener('click', function() {
    const secretCode = prompt("Veuillez entrer le code secret pour réinitialiser le jackpot :");
    fetch('http://localhost:3000/jackpot/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secretCode })
    })
    .then(response => {
        if (response.ok) {
            alert("Le jackpot a été réinitialisé !");
            getJackpot();
        } else {
            alert("Code incorrect. Accès refusé.");
        }
    })
    .catch(error => console.error('Erreur:', error));
});

// Initialiser l'affichage de la cagnotte au chargement
document.addEventListener("DOMContentLoaded", function () {
    getJackpot();
});

// Définir la date et l'heure de fin pour le compte à rebours
const countdownDate = new Date("July 28, 2024 09:48:59").getTime();

// Mettre à jour le compte à rebours toutes les secondes
const x = setInterval(function() {
    // Obtenez la date et l'heure actuelles
    const now = new Date().getTime();
    
    // Trouver la distance entre maintenant et la date de compte à rebours
    const distance = countdownDate - now;
    
    // Calculer le temps pour les jours, heures, minutes et secondes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Afficher le résultat dans les éléments avec l'ID correspondant
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    
    // Si le compte à rebours est terminé, affichez un message
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Le compte à rebours est terminé";
    }
}, 1000);