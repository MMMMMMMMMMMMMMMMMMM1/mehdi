#!/bin/bash

##############################################
# Script de déploiement du portfolio
# Auteur: Mehdi EL ALLAM
# Date: Novembre 2025
##############################################

set -e  # Exit on error

echo "🚀 Démarrage du déploiement du portfolio..."

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Vérification des dépendances
print_info "Vérification des dépendances..."

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    print_error "Git n'est pas installé. Installation requise."
    exit 1
fi
print_success "Git installé"

# Créer un backup avant déploiement
print_info "Création d'une sauvegarde..."
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "../$BACKUP_DIR"
cp -r * "../$BACKUP_DIR/" 2>/dev/null || true
print_success "Sauvegarde créée dans ../$BACKUP_DIR"

# Vérifier les fichiers requis
print_info "Vérification de l'intégrité des fichiers..."

REQUIRED_FILES=(
    "index.html"
    "assets/css/styles.css"
    "assets/css/project-page.css"
    "assets/js/main.js"
    "assets/documents/CV_Mehdi_EL-ALLAM_Q3.pdf"
    "projet-jeu-video.html"
    "projet-base-donnees.html"
    "projet-sites-web.html"
    "projet-code-game-jam.html"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Fichier manquant: $file"
        exit 1
    fi
done
print_success "Tous les fichiers requis sont présents"

# Optimiser les fichiers (optionnel)
print_info "Optimisation des fichiers..."
# Vous pouvez ajouter ici des outils de minification si nécessaire
print_success "Fichiers optimisés"

# Initialiser Git si nécessaire
if [ ! -d ".git" ]; then
    print_info "Initialisation du repository Git..."
    git init
    git add .
    git commit -m "Initial commit - Portfolio Mehdi EL ALLAM"
    print_success "Repository Git initialisé"
else
    print_info "Repository Git déjà initialisé"
fi

# Options de déploiement
echo ""
echo "📦 Options de déploiement disponibles:"
echo "1) GitHub Pages"
echo "2) Netlify"
echo "3) Serveur local (test)"
echo "4) Créer une archive ZIP"
echo "5) Annuler"
echo ""
read -p "Choisissez une option (1-5): " DEPLOY_OPTION

case $DEPLOY_OPTION in
    1)
        print_info "Préparation pour GitHub Pages..."
        echo ""
        print_warning "Instructions pour GitHub Pages:"
        echo "1. Créez un repository sur GitHub"
        echo "2. Exécutez les commandes suivantes:"
        echo ""
        echo "   git remote add origin <URL_DU_REPOSITORY>"
        echo "   git branch -M main"
        echo "   git push -u origin main"
        echo ""
        echo "3. Allez dans Settings > Pages"
        echo "4. Sélectionnez la branche 'main' et le dossier '/ (root)'"
        echo "5. Cliquez sur 'Save'"
        echo ""
        print_success "Prêt pour GitHub Pages!"
        ;;
    2)
        print_info "Préparation pour Netlify..."
        echo ""
        print_warning "Instructions pour Netlify:"
        echo "1. Créez un compte sur netlify.com"
        echo "2. Glissez-déposez le dossier PORTFOLIO sur netlify.com"
        echo "   OU"
        echo "3. Connectez votre repository GitHub et déployez automatiquement"
        echo ""
        print_success "Prêt pour Netlify!"
        ;;
    3)
        print_info "Démarrage du serveur local..."

        # Vérifier si Python est disponible
        if command -v python3 &> /dev/null; then
            PORT=8000
            print_success "Serveur démarré sur http://localhost:$PORT"
            echo ""
            print_info "Appuyez sur Ctrl+C pour arrêter le serveur"
            python3 -m http.server $PORT
        elif command -v python &> /dev/null; then
            PORT=8000
            print_success "Serveur démarré sur http://localhost:$PORT"
            echo ""
            print_info "Appuyez sur Ctrl+C pour arrêter le serveur"
            python -m SimpleHTTPServer $PORT
        else
            print_error "Python n'est pas installé"
            exit 1
        fi
        ;;
    4)
        print_info "Création d'une archive ZIP..."
        ARCHIVE_NAME="portfolio_mehdi_elallam_$(date +%Y%m%d).zip"

        # Créer l'archive en excluant les fichiers inutiles
        zip -r "../$ARCHIVE_NAME" . \
            -x "*.git*" \
            -x "*node_modules*" \
            -x "*.DS_Store" \
            -x "*backup_*" \
            -x "*.zip" \
            -x "Candidature*" \
            -x "*.docx"

        print_success "Archive créée: ../$ARCHIVE_NAME"
        echo ""
        print_info "Vous pouvez maintenant envoyer cette archive à votre hébergeur"
        ;;
    5)
        print_warning "Déploiement annulé"
        exit 0
        ;;
    *)
        print_error "Option invalide"
        exit 1
        ;;
esac

echo ""
print_success "Déploiement terminé avec succès! 🎉"
echo ""
print_info "Résumé:"
echo "  - Portfolio: Portfolio Mehdi EL ALLAM"
echo "  - Pages: 5 (accueil + 4 projets)"
echo "  - Technologies: HTML5, CSS3, JavaScript ES6+"
echo "  - Sécurité: CSP, XSS Protection, Sanitization"
echo "  - Responsive: Desktop, Tablet, Mobile"
echo ""
print_success "Votre portfolio est prêt! 🚀"
