
import {
  Row,
  Col,
  Card,
  Radio,
} from "antd";

import ReactApexChart from "react-apexcharts";
// Images
import {useState} from "react";
import {useEffect} from 'react';
import { getDeviceDataAll } from '../components/api/device';


function Analysis() {
  const onChange = (e) => {
  }
  const [demo_day,setDemoData]=useState(null);
  const [anomalyHeaterDay, setAnomalyHeaterDay] = useState(null)
  const [anomalyPSDay, setAnomalyPSDay] = useState(null)

  useEffect(() => {
    getDeviceDataAll("demo_day").then(res => {
      setDemoData(res.data);

    });
    getDeviceDataAll("anomaly_day1").then(res => {
      setAnomalyHeaterDay(res.data);

    })
    getDeviceDataAll("anomaly_day2").then(res => {
      setAnomalyPSDay(res.data);

    })
  }, []);

  var demoDataForHeater = [];
  var demoDataForPurifierSmall = []
  demoDataForHeater.push([
    'x', 'Electricity'
  ]);
  demoDataForPurifierSmall.push([
    'x', 'Electricity'
  ]);
  var electricity = 0;
  if(demo_day===null){
    demoDataForHeater.push(['2022-01-24 00:00:00','0']);
    demoDataForPurifierSmall.push(['2022-01-24 00:00:00','0']);
  }
  else{
    var i =0;
    for( i =0;i<=143;i++){
        electricity=demo_day[i]['heater']
        demoDataForHeater.push([demo_day[i]['timestamp'],electricity.toFixed(2)]);
        electricity=demo_day[i]['purifier_small']
        demoDataForPurifierSmall.push([demo_day[i]['timestamp'],electricity.toFixed(2)]);
    }
  }

  var demoDataForHeaterPresent = {'timestamp':[],'Electricity':[]};
  for(i = 1;i<demoDataForHeater.length;i++){
    demoDataForHeaterPresent['timestamp'].push(demoDataForHeater[i][0]);
    demoDataForHeaterPresent['Electricity'].push(demoDataForHeater[i][1]);
  }
  var demoDataForPurifierSmallPresent = {'timestamp':[],'Electricity':[]};
  for(i = 1;i<demoDataForPurifierSmall.length;i++){
    demoDataForPurifierSmallPresent['timestamp'].push(demoDataForPurifierSmall[i][0]);
    demoDataForPurifierSmallPresent['Electricity'].push(demoDataForPurifierSmall[i][1]);
  }


  var anomalyHeaterData = [];
  anomalyHeaterData.push([
    'x', 'Electricity'
    
  ]);

  if(anomalyHeaterDay===null){
    anomalyHeaterData.push(['2022-01-24 00:00:00','0']);
  }
  else{
    for( i =0;i<=143;i++){
        electricity=anomalyHeaterDay[i]['heater']
        anomalyHeaterData.push([anomalyHeaterDay[i]['timestamp'],electricity.toFixed(2)]);
        
    }
  }

  var anomalyHeaterDataPresent = {'timestamp':[],'Electricity':[]};
    for(i = 1;i<anomalyHeaterData.length;i++){
      anomalyHeaterDataPresent['timestamp'].push(anomalyHeaterData[i][0]);
      anomalyHeaterDataPresent['Electricity'].push(anomalyHeaterData[i][1]);
    }

  var anomalyPSData = [];
  anomalyPSData.push([
    'x', 'Electricity'
    
  ]);

  if(anomalyPSDay===null){
    anomalyPSData.push(['2022-01-24 00:00:00','0']);
  }
  else{
    for( i =0;i<=143;i++){
        electricity=anomalyPSDay[i]['purifier_small']
        anomalyPSData.push([anomalyPSDay[i]['timestamp'],electricity.toFixed(2)]);
        
    }
  }

  var anomalyPSDataPresent = {'timestamp':[],'Electricity':[]};
    for(i = 1;i<anomalyPSData.length;i++){
      anomalyPSDataPresent['timestamp'].push(anomalyPSData[i][0]);
      anomalyPSDataPresent['Electricity'].push(anomalyPSData[i][1]);
    }
  
  const demoHeaterOptions= {
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
      // categories:['2022-01-24 00:00:00'],
       categories: demoDataForHeaterPresent['timestamp'],
    },
  };
  const demoPurifierSmallSeries = [
    {
      name:'Electricity',
      offsetY:0,
      data:demoDataForPurifierSmallPresent['Electricity'],
    },
  ];

  const demoPurifierSmallOptions= {
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
      // categories:['2022-01-24 00:00:00'],
       categories: demoDataForPurifierSmallPresent['timestamp'],
    },
  };
  const demoHeaterSeries = [
    {
      name:'Electricity',
      offsetY:0,
      data:demoDataForHeaterPresent['Electricity'],
    },
  ];

  const anomalyHeaterOptions= {
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
      // categories:['2022-01-24 00:00:00'],
       categories: anomalyHeaterDataPresent['timestamp'],
    },
  };
  const anomalyHeaterSeries = [
    {
      name:'Electricity',
      offsetY:0,
      data:anomalyHeaterDataPresent['Electricity'],
    },
  ];

  const anomalyPSOptions= {
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
      // categories:['2022-01-24 00:00:00'],
       categories: anomalyPSDataPresent['timestamp'],
    },
  };
  const anomalyPSSeries = [
    {
      name:'Electricity',
      offsetY:0,
      data:anomalyPSDataPresent['Electricity'],
    },
  ];


  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24} sm={24} lg={24} md={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Demo Day Data of Heater"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">1 day</Radio.Button>
                    <Radio.Button value="b">3 days</Radio.Button>
                    <Radio.Button value="b">5 days</Radio.Button>
                  </Radio.Group>
                </>
              }
            >

              <ReactApexChart
                className="full-width"
                options={demoHeaterOptions}
                series={demoHeaterSeries}
                type="area"
                height={350}
                width={"100%"}
              />
              
            </Card>
            <Card bordered={false}
              className="criclebox tablespace mb-24"
              title="Anomaly Data of Heater">
              
              <ReactApexChart
                className="full-width"
                options={anomalyHeaterOptions}
                series={anomalyHeaterSeries}
                type="area"
                height={350}
                width={"100%"}
              />

            </Card>

            <Card bordered={false}
              className="criclebox tablespace mb-24"
              title="Demo Day Data of Purifier Small">
              
              <ReactApexChart
                className="full-width"
                options={demoPurifierSmallOptions}
                series={demoPurifierSmallSeries}
                type="area"
                height={350}
                width={"100%"}
              />

            </Card>

            <Card bordered={false}
              className="criclebox tablespace mb-24"
              title="Anomaly Data of Purifier Small">
              
              <ReactApexChart
                className="full-width"
                options={anomalyPSOptions}
                series={anomalyPSSeries}
                type="area"
                height={350}
                width={"100%"}
              />

            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Analysis;
