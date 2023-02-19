export default class Point {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public x: number;
  public y: number;

  public equalsTo(point: Point) {
    return this.x === point.x && this.y === point.y;
  }
}
