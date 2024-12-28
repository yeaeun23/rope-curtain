import Dot from "./Dot.js";
import Stick from "./Stick.js";

export default class Rope {
  constructor(config) {
    this.x = config.x; // 시작점 좌표
    this.y = config.y;

    this.segments = config.segments || 10; // 점 개수
    this.gap = config.gap || 50; // 점 사이 거리(=스틱 길이)
    this.iterations = config.iterations || 10; // 스틱 update 반복 횟수

    this.dots = [];
    this.sticks = [];

    this.create();
  }

  pin(index) {
    this.dots[index].pinned = true;
  }

  checkPullingOut() {
    const dist = this.dots[0].pos.dist(this.dots[1].pos); // 점 사이 거리(=늘어난 스틱 길이)

    // 원래 스틱 길이와 비교
    if (dist / this.sticks[0].length > 1.4) {
      this.dots[0].pinned = false; // 고정 해제
    }
  }

  create() {
    // 점 생성
    for (let i = 0; i < this.segments; i++) {
      this.dots.push(new Dot(this.x, this.y + i * this.gap));
    }

    // 스틱 생성
    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
    }
  }

  update(mouse) {
    this.checkPullingOut();

    this.dots.forEach((dot) => {
      dot.update(mouse);
    });

    // for문: 버그 최소화
    for (let i = 0; i < this.iterations; i++) {
      this.sticks.forEach((stick) => {
        stick.update();
      });
    }
  }

  draw(ctx) {
    this.dots.forEach((dot) => {
      dot.draw(ctx);
    });

    this.sticks.forEach((stick) => {
      stick.draw(ctx);
    });

    // 마지막 점에 라이트 그리기
    this.dots[this.dots.length - 1].drawLight(ctx);
  }
}
