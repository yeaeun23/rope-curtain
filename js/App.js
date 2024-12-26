import Dot from "./Dot.js";
import Stick from "./Stick.js";

export default class App {
  static width = innerWidth;
  static height = innerHeight;
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static fps = 60;
  static interval = 1000 / this.fps;

  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.dots = [new Dot(400, 50), new Dot(500, 100), new Dot(600, 50), new Dot(800, 0)];
    this.sticks = [
      new Stick(this.dots[0], this.dots[1]),
      new Stick(this.dots[1], this.dots[2]),
      new Stick(this.dots[2], this.dots[3]),
    ];
    this.dots[0].pinned = true;
  }

  resize() {
    App.width = innerWidth;
    App.height = innerHeight;

    this.canvas.style.width = App.width + "px";
    this.canvas.style.height = App.height + "px";

    this.canvas.width = App.width * App.dpr;
    this.canvas.height = App.height * App.dpr;
    this.ctx.scale(App.dpr, App.dpr);
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;

      if (delta < App.interval) {
        return;
      }

      // 화면 지우기
      this.ctx.clearRect(0, 0, App.width, App.height);

      // Dot 그리기
      this.dots.forEach((dot) => {
        dot.update();
        dot.draw(this.ctx);
      });

      // Stick 그리기
      this.sticks.forEach((stick) => {
        stick.update();
        stick.draw(this.ctx);
      });

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}
