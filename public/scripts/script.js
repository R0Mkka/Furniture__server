window.addEventListener('DOMContentLoaded', () => {
    // attachFormHandler();
});

function attachFormHandler() {
    const formRef = document.querySelector('form.card__form');
    const formSubmitButton = formRef.querySelector('.form__submit');

    formRef.addEventListener('submit', (event) => event.preventDefault());

    formSubmitButton.addEventListener('click', async (event) => {
        const isFormValid = formRef.checkValidity();

        if (!event.isTrusted || !isFormValid) {
            return;
        }

        event.preventDefault();

        try {
            const response = await fetch(
                '/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(getFormData()),
                },
            );

            response.json().then(val => console.log(val));
        } catch(error) {
            console.warn(error);
        }
    });

    function getFormData() {
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');
        return {
            email: emailField.value,
            password: passwordField.value,
        };
    }
}
