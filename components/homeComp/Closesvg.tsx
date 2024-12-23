import * as React from "react"
interface ClosesvgProps extends React.SVGProps<SVGSVGElement> {}

const Closesvg: React.FC<ClosesvgProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
)
export default Closesvg
