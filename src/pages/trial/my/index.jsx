import { definePageConfig } from "ice";
import { Form, Card } from "antd";
import React, { useRef, useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { ProForm, ProFormMoney } from "@ant-design/pro-components";
import { calculateTh } from "./calculateTh";

//试算
const Trial = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: "利润率",
      dataIndex: "rate",
      search: false,
    },
    {
      title: "售价(RM)",
      dataIndex: "sellingPrice",
      search: false,
    },
    {
      title: "成本率",
      dataIndex: "costRate",
      search: false,
    },
    {
      title: "最大CPA$",
      dataIndex: "maxCpa",
      search: false,
    },
    {
      title: "保本Roas",
      dataIndex: "breakEven-Roas",
      search: false,
    },
    {
      title: "预期Roas-20%",
      dataIndex: "breakEven-Roas-20",
      search: false,
    },
    {
      title: "预期Roas-28%",
      dataIndex: "breakEven-Roas-28",
      search: false,
    },
  ];
  const actionRef = useRef();

  //查询
  const onFinish = (values) => {
    const array = calculateTh(values?.deliveryPrice);
    setDataSource(array);
  };

  //数据源
  const [dataSource, setDataSource] = useState([]);

  const customSearch = () => {
    return (
      <Card style={{ marginBottom: 16 }}>
        <ProForm
          submitter={{
            searchConfig: {
              resetText: "重置",
              submitText: "查询",
            },
          }}
          form={form}
          onFinish={onFinish}
          layout="inline"
        >
          <ProFormMoney label="出库价" name="deliveryPrice"  />
        </ProForm>
      </Card>
    );
  };

  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}
    >
      <ProTable
        searchFormRender={customSearch}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        dataSource={dataSource}
        columnsState={{
          persistenceKey: "trial-table",
          persistenceType: "localStorage",
          // onChange(value) {
          //   console.log("value: ", value);
          // },
        }}
        scroll={{
          y: window.innerHeight - 520,
        }}
        rowKey="rate"
        pagination={false}
      />
    </PageContainer>
  );
};

export default Trial;

export const pageConfig = definePageConfig(() => {
  return {
    auth: ["admin",'user'],
  };
});
