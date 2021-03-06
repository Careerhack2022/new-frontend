

import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import {useEffect,useState} from 'react';
import { getDeviceDataAll} from '../api/device';

function EChart() {
  const { Title, Paragraph } = Typography;
  const [demo_day,setDemoData]=useState(null);
  const [seconds,setSeconds] =useState(null);
  useEffect(() => {
    getDeviceDataAll("demo_day").then(res => {
      setDemoData(res.data);
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
        
      setSeconds(seconds => seconds + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  var data = [];
  data.push([
    'x', 'Pot', 'Purifier White','Purifier Black','Purifier Small','Heater','Dryer'
    
  ]);
  if(demo_day===null){
    data.push(['2022-01-24 00:00:00','0','0','0','0','0']);
  }
  else{
    var range = seconds;
    if(range>=144) range = 143;
    var i =0;
    for( i =0;i<=range;i++){
        data.push([demo_day[i]['timestamp'],demo_day[i]['pot'],demo_day[i]['purifier_white'],demo_day[i]['purifier_black'],demo_day[i]['purifier_small'],demo_day[i]['heater'],demo_day[i]['dryer']])
        
    }
  }
  var d = {'timestamp':0,'pot':0,'purifier_white':0,'purifier_black':0,'purifier_small':0,'heater':0,'dryer':0};
  for(i = 1;i<data.length;i++){
    d['pot']+=Math.round(data[i][1] * 100) / 100;
    d['purifier_white']+=Math.round(data[i][2] * 100) / 100;
    d['purifier_black']+=Math.round(data[i][3] * 100) / 100;
    d['purifier_small']+=Math.round(data[i][4] * 100) / 100;
    d['heater']+=Math.round(data[i][5] * 100) / 100;
    d['dryer']+=Math.round(data[i][6] * 100) / 100;
  }

  const series = [
    {
      name: "Electricity",
      data: [d['pot'], d['purifier_white'], d['purifier_black'], d['purifier_small'], d['heater'], d['dryer']],
      color: "#fff",
    },
  ]

  const option =  {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        'pot',
        'purifier_white',
        'purifier_black',
        'purifier_small',
        'heater',
        'dryer',
      ],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return " " + val + " Wattages";
        },
      },
    },
  };
  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={option}
          series={series}
          type="bar"
          height={250}
          fill = {'cyan'}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Electricity distribution</Title>
        <Paragraph className="lastweek">
          Update every 10 minutes 
        </Paragraph>
        <Paragraph className="lastweek">
          We can see the usage of electricity of every electronical device.
        </Paragraph>
        
      </div>
    </>
  );
}

export default EChart;
