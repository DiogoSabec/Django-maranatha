class MainHeader extends HTMLElement {
    connectedCallback() {
        const homeUrl = this.getAttribute('data-home-url');
        const aboutUrl = this.getAttribute('data-about-url');
        const photosUrl = this.getAttribute('data-photos-url');
        const calendarUrl = this.getAttribute('data-calendar-url');
        const contactsUrl = this.getAttribute('data-contacts-url');
        const logoUrl = this.getAttribute('data-logo-url'); // Get logo URL from data attribute
        const currentPath = window.location.pathname; // Get current path

        this.innerHTML = `
        <div class="container-fluid fill bg-secondary" id="topo">
            <div class="container">
                <nav class="navbar navbar-expand-md">
                    <a href="${homeUrl}" class="d-flex align-items-bottom mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <img src="${logoUrl}" width="40" height="32"> <!-- Use logo URL here -->
                        <span class="fs-4 text-white">aranatha</span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a href="${homeUrl}" class="${this.isActive(homeUrl, currentPath)} me-1 btn btn-success nav-link" aria-current="page">Home</a></li>
                            <li class="nav-item"><a href="${aboutUrl}" class="${this.isActive(aboutUrl, currentPath)} me-1 btn btn-success nav-link">Sobre Nós</a></li>
                            <li class="nav-item"><a href="${photosUrl}" class="${this.isActive(photosUrl, currentPath)} me-1 btn btn-success nav-link">Fotos do Grupo</a></li>
                            <li class="nav-item"><a href="${calendarUrl}" class="${this.isActive(calendarUrl, currentPath)} me-1 btn btn-success nav-link">Calendário de Compromissos</a></li>
                            <li class="nav-item"><a href="${contactsUrl}" class="${this.isActive(contactsUrl, currentPath)} me-1 btn btn-success nav-link">Contatos</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            </div>
<svg id="header-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 30" preserveAspectRatio="none" style="display: block;">
    <path fill="#71bfff" opacity="0.33" d="M473,10 c-203.9,13.7-263.1-5.3-320.3,0C66,18.5,0,9.3,0,9.3V0h1000v9.3 c0,0-62.1,4-94.9,4.6c-32.8,0.5-62.8-1.9-75.8-3.4C806,7.7,745.3,1.35,694.9,0.73S492.4,9.15,473,10z"></path>
    <path fill="#71bfff" opacity="0.66" d="M734,10 c-45.5,0-77.2-3.6-129.1-6.05c-28.6-1.35-150.3-1.55-254,6.05 s-91.7-5.3-149.2,0C115.7,18.3,0,6.15,0,6.15V0h1000v5.65c0,0-28.2-2.85-92.1-2.85C810.2,2.8,775.7,10,734,10z"></path>
    <path fill="#71bfff" d="M766.1,4.5 c-200-8.9-266,10.1-395.1,3C242,0.3,242,0.8,184.8,3.2C128,5.5,132.3,6.95,89.9,8.15C28.6,9.85,0,0,0,0 h1000c0,0-9.9,6.35-83.6,7.45S829.6,7.25,766.1,4.5z"></path>
</svg>

        `;

        // Add click listeners to all links to prevent reload on current page
        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.preventReload);
        });
    }

    // Function to prevent navigation if link is the current page
    preventReload(event) {
        const linkPath = new URL(event.target.href, window.location.origin).pathname;
        if (linkPath === window.location.pathname) {
            event.preventDefault();
        }
    }

    // Function to determine if a URL is the active one based on the current path
    isActive(linkUrl, currentPath) {
        const linkPath = new URL(linkUrl, window.location.origin).pathname;
        return currentPath === linkPath ? 'nav-link active' : 'nav-link';
    }
}

customElements.define('main-header', MainHeader);
