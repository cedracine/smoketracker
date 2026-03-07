# ☠ CigTracker — Installation sur Android

## Installation en 3 étapes (fonctionne comme une vraie app)

### Méthode 1 — Via un serveur local (recommandé)
1. Copiez les 4 fichiers sur votre PC/Mac : `index.html`, `manifest.json`, `icon.svg`, `sw.js`
2. Ouvrez un terminal dans ce dossier et lancez :
   ```
   python3 -m http.server 8080
   ```
3. Sur votre téléphone Android (même réseau WiFi), ouvrez Chrome et allez sur :
   `http://VOTRE_IP:8080`
4. Dans Chrome → menu ⋮ → **"Ajouter à l'écran d'accueil"**
5. L'app s'installe avec l'icône ☠ et fonctionne **hors-ligne**

### Méthode 2 — Via GitHub Pages (gratuit, permanent)
1. Créez un compte GitHub, nouveau repository public
2. Uploadez les 4 fichiers
3. Activez GitHub Pages (Settings → Pages → main branch)
4. Ouvrez l'URL sur Chrome Android → installer comme app

### Méthode 3 — Via Netlify Drop (le plus rapide)
1. Allez sur https://app.netlify.com/drop
2. Glissez le dossier complet → URL publique instantanée
3. Chrome Android → menu ⋮ → Ajouter à l'écran d'accueil

---

## Fonctionnalités

### Écran principal
- **Bouton ☠** : enregistre date/heure d'un nouveau paquet avec vibration tactile
  - Zone tactile = petit cercle autour du crâne uniquement
  - 4 cigarettes décoratives : filtres orange en haut, braises fumantes en bas côté crâne
- **Modifier** ✎ / **Supprimer** ✕ sans déclencher l'ajout accidentel
- **Fond coloré** selon cig/jour (moyenne glissante 3 jours) :
  - 🟡 < 10 cig/j → doré chatoyant (pulsation animée)
  - 🔵 10–15 → bleu ciel → vert printemps
  - 🟢 16–20 → vert → orange
  - 🟠 21–30 → orange → rouge
  - 🔴 31–40 → rouge → deep purple
  - 🟣 40+ → deep purple

### Page Statistiques
**4 indicateurs :**
- Cig/jour (moy. 3j) · Cig/jour (moy. 30j)
- H/paquet (moy. 3j) · H/paquet (moy. 30j)

**Graphiques :**
- **Cig/jour** : moyenne glissante 3j sur tout l'historique, avec slider pour naviguer
- **Intervalles** : barres des 30 derniers intervalles entre paquets

**Données :** Export/Import JSON

### Widget écran d'accueil
Les widgets natifs Android nécessitent une APK — non disponible en PWA.
**Alternative** : épinglez l'app sur l'écran d'accueil, elle s'ouvre instantanément.
