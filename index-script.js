window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    if (href && (href.endsWith('.html') || 
                 href.includes('index.html') || 
                 href.includes('story.html') || 
                 href.startsWith('/'))) {
        
        if (!href.startsWith('http') && 
            !href.startsWith('mailto:') && 
            href !== '#') {

            link.addEventListener('click', function(e) {
                const target = this.getAttribute('href');
                if (target === '#') return;

                e.preventDefault();

                document.body.classList.remove('loaded');
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            });
        }
    }
});

function toggleDropdown(menuId) {
    const menu   = document.getElementById(menuId);
    const toggle = event.currentTarget;

    menu.classList.toggle('show');
    toggle.classList.toggle('open');

    document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m.id !== menuId && m.classList.contains('show')) {
            m.classList.remove('show');
            m.previousElementSibling.querySelector('.dropdown-toggle')?.classList.remove('open');
        }
    });
}

document.addEventListener('click', e => {
    if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
        document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('open'));
    }
});