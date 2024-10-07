import { useState } from "react";

const BreadCrumbs = ({
  fill,
  stroke,
  hoverFill,
  hoverStroke,
  text,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 100 50"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", cursor: "pointer" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <polygon
        points="0,5 80,5 100,25 80,45 0,45 20,25"
        fill={isHovered ? hoverFill : fill}
        stroke={isHovered ? hoverStroke : stroke}
        strokeWidth="2"
        className="transition-all duration-700"
      />
      <foreignObject
        x="10"
        y="10"
        width="70"
        height="30"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            textWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            color: text, // Or dynamic text color if needed
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  );
};

export default BreadCrumbs;
