export default function RoundAddIcon({ height, width, className, onClick }) {
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
      <filter id="dropshadow" x="-2" y="-2" width="200" height="200">
        <feGaussianBlur stdDeviation="1" />
      </filter>
      <path
        // className="grad"
        d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM256 472c-119.102 0-216-96.898-216-216S136.898 40 256 40s216 96.898 216 216-96.898 216-216 216zm20-236.02h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"
        fill="#f68d88"
      />
    </svg>
  );
}
