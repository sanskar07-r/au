// Footer message system (with debug)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('footer-message-form');
  const input = document.getElementById('footer-message-input');
  const statusDiv = document.getElementById('footer-message-status');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    statusDiv.style.display = 'none';
    statusDiv.textContent = '';
    form.querySelector('button[type="submit"]').disabled = true;
    fetch('footer-message.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'message=' + encodeURIComponent(message)
    })
    .then(async res => {
      let data;
      try {
        data = await res.json();
      } catch (err) {
        statusDiv.textContent = 'Server error: Invalid response.';
        statusDiv.className = 'text-danger';
        statusDiv.style.display = 'block';
        form.querySelector('button[type="submit"]').disabled = false;
        console.error('Invalid JSON:', await res.text());
        return;
      }
      console.log('Footer message response:', data);
      if (data.success) {
        statusDiv.textContent = 'Message sent! Thank you.';
        statusDiv.className = 'text-success';
        input.value = '';
      } else {
        statusDiv.textContent = data.error || 'Failed to send message.';
        statusDiv.className = 'text-danger';
      }
      statusDiv.style.display = 'block';
      form.querySelector('button[type="submit"]').disabled = false;
    })
    .catch((err) => {
      statusDiv.textContent = 'Network error. Please try again.';
      statusDiv.className = 'text-danger';
      statusDiv.style.display = 'block';
      form.querySelector('button[type="submit"]').disabled = false;
      console.error('Network error:', err);
    });
  });
});
// Scroll animation: add .visible to .scroll-animate elements when in viewport
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.scroll-animate');
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('DOMContentLoaded', handleScrollAnimation);
// main.js for Cyber Academy landing page
// All JS moved from index.html

// GSAP Animations and scroll effects with ScrollTrigger and smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll with Lenis
    if (window.Lenis) {
        const lenis = new Lenis({
            duration: 1.2,
            smooth: true,
            direction: 'vertical',
            gestureDirection: 'vertical',
            smoothTouch: true,
            touchMultiplier: 1.5
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Hero section: layered entrance animation
    gsap.from('.cyber-hero-title', {
        opacity: 0,
        y: -60,
        scale: 0.92,
        duration: 1.2,
        ease: 'expo.out',
    });
    gsap.from('.cyber-hero-subtitle', {
        opacity: 0,
        y: -30,
        duration: 1.1,
        delay: 0.3,
        ease: 'power2.out',
    });
    gsap.from('.cyber-hero-badges', {
        opacity: 0,
        y: 30,
        duration: 1.1,
        delay: 0.5,
        ease: 'power2.out',
    });
    gsap.from('.hero-main-img', {
        opacity: 0,
        scale: 0.7,
        y: 40,
        duration: 1.2,
        delay: 0.7,
        ease: 'back.out(1.7)',
    });
    gsap.from('.cyber-hero-feature-card', {
        opacity: 0,
        x: -60,
        duration: 1.1,
        delay: 1.0,
        ease: 'power2.out',
    });
    gsap.from('.cyber-hero-img-animated', {
        opacity: 0,
        x: 60,
        duration: 1.1,
        delay: 1.1,
        ease: 'power2.out',
    });

    // Typing animation for hero subtitle
    const typingTexts = [
      "Empowering the next generation of cyber defenders.",
      "Hands-on, interactive, and animated learning experiences.",
      "Join, learn, and secure the digital world!"
    ];
    let typingIndex = 0, charIndex = 0, isDeleting = false;
    const typingSpeed = 45, erasingSpeed = 25, delayBetween = 1200;
    const typingEl = document.querySelector('.cyber-typing');
    function typeLoop() {
      if (!typingEl) return;
      const current = typingTexts[typingIndex];
      if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeLoop, delayBetween);
        } else {
          setTimeout(typeLoop, typingSpeed);
        }
      } else {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          typingIndex = (typingIndex + 1) % typingTexts.length;
          setTimeout(typeLoop, 600);
        } else {
          setTimeout(typeLoop, erasingSpeed);
        }
      }
    }
    setTimeout(typeLoop, 900);

    // Hero logo bounce and glow (improved)
    gsap.fromTo('.hero-main-img',
        { y: -30, boxShadow: '0 0 0 #00ffea99, 0 2px 16px #0008', scale: 0.8 },
        {
            y: 0,
            scale: 1,
            boxShadow: '0 0 32px #00ffea99, 0 2px 16px #0008',
            duration: 1.2,
            ease: 'bounce.out',
            delay: 0.7
        }
    );
    gsap.to('.hero-main-img', {
        boxShadow: '0 0 64px #00ffea, 0 2px 32px #00ffea',
        borderColor: '#fff',
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut',
        delay: 1.2
    });

    // Cards animation on scroll (staggered, more dynamic)
    gsap.utils.toArray('.gsap-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 80 + i*10,
            scale: 0.92,
            duration: 1.1 + i*0.05,
            delay: i * 0.08,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            ease: 'power3.out'
        });
    });

    // Section titles scroll animation (slide/fade)
    gsap.utils.toArray('h2.gsap-fade').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0,
            y: 40,
            scale: 0.96,
            duration: 1.1,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            ease: 'power2.out'
        });
    });

    // Community image animation (slide/fade)
    gsap.from('.py-5.bg-dark .gsap-img', {
        x: 100,
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        scrollTrigger: {
            trigger: '.py-5.bg-dark',
            start: 'top 80%',
        }
    });

    // Parallax effect for hero (stronger)
    gsap.to('.hero-section', {
        backgroundPosition: '50% 100%',
        scale: 1.03,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Rive animation (example: use a public Rive file)
    if (window.Rive) {
        new Rive({
            src: 'https://public.rive.app/community/runtime-files/2196-4470-rocket.riv', // Example Rive file
            canvas: document.getElementById('rive-hero'),
            autoplay: true,
            stateMachines: 'State Machine 1',
            onLoad: () => {
                // Optionally, add more interactivity or animation triggers here
            }
        });
    }
});
