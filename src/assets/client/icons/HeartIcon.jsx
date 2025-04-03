export default function HeartIcon({
  fill,
  stroke,
  className,
  onClick,
  width = 30,
  height = 30,
}) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="-5.0 -10.0 110.0 120"
    >
      <path
        strokeWidth={4}
        stroke={stroke}
        fill={fill}
        d="m50 87.922c-0.46875 0-0.92188-0.10938-1.3438-0.32812-1.7344-0.90625-42.406-22.469-42.406-50.281 0-15.328 9.1562-25.234 23.328-25.234 8.375 0 15.703 3.3906 20.422 9.25 4.7031-5.8594 12.047-9.25 20.422-9.25 14.172 0 23.328 9.9062 23.328 25.234 0 27.812-40.672 49.375-42.406 50.266-0.42188 0.23438-0.875 0.34375-1.3438 0.34375z"
      />
    </svg>
  );
}
