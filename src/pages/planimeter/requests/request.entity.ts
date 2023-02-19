import Point from "../../../components/graph/point/point.entity";
import { Precision } from "../../../utils/types";

export class PointRequestDto{
    constructor(points:Point[], precision: Precision){
        this.points = points;
        this.precision = precision;
    }
    points: Point[];
    precision: Precision;
}