document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const toggleButtonsNested = document.querySelectorAll('.toggle-button-nested');

    function toggleContent(button) {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
                button.innerHTML = 'v detalles'; // Texto cuando el contenido está oculto
            } else {
                content.style.display = 'block';
                button.innerHTML = '^ detalles'; // Texto cuando el contenido está visible
            }
        });
    }

    // Solo agregar el texto para los botones de detalles
    function toggleMainContent(button) {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
                // El texto del botón principal no cambia
                button.innerHTML = 'v patentes'; // Texto cuando el contenido está oculto
            } else {
                content.style.display = 'block';
                // El texto del botón principal no cambia
                button.innerHTML = 'v patentes'; // Texto cuando el contenido está visible
            }
        });
    }

    // Aplicar los cambios
    toggleButtons.forEach(button => {
        toggleMainContent(button);
    });

    toggleButtonsNested.forEach(button => {
        toggleContent(button);
    });
});



// Obtener referencia al formulario y a los botones de detalles 
const searchForm = document.getElementById('search-form');

// Función para manejar la búsqueda 
function handleSearch(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto 

    const patente = document.getElementById('patente').value.trim(); // Obtener el valor de la patente ingresada
    const minCharacters = 4; // Número mínimo de caracteres requeridos para la búsqueda

    if (patente.length < minCharacters) {
        // Si el campo de búsqueda tiene menos de minCharacters caracteres, no hacer la búsqueda
        alert(`Por favor, ingrese al menos ${minCharacters} caracteres para buscar.`);
        return;
    }

    if (patente === '') {
        // Si el campo de búsqueda está vacío, no hacer nada y retornar
        alert('Por favor, ingrese una patente para buscar.');
        return;
    }
    
     // Limpiar el resaltado de patentes anteriores
     document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));

    // Buscar el párrafo que contiene la patente ingresada
    let found = false;
    document.querySelectorAll('.expandable-content p').forEach(p => {
        if (p.textContent.includes(patente)) {
            // Mostrar el contenido expandible que contiene el párrafo encontrado
            const expandableContent = p.closest('.expandable-content');
            expandableContent.style.display = 'block';

            // Resaltar la patente encontrada
            p.classList.add('highlighted');
            
            // Expandir el contenido anidado
            const nestedButtons = expandableContent.querySelectorAll('.toggle-button-nested');
            nestedButtons.forEach(button => {
                const content = button.nextElementSibling;
                if (content.querySelector('p').textContent.includes(patente)) {
                    content.style.display = 'block';
                    button.innerHTML = '^ detalles'; // Texto cuando el contenido está visible
                }
            });

            expandableContent.scrollIntoView({ behavior: 'smooth' });
            found = true;
        }
    });

    if (!found) {
        alert(`La patente '${patente}' no fue encontrada.`);
    }
}

searchForm.addEventListener('submit', handleSearch);