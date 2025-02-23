
gsap.registerPlugin(ScrollTrigger);

let activeImage = null;
let offsetX = 0,
  offsetY = 0;


document.addEventListener("mousemove", (e) => {
  if (activeImage) return;

  requestAnimationFrame(() => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    document.querySelectorAll(".floating-image").forEach((image) => {
      const factor = 0.03; 
      const deltaX = (clientX - centerX) * factor;
      const deltaY = (clientY - centerY) * factor;

      gsap.to(image, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
});


document.querySelectorAll(".floating-image").forEach((img) => {
  img.addEventListener("mouseenter", (e) => {
    activeImage = img;

    const rect = img.getBoundingClientRect();
    offsetX = e.clientX;
    offsetY = e.clientY;


    gsap.to(img, {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out",
    });

 
    document.querySelectorAll(".floating-image").forEach((otherImg) => {
      if (otherImg !== img) {
        gsap.to(otherImg, {
          opacity: 0,
          duration: 0.3,
        });
        otherImg.classList.add("show-border"); 
      }
    });

    gsap.to(".text-container", {
      color: "transparent",
      "-webkit-text-stroke": "1px white", 
      duration: 0.3,
    });

    
    document.addEventListener("mousemove", moveHoveredImage);
  });

  img.addEventListener("mouseleave", () => {
    activeImage = null;
    document.removeEventListener("mousemove", moveHoveredImage);

  
    gsap.to(".floating-image", {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    document.querySelectorAll(".floating-image").forEach((otherImg) => {
      otherImg.classList.remove("show-border"); 
    });

 
    gsap.to(".text-container", {
      color: "white", 
      "-webkit-text-stroke": "0px", 
      duration: 0.3,
    });
  });
});

function moveHoveredImage(e) {
  if (!activeImage) return;

  const rect = activeImage.getBoundingClientRect();

 
  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;

  gsap.to(activeImage, {
    x: newX,
    y: newY,
    duration: 0.1,
    ease: "power1.out",
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");

  gsap.to(preloader, {
    opacity: 0,
    duration: 1,
    delay: 2.5,
    onComplete: () => (preloader.style.display = "none"),
  });
});
