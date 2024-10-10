import { TableOutlined, WarningOutlined, FormOutlined, DashboardOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-layout';

const asideMenuConfig: MenuDataItem[] = [
  {
    name: '工作台',
    path: '/',
    icon: <DashboardOutlined />,
  },
  {
    name: '产品',
    path: '/product',
    icon: <FormOutlined />,
  },
  {
    name: '定价表',
    path: '/schedule',
    icon: <FormOutlined />,
    children: [
      {
        name: '泰国TH',
        path: '/schedule/th',
      },
      {
        name: '马来MY',
        path: '/schedule/my',
      },
    ],
  },
  {
    name: '试算',
    path: '/trial ',
    icon: <FormOutlined />,
    children: [
      {
        name: '泰国TH',
        path: '/trial/th',
      },
      {
        name: '马来MY',
        path: '/trial/my',
      },
    ],
  },
  {
    name: '利润计算',
    path: '/profit ',
    icon: <FormOutlined />,
    children: [
      {
        name: '泰国TH',
        path: '/profit/th',
      },
      {
        name: '马来MY',
        path: '/profit/my',
      },
    ],
  },
  {
    name: '汇率管理',
    path: '/exchangeRate ',
    icon: <FormOutlined />,
  },

  // {
  //   name: '表单',
  //   path: '/form',
  //   icon: <FormOutlined />,
  // },
  // {
  //   name: '列表',
  //   path: '/list',
  //   icon: <TableOutlined />,
  // },
  // {
  //   name: '结果&异常',
  //   icon: <WarningOutlined />,
  //   children: [
  //     {
  //       name: '成功',
  //       path: '/success',
  //     },
  //     {
  //       name: '404',
  //       path: '/404',
  //     },
  //   ],
  // },
];

export { asideMenuConfig };
