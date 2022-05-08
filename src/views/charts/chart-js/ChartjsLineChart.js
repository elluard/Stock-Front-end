// ** Third Party Components
import { Line } from 'react-chartjs-2'
// import axios from "axios"
import moment from "moment"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'
import { useEffect, useState } from "react"

const ChartjsLineChart = ({ ticker, name, labelColor, gridLineColor, lineChartPrimary }) => {
  const [stockData, setStockData] = useState({
    labels : [],
    datasets: [
      {
        data: [],
        fill: false,
        tension: 0.5,
        label: '',
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        pointHoverBorderWidth: 5,
        borderColor: lineChartPrimary,
        pointBorderColor: 'transparent',
        backgroundColor: lineChartPrimary,
        pointHoverBackgroundColor: lineChartPrimary
      }
    ]
  })

  const [optionData, setOptionData] = useState({
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      },
      y: {
        min: 0,
        max: 400,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      }
    },
    plugins: {
      legend: {
        align: 'start',
        position: 'top',
        labels: {
          boxWidth: 10,
          marginBottom: 25,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  })

  function startDate() {
    return moment().subtract(1, "M").format("YYYY-MM-DD").toString()
  }

  function endDate() {
    return moment().format("YYYY-MM-DD").toString()
  }

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch(`/stocks?start=${startDate()}&end=${endDate()}&ticker=${ticker}`).then(response => response.json())
      const history = {
        labels : res.map(a => a.date),
        datasets: [
          {
            data: res.map(a => a.closePrice),
            fill: false,
            tension: 0,
            label: '',
            pointRadius: 5,
            pointHoverRadius: 1,
            pointStyle: 'circle',
            pointHoverBorderWidth: 5,
            borderColor: lineChartPrimary,
            pointBorderColor: 'transparent',
            backgroundColor: lineChartPrimary,
            pointHoverBackgroundColor: lineChartPrimary
          }
        ]
      }

      const option = {
        y: {
          min: res.map(a => a.closePrice).reduce((a, b) => Math.min(a, b)) - 10,
          max: res.map(a => a.closePrice).reduce((a, b) => Math.max(a, b)) + 10,
          scaleLabel: { display: true },
          ticks: {
            stepSize: 100,
            color: labelColor
          },
          grid: {
            borderColor: gridLineColor,
            color: gridLineColor
          }
        }
      }
      console.log(history)
      setStockData(history)
      setOptionData(option)
    }

    fetchData()
  }, [])

  // ** Chart Data
  // const data = {
  //   labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
  //   datasets: [
  //     {
  //       data: [80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200, 280],
  //       fill: false,
  //       tension: 0.5,
  //       label: '',
  //       pointRadius: 1,
  //       pointHoverRadius: 5,
  //       pointStyle: 'circle',
  //       pointHoverBorderWidth: 5,
  //       borderColor: lineChartPrimary,
  //       pointBorderColor: 'transparent',
  //       backgroundColor: lineChartPrimary,
  //       pointHoverBackgroundColor: lineChartPrimary
  //     }
  //   ]
  // }

  //** To add spacing between legends and chart
  const plugins = [
    {
      beforeInit(chart) {
        chart.legend.afterFit = function () {
          this.height += 20
        }
      }
    }
  ]

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            {name}
          </CardTitle>
          <CardSubtitle>{ticker}</CardSubtitle>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: '450px' }}>
          <Line data={stockData} options={optionData} height={450} plugins={plugins} />
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsLineChart
