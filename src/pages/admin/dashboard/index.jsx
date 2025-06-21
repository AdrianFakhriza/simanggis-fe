import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../../_services/admin";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [filter, setFilter] = useState("minggu");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardData();

        // Bentuk struktur dataStatistik agar sesuai dengan kebutuhan Chart.js
        const dataStatistik = {
          minggu: {
            labels: data.labelsMinggu || [],
            sudah: data.dataMingguSudah || [],
            belum: data.dataMingguBelum || [],
          },
          bulan: {
            labels: data.labelsBulan || [],
            sudah: data.dataBulanSudah || [],
            belum: data.dataBulanBelum || [],
          },
          tahun: {
            labels: data.labelsTahun || [],
            sudah: data.dataTahunSudah || [],
            belum: data.dataTahunBelum || [],
          },
        };

        setDashboardData({
          ...data,
          dataStatistik, // ← kita bentuk di sini agar tidak undefined
        });
      } catch (error) {
        console.error("Gagal fetch data dashboard", error);
      }
    }
    fetchData();
  }, []);

  if (!dashboardData) return <div>Loading...</div>;

  const {
    totalSekolah,
    totalGuru,
    totalSiswa,
    totalDistribusi,
    siswaSudahMakan,
    siswaBelumMakan,
    dataStatistik,
  } = dashboardData;

  const chartData = {
    labels: dataStatistik[filter].labels,
    datasets: [
      {
        label: "Sudah Makan",
        data: dataStatistik[filter].sudah,
        borderColor: "#1C64F2",
        backgroundColor: "rgba(28,100,242,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#1C64F2",
      },
      {
        label: "Belum Makan",
        data: dataStatistik[filter].belum,
        borderColor: "#EF4444",
        backgroundColor: "rgba(239,68,68,0.12)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#EF4444",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#374151", font: { size: 14 } },
      },
      tooltip: { enabled: true, mode: "index", intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          font: { size: 12 },
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
      y: {
        grid: { display: false },
        beginAtZero: true,
        ticks: { color: "#6B7280", font: { size: 12 } },
      },
    },
  };

  console.log(dashboardData);

  return (
    <div>
      <nav className="flex mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path>
            </svg>
            Dashboard
          </li>
        </ol>
      </nav>

      <h1 className="py-4 mb-6 text-2xl font-bold text-gray-800">
        Selamat Datang di Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          color="bg-blue-600"
          label="Data Sekolah"
          value={totalSekolah}
        />
        <StatCard color="bg-green-500" label="Total Guru" value={totalGuru} />
        <StatCard
          color="bg-yellow-400"
          label="Total Siswa"
          value={totalSiswa}
        />
        <StatCard
          color="bg-purple-500"
          label="Total Distribusi"
          value={totalDistribusi}
        />
      </div>

      <div className="p-6 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="mb-1 text-lg font-semibold">
              Statistik Makan Gratis
            </h3>
            <p className="text-base text-gray-500">Siswa sudah & belum makan</p>
          </div>
          <select
            className="px-2 py-1 text-sm border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="minggu">Minggu Ini</option>
            <option value="bulan">Bulan Ini</option>
            <option value="tahun">Tahun Ini</option>
          </select>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-700">
              {siswaSudahMakan}
            </span>
            <span className="ml-2 text-sm text-gray-500">Sudah makan</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-red-600">
              {siswaBelumMakan}
            </span>
            <span className="ml-2 text-sm text-gray-500">Belum makan</span>
          </div>
        </div>

        <Line data={chartData} options={chartOptions} height={100} />
      </div>
    </div>
  );
}

function StatCard({ color, label, value }) {
  return (
    <div
      className={`${color} text-white rounded-lg p-6 shadow flex flex-col items-center`}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="mt-2">{label}</div>
    </div>
  );
}
