import { definePageConfig } from 'ice';
import { PageContainer } from '@ant-design/pro-layout';
import {
  ProForm,
  ProFormMoney,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import { setJsonData, getJsonData } from '@/services/initData';

//汇率管理
const ExchangeRate = () => {
  const formRef = useRef();
  //页面利用率数据
  const { rate } =  getJsonData();
  const [readonly, setReadonly] = useState(false);
  console.log(rate,'rate')
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
        initialValues={rate}
        onFinish={async (values) => {
          setJsonData('rate', values)
          message.success('提交成功');
        }}
        formRef={formRef}
        // params={{ id: '100' }}
        formKey="exchangeRate-Form"
        readonly={readonly}
        request={async () => {
          console.log('request')
          return {
            name: '蚂蚁设计有限公司',
            useMode: 'chapter',
          };
        }}
        submitter={{
          // 配置按钮文本
          searchConfig: {
            resetText: '重置',
            submitText: '保存',
          }
        }}
        autoFocusFirstInput
      >

        <ProFormMoney
          label="1美金等于兑换下面货币"
          name="USD"
          // initialValue={1}
          width="lg"
          readonly
          locale="en-US"
        />
        <ProFormMoney
          label="人民币"
          name="USDtoRMB"
          // initialValue={7.08}
          width="lg"

        />
        <ProFormMoney
          label="马来西亚林吉特"
          name="USDtoMY"
          locale="ms-MY"
          // initialValue={4.32}
          width="lg"

        />
        <ProFormMoney
          label="泰铢"
          name="USDtoTHB"
          locale="th-TH"
          // initialValue={33.7}
          width="lg"
        />

        <ProFormDigit
          name="tk-commission-TH"
          label="平台抽点(TH)"
          placeholder="请输入平台抽点"
          min={0}
          max={100}
          width="xs"
          // initialValue={7.53}
          addonAfter="%"
        />
        <ProFormDigit
          name="tk-commission-MY"
          label="平台抽点(MY)"
          placeholder="请输入平台抽点"
          min={0}
          max={100}
          width="xs"
          // initialValue={7.53}
          addonAfter="%"
        />
        <ProFormDigit
          name="SFP"
          label="SFP"
          placeholder="请输入名称SFP"
          min={0}
          max={100}
          width="xs"
          // initialValue={3}
          addonAfter="%"
        />
        <ProFormDigit
          name="damage"
          label="货损"
          placeholder="请输入货损"
          min={0}
          max={100}
          width="xs"
          // initialValue={10}
          addonAfter="%"

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
