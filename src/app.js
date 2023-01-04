import { gsap } from "gsap";

console.log('Hello world!');

gsap.to(".box", { 
    rotation: 360,
    x: '100vw',
    xPercent: -100,
    // special properties
    duration: 2, // how long the animation lasts
    repeat: 2, // the number of repeats - this will play 3 times
    yoyo: true, // this will alternate back and forth on each repeat. Like a yoyo
  });
  