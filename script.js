// Botón Conoce Más: Scroll suave
document.getElementById('btnConoceMas').addEventListener('click', () => {
    document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
});

// Menú hamburguesa móvil
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Carrusel
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

// Crear indicadores dinámicos
for (let i = 0; i < totalItems; i++) {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Ir al proyecto ${i + 1}`);
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
        goToSlide(i);
    });
    indicatorsContainer.appendChild(btn);
}

function updateCarousel() {
    items.forEach((item, i) => {
        item.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
        item.classList.toggle('active', i === currentIndex);
    });
    // Indicadores
    const indicators = indicatorsContainer.querySelectorAll('button');
    indicators.forEach((btn, i) => {
        btn.classList.toggle('active', i === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
});

updateCarousel();

// Auto-play carrusel cada 5 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}, 5000);

// Comentarios funcionalidad
const form = document.getElementById('comentarioForm');
const listaComentarios = document.getElementById('listaComentarios');

document.addEventListener('DOMContentLoaded', mostrarComentarios);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre && mensaje) {
        const fecha = new Date().toLocaleString();
        const nuevoComentario = { nombre, mensaje, fecha };

        let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.push(nuevoComentario);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));

        mostrarComentarios();
        form.reset();
    }
});

function mostrarComentarios() {
    listaComentarios.innerHTML = '';
    let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.forEach((c, index) => {
        const div = document.createElement('div');
        div.classList.add('comentario');
        div.innerHTML = `
            <strong>${c.nombre}</strong>
            <span>(${c.fecha})</span>
            <p>${c.mensaje}</p>
            <button aria-label="Eliminar comentario de ${c.nombre}" onclick="eliminarComentario(${index})">Eliminar</button>
        `;
        listaComentarios.appendChild(div);
    });
}

function eliminarComentario(index) {
    let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.splice(index, 1);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    mostrarComentarios();
}
