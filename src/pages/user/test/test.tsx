import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

type datetype = {};

async function myQuery(params: datetype) {
  return request<{ data: any }>(
    'https://api.vika.cn/fusion/v1/datasheets/dstVa767nJuCh5p8Pk/records?viewId=viwPllrJ9Tp7J&fieldKey=name',
    {
      params,
      headers: { Authorization: 'Bearer uskiqeZCodh9YOuB5uuwjg7' },
    },
  );
}

type TableList = {
  url: string;
  id: number;
  data: [];
  item: string;
};

const columns: ProColumns<TableList>[] = [
  {
    title: '分类',
    dataIndex: '分类',
    valueType: 'text',
    key: '分类',
  },
  {
    title: '正式',
    dataIndex: '正式',
    key: '正式',
  },
  {
    title: '红海',
    dataIndex: '红海',
    key: '红海',
  },
  {
    title: '总数',
    dataIndex: '总数',
    key: '总数',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<TableList>
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        const msg = await myQuery({ pageNum: params.current, pageSize: params.pageSize });
        console.log(msg.data.records);
        /* return {data: msg.data.records,success: boolean,total: number,}; */
        return {
          data: msg.data.records.map(
            (
              item: { recordId: any; fields: { 分类: any; 正式: any; 红海: any; 总数: any } },
              index: number,
            ) => {
              return {
                id: index + 1,
                recordId: item.recordId,
                分类: item.fields.分类,
                正式: item.fields.正式,
                红海: item.fields.红海,
                总数: item.fields.总数,
              };
            },
          ),
        };
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
