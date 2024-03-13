import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { Typography } from "antd";
const { Title } = Typography;
import { PollQuestion } from "../types";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

interface PieChartProps {
  question: PollQuestion;
}

const PieChart: React.FC<PieChartProps> = ({ question }) => {
  const votes = question.options.map((item) => item.votes);
  const totalVotes = votes.reduce((vote, curr) => vote + curr, 0);
  const allValuesZero = totalVotes === 0;

  const options = {
    responsive: true,
    plugins: {
      colors: {
        enabled: true,
      },
    },
  };

  const chartData = {
    labels: question.options.map((item) => item.option),
    datasets: [
      {
        label: "# of Votes",
        data: votes,
        borderWidth: 4,
        datalabels: {
          display: true,
          color: "white",
          anchor: "end",
          align: "start",
        },
      },
    ],
  };

  return (
    <div className="w-fit flex flex-col justify-center items-center">
      <Title level={3}>{question.questionLabel}</Title>
      {allValuesZero ? (
        <Title level={5}>No Votes</Title>
      ) : (
        <>
          <Pie
            data={chartData}
            redraw={true}
            options={options}
            className="mt-5"
            height={450}
            width={450}
          />
          <Title
            level={4}
            className="mt-8 font-mono"
          >{`Total Users voted: ${totalVotes}`}</Title>
        </>
      )}
    </div>
  );
};

export default PieChart;
