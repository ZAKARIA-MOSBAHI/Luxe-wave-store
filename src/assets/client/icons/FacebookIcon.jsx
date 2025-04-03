export default function FacebookIcon({ onClick, className, pathClassname }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="32"
      height="32"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathClassname}
        d="M40.7999 2.40002H7.1999C4.5599 2.40002 2.3999 4.56002 2.3999 7.20002V40.8C2.3999 43.4424 4.5599 45.6 7.1999 45.6H23.9999V28.8H19.1999V22.86H23.9999V17.94C23.9999 12.7464 26.9087 9.09842 33.0383 9.09842L37.3655 9.10322V15.3552H34.4927C32.1071 15.3552 31.1999 17.1456 31.1999 18.8064V22.8624H37.3631L35.9999 28.8H31.1999V45.6H40.7999C43.4399 45.6 45.5999 43.4424 45.5999 40.8V7.20002C45.5999 4.56002 43.4399 2.40002 40.7999 2.40002Z"
      />
    </svg>
  );
}
