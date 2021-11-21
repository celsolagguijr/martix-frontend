import React from "react";

import { Card, Empty, List, Descriptions } from "antd";

import moment from "moment";

export const Materials = ({ materials, remove }) => {
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
                <a
                  key="list-loadmore-edit"
                  href={`http://localhost:3000/api/materials/${item.fileName}/download`}
                  target="_blank">
                  Download
                </a>,
                <a key="list-loadmore-more" onClick={() => remove(item.id)}>
                  Delete
                </a>,
              ]}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />

              <Descriptions>
                <Descriptions.Item label="File Type">
                  {item.fileType}
                </Descriptions.Item>

                <Descriptions.Item label="Size">
                  {item.fileSize} bytes
                </Descriptions.Item>
                <Descriptions.Item label="Date posted">
                  {moment(item.createdAt).fromNow()}
                </Descriptions.Item>
                <Descriptions.Item label="File Name">
                  {item.fileName}
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
