window.addEventListener('DOMContentLoaded', () => {
    const formRef = document.querySelector('form.card__form');
    const formSubmitButton = formRef.querySelector('.form__submit');
    const formInputs = formRef.querySelectorAll('.form__field-input');

    formSubmitButton.onclick = (event) => {
        if (!event.isTrusted || !formRef.checkValidity()) {
            return;
        }

        formSubmitButton.classList.add('button_hidden');
        formRef.append(createLoaderBlock());
    };

    formInputs.forEach(inputRef => inputRef.oninput = () => {
        formSubmitButton.disabled = false;
        formRef.classList.remove('form_invalid');
    });

    function createLoaderBlock() {
        const loaderBlock = document.createElement('div');
        loaderBlock.classList.add('loader');
        return loaderBlock;
    }
});
