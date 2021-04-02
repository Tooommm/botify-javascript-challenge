// This components take the data fetched from the NASA api. it display it with a google chart component.
import Chart from "react-google-charts";
import { Spinner } from "react-bootstrap";
import average from "../helpers/average";

const NeoChart = ({ data }) => {
  // transform data to be handle by component google chart
  const chartResult = [
    // the first array give the title of each value that we inject in the google chart
    ["NEO Name", "Min estimated diameter (km)", "Max estimated diameter (km)"],
    ...data.map((item) => {
      return [item.name, item.min, item.max];
    }),
    // sort the data from smallest to largest neo
  ].sort(function (a, b) {
    return average([b[1], b[2]]) - average([a[1], a[2]]);
  });

  return (
    // Styling container
    <div style={{ display: "block", maxWidth: 900 }}>
      <Chart
        width={"100%"}
        height={"900px"}
        chartType="BarChart"
        //import a loader from react-bootstrap
        loader={
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        //passing data
        data={chartResult}
        //setup the chart
        options={{
          title: "",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Min estimated diameter (km)",
            minValue: 0,
          },
          vAxis: {
            title: "NEO Name",
          },
        }}
      />
    </div>
  );
};

export default NeoChart;
