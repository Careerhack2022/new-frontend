
import { useState } from "react";

import {
  Card,
  Col,
  Row,
  Table,
  Typography,
} from "antd";


import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

import {useEffect} from 'react';
import { getDeviceDataAll} from '../components/api/device';
function Home() {
  const { Title } = Typography;
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
  var electricity = 0;
  var bill = 0;
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
        electricity += demo_day[i]['pot']+demo_day[i]['purifier_white']+demo_day[i]['purifier_black']+demo_day[i]['purifier_small']+demo_day[i]['heater']+demo_day[i]['dryer'];
    }
    var time = i*10/60;
    
  }
  electricity = electricity.toFixed(2);
  bill = electricity/1000*5;
  bill = bill.toFixed(2);
  var con =(electricity/time);
  con = con.toFixed(2);
  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  // linear-gradient(62deg, #23992d 0%, #68ec64 53%, #fffd73 100%) 0% 0%
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 360 360"
      // fill="none"
      key={0}
      enableBackground="new 0 0 360 360" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnscc="http://web.resource.org/cc/" xmlnsdc="http://purl.org/dc/elements/1.1/" xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
	<path d="m265.57 72.483c-7.646-4.394-17.355-2.01-21.575 5.297-4.217 7.307-1.925 16.547 5.095 20.536l5.813 4.406c29.892 22.655 49.207 58.524 49.207 98.923 0 68.543-55.565 124.11-124.11 124.11-68.543 0-124.11-55.566-124.11-124.11 0-39.822 18.771-75.242 47.934-97.944l6.177-4.809c7.521-4.306 10.222-13.806 6.003-21.112s-13.923-9.693-21.566-5.303l-6.408 4.742c-38.083 28.184-62.784 73.409-62.784 124.43-4e-3 85.46 69.282 154.75 154.75 154.75s154.75-69.287 154.75-154.76c0-51.011-24.696-96.232-62.772-124.42l-6.41-4.737z"/>
	<path d="m195.32 162.49c0 9.103-6.895 16.549-15.323 16.549s-15.324-7.446-15.324-16.549v-142.34c0-9.102 6.896-16.549 15.324-16.549 8.429 0 15.323 7.447 15.323 16.549v142.34z"/>
      {/* <metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdfResource="http://purl.org/dc/dcmitype/StillImage" /><cc:license rdfResource="http://creativecommons.org/licenses/publicdomain/" />
        <dc:publisher><cc:Agent rdfAbout="http://openclipart.org/"><dc:title>Openclipart</dc:title></cc:Agent></dc:publisher></cc:Work>
        <cc:License rdfAbout="http://creativecommons.org/licenses/publicdomain/"><cc:permits rdfResource="http://creativecommons.org/ns#Reproduction" />
          <cc:permits rdfResource="http://creativecommons.org/ns#Distribution" /><cc:permits rdfResource="http://creativecommons.org/ns#DerivativeWorks" />
  </cc:License></rdf:RDF></metadata> */}
        </svg>
  ];
  const heart = [
     <svg
      width="22"
      height="22"
      viewBox="0 0 360 360"
      // fill="none"
      key={0}
      enableBackground="new 0 0 360 360" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnscc="http://web.resource.org/cc/" xmlnsdc="http://purl.org/dc/elements/1.1/" xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
	<path d="m265.57 72.483c-7.646-4.394-17.355-2.01-21.575 5.297-4.217 7.307-1.925 16.547 5.095 20.536l5.813 4.406c29.892 22.655 49.207 58.524 49.207 98.923 0 68.543-55.565 124.11-124.11 124.11-68.543 0-124.11-55.566-124.11-124.11 0-39.822 18.771-75.242 47.934-97.944l6.177-4.809c7.521-4.306 10.222-13.806 6.003-21.112s-13.923-9.693-21.566-5.303l-6.408 4.742c-38.083 28.184-62.784 73.409-62.784 124.43-4e-3 85.46 69.282 154.75 154.75 154.75s154.75-69.287 154.75-154.76c0-51.011-24.696-96.232-62.772-124.42l-6.41-4.737z"/>
	<path d="m195.32 162.49c0 9.103-6.895 16.549-15.323 16.549s-15.324-7.446-15.324-16.549v-142.34c0-9.102 6.896-16.549 15.324-16.549 8.429 0 15.323 7.447 15.323 16.549v142.34z"/>
      {/* <metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdfResource="http://purl.org/dc/dcmitype/StillImage" /><cc:license rdfResource="http://creativecommons.org/licenses/publicdomain/" />
        <dc:publisher><cc:Agent rdfAbout="http://openclipart.org/"><dc:title>Openclipart</dc:title></cc:Agent></dc:publisher></cc:Work>
        <cc:License rdfAbout="http://creativecommons.org/licenses/publicdomain/"><cc:permits rdfResource="http://creativecommons.org/ns#Reproduction" />
          <cc:permits rdfResource="http://creativecommons.org/ns#Distribution" /><cc:permits rdfResource="http://creativecommons.org/ns#DerivativeWorks" />
  </cc:License></rdf:RDF></metadata> */}
        </svg>
  ];
  
  const count = [
    {
      today: "Electricity Bill",
      title:  bill.toString(),
      persent: "dollars",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Power Accumulation",
      title: electricity.toString(),
      persent: "Wattage",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Average Consumption",
      title: con.toString() ,
      persent: "/hr",
      icon: heart,
      bnb: "redtext",
    },
    
  ];
  var dataproject =[]
  if(priority_list!=null){
    dataproject = [
      {
        key:"1",
        priority:(
          <div className="semibold">Priority</div>
        ),
        pot:(
          <div className="semibold">{priority_list['pot']}</div>
        ),
        pw:(
          <div className="semibold">{priority_list['purifier_white']}</div>
        ),
        pb:(
          <div className="semibold">{priority_list['purifier_black']}</div>
        ),
        ps:(
          <div className="semibold">{priority_list['purifier_small']}</div>
        ),
        dryer:(
          <div className="semibold">{priority_list['dryer']}</div>
        ),
        heater:(
          <div className="semibold">{priority_list['heater']}</div>
        ),
      }
    ];
  }
  
  const project = [
    {
      title: "Device",
      dataIndex: "priority",
    },
    {
      title: "POT",
      dataIndex: "pot",
    },
    {
      title: "PURIFIER-WHITE",
      dataIndex: "pw",
    },
    {
      title: "PURIFIER-BLACK",
      dataIndex: "pb",
    },
    {
      title: "PURIFIER-SMALL",
      dataIndex: "ps",
    },
    {
      title: "DRYER",
      dataIndex: "dryer",
    },
    {
      title: "HEATER",
      dataIndex: "heater",
    },
  ];

  

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={8}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>
        <Row gutter={[24,0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
              {(priority_list!=null)?(<Table
                  columns={project}
                  dataSource={dataproject}
                  pagination={false}
                  className="ant-border-space"
                />):(<></>)}
            </Col>
        </Row>
        {/* <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Projects</Title>
                  <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>COMPANIES</th>
                      <th>MEMBERS</th>
                      <th>BUDGET</th>
                      <th>COMPLETION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="uploadfile shadow-none">
                <Upload {...uploadProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    <span className="click">Click to Upload</span>
                  </Button>
                </Upload>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row> */}

        <Row gutter={[24, 0]}>
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
            {/* <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Built by developers</Text>
                      <Title level={5}>Muse Dashboard for Ant Design</Title>
                      <Paragraph className="lastweek mb-36">
                        From colors, cards, typography to complex elements, you
                        will find the full documentation.
                      </Paragraph>
                    </div>
                    <div className="card-footer">
                      <a className="icon-move-right" href="#pablo">
                        Read More
                        {<RightOutlined />}
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>Work with the best</Title>
                  <p>
                    Wealth creation is an evolutionarily recent positive-sum
                    game. It is all about who take the opportunity first.
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="#pablo">
                    Read More
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card> */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
