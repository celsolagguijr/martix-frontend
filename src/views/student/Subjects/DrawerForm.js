import React from "react";
import { Drawer } from "antd";
import { JoinForm } from "./JoinForm";

export const DrawerForm = ({ ...rest }) => {
  return (
    <Drawer
      title="Join Subject"
      placement="right"
      onClose={rest.handleClose}
      visible={rest.open}>
      <JoinForm />
    </Drawer>
  );
};
