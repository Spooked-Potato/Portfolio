function getRandomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return letters[Math.floor(Math.random() * 26)];
}

class WordScreenAnimator {
  constructor(options = {}) {
    const defaultOptions = { changeDurationMs: 30, changesPerLetter: 3 };
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  #getRandomOrCorrectLetter(name, letterIndex, iteration) {
    const correctLetter = name.dataset.value[letterIndex];

    return letterIndex < iteration ? correctLetter : getRandomLetter();
  }

  animate(screen) {
    let interval = null;
    const name = screen.querySelector(".name");

    screen.onmouseenter = (event) => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        name.innerText = name.innerText
          .split("")
          .map((_letter, index) =>
            this.#getRandomOrCorrectLetter(name, index, iteration)
          )
          .join("");

        if (iteration >= name.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / this.options.changesPerLetter;
      }, this.options.changeDurationMs);
    };
  }
}

function initProjectSlideshow() {
  const projectService = new JsonService("project.json");
  const animator = new WordScreenAnimator({
    changeDurationMs: 30,
    changesPerLetter: 3,
  });
  const slideshow = new ProjectSlideshow({
    locationService: projectService,
    animator,
  });
}

initProjectSlideshow();
