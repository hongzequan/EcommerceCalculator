import { definePageConfig } from "ice";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { getRepos } from "@/services/product";
import { calculateTh } from "./calculateTh";

// 定价表
const Schedule = () => {
  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      fixed: "left",
      key: "sku",
      width: 100,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left",
    },
    {
      title: "出库(RMB)",
      dataIndex: "deliveryPrice-RMB",
      width: 200,
      search: false,
    },
    {
      title: "出库（THB）",
      dataIndex: "deliveryPrice-THB",
      width: 200,
      search: false,
    },
    {
      title: "TK售价（55%）฿",
      dataIndex: "sellingPrice-55",
      width: 200,
      search: false,
    },
    {
      title: "最大CPA（55%）$",
      dataIndex: "breakEven-CPA-55",
      width: 200,
      search: false,
    },
    {
      title: "保本Roas（55%）",
      dataIndex: "breakEven-Roas-55",
      width: 200,
      search: false,
    },
    {
      title: "预期Roas-20%",
      dataIndex: "expect-55",
      width: 200,
      search: false,
    },
    {
      title: "TK售价（45%）฿",
      dataIndex: "sellingPrice-45",
      width: 200,
      search: false,
    },
    {
      title: "最大CPA（45%）$",
      dataIndex: "breakEven-CPA-45",
      width: 200,
      search: false,
    },
    {
      title: "保本Roas（45%）",
      dataIndex: "breakEven-Roas-45",
      width: 200,
      search: false,
    },
    {
      title: "预期Roas-20%",
      dataIndex: "expect-45",
      width: 200,
      search: false,
    },
    {
      title: "TK售价（40%）฿",
      dataIndex: "sellingPrice-40",
      width: 200,
      search: false,
    },
    {
      title: "最大CPA（40%）$",
      dataIndex: "breakEven-CPA-40",
      width: 200,
      search: false,
    },
    {
      title: "保本Roas（40%）",
      dataIndex: "breakEven-Roas-40",
      width: 200,
      search: false,
    },
    {
      title: "预期Roas-20%",
      dataIndex: "expect-40",
      width: 200,
      search: false,
    },
    {
      title: "TK售价（35%）฿",
      dataIndex: "sellingPrice-35",
      width: 200,
      search: false,
    },
    {
      title: "最大CPA（35%）$",
      dataIndex: "breakEven-CPA-35",
      width: 200,
      search: false,
    },
    {
      title: "保本Roas（35%）",
      dataIndex: "breakEven-Roas-35",
      width: 200,
      search: false,
    },
    {
      title: "预期Roas-20%",
      dataIndex: "expect-35",
      width: 200,
      search: false,
      search: false,
    },
    {
      title: "TK售价（25%）฿",
      dataIndex: "sellingPrice-25",
      width: 200,
      search: false,
    },
    {
      title: "最大CPA（25%）$",
      dataIndex: "breakEven-CPA-25",
      width: 200,
      search: false,
    },
    {
      title: "保本Roas（25%）",
      dataIndex: "breakEven-Roas-25",
      width: 200,
      search: false,
    },
    {
      title: "预期Roas-20%",
      dataIndex: "expect-25",
      width: 200,
      search: false,
    },
  ];
  const actionRef = useRef();

  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}
    >
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params, sort, filter) => {
          // console.log(params, sort, filter,'定价表搜索条件');
          const sourData = getRepos('my',params, sort, filter);
          const dataSource = {
            ...sourData,
            data: calculateTh(sourData?.data),
          };
          return dataSource;
        }}
        // editable={{
        //   type: 'multiple',
        // }}
        columnsState={{
          persistenceKey: "Schedule.TH",
          persistenceType: "localStorage",
          // onChange(value) {
          //   console.log('value: ', value);
          // },
        }}

        rowKey="id"
        // search={{
        //   labelWidth: "auto",
        // }}
        scroll={{
          x: "max-content",
          y: window.innerHeight - 520,
        }}
        pagination={false}
      />
    </PageContainer>
  );
};

export default Schedule;

export const pageConfig = definePageConfig(() => {
  return {
    auth: ["admin"],
  };
});
