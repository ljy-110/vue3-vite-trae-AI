export const menuConfig = [
  {
    title: '出入预约管理',
    icon: 'Document',
    children: [
      { title: '人工预约单', path: '/dashboard/vehicle-appointment-manage' },
      { title: '预约单管理', path: '/dashboard/appointment-order-manage' },
      { title: '车辆白名单管理', path: '/dashboard/vehicle-whitelist-manage' },
      { title: '预约单状态管理', path: '/dashboard/appointment-status-manage' }
    ]
  },
  {
    title: '车辆调度',
    icon: 'Document',
    children: [
      { title: '车辆入场前管理', path: '/dashboard/vehicle-scheduling/vehicle-pre-entry-management' },
      { title: '车辆入场管理', path: '/dashboard/vehicle-scheduling/vehicle-entry-management' },
      { title: '车辆出场管理', path: '/dashboard/vehicle-scheduling/vehicle-exit-management' },
      { title: '司机一键导航', path: '/dashboard/vehicle-scheduling/driver-one-key-navigation' },
      { title: '车辆进出记录查询', path: '/dashboard/vehicle-scheduling/vehicle-entry-exit-record-query' }
    ]
  },
  {
    title: '停车场管理',
    icon: 'Document',
    children: [
      { title: '停车管理', path: '/dashboard/parking-lot-management/parking-management' },
      { title: '停车收费', path: '/dashboard/parking-lot-management/parking-charges' },
      { title: '车位信息管理', path: '/dashboard/parking-lot-management/parking-space-information-management' },
      { title: '权限管理', path: '/dashboard/parking-lot-management/permission-management' },
      { title: '可视化管理', path: '/dashboard/parking-lot-management/visual-management' },
      { title: '停车位状态记录', path: '/dashboard/parking-lot-management/parking-space-status-record' },
      { title: '告警信息管理', path: '/dashboard/parking-lot-management/alarm-information-management' }
    ]
  },
  {
    title: '人员出入管理',
    icon: 'User',
    children: [
      { title: '人员信息', path: '/dashboard/personnel-access-management/personnel-information' },
      { title: '人员预约', path: '/dashboard/personnel-access-management/personnel-appointment' },
      { title: '出入记录', path: '/dashboard/personnel-access-management/personnel-access-record' },
      { title: '出入白名单', path: '/dashboard/personnel-access-management/personnel-whitelist' }
    ]
  },
  {
    title: '月台管理',
    icon: 'Platform',
    children: [
      { title: '月台信息维护', path: '/dashboard/platform-management/platform-information-maintenance' },
      { title: '月台排队车辆查询', path: '/dashboard/platform-management/platform-queue-query' },
      { title: '月台分配管理', path: '/dashboard/platform-management/platform-allocation-management' },
      { title: '月台状态管理', path: '/dashboard/platform-management/platform-status-management' },
      { title: 'LED显示屏', path: '/dashboard/platform-management/led-display' }
    ]
  },
  {
    title: '设备管理',
    icon: 'Setting',
    children: [
      { title: '信息管理', path: '/dashboard/EquipmentManagement/InformationManagement' },
      { title: '设备标签', path: '/dashboard/EquipmentManagement/EquipmentTag' }
    ]
  },
  {
    title: '大屏管理',
    icon: 'Monitor',
    children: [
      { title: '数据报表设计', path: '/dashboard/LargeScreenManagement/DataReportDesign' },
      { title: '大屏呈现', path: '/dashboard/LargeScreenManagement/LargeScreenPresentation' }
    ]
  }
];