
// Page switching and the dark theme

function showSection(sectionId) {
  const sections = document.querySelectorAll('section[data-section]');
  sections.forEach(sec => {
    if (sec.dataset.section === sectionId) {
      sec.style.display = 'block';
    } else {
      sec.style.display = 'none';
    }
  });
}

function setupNav() {
  const navLinks = document.querySelectorAll('[data-nav]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('data-nav');
      showSection(target);
    });
  });
}

function setupThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) return;

  const head = document.head;
  let themeLink = document.getElementById("themeStylesheet");

  themeBtn.addEventListener("click", () => {
    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.rel = "stylesheet";
      themeLink.href = "css/dark-theme.css";
      themeLink.id = "themeStylesheet";
      head.appendChild(themeLink);
      themeBtn.textContent = "Disable Dark Mode";
    } else {
      themeLink.remove();
      themeLink = null;
      themeBtn.textContent = "Enable Dark Mode";
    }
  });
}

function initPage() {
  setupNav();
  setupThemeToggle();

  showSection('home');
}

//
window.initPage = initPage;
