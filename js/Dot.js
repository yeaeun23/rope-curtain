import Vector from "./Vector.js";

export default class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);

    this.friction = 0.97;
    this.gravity = new Vector(0, 1);

    this.pinned = false;
  }

  update() {
    if (this.pinned) {
      return;
    }

    let vel = Vector.sub(this.pos, this.oldPos); // 속도(velocity)

    this.oldPos.setXY(this.pos.x, this.pos.y);

    vel.mult(this.friction); // 마찰력 곱하기
    vel.add(this.gravity); // 중력 더하기

    this.pos.add(vel);
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
