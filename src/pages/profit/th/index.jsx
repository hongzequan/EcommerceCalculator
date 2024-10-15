import { definePageConfig } from "ice";
import React, { useState, useEffect } from "react";
import { PageContainer } from "@ant-design/pro-layout";

import {
  EditableProTable,
  ProForm,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { message, Card, Form } from "antd";
import { calculateTh } from "./calculateTh";

const columns = [
  {
    title: "用户",
    dataIndex: "user",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    title: "户消耗",
    dataIndex: "cost",
    formItemProps: {
      // 新增formItemProps
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    title: "户GMV收入",
    dataIndex: "gmv",
    formItemProps: {
      // 新增formItemProps
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    title: "户单量",
    dataIndex: "num",
    formItemProps: {
      // 新增formItemProps
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    title: "操作",
    valueType: "option",
  },
];

const columns2 = [
  {
    title: "用户名",
    dataIndex: "user",
  },
  {
    title: "户消耗",
    dataIndex: "cost",
    tooltip: "泰铢",
  },
  {
    title: "户GMV收入",
    dataIndex: "gmv",
    tooltip: "泰铢",
  },
  {
    title: "户GMV收入占比",
    dataIndex: "gmvRate",
  },
  {
    title: "户单量",
    dataIndex: "num",
  },
  {
    title: "户单量占比",
    dataIndex: "numRate",
  },
  {
    title: "营收",
    dataIndex: "revenue",
    tooltip: "泰铢",
  },
  {
    title: "退损",
    dataIndex: "returnPrice",
    tooltip: "泰铢",
  },
  {
    title: "手续费",
    dataIndex: "serviceFee",
    tooltip: "泰铢",
  },
  {
    title: "利润THB",
    dataIndex: "profit",
  },
  {
    title: "利润RMB",
    dataIndex: "profitRMB",
  },
  {
    title: "利润占比",
    dataIndex: "profitRMBRate",
  },
  {
    title: "最终金额分配",
    dataIndex: "lastProfit",
    fixed: "right",
  },
];

const defaultData = [
  {
    id: Date.now(),
  },
];

//利润计算器
const Profit = () => {
  const [form] = Form.useForm(); // 使用Form.useForm

  const [editableKeys, setEditableRowKeys] = useState(() =>
    defaultData.map((item) => item.id)
  );

  const [tableSource, setTableSource] = useState([]); //计算出来后表格数据
  console.log(tableSource, "tableSource");

  const handleFinish = async (values) => {
    // 在这里验证表格数据
    const { dataSource } = values;
    const errors = [];

    // 检查每一行是否填写完整
    dataSource.forEach((row, index) => {
      // 这里假设每一行至少需要填写 user 和 gmv 字段
      if (!row.user || !row.gmv) {
        errors.push(`第 ${index + 1} 行数据不完整`);
      }
    });

    if (errors.length > 0) {
      // 如果有错误，显示错误信息
      message.error(errors.join("\n"));
    } else {
      // 如果没有错误，继续你的提交逻辑
      console.log("提交的数据:", values);
      
      // 这里可以添加你的提交代码，例如发送请求到后端
      const result = calculateTh(values);
      console.log(result, "result");
      setTableSource(result);
    }
  };
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}
    >
      {/* 渲染内容 */}
      <Card>
        <ProForm
          form={form} // 传递form实例
          onFinish={handleFinish}
        >
          <ProFormText
            width="md"
            name="allGMV"
            label="店铺总收入"
            tooltip="泰铢"
            placeholder="请输入店铺总收入"
            rules={[
              {
                required: true,
                message: "请输入店铺总收入",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="returns"
            label="退货费"
            tooltip="退货费用"
            placeholder="请输入退货费"
            rules={[
              {
                required: true,
                message: "请输入退货费",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="serviceFee"
            label="手续费"
            tooltip="佣金+手续费+服务费+达人佣金"
            placeholder="请输入手续费"
            rules={[
              {
                required: true,
                message: "请输入手续费",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="financeRMB"
            label="财务算利润RMB"
            tooltip="这个为财务计算出来的RMB"
            placeholder="请输入财务算利润"
            rules={[
              {
                required: true,
                message: "请输入财务算利润",
              },
            ]}
          />
          <ProForm.Item
            label="数组数据"
            name="dataSource"
            initialValue={defaultData}
            trigger="onValuesChange"
          >
            <EditableProTable
              rowKey="id"
              toolBarRender={false}
              columns={columns}
              recordCreatorProps={{
                newRecordType: "dataSource",
                position: "bottom",
                creatorButtonText: "新增一行",
                record: () => ({
                  id: Date.now(),
                }),
              }}
              editable={{
                type: "multiple",
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
      {/* 渲染显示 */}
      {tableSource.length > 0 ? (
        <Card style={{ marginTop: 20 }}>
          <ProTable
            search={false}
            columns={columns2}
            cardBordered
            dataSource={tableSource}
            editable={{
              type: "multiple",
            }}
            scroll={{
              x: "max-content",
            }}
            rowKey="id"
            pagination={false}
          />
        </Card>
      ) : null}
    </PageContainer>
  );
};

export default Profit;

export const pageConfig = definePageConfig(() => {
  return {
    auth: ["admin", "user"],
  };
});
