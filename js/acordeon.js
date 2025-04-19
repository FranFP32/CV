document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar todos los títulos de acordeón
    const acordeonTitulos = document.querySelectorAll('.acordeon-titulo');
    
    // Añadir evento click a cada título
    acordeonTitulos.forEach(titulo => {
      // Obtener el ID del contenido relacionado
      const contenidoId = titulo.id.replace('-titulo', '-body');
      const contenido = document.getElementById(contenidoId);
      
      // Por defecto, los acordeones están cerrados
      contenido.style.maxHeight = "0px";
      
      // Añadir evento click
      titulo.addEventListener('click', function() {
        // Alternar la clase 'activo' para el título
        this.classList.toggle('activo');
        
        // Si el contenido está visible, ocultarlo; si no, mostrarlo
        if (contenido.classList.contains('activo')) {
          contenido.classList.remove('activo');
          contenido.style.maxHeight = "0px";
        } else {
          contenido.classList.add('activo');
          contenido.style.maxHeight = contenido.scrollHeight + "px";
        }
      });
    });
  });