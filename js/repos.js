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

async function cargarRepositorios() {
    const contenedor = document.getElementById('repos');

    if (!contenedor) {
        console.error('No existe el elemento con id="repos"');
        return;
    }

    const repos = await obtenerRepositorios();
    const reposPublicos = repos.filter(repo => !repo.fork);

    contenedor.innerHTML = '';

    reposPublicos.forEach(repo => {
        const elemento = document.createElement('li');
        elemento.className = 'repo-item';

        elemento.innerHTML = `
            <a href="${repo.html_url}"
               target="_blank"
               rel="noopener noreferrer">
                ${repo.name}
            </a>
            <p>${repo.description || 'Sin descripción disponible'}</p>
            <small>${repo.language || 'Sin lenguaje'}</small>
        `;

        contenedor.appendChild(elemento);
    });
}


document.addEventListener('DOMContentLoaded', cargarRepositorios);
})();