const GITHUB_USERNAME = 'FranFP32';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

async function cargarGitHub() {
    const reposContainer = document.getElementById('repos');
    const pagesContainer = document.getElementById('github-pages');

    try {
        const response = await fetch(GITHUB_API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const repos = await response.json();

        const reposPublicos = repos.filter(repo => !repo.fork);
        const proyectosConDemo = reposPublicos.filter(
            repo => repo.homepage && repo.homepage.trim() !== ''
        );

        renderizarRepositorios(reposPublicos, reposContainer);
        renderizarGitHubPages(proyectosConDemo, pagesContainer);

    } catch (error) {
        console.error('Error al cargar GitHub:', error);

        reposContainer.innerHTML =
            '<li>Error al cargar los repositorios.</li>';

        pagesContainer.innerHTML =
            '<p>Error al cargar los proyectos desplegados.</p>';
    }
}

function renderizarRepositorios(repos, contenedor) {
    contenedor.innerHTML = '';

    repos.forEach(repo => {
        const item = document.createElement('li');
        item.className = 'repo-item';

        item.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Sin descripción disponible'}</p>
            <small>
                ${repo.language || 'Sin lenguaje'} ·
     
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                Ver código
            </a>
        `;

        contenedor.appendChild(item);
    });
}

function renderizarGitHubPages(repos, contenedor) {
    contenedor.innerHTML = '';

    if (repos.length === 0) {
        contenedor.innerHTML =
            '<p>No hay proyectos desplegados actualmente.</p>';
        return;
    }

    repos.forEach(repo => {
        const card = document.createElement('article');
        card.className = 'pages-card';

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Proyecto desplegado en GitHub Pages.'}</p>
            <div class="pages-links">
                <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">
                    Ver Demo
                </a>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                    Código
                </a>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', cargarGitHub););