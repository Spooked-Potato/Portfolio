class ProjectSlideshow {
  constructor({ locationService, animator }) {
    this.projectService = locationService;
    this.animator = animator;
    this.#init();
  }

  async #init() {
    await this.#renderProjectSlideshow();
    this.#initSlideshow();
    this.#animateScreens();
  }

  #initSlideshow() {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  #animateScreens() {
    const screens = [...document.querySelectorAll(".screen")];

    screens.forEach((screen) => {
      this.animator.animate(screen);
    });
  }

  async #renderProjectSlideshow() {
    const container = document.querySelector(".mySwiper .swiper-wrapper");

    if (!container) {
      throw new Error("there is no slideshow to render locations");
    }

    const projects = await this.projectService.getLocations();

    const renderedProject = projects
      .map(
        (project) => `
        <div class="swiper-slide">
        <div class="slideWrapper">
        <div class="screen">
          <div class="screen-image" style="background-image:url(${project.image})"></div>
          <div class="screen-overlay"></div>
          <div class="screen-content">
            <i class="screen-icon fa-brands fa-codepen"></i>
            <div class="screen-user">
              <span class="name" data-value="${project.name}">
              ${project.name}
              </span>
              <a class="link" href="${project.link}" target="_blank">
                Go to Page
              </a>
            </div>
          </div>
        </div>
      </div>
      
        </div>
        `
      )
      .join("");

    container.innerHTML = renderedProject;
  }
}
