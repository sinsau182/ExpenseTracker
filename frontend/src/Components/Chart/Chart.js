import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-luxon';
import { useGlobalContext } from '../../Context/globalContext';
import styled from 'styled-components';

Chart.register(...registerables);

const LineChart = () => {
    const {incomes, expenses} = useGlobalContext()
  useEffect(() => {
    const data = [
        ...incomes.map(inc => ({date: inc.date, type: inc.type, amount: inc.amount})),
        ...expenses.map(exp => ({date: exp.date, type: exp.type, amount: exp.amount}))
    ];

    const ctx = document.getElementById('myChart').getContext('2d');

    // Check if chart instance already exists and destroy it
    if (window.worldChart) {
      window.worldChart.destroy();
    }

    window.worldChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Expenses',
            fill: false,
            lineTension: 0.2,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
            data: data.filter(o => o.type === 'expense').map(o => ({ x: o.date, y: o.amount }))
          },
          {
            label: 'Income',
            fill: false,
            lineTension: 0.2,
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 2,
            data: data.filter(o => o.type === 'income').map(o => ({ x: o.date, y: o.amount }))
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'DD'
            }
          },
          y: {
            ticks: {
              beginAtZero: true
            }
          }
        }
      }
    });

    return () => {
      if (window.worldChart) {
        window.worldChart.destroy();
      }
    };
  }, [incomes]);

  return (
    <ChartStyled>
      <canvas id="myChart"></canvas>
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default LineChart;
