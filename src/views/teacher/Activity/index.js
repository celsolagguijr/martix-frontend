import React, { useState } from "react";
import { Button } from "antd";
import { useActivity } from "./useActivity";
import { Activities as ActivityList } from "./Activities";
import { ModalUpdateCreate } from "./ModalUpdateCreate";

import { Card, Spin } from "antd";

export const Activities = ({ lesson_id }) => {
  const { activities, loading, setRefresh } = useActivity({ lesson_id });
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        title={`Activities (${activities.length})`}
        extra={
          <>
            <Button type="text" onClick={() => setRefresh(true)}>
              Refresh
            </Button>

            <Button type="primary" onClick={() => setOpen(true)}>
              Create Activity
            </Button>
          </>
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
