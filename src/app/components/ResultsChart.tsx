import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

interface Candidate {
  candidateId: number;
  name: string;
  picture?: string;
  votes: number;
}

interface ElectionResults {
  total: number;
  results: {
    title: string;
    candidates: Candidate[];
  };
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const ResultsChart: React.FC<{
  data: ElectionResults;
}> = ({ data }) => {
  const { results } = data;

  // Prepare data for the chart
  const chartData: ChartData = {
    labels: results.candidates.map(
      (candidate: any) => candidate.name
    ),
    datasets: [
      {
        label: "Votes",
        data: results.candidates.map(
          (candidate: any) =>
            candidate._count.Vote
        ),
        backgroundColor:
          "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Ensure type is correct
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: {
            raw: number;
          }) {
            return `Votes: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const pieChartData: any = {
    labels: results.candidates.map(
      (candidate) => candidate.name
    ),
    datasets: [
      {
        data: results.candidates.map(
          (candidate: any) =>
            candidate._count.Vote
        ),
        backgroundColor: results.candidates.map(
          () => getRandomColor()
        ),
        hoverOffset: 4,
      },
    ],
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color +=
        letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const totalVotes =
              results.candidates.reduce(
                (acc, candidate: any) =>
                  acc + candidate._count.Vote,
                0
              );
            const percentage = (
              (tooltipItem.raw / totalVotes) *
              100
            ).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Visualization
      </h2>
      <div className="md:grid md:grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <Bar
            data={chartData}
            options={options as any}
          />
        </div>
        <div className="flex justify-center items-center">
          <Pie
            data={pieChartData}
            options={pieChartOptions as any}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4"></div>

      {/* Type assertion to satisfy types */}
    </div>
  );
};

export default ResultsChart;
