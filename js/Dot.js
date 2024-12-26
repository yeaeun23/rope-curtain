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

  update() {
    if (this.pinned) {
      return;
    }

    let vel = Vector.sub(this.pos, this.oldPos); // 속도(velocity)

    this.oldPos.setXY(this.pos.x, this.pos.y);

    vel.mult(this.friction);
    vel.add(this.gravity);

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
