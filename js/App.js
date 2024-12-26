import Dot from "./Dot.js";

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

    this.dots = [new Dot(400, 50)];
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

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}
