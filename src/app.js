import { gsap } from "gsap";
import { MotionPathPlugin} from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

var animationBiche;
var animPlan1Part1;
var animPlan1Part2;

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

gsap.set("#motionSVG", { scale: 0.7, autoAlpha: 1 });
gsap.set("#tractor", {transformOrigin: "50% 50%"});


// --- Animation forêt ---
animPlan1Part1 = gsap.to("#plan1part1", {
  scrollTrigger: "#foret",
  x: '50vw',
  duration:2
});

animPlan1Part2 = gsap.to("#plan1part2", {
  scrollTrigger: "#foret",
  x: '50vw',
  duration:2
});

// --- Animation biche ---
animationBiche = gsap.to("#motionSVG", {
  scrollTrigger: {
    trigger: "#motionPath",
    start: "top 70%",
    end: '+=4023',
    scrub: 1,
    markers: true,
    onUpdate: self => {
      gsap.to("#tractor", {rotation: () => self.direction === 1 ? 0 : -180, overwrite: 'auto'});
    }
  },
  duration: 10,
  ease: "none",
  immediateRender: true,
  motionPath: {
    path: "#motionPath",
    align: "#motionPath",
    alignOrigin: [0.5, 0.5],
    autoRotate: 0,
  }
});