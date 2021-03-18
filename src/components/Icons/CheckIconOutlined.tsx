export default function CheckIconOutlined({
  height,
  width,
  className,
  onClick
}) {
  return (
    <svg
      height={height}
      viewBox="0 0 512 512"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M256 512c-68.379 0-132.668-26.629-181.02-74.98C26.63 388.668 0 324.379 0 256c0-58.258 19.066-113.145 55.137-158.73a7.501 7.501 0 0110.535-1.227 7.498 7.498 0 011.226 10.535C32.945 149.488 15 201.156 15 256c0 64.375 25.066 124.895 70.586 170.414C131.106 471.934 191.625 497 256 497s124.895-25.066 170.414-70.586C471.934 380.894 497 320.375 497 256s-25.066-124.895-70.586-170.414C380.894 40.066 320.375 15 256 15c-63.414 0-123.285 24.43-168.59 68.785a7.501 7.501 0 01-10.496-10.719C125.04 25.95 188.641 0 256 0c68.379 0 132.668 26.629 181.02 74.98C485.37 123.332 512 187.621 512 256s-26.629 132.668-74.98 181.02C388.668 485.37 324.379 512 256 512zm0 0" />
      <path d="M240.813 397.074c-9.735 0-18.958-3.148-26.672-9.097L96.996 297.613c-9.238-7.129-15.152-17.43-16.644-29.004-1.497-11.574 1.609-23.035 8.734-32.277 7.129-9.238 17.43-15.148 29.004-16.644 11.574-1.493 23.039 1.609 32.277 8.738l85.137 65.676 120.398-133.243c7.82-8.66 18.551-13.754 30.203-14.343 11.657-.59 22.844 3.39 31.504 11.214s13.754 18.555 14.344 30.211c.59 11.653-3.394 22.84-11.219 31.5L400.75 241.56a7.5 7.5 0 01-11.129-10.055l19.984-22.117c10.606-11.739 9.762-30-2.054-40.524-16.73-14.906-35.383-3.636-40.52 2.051l-125.047 138.39a7.5 7.5 0 01-10.144.91l-90.637-69.913c-6.062-4.68-27.496-11.684-40.238 5.191-12.742 16.88-.875 35.563 5.191 40.242l117.145 90.364c5.066 3.91 11.12 5.972 17.512 5.972a28.759 28.759 0 0021.3-9.453l106.84-118.242a7.5 7.5 0 0111.129 10.055l-106.84 118.246a43.79 43.79 0 01-32.43 14.398zm0 0" />
    </svg>
  );
}
