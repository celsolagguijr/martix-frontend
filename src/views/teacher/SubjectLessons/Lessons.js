import React from "react";

import { Card, Empty, List } from "antd";

export const Lessons = ({ lessons, edit, remove }) => {
  return (
    <Card title={`Lessons (${lessons.length})`}>
      {lessons.length === 0 ? (
        <Empty />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={lessons}
          size="small"
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() => {
                    edit(item);
                  }}>
                  Edit
                </a>,
                <a
                  key="list-loadmore-more"
                  onClick={() => {
                    remove(item.id);
                  }}>
                  Delete
                </a>,
              ]}>
              <List.Item.Meta
                title={
                  <a href={"/teachers/lessons/" + item.id}>{item.title}</a>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
