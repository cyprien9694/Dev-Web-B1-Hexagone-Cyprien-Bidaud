document.addEventListener('DOMContentLoaded', () => {
  console.log('Script chargé !');

  // ====== Menu burger dynamique (☰ ↔ ✖) ======
  const burger = document.getElementById('burger-menu');
  const navLinks = document.getElementById('nav-menu');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      // Basculer la classe active pour le menu et le burger
      navLinks.classList.toggle('active');
      burger.classList.toggle('active');

      // Mise à jour de l'icône : ☰ ou ✖
      burger.textContent = burger.classList.contains('active') ? '✖' : '☰';
    });
  }

  // ====== Thème clair / sombre ======
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    // Fonction pour mettre à jour l'icône du bouton de thème
    const updateThemeIcon = () => {
      themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    };

    themeToggle.addEventListener('click', () => {
      // Bascule entre le mode clair et sombre
      document.body.classList.toggle('dark-mode');
      updateThemeIcon();  // Mise à jour de l'icône
    });

    // Mise à jour initiale de l'icône
    updateThemeIcon();
  }

  // ====== Récupération et affichage des articles ======
  const container = document.getElementById('posts-container');
  let allPosts = [];

  // Fetch des articles depuis l'API JSONPlaceholder
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      data.forEach(article => {
        const post = {
          id: article.id,
          title: article.title,
          body: article.body
        };
        allPosts.push(post);  // Ajoute chaque article au tableau allPosts
      })
      // Crée un conteneur pour les articles
      container.innerHTML = data.map(article => `
        <article>
          <h2>${article.title}</h2>
          <p>${article.body}</p>
          <h4>ID: ${article.id}</h4>
        </article>
      `).join('');  // Stocke les articles récupérés
      // Affiche tous les articles au début
      console.log('Articles récupérés :', allPosts);
      searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = allPosts.filter(post =>
          post.title.toLowerCase().includes(value) || post.body.toLowerCase().includes(value)
        );
        console.log('Articles correspondant à la recherche :', filtered);
      });

      themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
          console.log('Mode sombre activé');
        } else {
          console.log('Mode clair activé');
        }
      });
    })
    .catch(error => console.error('Erreur lors du fetch :', error));

  // Fonction pour afficher les articles
  function displayPosts(posts) {
    if (!container) return;  // Si le conteneur n'existe pas, on arrête

    container.innerHTML = '';  // Vide le conteneur avant d'ajouter les articles
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
      container.appendChild(article);
    });
  }

  // ====== Recherche dynamique ======
  const searchInput = document.getElementById('search');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();  // Récupère la valeur du champ de recherche
      // Filtre les articles qui contiennent la valeur dans le titre ou le corps
      const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(value) || post.body.toLowerCase().includes(value)
      );
      displayPosts(filtered);  
    });
  }
});
