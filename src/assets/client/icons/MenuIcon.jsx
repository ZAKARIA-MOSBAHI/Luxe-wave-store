import React from "react";

export default function MenuIcon({ onClick, className }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      version="1.1"
      width={32}
      height={32}
      viewBox="0 0 90 90"
    >
      <path d="M68.4,20.7H31.6c-2.1,0-3.8-1.7-3.8-3.8v0c0-2.1,1.7-3.8,3.8-3.8h36.8c2.1,0,3.8,1.7,3.8,3.8v0C72.2,19,70.5,20.7,68.4,20.7  z" />
      <path d="M83,53.7H17.3c-2.1,0-3.8-1.7-3.8-3.8v0c0-2.1,1.7-3.8,3.8-3.8H83c2.1,0,3.8,1.7,3.8,3.8v0C86.8,52,85.1,53.7,83,53.7z" />
      <path d="M68.4,86.7H31.6c-2.1,0-3.8-1.7-3.8-3.8v0c0-2.1,1.7-3.8,3.8-3.8h36.8c2.1,0,3.8,1.7,3.8,3.8v0C72.2,85,70.5,86.7,68.4,86.7  z" />
    </svg>
  );
}
