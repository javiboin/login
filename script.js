document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    })

    emailInput.addEventListener('blur', function() {
        validateEmail();
    })

    emailInput.addEventListener('change', function() {
        clearError(emailError);
    })

    passwordInput.addEventListener('change', function() {
        clearError(passwordError);
    })

    confirmPasswordInput.addEventListener('change', function() {
        clearError(confirmPasswordError);
    })

    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const isPasswordMatch = passwordMatch();

        if (isValidEmail && isValidPassword && isPasswordMatch) {
            saveToLocalStorage();
            alert('Formulario enviado correctamente');
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();

        if(!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingrese un email valido');
            return false;
        };

        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue.length < 6) {
            showError(passwordError, 'Ingrese una contraseña de al menos 6 caracteres');
            return false;
        }

        return true;
    }

    function passwordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas no coiniden');
            return false;
        }

        return true;
    }

    function showError (errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError (errorElement) {
        errorElement.innerHTML = '';
        errorElement.display = 'none';
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body = generateJSON();
        console.log(body);
    }

    function generateJSON() {
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }
});