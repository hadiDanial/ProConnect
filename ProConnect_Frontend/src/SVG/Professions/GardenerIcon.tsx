import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const GardenerIcon = (props: SvgProps) => {  
  return (
    <Svg
    viewBox="0 0 15 15"
    {...props}
    >
    <Path d="M4 5v-.5a2.5 2.5 0 0 1 5 0v5.793l2.365-2.365-.347-1.295-.001-.006h-.001a.5.5 0 0 1 .838-.481l2 2a.5.5 0 0 1-.479.838l-.01-.003-1.293-.346L9 11.707V12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-.464L1.732 9.268a2.503 2.503 0 0 1 0-3.536A2.493 2.493 0 0 1 3.5 5H4Zm0 1h-.5a1.5 1.5 0 0 0-1.061 2.561L4 10.121V6Zm4-1v-.5a1.5 1.5 0 0 0-3 0V5h3Z" />
  </Svg>
)
}
export default GardenerIcon
