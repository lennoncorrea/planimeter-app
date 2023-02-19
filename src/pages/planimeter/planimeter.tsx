import "reflect-metadata";
import './planimeter.css';
import Plot from "react-plotly.js";
import Input from '../../components/input/input';
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import Curve from '../../components/graph/curve/curve.entity';
import Graph from '../../components/graph/graph';
import Form from '../../components/form/form';
import usePoint from '../../hooks/usePoint';
import Point from '../../components/graph/point/point.entity';
import { PointRequestDto } from './requests/request.entity';
import { useInjection } from 'inversify-react';
import { HttpService } from '../../ioc/interfaces/http.interface';

const precision = "medium";
const PlanimeterPage = () => {
    const requests = useInjection(HttpService.$);
    const plotlyRef = useRef<Plot>(null);
    const { point, setX, setY } = usePoint();
    const [curve, setCurve] = useState<Curve>(new Curve([new Point(1, 1), new Point(2, 1), new Point(2, 2), new Point(1, 1)]));
    const [area, setArea] = useState(0);
    const [inflectionPoints, setInflectionPoints] = useState<Point[]>([]);
    const [interpolatedPoints, setInterpolatedPoints] = useState<Point[]>([]);

    useEffect(() => {
        async function fetch<T>(endpoint: string, setState: Dispatch<SetStateAction<T>>) {
            if (curve.isClosed) {
                const pointsDto = new PointRequestDto(curve.points, precision);
                const response = await requests.post<T>(endpoint, pointsDto);
                setState(response?.data!);
            }
        }
        fetch("curve/area", setArea);
        fetch("planimeter/inflection-points", setInflectionPoints);
        fetch("curve/points/interpolated", setInterpolatedPoints);
    }, [curve, requests])

    return (
        <>
            <Graph title={"Planimeter"}
                curveForPlot={curve}
                curveForLoop={new Curve(interpolatedPoints.map(point => new Point(point.x, point.y)))}
                inflectionPoints={inflectionPoints}
                ref={plotlyRef}
                annotation={`Area: ${(area?.toFixed(2))} a.u`}
            />
            <Form onSubmit={submitCurve}>
                <Input placeholder={"x axis coordinate"}
                    onInput={(e) => setX(e.target.value)}
                    disabled={curve.isClosed}
                />
                <Input placeholder={"y axis coordinate"}
                    onInput={(e) => setY(e.target.value)}
                    disabled={curve.isClosed}
                />
                <Button className="button"
                    variant="outlined" size="large"
                    type="submit"
                    disabled={curve.isClosed}
                >Add Point
                </Button>
                <Button className="button"
                    variant="outlined"
                    size="large"
                    onClick={clearCurve}
                    disabled={!curve.hasAnyPoints}
                >Clear
                </Button>
            </Form>
        </>
    );

    function submitCurve(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (point && point.x > 0 && point.y > 0) {
            setCurve(new Curve([...curve.points, point]))
        }
        (e.target as HTMLFormElement).reset();
        plotlyRef.current?.forceUpdate();
    }

    function clearCurve() {
        setInflectionPoints([]);
        setInterpolatedPoints([]);
        setCurve(new Curve([]));
        setArea(0);
    }

}

export default PlanimeterPage;
