import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactApexChart from 'react-apexcharts';

export default function UserPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [performanceData, setPerformanceData] = useState({});
  const [chartOptions, setChartOptions] = useState({
    series: [],
    options: {
      chart: {
        type: 'heatmap',
      },
      plotOptions: {
        heatmap: {
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              { from: -30, to: 0, name: '', color: '#FF0000' },
              { from: 0, to: 0, name: '', color: '#FFFFFF'},
              { from: 1, to: 5, name: '', color: '#FFB200' },
              { from: 5, to: 50, name: '', color: '#00A100' },
            ],
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
    },
  });

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await axios.get('/profile'); // Ensure endpoint returns performance
        setPerformanceData(response.data.performance);

        const seriesData = generateSeries(response.data.performance);
        setChartOptions(prev => ({
          ...prev,
          series: seriesData,
        }));
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    if (user) {
      fetchPerformance();
    }
  }, [user]);

  const generateSeries = (data) => {
    const series = [];
    const files = 'ABCDEFGH';
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileData = [];
      for (let rank = 1; rank <= 9; rank++) {
        const key = file + rank;
        fileData.push({ x: rank, y: data[key] || 0 });
      }
      series.push({ name: file, data: fileData });
    }
    return series;
  };

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="text-center max-w-lg mx-auto">
      <div>
        Logged in as {user.name} ({user.email})<br />
        <p>Correct Answers: {user.correctAnswers}</p>
        <p>Incorrect Answers: {user.incorrectAnswers}</p>
        <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
      </div>
      <div className="mt-4">
        <h2>User Performance</h2>
        {performanceData && Object.keys(performanceData).length > 0 ? (
          <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="heatmap" height={350} />
        ) : (
          <p>No performance data available.</p>
        )}
      </div>
    </div>
  );
}
