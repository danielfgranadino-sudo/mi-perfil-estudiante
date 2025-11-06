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
    
    function validarFormulario() {
        let esValido = true;
        
        if (nombreInput.value.trim() === '') {
            errorNombre.textContent = 'Por favor, ingresa tu nombre';
            esValido = false;
        } else {
            errorNombre.textContent = '';
        }
        
        if (emailInput.value.trim() === '') {
            errorEmail.textContent = 'Por favor, ingresa tu correo electrónico';
            esValido = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            errorEmail.textContent = 'Por favor, ingresa un correo electrónico válido';
            esValido = false;
        } else {
            errorEmail.textContent = '';
        }
        
        if (mensajeInput.value.trim() === '') {
            errorMensaje.textContent = 'Por favor, ingresa tu mensaje';
            esValido = false;
        } else {
            errorMensaje.textContent = '';
        }
        
        return esValido;
    }
    
    function enviarFormulario(evento) {
        evento.preventDefault();
        
        if (validarFormulario()) {
            botonEnviar.textContent = 'Enviando...';
            botonEnviar.disabled = true;
            
            const datosFormulario = {
                nombre: nombreInput.value.trim(),
                email: emailInput.value.trim(),
                mensaje: mensajeInput.value.trim()
            };
            
            setTimeout(function() {
                console.log('Datos enviados:', datosFormulario);
                
                formulario.style.display = 'none';
                mensajeExito.classList.remove('oculto');
                
                botonEnviar.textContent = 'Enviar Mensaje';
                botonEnviar.disabled = false;
            }, 1500);
        }
    }
    
    formulario.addEventListener('submit', enviarFormulario);
    
    nombreInput.addEventListener('blur', function() {
        if (nombreInput.value.trim() === '') {
            errorNombre.textContent = 'Por favor, ingresa tu nombre';
        } else {
            errorNombre.textContent = '';
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (emailInput.value.trim() === '') {
            errorEmail.textContent = 'Por favor, ingresa tu correo electrónico';
        } else if (!emailRegex.test(emailInput.value.trim())) {
            errorEmail.textContent = 'Por favor, ingresa un correo electrónico válido';
        } else {
            errorEmail.textContent = '';
        }
    });
    
    mensajeInput.addEventListener('blur', function() {
        if (mensajeInput.value.trim() === '') {
            errorMensaje.textContent = 'Por favor, ingresa tu mensaje';
        } else {
            errorMensaje.textContent = '';
        }
    });
});