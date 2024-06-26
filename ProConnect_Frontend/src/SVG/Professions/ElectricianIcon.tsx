import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ElectricianIcon = (props: SvgProps) =>{ 
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 256 213"
    {...props}
  >
    <Path d="M228.849 40H163V16.275C163 7.513 155.222 2 145.649 2h-36.298C99.978 2 92 7.513 92 16.275V41H27.164C14.138 41 2 52.056 2 66.666v117.569C2 200.523 14.171 211 27 211h201.947c12.772 0 25.053-9.589 25.053-26.07V65.969C253.902 51.187 241.818 40 228.849 40zM105 16h45v25h-45V16zm23 162.087c-28.162 0-50.996-22.834-50.996-50.996 0-28.17 22.834-51.004 50.996-51.004 28.162 0 50.996 22.834 50.996 51.004 0 28.163-22.834 50.996-50.996 50.996zm22.392-85.859-17.334 29.674h17.334l-40.282 41.246 12.234-29.674h-16.451l24.689-41.246h19.81z" />
  </Svg>
)}
export default ElectricianIcon
