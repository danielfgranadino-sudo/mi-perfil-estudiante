document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const botonEnviar = document.getElementById('boton-enviar');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorMensaje = document.getElementById('error-mensaje');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Función para mostrar errores de forma accesible
    function mostrarError(elementoError, mensaje) {
        elementoError.textContent = mensaje;
        elementoError.setAttribute('aria-live', 'polite');
    }
    
    function limpiarError(elementoError) {
        elementoError.textContent = '';
        elementoError.removeAttribute('aria-live');
    }
    
    function validarFormulario() {
        let esValido = true;
        
        // Validar nombre
        if (nombreInput.value.trim() === '') {
            mostrarError(errorNombre, 'Por favor, ingresa tu nombre');
            nombreInput.setAttribute('aria-invalid', 'true');
            esValido = false;
        } else {
            limpiarError(errorNombre);
            nombreInput.setAttribute('aria-invalid', 'false');
        }
        
        // Validar email
        if (emailInput.value.trim() === '') {
            mostrarError(errorEmail, 'Por favor, ingresa tu correo electrónico');
            emailInput.setAttribute('aria-invalid', 'true');
            esValido = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            mostrarError(errorEmail, 'Por favor, ingresa un correo electrónico válido');
            emailInput.setAttribute('aria-invalid', 'true');
            esValido = false;
        } else {
            limpiarError(errorEmail);
            emailInput.setAttribute('aria-invalid', 'false');
        }
        
        // Validar mensaje
        if (mensajeInput.value.trim() === '') {
            mostrarError(errorMensaje, 'Por favor, ingresa tu mensaje');
            mensajeInput.setAttribute('aria-invalid', 'true');
            esValido = false;
        } else {
            limpiarError(errorMensaje);
            mensajeInput.setAttribute('aria-invalid', 'false');
        }
        
        return esValido;
    }
    
    function enviarFormulario(evento) {
        evento.preventDefault();
        
        if (validarFormulario()) {
            // Deshabilitar botón y mostrar estado de carga
            botonEnviar.textContent = 'Enviando...';
            botonEnviar.disabled = true;
            botonEnviar.setAttribute('aria-label', 'Enviando mensaje, por favor espere');
            
            const datosFormulario = {
                nombre: nombreInput.value.trim(),
                email: emailInput.value.trim(),
                mensaje: mensajeInput.value.trim(),
                timestamp: new Date().toISOString()
            };
            
            // Simular envío (en un caso real, aquí iría fetch o XMLHttpRequest)
            setTimeout(function() {
                console.log('Datos del formulario enviados:', datosFormulario);
                
                // Ocultar formulario y mostrar mensaje de éxito
                formulario.style.display = 'none';
                mensajeExito.classList.remove('oculto');
                mensajeExito.focus(); // Mover foco para accesibilidad
                
                // Restablecer botón
                botonEnviar.textContent = 'Enviar Mensaje';
                botonEnviar.disabled = false;
                botonEnviar.setAttribute('aria-label', 'Enviar mensaje de contacto');
                
                // Limpiar formulario
                formulario.reset();
                
                // Restablecer estados de validación
                limpiarError(errorNombre);
                limpiarError(errorEmail);
                limpiarError(errorMensaje);
                nombreInput.setAttribute('aria-invalid', 'false');
                emailInput.setAttribute('aria-invalid', 'false');
                mensajeInput.setAttribute('aria-invalid', 'false');
                
            }, 1500);
        }
    }
    
    // Event Listeners
    formulario.addEventListener('submit', enviarFormulario);
    
    // Validación en tiempo real con mejor manejo de eventos
    nombreInput.addEventListener('blur', function() {
        if (nombreInput.value.trim() === '') {
            mostrarError(errorNombre, 'Por favor, ingresa tu nombre');
            nombreInput.setAttribute('aria-invalid', 'true');
        } else {
            limpiarError(errorNombre);
            nombreInput.setAttribute('aria-invalid', 'false');
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (emailInput.value.trim() === '') {
            mostrarError(errorEmail, 'Por favor, ingresa tu correo electrónico');
            emailInput.setAttribute('aria-invalid', 'true');
        } else if (!emailRegex.test(emailInput.value.trim())) {
            mostrarError(errorEmail, 'Por favor, ingresa un correo electrónico válido');
            emailInput.setAttribute('aria-invalid', 'true');
        } else {
            limpiarError(errorEmail);
            emailInput.setAttribute('aria-invalid', 'false');
        }
    });
    
    mensajeInput.addEventListener('blur', function() {
        if (mensajeInput.value.trim() === '') {
            mostrarError(errorMensaje, 'Por favor, ingresa tu mensaje');
            mensajeInput.setAttribute('aria-invalid', 'true');
        } else {
            limpiarError(errorMensaje);
            mensajeInput.setAttribute('aria-invalid', 'false');
        }
    });
    
    // Limpiar errores al empezar a escribir
    nombreInput.addEventListener('input', function() {
        if (nombreInput.value.trim() !== '') {
            limpiarError(errorNombre);
            nombreInput.setAttribute('aria-invalid', 'false');
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && emailRegex.test(emailInput.value.trim())) {
            limpiarError(errorEmail);
            emailInput.setAttribute('aria-invalid', 'false');
        }
    });
    
    mensajeInput.addEventListener('input', function() {
        if (mensajeInput.value.trim() !== '') {
            limpiarError(errorMensaje);
            mensajeInput.setAttribute('aria-invalid', 'false');
        }
    });
    
    // Mejorar accesibilidad del teclado
    formulario.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape') {
            formulario.reset();
            limpiarError(errorNombre);
            limpiarError(errorEmail);
            limpiarError(errorMensaje);
        }
    });
});