export default function ProfileIcon({ onClick, className, strokeWidth = 2 }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 90 95"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      width={28}
      height={28}
    >
      <path
        fill="currentColor"
        d="M11.641,74.131a24.165,24.165,0,0,1,24.138-24.14H59.218a24.166,24.166,0,0,1,24.138,24.14V85.272a3.014,3.014,0,0,1-3.008,3.01h-65.7a3.012,3.012,0,0,1-3.007-3.01V74.131ZM14.648,92.5h65.7a7.236,7.236,0,0,0,7.229-7.228V74.131A28.434,28.434,0,0,0,59.218,45.773H35.779A28.43,28.43,0,0,0,7.423,74.131V85.272A7.234,7.234,0,0,0,14.648,92.5ZM47.5,6.718A16.251,16.251,0,1,1,31.249,22.969,16.269,16.269,0,0,1,47.5,6.718Zm0,36.719A20.469,20.469,0,1,0,27.03,22.969,20.491,20.491,0,0,0,47.5,43.437Z"
      />
    </svg>
  );
}
