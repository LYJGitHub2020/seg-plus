import React from 'react';
import type { FC } from 'react';
import { connect } from 'umi';
import type { AdminModelState, ConnectProps } from 'umi';
import { Rose, Bar } from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';

interface PageProps extends ConnectProps {
  admins: AdminModelState;
  loading: boolean;
}

const IndexPage: FC<PageProps> = ({ admins }) => {
  const { Registereddata, Paymentdata, Classifydata } = admins;
  console.log(Classifydata);
  const Registeredconfig = {
    data: Registereddata,
    xField: 'Classify',
    yField: 'Number',
    isStack: true,
    seriesField: 'Category',
    radius: 0.9,
    label: { offset: -15 },
    interactions: [{ type: 'element-active' }],
  };
  const Paymentconfig = {
    data: Paymentdata,
    xField: 'Classify',
    yField: 'Number',
    isStack: true,
    seriesField: 'Category',
    radius: 0.9,
    label: { offset: -15 },
    interactions: [{ type: 'element-active' }],
  };
  const Classifyconfig = {
    data: Classifydata,
    xField: 'Number',
    yField: 'Classify',
    seriesField: 'Classify',
  };

  return (
    <>
      <ProCard style={{ height: 400 }} gutter={20} bordered>
        <ProCard
          colSpan={{ xs: '10%', sm: '20%', md: '30%', lg: '40%', xl: '50%' }}
          title="在册人数"
          bordered
        >
          <Rose {...Registeredconfig} />
        </ProCard>
        <ProCard title="起薪人数" bordered>
          <Rose {...Paymentconfig} />
        </ProCard>
      </ProCard>
      <ProCard style={{ height: 400 }} gutter={10} bordered>
        <Bar {...Classifyconfig} />
      </ProCard>
    </>
  );
};

export default connect(({ admins }: { admins: AdminModelState }) => ({
  admins,
}))(IndexPage);
