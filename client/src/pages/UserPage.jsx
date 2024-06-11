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
        height: 1,
      },
      plotOptions: {
        heatmap: {
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              { from: -30, to: -1, name: 'Need to practice', color: '#FF0000' },
              { from: 0, to: 0, name: '0', color: '#FFFFFF' },
              { from: 1, to: 5, name: 'Good', color: '#FFB200' },
              { from: 6, to: 50, name: 'Master', color: '#00A100' },
            ],
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      },
      yaxis: {
        categories: [8, 7, 6, 5, 4, 3, 2, 1],
      },
      title: {
        text: '',
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
    for (let rank = 1; rank <= 8; rank++) {
      const rankData = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const key = file + rank;
        rankData.push({ x: file, y: data[key] || 0 });
      }
      series.push({ name: `${rank}`, data: rankData });
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
        
        <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg p-3">User Performance</h2>
        <p>Correct Answers: {user.correctAnswers}</p>
        <p>Incorrect Answers: {user.incorrectAnswers}</p>
        {performanceData && Object.keys(performanceData).length > 0 ? (
          <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="heatmap" height={350} />
        ) : (
          <p>No performance data available.</p>
        )}
      </div>
    </div>
  );
}
