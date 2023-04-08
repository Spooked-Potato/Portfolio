function initProjectSlideshow() {
  const projectService = new JsonService("project.json");
  const slideshow = new projectSlideshow(projectService);
}

initProjectSlideshow();
