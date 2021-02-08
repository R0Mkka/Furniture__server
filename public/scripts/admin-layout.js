window.addEventListener('DOMContentLoaded', () => {
    highlightCurrentLink(location.pathname);
    
    function highlightCurrentLink(currentPath) {
        const links = Array.from(document.querySelectorAll('nav a.navigation__link'));
        links.forEach(linkRef => {
            linkRef.classList.remove('current');

            if (linkRef.getAttribute('href') === currentPath) {
                linkRef.classList.add('current');
            }
        });
    }
});
