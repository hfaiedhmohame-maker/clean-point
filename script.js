
// --- UTILS ---

// Animations
window.initAnimations = function () {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.service-card, .about-content, .value-card, .contact-container, .hero-stats');

  elementsToAnimate.forEach(el => {
    el.classList.add('fade-up-init');
    observer.observe(el);
  });
};

// Slideshow
window.initSlideshow = function () {
  const slides = document.querySelectorAll('#about-slideshow .slide');
  if (!slides.length) return;

  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000); // Change every 4 seconds
};

// Contact Handler
window.handleContactSubmit = function (event) {
  event.preventDefault();

  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const service = document.getElementById('contact-service').value;
  const message = document.getElementById('contact-message').value;

  const subject = `Anfrage von ${name} - ${service}`;

  // Better encoding
  const finalLink = `mailto:info@cleanpoint.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nService: " + service + "\n\nNachricht:\n" + message)}`;

  window.location.href = finalLink;

  // Optional: Visual confirmation
  const btn = event.target.querySelector('button');
  const originalText = btn.innerText;
  btn.innerText = "Email-Programm wird geöffnet...";
  setTimeout(() => {
    btn.innerText = originalText;
  }, 2000);
};

// --- COMPONENTS ---

// Icons
window.Icons = {
  logo: (width = 30, height = 30) => `
    <img src="./cleanpoint_logo_modern_1770050522462.png" alt="CleanPoint Logo" style="width: ${width}px; height: ${height}px; object-fit: contain;">
  `,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

// Navbar
window.Navbar = function () {
  return `
    <nav class="navbar" id="navbar">
      <div class="container navbar-content">
        <a href="#" class="logo-wrapper">
          ${window.Icons.logo(60, 60)}
          <div class="logo-text-stack">
            <span class="logo-text">CLEAN<span class="highlight">POINT</span></span>
            <span class="logo-slogan">sauber, zuverlässig, wir.</span>
          </div>
        </a>
        
        <div class="nav-links desktop-only">
          <a href="#home" class="nav-link active">Startseite</a>
          <a href="#services" class="nav-link">Leistungen</a>
          <a href="#about" class="nav-link">Über Uns</a>
          <a href="#contact" class="nav-link">Kontakt</a>
        </div>

        <a href="#contact" class="btn btn-primary desktop-only">Angebot anfragen</a>

        <button class="mobile-menu-btn" aria-label="Menu" onclick="toggleMenuV4()">
          ${window.Icons.menu}
        </button>
      </div>

      <!-- V4 SECURE MENU - TRIPLE FORCE WHITE -->
      <div id="mobileMenuV4" style="
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100vw; 
          height: 100vh; 
          background-color: #ffffff !important; 
          background: #ffffff !important;
          z-index: 2147483647 !important; 
          display: none; 
          flex-direction: column; 
          padding: 80px 40px; 
          gap: 2rem;
          overflow-y: auto;
      ">
         <!-- Inner White Wrapper for Extra Safety -->
         <div style="background: white; width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1;"></div>
         
         <a href="#home" style="font-size: 1.5rem; font-weight: 700; color: #1a2b4a; text-decoration: none; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; position: relative; z-index: 2;" onclick="toggleMenuV4()">Startseite</a>
         <a href="#services" style="font-size: 1.5rem; font-weight: 700; color: #1a2b4a; text-decoration: none; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; position: relative; z-index: 2;" onclick="toggleMenuV4()">Leistungen</a>
         <a href="#about" style="font-size: 1.5rem; font-weight: 700; color: #1a2b4a; text-decoration: none; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; position: relative; z-index: 2;" onclick="toggleMenuV4()">Über Uns</a>
         <a href="#contact" style="font-size: 1.5rem; font-weight: 700; color: #1a2b4a; text-decoration: none; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; position: relative; z-index: 2;" onclick="toggleMenuV4()">Kontakt</a>
         <a href="#contact" class="btn btn-primary" style="text-align: center; margin-top: 1rem; border: none; position: relative; z-index: 2;" onclick="toggleMenuV4()">Angebot anfragen</a>
      </div>
    </nav>
  `;
};

// Footer
window.Footer = function () {
  return `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-col">
          <div class="logo-wrapper">
            ${window.Icons.logo(30, 30)}
            <span class="logo-text">Clean<span class="highlight">Point</span></span>
          </div>
          <p class="footer-desc">
            Professionelle Reinigung mit höchsten Standards. 
            Wir sorgen für Sauberkeit, damit Sie sich auf das Wesentliche konzentrieren können.
          </p>
        </div>
        
        <div class="footer-col">
          <h4>Leistungen</h4>
          <ul class="footer-links">
            <li><a href="#">Büroreinigung</a></li>
            <li><a href="#">Fensterreinigung</a></li>
            <li><a href="#">Grundreinigung</a></li>
            <li><a href="#">Praxisreinigung</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Kontakt</h4>
          <ul class="footer-contact">
            <li class="contact-item">${window.Icons.phone} +49 123 456 789</li>
            <li class="contact-item">${window.Icons.mail} info@cleanpoint.de</li>
            <li class="contact-item">Musterstraße 1, 60311 Frankfurt am Main</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} CleanPoint. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  `;
};

// Services Section
window.ServicesSection = function () {
  const services = [
    {
      title: "Fensterreinigung",
      desc: "Streifenfreier Glanz für klare Sicht. Wir reinigen Glasflächen jeder Art und Höhe professionell und sicher."
    },
    {
      title: "Büroreinigung",
      desc: "Ein sauberer Arbeitsplatz fördert die Produktivität. Wir sorgen für Hygiene an Schreibtischen, Böden und in Gemeinschaftsräumen."
    },
    {
      title: "Praxisreinigung",
      desc: "Höchste Hygiene-Standards für Ihre Patienten. Wir arbeiten strikt nach Desinfektionsplänen und Hygienevorschriften."
    },
    {
      title: "Hotels & Gastronomie",
      desc: "Der erste Eindruck zählt. Wir schaffen ein einladendes und makelloses Ambiente für Ihre Gäste."
    },
    {
      title: "Treppenhausreinigung",
      desc: "Werterhalt beginnt im Eingangsbereich. Zuverlässige Reinigung für gepflegte Immobilien und zufriedene Mieter."
    },
    {
      title: "Unterhaltsreinigung",
      desc: "Regelmäßige Pflege nach Maß. Wir entwickeln einen individuellen Reinigungsplan, der exakt zu Ihren Bedürfnissen passt."
    }
  ];

  const cardsHtml = services.map(service => `
    <div class="service-card">
      <h3>${service.title}</h3>
      <p>${service.desc}</p>
    </div>
  `).join('');

  return `
    <section id="services" class="section services-grid-section">
      <div class="container">
        <div class="section-header">
          <h2>UNSERE LEISTUNGEN</h2>
          <div class="header-line"></div>
        </div>
        
        <div class="services-grid-layout">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
};

// About Section
window.AboutSection = function () {
  return `
    <section id="about" class="section about-section">
      <div class="container">
        <div class="section-header">
           <h2 class="text-gradient">Über CleanPoint</h2>
           <p class="subtitle">Mehr als nur Sauberkeit. Wir sind Ihr Partner für Facility Management.</p>
        </div>

        <div class="about-grid">
           <div class="about-content">
              <!-- Removed redundant headline -->
              <p>
                Gegründet mit der Vision, die Reinigungsbranche zu revolutionieren, hat sich CleanPoint innerhalb weniger Jahre zu einem führenden Anbieter in Hessen entwickelt.
                Was als kleines Familienunternehmen begann, ist heute ein Synonym für Präzision und Zuverlässigkeit.
              </p>
              <p>
                Wir glauben, dass eine saubere Umgebung der Schlüssel zu Produktivität und Wohlbefinden ist. Deswegen geben wir uns nicht mit "sauber" zufrieden – wir streben nach "rein".
              </p>
              
              <div class="stats-grid">
                <div class="mini-stat">
                   <strong>15+</strong>
                   <span>Jahre Erfahrung</span>
                </div>
                 <div class="mini-stat">
                   <strong>50+</strong>
                   <span>Experten</span>
                </div>
                 <div class="mini-stat">
                   <strong>100%</strong>
                   <span>Leidenschaft</span>
                </div>
              </div>
           </div>
           
           <div class="about-image">
              <div class="image-stack" id="about-slideshow">
                 <div class="img-box primary slide active" style="background-image: url('./src/assets/images/cleaners_diamond_realistic_1770051442264.png');"></div>
                 <div class="img-box primary slide" style="background-image: url('./src/assets/images/cleaner_sink_realistic_1770051457068.png');"></div>
                 <!-- Removed dark image as requested -->
                 <div class="img-box secondary"></div>
              </div>
           </div>
        </div>

        <div class="values-row">
           <div class="value-card">
              <div class="icon-box">${window.Icons.check}</div>
              <h4>Qualität</h4>
              <p>Strenge Qualitätskontrollen und regelmäßige Schulungen garantieren ein gleichbleibend hohes Niveau.</p>
           </div>
           <div class="value-card">
              <div class="icon-box">${window.Icons.check}</div>
              <h4>Nachhaltigkeit</h4>
              <p>Wir verwenden ausschließlich biologisch abbaubare Reinigungsmittel und ressourcenschonende Verfahren.</p>
           </div>
           <div class="value-card">
              <div class="icon-box">${window.Icons.check}</div>
              <h4>Flexibilität</h4>
              <p>Ob täglich, wöchentlich oder auf Abruf – wir passen uns Ihrem Zeitplan an, nicht umgekehrt.</p>
           </div>
        </div>
      </div>
    </section>
  `;
};

// Contact Section
window.ContactSection = function () {
  return `
    <section id="contact" class="section contact-section">
       <div class="container contact-container">
          <div class="contact-info">
             <h2>Kontaktieren Sie uns</h2>
             <p>Bereit für strahlende Ergebnisse? Schreiben Sie uns oder rufen Sie an.</p>
             
             <ul class="contact-details">
                <li>
                   <span class="icon">${window.Icons.phone}</span>
                   <div>
                      <strong>Telefon</strong>
                      <p>+49 123 456 789</p>
                   </div>
                </li>
                <li>
                   <span class="icon">${window.Icons.mail}</span>
                   <div>
                      <strong>E-Mail</strong>
                      <p>info@cleanpoint.de</p>
                   </div>
                </li>
                 <li>
                   <span class="icon">${window.Icons.check}</span>
                   <div>
                      <strong>Hauptsitz</strong>
                      <p>Musterstraße 1, 60311 Frankfurt am Main</p>
                   </div>
                </li>
             </ul>

             <div class="map-placeholder">
                <p>Google Maps Integration</p>
             </div>
          </div>

          <div class="contact-form-wrapper">
             <form class="contact-form" onsubmit="window.handleContactSubmit(event)">
                <h3>Angebot anfordern</h3>
                <div class="form-group">
                   <label>Name</label>
                   <input type="text" id="contact-name" placeholder="Ihr Name" required>
                </div>
                <div class="form-group">
                   <label>E-Mail</label>
                   <input type="email" id="contact-email" placeholder="ihre@email.de" required>
                </div>
                 <div class="form-group">
                   <label>Service</label>
                   <select id="contact-service">
                      <option>Bitte wählen...</option>
                      <option>Büroreinigung</option>
                      <option>Fensterreinigung</option>
                      <option>Privathaushalt</option>
                      <option>Sonstiges</option>
                   </select>
                </div>
                <div class="form-group">
                   <label>Nachricht</label>
                   <textarea id="contact-message" rows="4" placeholder="Wie können wir Ihnen helfen?"></textarea>
                </div>
                <button type="submit" class="btn btn-primary full-width">Absenden</button>
             </form>
          </div>
       </div>
    </section>
  `;
};

// Home (Page)
window.Home = function () {
  return `
    <div class="home-page" id="home">
      <!-- Main Content Area (White Background) -->
      <section class="main-content">
        <div class="container main-grid">
          
          <!-- Left Column: Services & Info -->
          <div class="content-left">
             <div class="hero-intro">
                <h1>Ihr neuer Partner für <br> <span class="highlight-text">strahlende Sauberkeit</span></h1>
                <p class="hero-subtext">
                   Verlassen Sie sich auf uns. Wir sorgen für glänzende Ergebnisse und eine Atmosphäre zum Wohlfühlen.
                </p>
             </div>

             <a href="#services" class="pill-header" style="text-decoration: none; cursor: pointer;">
               UNSERE DIENSTLEISTUNGEN
             </a>

             <ul class="service-list-hero">
                <li>
                  <div class="check-circle">${window.Icons.check}</div>
                  <span>Fenster Reinigung</span>
                </li>
                <li>
                  <div class="check-circle">${window.Icons.check}</div>
                  <span>Büro, Arztpraxen & Privathaushalte</span>
                </li>
                <li>
                  <div class="check-circle">${window.Icons.check}</div>
                  <span>Hotels & Gastronomie</span>
                </li>
                <li>
                  <div class="check-circle">${window.Icons.check}</div>
                  <span>Reinigung von Treppenhäusern</span>
                </li>
                <li>
                  <div class="check-circle">${window.Icons.check}</div>
                  <span>Unterhaltsreinigung</span>
                </li>
             </ul>
             
             <!-- Dots Decoration -->
             <div class="dots-decoration"></div>
          </div>

          <!-- Right Column: Diamond Images -->
          <div class="content-right">
             <div class="diamond-grid">
                <div class="diamond-item d1">
                   <img src="./cleaner_sink_realistic_1770051457068.png" alt="Detail Cleaning">
                </div>
                <div class="diamond-item d2">
                   <img src="./cleaners_diamond_realistic_1770051442264.png" alt="Office Cleaning">
                </div>
                <!-- Small decorative diamond -->
                <div class="diamond-decoration"></div>
             </div>
          </div>

        </div>
      </section>

      <!-- Services Grid Section -->
      ${window.ServicesSection()}

      <!-- Bottom Contact Section (Dark Blue) -->
      <section class="bottom-cta">
         <div class="container cta-flex">
            <div class="cta-badge">
               NEHMEN SIE <br> KONTAKT MIT UNS <br> AUF ↓
            </div>
            <div class="cta-info">
               <div class="cta-row">
                  <span class="icon-phone">📞</span> +49 155 69281842
               </div>
               <div class="cta-row">
                  <span class="icon-mail">✉️</span> info.cleanpoint@web.de
               </div>
            </div>
         </div>
      </section>
    </div>
  `;
};

// --- MAIN EXECUTION ---
document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  // Bundled load without try-catch bloat suitable for production
  if (!window.Navbar || !window.Home) {
    console.error("Critical components missing!");
  }

  app.innerHTML = `
      ${window.Navbar()}
      ${window.Home()}
      ${window.AboutSection()}
      ${window.ContactSection()}
      ${window.Footer()}
    `;

  // Initialize animations after render
  setTimeout(() => {
    if (window.initAnimations) window.initAnimations();
    if (window.initSlideshow) window.initSlideshow();
  }, 100);

  // Simple Scroll Effect for Navbar
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // NEW V4 Menu Logic (Global)
  window.toggleMenuV4 = function () {
    const menu = document.getElementById('mobileMenuV4');
    if (!menu) return;

    if (menu.style.display === 'flex') {
      menu.style.display = 'none';
      document.body.style.overflow = '';
    } else {
      menu.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };
});




