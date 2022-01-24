

import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import {useEffect,useState} from 'react';
import { getDeviceDataAll, getDeviceDataOne } from '../api/device';

function EChart() {
  const { Title, Paragraph } = Typography;
  const [demo_day,setDemoData]=useState(null);
  const [priority_list,setPriority] = useState(null);
  const [seconds,setSeconds] =useState(null);
  useEffect(() => {
    getDeviceDataAll("demo_day").then(res => {
      setDemoData(res.data);
      // console.log("data[0]", res.data[0])
      let temp = {
        "dryer": res.data[0]["dryer_priority"],
        "heater": res.data[0]["heater_priority"],
        "pot": res.data[0]["pot_priority"],
        "purifier_black": res.data[0]["purifier_black_priority"],
        "purifier_small": res.data[0]["purifier_small_priority"],
        "purifier_white": res.data[0]["purifier_white_priority"],
      }
      setPriority(temp);
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
    d['pot']+=data[i][1];
    d['purifier_white']+=data[i][2];
    d['purifier_black']+=data[i][3];
    d['purifier_small']+=data[i][4];
    d['dryer']+=data[i][5];
    d['heater']+=data[i][6];
  }
  // d['pot'] = d['pot'].toFixed(2);
  // d['purifier_white']= d['purifier_white'].toFixed(2);
  // d['purifier_black']=d['purifier_black'].toFixed(2);
  // d['purifier_small']=d['purifier_small'].toFixed(2);
  // d['dryer']=d['dryer'].toFixed(2);
  // d['heater']=d['heater'].toFixed(2);
  const series = [
    {
      name: "Electricity",
      data: [d['pot'], d['purifier_white'], d['purifier_black'], d['purifier_small'], d['heater'], d['dryer']],
      color: "#fff",
    },
  ]
  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];
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
