import React, { useState } from "react";
import { Layout } from "antd";
import { PageContent } from "./Content";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import "./layout.css";

export const Page = ({ children, ...rest }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="wrapper">
      <SideBar
        collapsed={collapsed}
        handleOpen={() => {
          setCollapsed(true);
        }}
      />
      <Layout>
        <TopBar
          className="top-bar"
          collapsed={collapsed}
          handleCollapse={() => {
            setCollapsed((prev) => !prev);
          }}
        />
        <PageContent {...rest}>{children}</PageContent>
      </Layout>
    </Layout>
  );
};

export default Page;
