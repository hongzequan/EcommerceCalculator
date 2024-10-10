import { definePageConfig } from "ice";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { getRepos } from "@/services/product";

const Product = () => {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      ellipsis: true,
      width: 80,
      search: false,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "出库价",
      dataIndex: "deliveryPrice",
      width: 200,
      search: false,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      width: 200,
    },
    {
      title: "描述",
      dataIndex: "description",
      search: false,
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   key: 'option',
    //   width: 200,
    //   render: (text, record, _, action) => [
    //     <a
    //       key="editable"
    //       onClick={() => {
    //         action?.startEditable?.(record.id);
    //       }}
    //     >
    //       编辑
    //     </a>
    //   ],
    // },
  ];
  const actionRef = useRef();
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params, sort, filter) => {
          return getRepos(undefined,params, sort, filter);
        }}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "product-Table",
          persistenceType: "localStorage",
          // onChange(value) {
          //   console.log('value: ', value);
          // },
        }}
        scroll={{
          y: window.innerHeight - 520,
        }}
        rowKey="id"
        // search={{
        //   labelWidth: 'auto',
        // }}
        // options={{
        //   setting: {
        //     listsHeight: 400,
        //   },
        // }}
        // form={{
        //   // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        //   syncToUrl: (values, type) => {
        //     if (type === 'get') {
        //       return {
        //         ...values,
        //         created_at: [values.startTime, values.endTime],
        //       };
        //     }
        //     return values;
        //   },
        // }}
        // pagination={{
        //   pageSize: 8,
        // }}
        pagination={false}
        // dateFormatter="string"
        // toolBarRender={() => [
        //   <Button key="button" icon={<PlusOutlined />} type="primary">
        //     新建
        //   </Button>,
        // ]}
      />
    </PageContainer>
  );
};

export default Product;

export const pageConfig = definePageConfig(() => {
  return {
    auth: ["admin"],
  };
});
