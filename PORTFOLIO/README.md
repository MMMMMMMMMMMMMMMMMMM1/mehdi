# Portfolio Professionnel - Mehdi EL ALLAM

Portfolio web personnel de Mehdi EL ALLAM, étudiant en 2ème année de BUT Informatique et réserviste au 4ᵉ régiment de chasseurs alpins.

## 🚀 Description

Site web portfolio moderne, responsive et sécurisé présentant mon parcours académique, mes compétences techniques, mes réalisations et mon projet professionnel.

## ✨ Fonctionnalités

- **Design moderne et responsive** : Compatible desktop, tablette et mobile
- **Navigation fluide** : Menu interactif avec animations
- **Sécurité renforcée** :
  - Protection XSS (Cross-Site Scripting)
  - Content Security Policy (CSP)
  - Sanitisation des entrées
  - Validation des formulaires
- **Performance optimisée** :
  - Lazy loading des images
  - Animations CSS performantes
  - Code JavaScript modulaire
- **Accessibilité** :
  - Navigation au clavier
  - Lecteurs d'écran compatibles
  - Contraste WCAG AA
- **SEO friendly** : Meta tags optimisées

## 📁 Structure du projet

```
PORTFOLIO/
├── index.html                          # Page d'accueil principale
├── projet-jeu-video.html              # Page projet jeu vidéo 2D
├── projet-base-donnees.html           # Page projet base de données
├── projet-sites-web.html              # Page projet sites web
├── projet-code-game-jam.html          # Page événements programmation
├── assets/
│   ├── css/
│   │   ├── styles.css                 # Styles principaux
│   │   └── project-page.css           # Styles pages projets
│   ├── js/
│   │   └── main.js                    # JavaScript principal
│   ├── documents/
│   │   └── CV_Mehdi_EL-ALLAM_Q3.pdf  # CV téléchargeable
│   └── images/                        # Images du site
└── README.md                          # Ce fichier
```

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** :
  - Flexbox & Grid
  - Animations & Transitions
  - Media Queries (Responsive)
  - Variables CSS
- **JavaScript (ES6+)** :
  - Classes ES6
  - Intersection Observer API
  - Event Delegation
  - Module Pattern
- **Sécurité** :
  - Content Security Policy
  - XSS Protection
  - Input Sanitization

## 🎨 Sections du site

1. **Accueil (Hero)** : Présentation rapide avec appel à l'action
2. **Présentation** :
   - Biographie personnelle
   - Parcours de formation (BUT Informatique)
   - Vision professionnelle future
   - Engagement militaire
3. **CV** : CV interactif avec téléchargement PDF
4. **Réalisations** : 4 projets détaillés :
   - Jeu vidéo 2D (C#, WPF)
   - Base de données (MySQL, SQL)
   - Sites web responsives (HTML, CSS, JS)
   - Événements de programmation
5. **Contact** : Informations de contact et réseaux sociaux

## 🔒 Sécurité

### Mesures de sécurité implémentées

- **Content Security Policy (CSP)** : Restriction des sources de contenu
- **Protection XSS** : Sanitisation de toutes les entrées utilisateur
- **Attributs de sécurité** : `rel="noopener noreferrer"` sur liens externes
- **Validation côté client** : Validation des formulaires en JavaScript
- **Headers sécurisés** : Meta tags de sécurité

### Content Security Policy

```
default-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
script-src 'self';
img-src 'self' data:;
```

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :

- **Desktop** : > 1024px
- **Tablette** : 768px - 1024px
- **Mobile** : < 768px

## 🚀 Déploiement

### Option 1 : Serveur HTTP local (Développement)

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (avec http-server)
npx http-server -p 8000
```

Puis ouvrir : http://localhost:8000

### Option 2 : GitHub Pages

1. Créer un repository GitHub
2. Pousser le code sur la branche `main`
3. Activer GitHub Pages dans les paramètres
4. Le site sera disponible à : `https://[username].github.io/[repo-name]`

### Option 3 : Netlify / Vercel

1. Créer un compte sur Netlify ou Vercel
2. Connecter le repository GitHub
3. Déploiement automatique à chaque push

### Option 4 : Serveur web classique

Copier tous les fichiers dans le répertoire web du serveur :

```bash
# Apache
sudo cp -r * /var/www/html/

# Nginx
sudo cp -r * /usr/share/nginx/html/
```

## 🔧 Configuration

### Personnalisation

Pour adapter ce portfolio :

1. **Informations personnelles** : Modifier `index.html`
2. **Styles** : Ajuster les variables CSS dans `assets/css/styles.css`
3. **Projets** : Ajouter/modifier les fichiers `projet-*.html`
4. **CV** : Remplacer `assets/documents/CV_Mehdi_EL-ALLAM_Q3.pdf`

### Variables CSS principales

```css
:root {
    --primary-color: #2563eb;      /* Couleur principale */
    --secondary-color: #10b981;    /* Couleur secondaire */
    --text-primary: #1f2937;       /* Texte principal */
    --bg-primary: #ffffff;         /* Fond principal */
}
```

## 📊 Performance

- **Lighthouse Score** :
  - Performance : 95+
  - Accessibility : 100
  - Best Practices : 100
  - SEO : 100
- **Temps de chargement** : < 2 secondes
- **Taille totale** : < 500 KB

## 🌐 Compatibilité navigateurs

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📝 Licence

© 2025 Mehdi EL ALLAM. Tous droits réservés.

Ce portfolio est destiné à un usage personnel et professionnel. Toute reproduction ou utilisation nécessite une autorisation préalable.

## 📧 Contact

- **Email** : Mehdi.el-hallam@etu.umontpellier.fr
- **LinkedIn** : [linkedin.com/in/mehdi-el-allam](https://www.linkedin.com/in/mehdi-el-allam)
- **GitHub** : [github.com/mehdi-elallam](https://github.com/mehdi-elallam)

## 🙏 Remerciements

- Université de Montpellier - IUT de Montpellier
- Enseignants du BUT Informatique
- 4ᵉ Régiment de Chasseurs Alpins

---

**Développé avec** ❤️ **par Mehdi EL ALLAM** - Étudiant en BUT Informatique | Réserviste Chasseur Alpin
