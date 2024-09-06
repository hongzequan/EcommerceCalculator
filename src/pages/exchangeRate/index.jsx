import { definePageConfig } from 'ice';
import { PageContainer } from '@ant-design/pro-layout';
import {
  ProForm,
  ProFormMoney,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useRef, useState } from 'react';

//汇率管理
const ExchangeRate = () => {
  const formRef = useRef();

  const [readonly, setReadonly] = useState(false);
  return (
    <PageContainer>
      <ProFormSwitch
        checkedChildren="开启"
        unCheckedChildren="关闭"
        label="是否只读"
        fieldProps={{
          onChange: setReadonly,
        }}
      />
      <ProForm
        onFinish={async (values) => {
          console.log(values, 'values')
          message.success('提交成功');
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="exchangeRate-Form"
        readonly={readonly}
        request={async () => {
          console.log('request')
          return {
            name: '蚂蚁设计有限公司',
            useMode: 'chapter',
          };
        }}
        autoFocusFirstInput
      >

        <ProFormMoney
          label="1美金等于兑换下面货币"
          name="USD"
          initialValue={1}
          width="lg"
          readonly
          locale="en-US"
        />
        <ProFormMoney
          label="人民币"
          name="RMB"
          initialValue=''
          width="lg"

        />
        <ProFormMoney
          label="马来西亚林吉特"
          name="amount-ms-My"
          locale="ms-MY"
          initialValue=''
          width="lg"

        />
        <ProFormMoney
          label="泰铢"
          name="THB"
          locale="th-TH"
          initialValue=''
          width="lg"
        />

        <ProFormText
          width="md"
          name="tk-commission"
          label="平台抽点"
          placeholder="请输入平台抽点"
        />
         <ProFormText
          width="md"
          name="SFP"
          label="SFP"
          placeholder="请输入名称SFP"
        />
      </ProForm>
    </PageContainer>
  );

};

export default ExchangeRate;

export const pageConfig = definePageConfig(() => {
  return {
    auth: ['admin'],
  };
});
