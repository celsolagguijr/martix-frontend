import React from "react";
import { SubjectForm } from "./SubjectForm";
import { Drawer } from "antd";

export const DrawerForm = ({ ...rest }) => {
  return (
    <Drawer
      title="Subject"
      placement="right"
      onClose={rest.handleClose}
      visible={rest.open}>
      <SubjectForm {...rest} />
    </Drawer>
  );
};
