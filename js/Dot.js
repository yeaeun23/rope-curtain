import Vector from "./Vector.js";

export default class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);

    this.friction = 0.97; // 마찰력
    this.gravity = new Vector(0, 1); // 중력
    this.mass = 1; // 무게

    this.pinned = false;
  }

  update(mouse) {
    if (this.pinned) {
      return;
    }

    let vel = Vector.sub(this.pos, this.oldPos); // 속도(velocity)

    this.oldPos.setXY(this.pos.x, this.pos.y);

    vel.mult(this.friction);
    vel.add(this.gravity);

    // 마우스 따라 움직이기
    let { x: dx, y: dy } = Vector.sub(mouse.pos, this.pos);
    const dist = Math.sqrt(dx * dx + dy * dy); // 두 점 사이의 거리

    const direction = new Vector(dx / dist, dy / dist);
    const force = Math.max((mouse.radius - dist) / mouse.radius, 0); // force 음수 방지

    // 떨림 방지
    if (force > 0.6) {
      this.pos.setXY(mouse.pos.x, mouse.pos.y); // 마우스 위치와 동일하게
    } else {
      this.pos.add(vel);
      this.pos.add(direction.mult(force).mult(5)); // 마우스 쪽으로 끌리게
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#999";
    ctx.fillRect(this.pos.x - this.mass, this.pos.y - this.mass, this.mass * 2, this.mass * 2);
  }
}
