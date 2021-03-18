export default function ClearSearchIcon({ onClick, height, width, className }) {
  return (
    <svg
      height={height}
      viewBox="0 0 512 512"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <linearGradient
        id="a"
        gradientUnits="userSpaceOnUse"
        x1="256"
        x2="256"
        y1="0"
        y2="512"
      >
        <stop offset="0" stopColor="#2af598" />
        <stop offset="1" stopColor="#009efd" />
      </linearGradient>
      <path
        d="M302.059 0C186.297 0 92.117 94.18 92.117 209.941c0 50.696 18.063 97.254 48.09 133.575L0 483.723 28.277 512l140.207-140.21c36.32 30.03 82.88 48.093 133.575 48.093C417.82 419.883 512 325.703 512 209.94 512 94.18 417.82 0 302.059 0zm0 379.895c-93.711 0-169.954-76.243-169.954-169.954 0-93.71 76.243-169.953 169.954-169.953 93.71 0 169.953 76.242 169.953 169.953S395.77 379.895 302.059 379.895zm95.433-237.11l-67.156 67.156 67.156 67.157-28.277 28.277-67.156-67.156-67.157 67.156-28.277-28.277 67.156-67.157-67.156-67.156 28.277-28.277 67.157 67.156 67.156-67.156zm0 0"
        fill="#f68d88"
      />
    </svg>
  );
}
