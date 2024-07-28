const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware pour analyser le JSON dans le corps de la requête
app.use(express.json());

// Chemin du fichier de stockage de la cagnotte
const jackpotFile = 'jackpot.json';

// Fonction pour lire la cagnotte du fichier
function readJackpot() {
    if (fs.existsSync(jackpotFile)) {
        const data = fs.readFileSync(jackpotFile);
        return JSON.parse(data).jackpot;
    }
    return 0;
}

// Fonction pour écrire la cagnotte dans le fichier
function writeJackpot(value) {
    fs.writeFileSync(jackpotFile, JSON.stringify({ jackpot: value }));
}

// Route pour obtenir la cagnotte actuelle
app.get('/jackpot', (req, res) => {
    const jackpot = readJackpot();
    res.json({ jackpot });
});

// Route pour ajouter des points à la cagnotte
app.post('/jackpot/add', (req, res) => {
    let jackpot = readJackpot();
    jackpot += 10; // Ajouter 10 points
    writeJackpot(jackpot);
    res.json({ jackpot });
});

// Route pour réinitialiser la cagnotte
app.post('/jackpot/reset', (req, res) => {
    const { secretCode } = req.body;
    if (secretCode === "your-secret-code") { // Remplacez par votre code secret
        writeJackpot(0);
        res.json({ message: "Le jackpot a été réinitialisé !" });
    } else {
        res.status(403).json({ message: "Code incorrect. Accès refusé." });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
