import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import {useEffect,useState} from 'react';
import { getDeviceDataAll} from '../api/device';
function LineChart() {
  const { Title, Paragraph } = Typography;
  const [demo_day,setDemoData]=useState(null);
  const [seconds,setSeconds] =useState(1);
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

  // console.log('data',demo_day);
  var data = [];
  data.push([
    'x', 'Pot', 'Purifier White','Purifier Black','Purifier Small','Heater','Dryer'
    
  ]);
  if(demo_day===null){
    data.push(['2022-01-24 00:00:00','0','0','0','0','0']);
  }
  else if(seconds<144){
    var range = seconds;
    if(range>=144) range = 143;
    var i =0;
    for( i =0;i<range;i++){
        data.push([demo_day[i]['timestamp'],demo_day[i]['pot'],demo_day[i]['purifier_white'],demo_day[i]['purifier_black'],demo_day[i]['purifier_small'],demo_day[i]['heater'],demo_day[i]['dryer']])
        
    }
  }
  else{
    for(i =0;i<143;i++){
      data.push([demo_day[i]['timestamp'],demo_day[i]['pot'],demo_day[i]['purifier_white'],demo_day[i]['purifier_black'],demo_day[i]['purifier_small'],demo_day[i]['heater'],demo_day[i]['dryer']])
      
  }

  }
  var d = {'timestamp':[],'pot':[],'purifier_white':[],'purifier_black':[],'purifier_small':[],'heater':[],'dryer':[]};
  for(i = 0;i<data.length;i++){
    d['timestamp'].push(data[i][0].toFixed);
    d['pot'].push(Math.round(data[i][1] * 100) / 100);
    d['purifier_white'].push(Math.round(data[i][2] * 100) / 100);
    d['purifier_black'].push(Math.round(data[i][3] * 100) / 100);
    d['purifier_small'].push(Math.round(data[i][4] * 100) / 100);
    d['heater'].push(Math.round(data[i][5] * 100) / 100);
    d['dryer'].push(Math.round(data[i][6] * 100) / 100);
  }
  var drawing = [
    {
      name:'heater',
      offsetY:0,
      data:d['heater'],
    },
    {
      name:'pot',
      offsetY:0,
      data:d['pot'],
    },
    {
      name:'purifier_white',
      offsetY:0,
      data:d['purifier_white'],
    },
    {
      name:'purifier_black',
      offsetY:0,
      data:d['purifier_black'],
    },
    {
      name:'purifier_small',
      offsetY:0,
      data:d['purifier_small'],
    },
    {
      name:'dryer',
      offsetY:0,
      data:d['dryer'],
    },
    
  ]
  const options= {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show:true,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories:['2022-01-24 00:00:00'],
      // categories: d['timestamp'],
    },

    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return val;
    //     },
    //   },
    // },
  };
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Power Consumption</Title>
          <Paragraph className="lastweek">
            Update every 5 seconds 
          </Paragraph>
        </div>
        
      </div>

      <ReactApexChart
        className="full-width"
        options={options}
        series={drawing}
        type="line"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
