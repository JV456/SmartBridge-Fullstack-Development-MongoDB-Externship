import { useQuery } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionService";
import { FaChartPie, FaMoneyBillWave, FaWallet } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const {
    data: transactions,
    isError,
    isLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
  });

  // Calculate total income and expense
  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += transaction?.amount;
      } else {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  // Calculate balance
  const balance = totals ? totals.income - totals.expense : 0;

  // Data structure for the chart
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.income || 0, totals?.expense || 0],
        backgroundColor: ["#4ADE80", "#F87171"],
        borderColor: ["#22C55E", "#EF4444"],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 15,
          font: {
            size: 16,
            weight: "500",
          },
          color: "#4B5563",
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
    cutout: "75%",
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
    },
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="my-8 p-8 bg-white rounded-xl shadow-xl border border-gray-100 flex justify-center items-center min-h-[350px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading transaction data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="my-8 p-8 bg-white rounded-xl shadow-xl border border-gray-100 flex justify-center items-center min-h-[350px]">
        <div className="text-center text-red-500">
          <p className="text-xl font-semibold mb-2">Unable to load transaction data</p>
          <p className="text-gray-500">{error?.message || "Please try again later"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div className="flex items-center gap-3">
          <FaChartPie className="text-white text-2xl" />
          <h1 className="text-2xl font-bold text-white">
            Transaction Overview
          </h1>
        </div>
      </div>
      
      {/* Chart container */}
      <div className="p-8">
        <div className="relative" style={{ height: "350px" }}>
          <Doughnut data={data} options={options} />
          {/* Center content - balance */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-sm font-medium mb-1">Current Balance</span>
            <span className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500 rounded-lg text-white">
                <FaMoneyBillWave />
              </div>
              <h3 className="text-green-800 font-semibold">Total Income</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 ml-2">
              ${totals?.income?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
            </p>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4 border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-500 rounded-lg text-white">
                <FaWallet />
              </div>
              <h3 className="text-red-800 font-semibold">Total Expense</h3>
            </div>
            <p className="text-2xl font-bold text-red-600 ml-2">
              ${totals?.expense?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;