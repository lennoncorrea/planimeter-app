import { useState } from "react";
import Point from "../components/graph/point/point.entity";

export default function usePoint(): DispatchPoint {
  const [x, setX] = useState<number | string>();
  const [y, setY] = useState<number | string>();

  const parsedXY = parseXYtoFloat(x, y);
  let point: Point | undefined;
  if (x && y) {
    point = new Point(parsedXY.x!, parsedXY.y!);
  }
  return { point, setX, setY };
}

function parseXYtoFloat(x: inputCoordinate, y: inputCoordinate) {
  let floatX: number | undefined;
  let floatY: number | undefined;
  if (typeof x === "string") {
    floatX = parseFloat(x);
  }
  if (typeof y === "string") {
    floatY = parseFloat(y);
  }
  return { x: floatX, y: floatY };
}

type inputCoordinate = string | number | undefined;
interface DispatchPoint {
  point: Point | undefined;
  setX: React.Dispatch<React.SetStateAction<number | string | undefined>>;
  setY: React.Dispatch<React.SetStateAction<number | string | undefined>>;
}
