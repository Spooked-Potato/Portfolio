console.log("hello world!");

const navigation = document.querySelector("#sideMenu");

console.log(navigation);

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty(
  "--scroll-padding",
  navigationHeight + "px"
);
