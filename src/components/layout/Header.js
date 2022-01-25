

import { useEffect } from "react";

import {
  Row,
  Col,
  Input,
} from "antd";

import {
  SearchOutlined,
} from "@ant-design/icons";

function Header({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {


  useEffect(() => window.scrollTo(0, 0));


  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
}

export default Header;
