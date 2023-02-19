import Plot from "react-plotly.js";
import Point from "./point/point.entity";
import Curve from "./curve/curve.entity";
import { RefObject, forwardRef, useCallback, useEffect, useState } from "react";

const Graph = forwardRef<Plot, GraphProps>((props, plotlyRef) => {
    const [inflectionPoint, setInflectionPoint] = useState<Point>();
    const [curvePoint, setCurvePoint] = useState<Point>();
    const [range, setRange] = useState<GraphRange>();
    const setGraphRange = useCallback(() => {
        if (props.curveForPlot.isClosed) {
            const curvePointsX = props.curveForPlot.points.map(p => p.x);
            const curvePointsY = props.curveForPlot.points.map(p => p.y);
            const inflectionPointsX = props.inflectionPoints.map(p => p.x);
            const inflectionPointsY = props.inflectionPoints.map(p => p.y);
            const xMin = Math.min(0, ...inflectionPointsX, ...curvePointsX) * 1.1;
            const yMin = Math.min(0, ...inflectionPointsY, ...curvePointsY) * 1.1;
            const xMax = Math.max(...inflectionPointsX, ...curvePointsX) * 1.1;
            const yMax = Math.max(...inflectionPointsY, ...curvePointsY) * 1.1;
            setRange({
                x: [xMin, xMax],
                y: [yMin, yMax]
            });
        }
    }, [props.inflectionPoints, props.curveForPlot]);

    useEffect(() => {
        const loopThrough = (i = props.inflectionPoints.length) => (
            setInterval(() => {
                if (props.inflectionPoints.length > 0) {
                    i += 15;
                    if (i >= props.curveForLoop.points.length) {
                        i = 0;
                    }
                    setCurvePoint(props.curveForLoop.points[i]);
                    setInflectionPoint(props.inflectionPoints[i]);
                }
            }, 10));
        setGraphRange();
        const intervalId = loopThrough();
        return () => clearInterval(intervalId!);
    }, [props.curveForLoop, props.inflectionPoints, setGraphRange]);


    return (
        <>
            <Plot
                data={[
                    {
                        x: [...props.curveForPlot.points.map(point => point.x)],
                        y: [...props.curveForPlot.points.map(point => point.y)],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red', },
                        fill: "toself",
                        hoverinfo: 'x+y',
                        line: { shape: 'linear' },
                    },
                    {
                        x: [0, inflectionPoint?.x ?? 0],
                        y: [0, inflectionPoint?.y ?? 0],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'green', },
                        fill: "toself",
                        hoverinfo: 'x+y',
                        line: { shape: 'linear' },
                        name: 'Arm 1',
                        visible: props.inflectionPoints.length > 0
                    },
                    {
                        x: [inflectionPoint?.x ?? 0, curvePoint?.x ?? 0],
                        y: [inflectionPoint?.y ?? 0, curvePoint?.y ?? 0],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'green', },
                        fill: "toself",
                        hoverinfo: 'x+y',
                        line: { shape: 'linear' },
                        name: 'Arm 2',
                        visible: props.inflectionPoints.length > 0
                    },
                ]}
                layout={{
                    width: window.screen.availHeight / (175 / 137),
                    height: window.screen.availHeight / (175 / 137),
                    title: props.title,
                    clickmode: "none",
                    showlegend: false,
                    autosize: true,
                    xaxis: {
                        autorange: !(props.inflectionPoints.length > 0),
                        range: range?.x,
                        fixedrange: true
                    },
                    yaxis: {
                        autorange: !(props.inflectionPoints.length > 0),
                        range: range?.y,
                        fixedrange: true
                    },
                    annotations: [
                        {
                            align: "right",
                            x: 1,
                            y: 0,
                            xref: 'paper',
                            yref: 'paper',
                            text: props.annotation ?? '',
                            font: {
                                family: 'Helvetica',
                                size: 16,
                                color: '#000000'
                            },
                            showarrow: false,

                        }]
                }}
                config={{ displayModeBar: false, responsive: true, autosizable: false }}
                ref={plotlyRef}
            />
        </>)
});
export default Graph;

interface GraphProps {
    title: string;
    curveForPlot: Curve;
    curveForLoop: Curve;
    inflectionPoints: Point[];
    ref: RefObject<Plot>;
    annotation?: string
}

interface GraphRange {
    x: [number, number],
    y: [number, number]
}