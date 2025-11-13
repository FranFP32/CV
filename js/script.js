
 // Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

// Efecto navbar al hacer scroll
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

// Animación de entrada para elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

// Observar elementos para animación
        document.querySelectorAll('.project-card, .skill-category').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

// Efecto de escritura para el título
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }

//carousel de proyectos
console.log("🔧 script.js cargado");

document.addEventListener("DOMContentLoaded", () => {
  console.log("📂 DOM listo");
    //Busquedas del Dom
  const cards = document.querySelectorAll(".card");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  

  console.log("✅ Elementos encontrados:", { cardsCount: cards.length, nextBtn, prevBtn });

  let active = 0;

  function updateCards() {
    cards.forEach((card, index) => {
      card.className = "card"; // reset
      if (index === active) card.classList.add("active");
      else if (index === (active - 1 + cards.length) % cards.length)
        card.classList.add("left", "inactive");
      else if (index === (active + 1) % cards.length)
        card.classList.add("right", "inactive");
      else card.classList.add("inactive");
    });
  }
  //bucle infinito de direcciones 
  nextBtn.addEventListener("click",()=>{
    active=(active+1)%cards.length;
    updateCards();
  });
  prevBtn.addEventListener("click",()=>{
    active=(active -1+ cards.length)%cards.length;
    updateCards();
  });
  //clic directo a la tarjeta
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      active = index;
      updateCards();
    });
  });
  updateCards();
});
