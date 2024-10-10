import { definePageConfig } from "ice";
import React, { useState, useEffect } from "react";
import { PageContainer } from "@ant-design/pro-layout";

import {
  EditableProTable,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Input, message, Card } from 'antd';



const columns = [
  {
    title: '用户',
    dataIndex: 'user',
  },
  {
    title: '户GMV收入',
    dataIndex: 'gmv',
  },
  {
    title: '户单量',
    dataIndex: 'num',
  },
  {
    title: '操作',
    valueType: 'option',
  },
];

const defaultData = [
  {
    id: 1,
  },
];


//利润计算器
const Profit = () => {

  const [editableKeys, setEditableRowKeys] = useState(() =>
    defaultData.map((item) => item.id),
  );

  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}
    >
      <Card>
        <ProForm
          onFinish={async (values) => {
            console.log(values);
            message.success('提交成功');
          }}
        >
          <ProFormText
            width="md"
            name="name"
            label="店铺总收入"
            tooltip="泰铢"
            placeholder="请输入店铺总收入"
          />
          <ProFormText
            width="md"
            name="company"
            label="退货费"
            tooltip="退货费用"
            placeholder="请输入退货费"
          />
          <ProFormText width="md" name="id" label="手续费" tooltip="佣金+手续费+服务费+达人佣金" placeholder="请输入手续费"
          />
          <ProForm.Item
            label="数组数据"
            name="dataSource"
          initialValue={defaultData}
          // trigger="onValuesChange"
          >
            <EditableProTable
              rowKey="id"
              toolBarRender={false}
              columns={columns}
              recordCreatorProps={{
                newRecordType: 'dataSource',
                position: 'bottom',
                creatorButtonText: '新增一行',
                record: () => ({
                  id: Date.now(),
                }),
              }}
              editable={{
                type: 'multiple',
                editableKeys,
                onChange: setEditableRowKeys,
                actionRender: (row, _, dom) => {
                  return [dom.delete];
                },
              }}
            />
          </ProForm.Item>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Profit;

export const pageConfig = definePageConfig(() => {
  return {
    auth: ['admin', 'user'],
  };
});
