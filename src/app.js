import { gsap } from "gsap";
import { MotionPathPlugin} from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

var animation;

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

gsap.set("#motionSVG", { scale: 0.7, autoAlpha: 1 });
gsap.set("#tractor", {transformOrigin: "50% 50%"});

animation = gsap.to("#motionSVG", {
  scrollTrigger: {
    trigger: "#motionPath",
    start: "top 20%",
    // end: '+=5000px',
    scrub: 1,
    markers: false,
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
    autoRotate: 90,
  }
});