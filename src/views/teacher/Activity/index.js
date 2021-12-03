import React, { useState } from "react";
import { Button } from "antd";
import { useActivity } from "./useActivity";
import { Activities as ActivityList } from "./Activities";
import { ModalUpdateCreate } from "./ModalUpdateCreate";

import { Card, Tag, Spin } from "antd";

export const Activities = ({ lesson_id }) => {
  const { activities, loading } = useActivity({ lesson_id });
  const [open, setOpen] = useState(false);

  console.log(lesson_id);

  return (
    <>
      <Card
        title={`Activities`}
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            Create Activity
          </Button>
        }>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin />
          </div>
        ) : null}

        <ActivityList activities={activities} />
      </Card>
      <ModalUpdateCreate
        lesson_id={lesson_id}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};
