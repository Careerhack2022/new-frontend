
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
import {useState} from "react";
import {useEffect} from 'react';
import { getDeviceDataAll, getDeviceDataOne } from '../components/api/device';
const { Title } = Typography;


const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// table code start



function Analysis() {
  const [day,setDay] = useState(0);
  const onChange = (e) => {
    setDay(e.target.value);
    // console.log(`radio checked:${e.target.value}`);
  }
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
    'x', 'Electricity'
    
  ]);
  var electricity = 0;
  if(demo_day===null){
    data.push(['2022-01-24 00:00:00','0']);
  }
  else{
    
    var i =0;

    for( i =0;i<=143;i++){
        electricity=demo_day[i]['pot']+demo_day[i]['purifier_white']+demo_day[i]['purifier_black']+demo_day[i]['purifier_small']+demo_day[i]['heater']+demo_day[i]['dryer']
        data.push([demo_day[i]['timestamp'],electricity.toFixed(2)]);
        
    }
    
  }
  var d = {'timestamp':[],'Electricity':[]};
  for(i = 1;i<data.length;i++){
    d['timestamp'].push(data[i][0]);
    d['Electricity'].push(data[i][1]);
  }
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
      // categories:['2022-01-24 00:00:00'],
       categories: d['timestamp'],
    },

    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return val;
    //     },
    //   },
    // },
  };
  const series = [
    {
      name:'Electricity',
      offsetY:0,
      data:d['Electricity'],
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
              title="Usage trend"
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
                options={options}
                series={series}
                type="area"
                height={350}
                width={"100%"}
              />
              
            </Card>
            <Card bordered={false}
              className="criclebox tablespace mb-24"
              title="Anomaly table">
              
            </Card>
            {/* <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Projects Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="online">ONLINE</Radio.Button>
                    <Radio.Button value="store">STORES</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={dataproject}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <div className="uploadfile pb-15 shadow-none">
                <Upload {...formProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </div>
            </Card> */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Analysis;
