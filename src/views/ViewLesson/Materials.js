import React from "react";

import { Card, Empty, List, Tag } from "antd";

export const Materials = ({ materials, edit, remove }) => {
  return (
    <Card title={`Materials (${materials.length})`}>
      {materials.length === 0 ? (
        <Empty />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={materials}
          size="small"
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">Download</a>,
                <a key="list-loadmore-more">Delete</a>,
              ]}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />

              <Tag color="blue">File type : {item.fileType}</Tag>
              <Tag color="green">File name : {item.fileName}</Tag>
              <Tag color="red">Size : {item.fileSize}</Tag>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
