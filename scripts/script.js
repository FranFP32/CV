animacionCabecera();
function animacionCabecera() {
var cabecera = document.querySelector('.cabecera');
var cabeceraAltura = cabecera.offsetHeight;
var cabeceraPosicion = cabecera.getBoundingClientRect().top;
cabecera.style.transition = 'transform 0.5s ease-in-out';
cabecera.style.transform = 'translateY(-' + cabeceraAltura + 'px)';
}