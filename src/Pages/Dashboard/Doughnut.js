import React, {useState, useEffect} from 'react'
import './Dashboard.css'
import { Doughnut } from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import { DASH_COUNT } from '../../endpoint'
import axios from 'axios'
Chart.register(ArcElement);

const DoughnutChart = () => {
  
  const [male, setmale] = useState([]);
  const [female, setfemale] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('token'));
    axios.get(DASH_COUNT, { headers: { "Authorization": `Bearer ${user}` } }).then(res => {
      setmale(res.data.genderGraph.male)
      setfemale(res.data.genderGraph.female)
    })
  }, [])
    const data = {
        labels: [
          "Male",
          "Female"
        ],
        datasets: [
          {
            data: [male,female],
            backgroundColor: ["#36f", "#fe7f00"],
            borderWidth: 0
          }
          
        ]
      };
      const opt = {
        responsive: true,
        layout: {
          padding: 0
        },
        plugins: {
          tooltip: {
            enabled: true
          },
          legend: {
            position: "bottom",
            onClick: null,
            title: {
              display: true,
              text: " Employees ",
              padding: 0,
              color: "#566578"
            },
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              boxWidth: 6,
              padding: 12
            }
          },
          datalabels: {
            color: "#fff",
            font: {
              size: "14px"
            }
          }
        },
        animation: true,
        interaction: true,
        radius: "80%",
        cutout: "80%"
      };
  return (
    <div>
        <Doughnut data={data} options={opt} width={340} height={250} />
    </div>
  )
}
export default DoughnutChart
