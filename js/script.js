const username = 'FranFP32';
const API_URL = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

fetch(API_URL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));


    async function cargarRepositorios() {
    const contenedor = document.getElementById('repos');

    try {
        const response = await fetch(
            'https://api.github.com/users/FranFP32/repos?sort=updated&per_page=100'
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const repos = await response.json();

        // Limpiar contenedor
        contenedor.innerHTML = '';

        // Filtrar repositorios que no sean forks
        const reposPublicos = repos.filter(repo => !repo.fork);

        reposPublicos.forEach(repo => {
            const elemento = document.createElement('li');
            elemento.className = 'repo-item';

            elemento.innerHTML = `
                <a href="${repo.html_url}" target="_blank">
                    ${repo.name}
                </a>
                <p>${repo.description || 'Sin descripción disponible'}</p>
                <small>
                    ${repo.language || 'Sin lenguaje'} ·
                </small>
            `;

            contenedor.appendChild(elemento);
        });

    } catch (error) {
        console.error('Error al cargar repositorios:', error);
        contenedor.innerHTML = '<li>Error al cargar los proyectos.</li>';
    }
}

document.addEventListener('DOMContentLoaded', cargarRepositorios);