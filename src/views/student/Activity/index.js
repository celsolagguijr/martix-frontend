import React from "react";
import { useActivity } from "./useActivity";
import { Activities as ActivityList } from "./Activities";

import { Card, Spin, Button } from "antd";

export const Activities = ({ lesson_id }) => {
  const { activities, loading, setRefresh } = useActivity({ lesson_id });

  return (
    <>
      <Card
        title={`Activities(${activities.length})`}
        extra={
          <>
            <Button type="text" onClick={() => setRefresh(true)}>
              Refresh
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
    </>
  );
};
