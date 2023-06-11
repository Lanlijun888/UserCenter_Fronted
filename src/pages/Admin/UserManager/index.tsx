import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';
import { useRef } from 'react';
import {userSearch} from "@/services/ant-design-pro/api";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};
//列名字段
const columns: ProColumns<API.CurrentUser>[] = [
  //编号：id
  {
    dataIndex: 'id',
    title: '序号',
    valueType: 'indexBorder',
    width: 48,
  },
  //用户名
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩'
  },
  //头像
  {
    title: '头像',
    dataIndex: 'avatarUri',
    render: (_, record) => (
      <div>
        <img src={record.avatarUri} width={30} height={30}></img>
      </div>
    ),
  },
  //性别
  {
    disable: true,
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      1: { text: '男'},
      0: { text: '女'},
    },
  },
  //星球编号
  {
    disable: true,
    title: '星球编号',
    dataIndex: 'planetCode',
  },
  //电话
  /*{
    disable: true,
    title: '电话',
    dataIndex: 'tel',
  },
  //邮箱
  {
    disable: true,
    title: '邮箱',
    dataIndex: 'email',
  },
  //用户状态
  {
    title: '状态',
    dataIndex: 'userStatus',
  },*/
  //角色
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户',status:'Default'},
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  //创建时间
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime'
  },
  //操作
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
  //展示生成的列名
  columns={columns}
  actionRef={actionRef}
  cardBordered
  request={async (params = {}, sort, filter) => {
    console.log(sort, filter);
    const res = await userSearch();
    return {
      data: res.data
    }
  }}
  editable={{
    type: 'multiple',
  }}
  columnsState={{
    persistenceKey: 'pro-table-singe-demos',
    persistenceType: 'localStorage',
    onChange(value) {
      console.log('value: ', value);
    },
  }}
  rowKey="id"
  search={{
    labelWidth: 'auto',
  }}
  /*options={{
    setting: {
      listsHeight: 400,
    },
  }}*/
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
    pageSize: 5,
    onChange: (page) => console.log(page),
  }}
  dateFormatter="string"
  headerTitle="高级表格"
  toolBarRender={() => [
    <Button
      key="button"
      icon={<PlusOutlined/>}
      onClick={() => {
        actionRef.current?.reload();
      }}
      type="primary"
    >
      新建
    </Button>,
    <Dropdown
      key="menu"
      menu={{
        items: [
          {
            label: '1st item',
            key: '1',
          },
          {
            label: '2nd item',
            key: '1',
          },
          {
            label: '3rd item',
            key: '1',
          },
        ],
      }}
    >
      <Button>
        <EllipsisOutlined/>
      </Button>
    </Dropdown>,
  ]}/>
  );
};
