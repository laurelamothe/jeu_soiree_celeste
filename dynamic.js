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

// Initialiser le jackpot dans le stockage local s'il n'existe pas
if (!localStorage.getItem('jackpot')) {
    localStorage.setItem('jackpot', '0');
}

// Fonction pour ajouter des points au jackpot
function addPoints() {
    let currentJackpot = parseInt(localStorage.getItem('jackpot'), 10);
    currentJackpot += 10; // Ajouter 10 points
    localStorage.setItem('jackpot', currentJackpot.toString());
    alert("10 points ajoutés au jackpot !");
}

// Ajouter un écouteur d'événement au bouton pour ajouter des points
document.getElementById('addPointsButton').addEventListener('click', addPoints);

// Fonctionnalité de réinitialisation avec un code secret
document.getElementById('resetButton').addEventListener('click', function() {
    const secretCode = prompt("Veuillez entrer le code secret pour réinitialiser le jackpot :");
    if (secretCode === "1234") { // Remplacez "your-secret-code" par votre code secret
        localStorage.setItem('jackpot', '0');
        alert("Le jackpot a été réinitialisé !");
        // Rechargez la page pour mettre à jour l'affichage
        location.reload();
    } else {
        alert("Code incorrect. Accès refusé.");
    }
});
