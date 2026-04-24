
(()=>{
const username = 'FranFP32';
const GITHUB_API_URL =
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

async function obtenerRepositorios() {
    try {
        const response = await fetch(GITHUB_API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const repos = await response.json();

        if (!Array.isArray(repos)) {
            console.error('La API no devolvió un array:', repos);
            return [];
        }

        return repos;

    } catch (error) {
        console.error('Error al obtener repositorios:', error);
        return [];
    }
}

function renderizarGitHubPages(repos, contenedor) {
    if (!contenedor) {
        console.error('No existe el elemento con id="github-pages"');
        return;
    }

    contenedor.innerHTML = '';

    if (repos.length === 0) {
        contenedor.innerHTML = `
            <p class="pages-empty">
                No hay proyectos desplegados actualmente.
            </p>
        `;
        return;
    }

    repos.forEach(repo => {
        const githubPagesUrl =
            `https://${username.toLowerCase()}.github.io/${repo.name}/`;

        const card = document.createElement('article');
        card.className = 'pages-card';

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Proyecto desplegado con GitHub Pages.'}</p>
            <div class="pages-info">
                <span>${repo.language || 'No especificado'}</span>
                <span>${new Date(repo.updated_at).toLocaleDateString('es-ES')}</span>
            </div>
            <div class="pages-links">
                <a href="${repo.html_url}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="code-link">Ver Código</a>
                <a href="${githubPagesUrl}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="demo-link">Ver Demo</a>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

async function cargarGitHubPages() {
    const contenedor = document.getElementById('github-pages');

    if (!contenedor) {
        console.log('No existe el elemento con id="github-pages"');
        return;
    }

    const repos = await obtenerRepositorios();
    const proyectosDesplegados = repos.filter(repo =>
        !repo.fork && repo.has_pages
    );

    renderizarGitHubPages(proyectosDesplegados, contenedor);
}

document.addEventListener('DOMContentLoaded', cargarGitHubPages);
})();