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
                        <div class="container justify-content-end">    
                            <img src="${logoUrl}" width="50" height="40">
                            <span class="fs-2 text-white">aranatha</span>
                        </div>    
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

class MainFooter extends HTMLElement {
    connectedCallback() {
        const logoPar = this.getAttribute('paroquia-logo-url');
        const logoRcc = this.getAttribute('rcc-logo-url');

        this.innerHTML = `
<footer class="bg-primary text-white text-center text-lg-start"id="footer">
    <!-- Grid container -->
    <div class="container-fluid p-2">

        <!--Grid row-->
        <div class="row p-1 align-items-center justify-content-center">
            <!--Grid column for Logo-->
            <div class="col-lg-2 text-md-left mb-3 mb-md-0">
                <img src="${logoPar}" height="100px" class="img-fluid d-none d-md-block">
            </div>

            <!--Grid column for Address-->
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-md-0">
                <h5 class="text-uppercase">Endereço</h5>
                <ul class="list-unstyled">
                    <li>Paróquia Coração de Maria</li>
                    <li>Domingo às 10:30, 3° andar</li>
                    <li>Av: Higienópolis, 1073 – Centro</li>
                    <li>CEP 86020-080 | Londrina-PR</li>
                </ul>
            </div>

            <!--Grid column for Useful Links-->
            <div class="col col-md-auto col-lg-2 mb-3 mb-md-0">
                <h5 class="text-uppercase">Links Úteis</h5>
                <ul class="list-unstyled">
                    <li><a href="https://www.instagram.com/rcc.londrina/" class="navbarlink text-white text-decoration-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>
                    Rcc Londrina</a></li>
                    <li><a href="https://cordemaria.com.br/" class="text-white text-decoration-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/></svg>
                Paróquia Coração de Maria</a></li>
                    <li><a href="https://arquidioceselondrina.com.br/" class="text-white text-decoration-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/></svg>
                Arquidiocese de Londrina</a></li>
                </ul>
            </div>

            <!--Grid column for More About Us-->
            <div class="col-6 col-md-4 col-lg-2 mb-3 mb-md-0 justify-col-content-center">
                <h5 class="text-uppercase">Veja mais sobre nós:</h5>
                <ul class="list-unstyled">
                    <li><a href="https://www.instagram.com/maranathaoficial/" class="text-white text-decoration-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>
                Instagram</a></li>
                    <li><a href="https://www.facebook.com/MaranathaVemSenhorJesus" class="text-white text-decoration-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>
                Facebook</a></li>
                </ul>
            </div>

            <!--Grid column for RCC Logo-->
            <div class="col-6 col-md-3 col-lg-2">
                <img src="${logoRcc}" height="80px" class="img-fluid d-none d-md-block">
            </div>
        </div>
        <!--Grid row-->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        Desenvolvido por: Diogo Sabec
    </div>
    <!-- Copyright -->
</footer>
        `;
    }
}
customElements.define('main-header', MainHeader);
customElements.define('main-footer', MainFooter);
