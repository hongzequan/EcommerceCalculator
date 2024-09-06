import { definePageConfig } from 'ice';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getRepos } from '@/services/product';

// 定价表
const Schedule = () => {

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      fixed: 'left',
      key: 'sku',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
    },
    {
      title: '出库(RMB)',
      dataIndex: 'deliveryPrice-RMB',
      width: 200,
    },
    {
      title: '出库（THB）',
      dataIndex: 'deliveryPrice-THB',
      width: 200,
    },
    {
      title: 'TK售价（55%）',
      dataIndex: 'sellingPrice-55',
      width: 200,
    },
    {
      title: '保本CPA（55%）',
      dataIndex: 'breakEven-CPA-55',
      width: 200,
    },
    {
      title: '保本Roas（55%）',
      dataIndex: 'breakEven-Roas-55',
      width: 200,
    },
    {
      title: 'TK售价（45%）',
      dataIndex: 'sellingPrice-45',
      width: 200,
    },
    {
      title: '保本CPA（45%）',
      dataIndex: 'breakEven-CPA-45',
      width: 200,
    },
    {
      title: '保本Roas（45%）',
      dataIndex: 'breakEven-Roas-45',
      width: 200,
    },
    {
      title: '预期Roas',
      dataIndex: 'expect-45',
      width: 200,
    },
    {
      title: 'TK售价（35%）',
      dataIndex: 'sellingPrice-35',
      width: 200,
    },
    {
      title: '保本CPA（35%）',
      dataIndex: 'breakEven-CPA-35',
      width: 200,
    },
    {
      title: '保本Roas（35%）',
      dataIndex: 'breakEven-Roas-35',
      width: 200,
    },
    {
      title: '预期Roas',
      dataIndex: 'expect-35',
      width: 200,
    },
    {
      title: 'TK售价（25%）',
      dataIndex: 'sellingPrice-25',
      width: 200,
    },
    {
      title: '保本CPA（25%）',
      dataIndex: 'breakEven-CPA-25',
      width: 200,
    },
    {
      title: '保本Roas（25%）',
      dataIndex: 'breakEven-Roas-25',
      width: 200,
    },
    {
      title: '预期Roas',
      dataIndex: 'expect-25',
      width: 200,
    },
  ];
  const actionRef = useRef();
  
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params = {}, sort, filter) => {
          console.log(sort, filter);
          return getRepos(params);
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'Schedule.TH',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        scroll={{
          x:'max-content'
          // x:'scroll'
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 8,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Schedule;

export const pageConfig = definePageConfig(() => {
  return {
    auth: ['admin'],
  };
});
