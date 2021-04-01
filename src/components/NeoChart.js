import Chart from "react-google-charts";
import { Spinner } from "react-bootstrap";

const NeoChart = ({ data }) => {
  const chartResult = [
    ["NEO Name", "Min estimated diameter (km)", "Max estimated diameter (km)"],
    ...data.map((item) => {
      return [item.name, item.min, item.max];
    }),
  ];
  console.log(chartResult);
  return (
    <div style={{ display: "block", maxWidth: 900 }}>
      <Chart
        width={"100%"}
        height={"900px"}
        chartType="BarChart"
        loader={
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        data={chartResult}
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
