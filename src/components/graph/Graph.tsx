import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, barElementClasses } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Base_Url } from "../../config/api.config";
import { CircularProgress, Grid } from "@mui/material";

// Function to convert day index to day name
const getDayName = (index: number): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[index];
};

// Define the type for the API data
type ApiData = {
  day: number;
  rank: number | null;
};

export default function Graph(): React.JSX.Element {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post<ApiData[]>(
          `${Base_Url}/user/rank-history`,
          {},
          {
            withCredentials: true,
          }
        );

        const apiData = response.data;
        const dayLabels = apiData.map((item) => getDayName(item.day));
        const ranks = apiData.map((item) =>
          item.rank !== null ? item.rank : 0
        ); // Replace null with 0 or any default value

        setLabels(dayLabels);
        setData(ranks);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <BarChart
          sx={(theme) => ({
            [`.${barElementClasses.root}`]: {
              fill: "#ff006a",
              strokeWidth: 2,
            },
            [`.MuiChartsLegend-mark`]: {
              display: "none",
            },
            [`.${axisClasses.root}`]: {
              [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                stroke: "#ffff",
                strokeWidth: 3,
              },
              [`.${axisClasses.tickLabel}`]: {
                fill: "#ffff",
              },
            },
            border: `1px solid rgba(${
              theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
            }, 0.1)`,
            backgroundPosition: "20px 20px, 20px 20px",
          })}
          xAxis={[{ scaleType: "band", data: labels }]}
          series={[{ data, label: "Rank", id: "rank_id" }]}
          colors={["#ff006a"]}
          width={1000}
          height={400}
        />
      )}
    </>
  );
}
