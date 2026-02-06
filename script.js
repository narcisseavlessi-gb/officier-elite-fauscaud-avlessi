// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const yearElements = document.querySelectorAll('#year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Burger menu pour les petits écrans
    const header = document.querySelector('header');
    if (header) {
        const burgerBtn = document.createElement('button');
        burgerBtn.className = 'burger-menu';
        burgerBtn.innerHTML = '☰';
        burgerBtn.setAttribute('aria-label', 'Menu de navigation');
        
        // Insérer le bouton burger avant la navigation
        const nav = header.querySelector('nav');
        if (nav) {
            header.insertBefore(burgerBtn, nav);
            
            // Ajouter la classe de base pour le menu burger
            nav.classList.add('nav-menu');
            
            // Gérer le clic sur le burger
            burgerBtn.addEventListener('click', function() {
                nav.classList.toggle('nav-active');
                burgerBtn.classList.toggle('burger-active');
                
                // Animation des traits du burger
                if (nav.classList.contains('nav-active')) {
                    burgerBtn.innerHTML = '✕';
                } else {
                    burgerBtn.innerHTML = '☰';
                }
            });
            
            // Fermer le menu quand on clique sur un lien
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('nav-active');
                    burgerBtn.classList.remove('burger-active');
                    burgerBtn.innerHTML = '☰';
                });
            });
            
            // Fermer le menu si on clique en dehors
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && !burgerBtn.contains(event.target)) {
                    nav.classList.remove('nav-active');
                    burgerBtn.classList.remove('burger-active');
                    burgerBtn.innerHTML = '☰';
                }
            });
        }
    }
    
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Animation des cards au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animation supplémentaire pour les cards
                if (entry.target.classList.contains('card')) {
                    entry.target.style.animation = 'cardAppear 0.8s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if(!name || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Ceci sera envoyé au serveur
            console.log('Form submitted:', { name, email, message });
            
            // Afficher le message de confirmation
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            this.reset();
        });
    }
    
    // Initialise le carrousel d'images
    initImageCarousel();
});

// Fonction pour le carrousel d'images
function initImageCarousel() {
    const heroImage = document.getElementById('heroImage');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    
    // CONFIGURATION : MODIFIEZ CES VALEURS SELON VOS BESOINS
    const imageConfig = {
        images: [
            'image1.jpeg',
            'image2.jpeg',
            'image3.jpeg',
            'image4.jpeg',
            'image5.jpeg',
            'image6.jpeg',
            'image7.jpeg',
            'image8.jpeg',
            'image9.jpeg',
            'image10.jpeg',
            'image11.jpeg',
            'image12.jpeg',
            'image13.jpeg',
            'image14.jpeg',
            'image15.jpeg'
        ],
        interval: 8000,           // Délai entre les images en millisecondes
        currentIndex: 0,
        isAutoPlay: true,
        timer: null,
        animationDuration: 800    // Durée de l'animation en ms
    };
    
    // Vérifie si nous sommes sur la page d'accueil et si l'image existe
    if (!heroImage) return;
    
    // Fonction pour changer l'image avec animation
    function changeImage(index) {
        // Mise à jour de l'index
        imageConfig.currentIndex = index;
        
        // Animation de sortie
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'scale(0.95) translateY(10px)';
        
        setTimeout(() => {
            // Changement de la source de l'image
            heroImage.src = imageConfig.images[index];
            
            // Animation d'entrée
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1) translateY(0)';
            heroImage.style.transition = `opacity ${imageConfig.animationDuration/2}ms ease, 
                                         transform ${imageConfig.animationDuration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
            
            // Ajout d'une classe pour une animation supplémentaire
            heroImage.classList.add('image-animate');
            setTimeout(() => {
                heroImage.classList.remove('image-animate');
            }, imageConfig.animationDuration);
            
            // Mise à jour des indicateurs
            updateIndicators();
            
            // Redémarre le défilement automatique
            if (imageConfig.isAutoPlay) {
                restartAutoPlay();
            }
        }, imageConfig.animationDuration/2);
    }
    
    // Fonction pour mettre à jour les indicateurs
    function updateIndicators() {
        indicatorDots.forEach((dot, index) => {
            if (index === imageConfig.currentIndex) {
                dot.classList.add('active');
                dot.style.transform = 'scale(1.3)';
            } else {
                dot.classList.remove('active');
                dot.style.transform = 'scale(1)';
            }
        });
    }
    
    // Fonction pour démarrer le défilement automatique
    function startAutoPlay() {
        if (imageConfig.timer) {
            clearInterval(imageConfig.timer);
        }
        
        imageConfig.timer = setInterval(() => {
            nextImage();
        }, imageConfig.interval);
        
        imageConfig.isAutoPlay = true;
    }
    
    // Fonction pour redémarrer le défilement automatique
    function restartAutoPlay() {
        clearInterval(imageConfig.timer);
        startAutoPlay();
    }
    
    // Fonction pour arrêter le défilement automatique
    function stopAutoPlay() {
        clearInterval(imageConfig.timer);
        imageConfig.isAutoPlay = false;
    }
    
    // Configuration des indicateurs (points)
    indicatorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeImage(index);
            stopAutoPlay(); // Arrête le défilement automatique quand l'utilisateur clique manuellement
            
            // Redémarre après 10 secondes d'inactivité
            setTimeout(() => {
                if (!imageConfig.isAutoPlay) {
                    startAutoPlay();
                }
            }, 10000);
        });
        
        // Animation au survol
        dot.addEventListener('mouseenter', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1.2)';
            }
        });
        
        dot.addEventListener('mouseleave', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1)';
            }
        });
    });
    
    // Arrête le défilement automatique au survol de l'image
    heroImage.addEventListener('mouseenter', stopAutoPlay);
    heroImage.addEventListener('mouseleave', () => {
        if (!imageConfig.isAutoPlay) {
            // Redémarre après 2 secondes
            setTimeout(() => {
                startAutoPlay();
            }, 2000);
        }
    });
    
    // Fonction pour changer le délai (exemple : pour modifier à 10 secondes)
    function setIntervalTime(newInterval) {
        imageConfig.interval = newInterval;
        if (imageConfig.isAutoPlay) {
            restartAutoPlay();
        }
    }

    // Fonction pour passer à l'image suivante
    function nextImage() {
    let nextIndex = imageConfig.currentIndex + 1;
    if (nextIndex >= imageConfig.images.length) {
        nextIndex = 0; // Retour à la première image
    }
    changeImage(nextIndex);
    }

    // Fonction pour passer à l'image précédente
    function prevImage() {
    let prevIndex = imageConfig.currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = imageConfig.images.length - 1; // Aller à la dernière image
    }
    changeImage(prevIndex);
    }
    
    // Exposez certaines fonctions pour un contrôle manuel si nécessaire
    window.imageCarousel = {
        next: nextImage,
        prev: prevImage,
        goTo: changeImage,
        setInterval: setIntervalTime,
        startAutoPlay: startAutoPlay,
        stopAutoPlay: stopAutoPlay,
        getCurrentImage: () => imageConfig.currentIndex,
        getTotalImages: () => imageConfig.images.length
    };
    
    // Démarre le défilement automatique au chargement
    setTimeout(() => {
        startAutoPlay();
    }, 1000); // Délai initial de 1 seconde avant le premier changement
    
    // Initialiser les indicateurs
    updateIndicators();
}

// Ajouter des animations CSS via JavaScript
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardAppear {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
            }
            33% { 
                transform: translateY(-10px) rotate(0.5deg); 
            }
            66% { 
                transform: translateY(5px) rotate(-0.5deg); 
            }
        }
        
        @keyframes pulse {
            0%, 100% { 
                box-shadow: 0 20px 40px rgba(0, 180, 255, 0.3);
            }
            50% { 
                box-shadow: 0 25px 50px rgba(0, 180, 255, 0.4);
            }
        }
        
        .image-animate {
            animation: float 3s ease-in-out infinite, pulse 4s ease-in-out infinite;
        }
        
        /* Styles pour le burger menu */
        .burger-menu {
            display: none;
            background: transparent;
            border: none;
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
            padding: 0.5rem;
            transition: transform 0.3s ease;
            z-index: 1001;
        }
        
        .burger-menu:hover {
            transform: scale(1.1);
            color: #00b4ff;
        }
        
        .burger-active {
            transform: rotate(90deg);
        }
        
        /* Styles responsifs pour la navigation */
        @media (max-width: 768px) {
            .burger-menu {
                display: block;
            }
            
            .nav-menu {
                position: fixed;
                top: 0;
                right: -100%;
                height: 100vh;
                width: 250px;
                background: rgba(11, 15, 23, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 5rem 2rem 2rem;
                transition: right 0.4s ease-in-out;
                z-index: 1000;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
            }
            
            .nav-active {
                right: 0;
            }
            
            .nav-menu a {
                margin: 1rem 0;
                padding: 0.8rem 1.5rem;
                border-radius: 8px;
                font-size: 1.1rem;
                text-align: center;
                background: rgba(255, 255, 255, 0.05);
                border-left: 3px solid transparent;
            }
            
            .nav-menu a:hover,
            .nav-menu a.active {
                background: rgba(0, 180, 255, 0.1);
                border-left: 3px solid #00b4ff;
            }
        }
    `;
    document.head.appendChild(style);
}

// Ajouter les animations CSS
addAnimations();


// Fonction pour générer le message WhatsApp formaté
function generateWhatsAppMessage(formData) {
    const name = formData.get('name') || 'Non spécifié';
    const email = formData.get('email') || 'Non spécifié';
    const organization = formData.get('organization') || 'Non spécifié';
    const subject = formData.get('subject') || 'Non spécifié';
    const message = formData.get('message') || 'Non spécifié';
    
    // Obtenir le texte du sujet sélectionné
    let subjectText = subject;
    if (subject === 'conference') subjectText = 'Invitation à une conférence';
    else if (subject === 'collaboration') subjectText = 'Proposition de collaboration';
    else if (subject === 'formation') subjectText = 'Demande de formation';
    else if (subject === 'consultation') subjectText = 'Consultation professionnelle';
    else if (subject === 'mentorat') subjectText = 'Demande de mentorat';
    else if (subject === 'other') subjectText = 'Autre sujet';
    
    // Créer le message formaté
    return `*NOUVEAU MESSAGE DU SITE OFFICIER ÉLITE*

*Nom complet :* ${name}
*Adresse e-mail :* ${email}
*Organisation :* ${organization}
*Sujet :* ${subjectText}
*Message :* ${message}

--- 
Message envoyé depuis le portfolio Officier Élite`;
}

// Fonction pour ouvrir WhatsApp avec le message
function openWhatsAppWithMessage(message) {
    // Numéro de téléphone formaté
    const phoneNumber = '+22962016333'; // Format international sans espaces
    
    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Créer l'URL WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Ouvrir WhatsApp dans une nouvelle fenêtre
    window.open(whatsappUrl, '_blank');
}

// Fonction pour créer et ajouter le bouton WhatsApp
function addWhatsAppButton() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (!contactForm) return;
    
    // Créer le bouton WhatsApp
    const whatsappBtn = document.createElement('button');
    whatsappBtn.type = 'button';
    whatsappBtn.className = 'btn whatsapp-btn';
    whatsappBtn.innerHTML = `
        <svg style="width: 20px; height: 20px; margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18c.21-.58.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01z"/>
        </svg>
        Envoyer par WhatsApp
    `;
    
    // Créer un conteneur pour les boutons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '1rem';
    buttonContainer.style.marginTop = '2rem';
    buttonContainer.style.flexWrap = 'wrap';
    
    // Récupérer le bouton submit existant
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Si le bouton submit existe, le retirer de sa position actuelle
    if (submitBtn) {
        submitBtn.parentNode.removeChild(submitBtn);
        
        // Ajouter les boutons au conteneur
        buttonContainer.appendChild(submitBtn);
        buttonContainer.appendChild(whatsappBtn);
        
        // Ajouter le conteneur après le dernier groupe de formulaire
        const lastFormGroup = contactForm.querySelector('.form-group:last-of-type');
        if (lastFormGroup) {
            lastFormGroup.parentNode.insertBefore(buttonContainer, lastFormGroup.nextSibling);
        } else {
            contactForm.appendChild(buttonContainer);
        }
    }
    
    // Gestionnaire d'événement pour le bouton WhatsApp
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        
        // Validation de base
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const subject = formData.get('subject');
        
        // Validation améliorée avec trim() et vérification spécifique
        if (!name?.trim() || !email?.trim() || !message?.trim() || !subject) {
            alert('Veuillez remplir tous les champs obligatoires (*) avant d\'envoyer par WhatsApp.');
        return;
        }

        // Vérification spécifique pour l'email
        const trimmedEmail = email?.trim() || '';
        if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.') || 
            trimmedEmail.indexOf('@') === 0 || 
            trimmedEmail.lastIndexOf('.') < trimmedEmail.indexOf('@') + 2) {
            alert('Veuillez entrer une adresse email valide (exemple : nom@domaine.com).');
            return;
        }
        
        // Vérifier la case à cocher
        const checkbox = contactForm.querySelector('input[type="checkbox"]');
        if (!checkbox || !checkbox.checked) {
            alert('Veuillez accepter que vos données soient traitées avant d\'envoyer.');
            return;
        }
        
        // Demander confirmation à l'utilisateur
        const userConfirmed = confirm(`Ce site va ouvrir WhatsApp pour envoyer votre message au numéro +229 62 01 63 33.\n\nSouhaitez-vous continuer ?\n\nVotre message sera formaté et pré-rempli dans WhatsApp.`);
        
        if (userConfirmed) {
            // Générer le message formaté
            const whatsappMessage = generateWhatsAppMessage(formData);
            
            // Ouvrir WhatsApp avec le message
            openWhatsAppWithMessage(whatsappMessage);
            
            // Optionnel: Afficher un message de confirmation
            setTimeout(() => {
                alert('WhatsApp devrait s\'ouvrir avec votre message pré-rempli. Si ce n\'est pas le cas, assurez-vous que WhatsApp est installé sur votre appareil.');
            }, 500);
        }
    });
    
    // Ajouter du CSS pour le bouton WhatsApp
    addWhatsAppStyles();
}

// Fonction pour ajouter les styles CSS pour le bouton WhatsApp
function addWhatsAppStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-btn {
            background: linear-gradient(135deg, #25D366, #128C7E) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        .whatsapp-btn:hover {
            background: linear-gradient(135deg, #1ebe5d, #0e7a6c) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3) !important;
        }
        
        .button-container {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        
        .button-container button {
            flex: 1;
            min-width: 200px;
        }
        
        @media (max-width: 768px) {
            .button-container {
                flex-direction: column;
            }
            
            .button-container button {
                width: 100%;
                min-width: unset;
            }
        }
        
        /* Ajout pour l'indicateur de chargement */
        .whatsapp-btn.loading {
            opacity: 0.7;
            cursor: wait;
        }
        
        .whatsapp-btn.loading svg {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Fonction pour ajouter la validation en temps réel
function addRealTimeValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (!contactForm) return;
    
    const fields = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    clearFieldError(field);
    
    if (!field.value.trim()) {
        showFieldError(field, 'Ce champ est obligatoire');
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            showFieldError(field, 'Veuillez entrer une adresse email valide');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.5rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ff6b6b';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// Initialiser les fonctionnalités WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter le bouton WhatsApp sur la page de contact
    addWhatsAppButton();
    
    // Ajouter la validation en temps réel
    addRealTimeValidation();
    
    // Mettre à jour le gestionnaire de soumission du formulaire pour inclure WhatsApp
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation de tous les champs
            const fields = this.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                alert('Veuillez corriger les erreurs dans le formulaire.');
                return;
            }
            
            // Vérifier la case à cocher
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (!checkbox || !checkbox.checked) {
                alert('Veuillez accepter que vos données soient traitées.');
                return;
            }
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Log pour débogage (à remplacer par un véritable envoi backend)
            console.log('Formulaire soumis :', {
                name: name,
                email: email,
                organization: formData.get('organization'),
                subject: formData.get('subject'),
                message: message
            });
            
            // Message de succès
            alert('Merci pour votre message ! Je vous répondrai par email dans les plus brefs délais.\n\nVous pouvez également envoyer directement par WhatsApp si vous préférez.');
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Réinitialiser les erreurs
            this.querySelectorAll('.field-error').forEach(error => error.remove());
            this.querySelectorAll('input, textarea, select').forEach(field => {
                field.style.borderColor = '';
            });
        });
    }
});

