export default function TwitterIcon({ onClick, className, pathClassname }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="32"
      height="32"
      viewBox="0 0 48 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.8 0.249146H45.1611L29.0811 18.6743L48 43.7509H33.1886L21.5794 28.5451L8.31086 43.7509H0.942857L18.1406 24.0366L0 0.252574H15.1886L25.6663 14.1486L37.8 0.249146ZM35.2114 39.3349H39.2914L12.96 4.43543H8.58514L35.2114 39.3349Z"
        className={pathClassname}
      />
    </svg>
  );
}
