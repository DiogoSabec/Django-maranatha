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
        <div class="container-fluid fill bg-secondary" style="height: 100px; display: flex; align-items: center;" id="topo">
            <div class="container">
                <nav class="navbar navbar-expand-md" style="width: 100%; display: flex; align-items: center;">
                    <a href="${homeUrl}" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <img src="${logoUrl}" width="50" height="40"> <!-- Use logo URL here -->
                        <span class="fs-2 text-white">aranatha</span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a href="${homeUrl}" class="${this.isActive(homeUrl, currentPath)} fs-5 me-1 btn btn-success nav-link" aria-current="page">Home</a></li>
                            <li class="nav-item"><a href="${aboutUrl}" class="${this.isActive(aboutUrl, currentPath)} fs-5 me-1 btn btn-success nav-link">Sobre Nós</a></li>
                            <li class="nav-item"><a href="${photosUrl}" class="${this.isActive(photosUrl, currentPath)} fs-5 me-1 btn btn-success nav-link">Fotos do Grupo</a></li>
                            <li class="nav-item"><a href="${calendarUrl}" class="${this.isActive(calendarUrl, currentPath)} fs-5 me-1 btn btn-success nav-link">Calendário de Compromissos</a></li>
                            <li class="nav-item"><a href="${contactsUrl}" class="${this.isActive(contactsUrl, currentPath)} fs-5 me-1 btn btn-success nav-link">Contatos</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 50" preserveAspectRatio="none" style="display: block;">
    <path fill="#71bfff" opacity="0.33" d="M473,33.65 c-203.9,44.15-263.1-17-320.3,0C66,59.55,0,29.85,0,29.85V0h1000v29.85 c0,0-62.1,13.05-94.9,14.65c-32.8,1.65-62.8-6.15-75.8-11.05C806,24.8,745.3,4.35,694.9,2.35S492.4,29.5,473,33.65z"></path>
    <path fill="#71bfff" opacity="0.66" d="M734,33.65 c-45.5,0-77.2-11.6-129.1-19.55c-28.6-4.35-150.3-5.05-254,19.55 s-91.7-17.2-149.2,0C115.7,59.15,0,19.9,0,19.9V0h1000v18.25c0,0-28.2-9.25-92.1-9.25C810.2,9.05,775.7,33.65,734,33.65z"></path>
    <path fill="#71bfff" d="M766.1,14.45 c-200-28.75-266,32.75-395.1,9.75C242,0.9,242,2.7,184.8,10.3C128,17.9,132.3,22.45,89.9,26.25C28.6,31.85,0,0,0,0 h1000c0,0-9.9,20.45-83.6,24.05S829.6,23.5,766.1,14.45z"></path>
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
