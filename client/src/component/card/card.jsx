import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
// arc calculate
const { sin, cos } = Math;

const PI = 3.1416;
const width = 100;
const cx = width / 2;
const strokeSize = 4;
const cy = width / 2;
const r = width - strokeSize;
const startPoint = PI + PI * 0.2;
const endPoint = 2 * PI - PI * 0.2;
const startx = cx - r * cos(startPoint);
const starty = -r * sin(startPoint) + cy;
const endx = cx - r * cos(endPoint);
const endy = -r * sin(endPoint) + cy;
// finish
export default function Card({ rate, pRate = 0, name, isLoss }) {
  const path = useRef();
  const [offsetStoke, setOffset] = useState(0);
  useEffect(() => {
    path.current.style.strokeDasharray = `${path.current.getTotalLength()} ${path.current.getTotalLength()} `;
  }, []);
  useEffect(() => {
    setOffset(
      path.current.getTotalLength() -
        (path.current.getTotalLength() / 100) * pRate
    );
  }, [pRate]);
  return (
    <div className={`${style.item} ${isLoss > 0 ? style.lossitem : ""}`}>
      <div
        className={style.scale}
        style={{
          transform: "rotateY(180deg)",
        }}
      >
        <svg
          viewBox="-95.5 010.5 250 250"
          style={{
            height: "100%",
            width: "100%",
            zIndex: 1,
            transform: "rotate(75deg) ",
          }}
        >
          <path
            d={`M ${startx} ${starty} a ${r} ${r} 0 1 0 ${endx} ${endy}`}
            stroke="gray"
            strokeWidth={strokeSize}
            fill="none"
          />
          <path
            ref={path}
            d={`M ${startx} ${starty} a ${r} ${r} 0 1 0 ${endx} ${endy}`}
            stroke="white"
            strokeWidth={strokeSize}
            fill="none"
            strokeDashoffset={offsetStoke}
            style={{
              transition: "1s",
            }}
          />
        </svg>
      </div>
      <div className={style.des}>
        <div className={style.text}>{name}</div>
        <div className={style.loss_or_profit}>
          <div className={`${style.icon} ${isLoss > 0 ? style.lossicon : ""}`}>
            &#11165;
          </div>
          <div className={style.rate}>{parseFloat(pRate).toFixed(2)}%</div>
        </div>

        <div className={style.text}>{parseFloat(rate).toFixed(2)}$</div>
      </div>
    </div>
  );
}
