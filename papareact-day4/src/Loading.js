import React from "react";
import GridLoader from "react-spinners/GridLoader";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading">
			<GridLoader size={20} margin={5} color={"#4ca1af"} />
		</div>
  )
}
export default Loading;