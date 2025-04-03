export default function DropdownIcon({ onClick, className, strokeWidth = 2 }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      width={32}
      height={32}
      viewBox="0 0 100 100"
    >
      <g>
        <g>
          <path
            fill="currentColor"
            d="M50,74c-0.8,0-1.5-0.3-2.1-0.9l-42-42c-1.2-1.2-1.2-3.1,0-4.2c1.2-1.2,3.1-1.2,4.2,0L50,66.8l39.9-39.9    c1.2-1.2,3.1-1.2,4.2,0c1.2,1.2,1.2,3.1,0,4.2l-42,42C51.5,73.7,50.8,74,50,74z"
          />
        </g>
      </g>
    </svg>
  );
}
