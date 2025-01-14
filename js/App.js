import Mouse from "./Mouse.js";
import Rope from "./Rope.js";
import { randomNumBetween } from "./utils.js";

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

    this.mouse = new Mouse(this.canvas);
  }

  resize() {
    App.width = innerWidth;
    App.height = innerHeight;

    this.canvas.style.width = App.width + "px";
    this.canvas.style.height = App.height + "px";

    this.canvas.width = App.width * App.dpr;
    this.canvas.height = App.height * App.dpr;
    this.ctx.scale(App.dpr, App.dpr);

    this.initRopes();
  }

  initRopes() {
    const TOTAL = App.width * 0.06; // 로프 개수
    this.ropes = [];

    for (let i = 0; i < TOTAL; i++) {
      const rope = new Rope({
        x: randomNumBetween(App.width * 0.3, App.width * 0.7),
        y: 0,
        gap: randomNumBetween(App.height * 0.05, App.height * 0.08),
      });
      rope.pin(0);
      this.ropes.push(rope);
    }
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

      // 로프 그리기
      this.ropes.forEach((rope) => {
        rope.update(this.mouse);
        rope.draw(this.ctx);
      });

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}
