class projectSlideshow {
  constructor(projectService) {
    this.projectService = projectService;
    this.#init();
  }

  async #init() {
    await this.#renderProjectSlideshow();
    this.#initSlideshow();
  }

  #initSlideshow() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let interval = null;

    const screen = document.querySelector(".screen"),
      name = document.querySelector(".name");

    screen.onmouseenter = (event) => {
      let iteration = 0;

      clearInterval(interval);

      interval = setInterval(() => {
        name.innerText = name.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return name.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= name.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

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
