import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  {
    path: '/',
    name: 'Login2',
    component: () => import('@/views/Login.vue') // 修改为登录页
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/loading',
    name: 'Loading',
    component: () => import('@/views/loading.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Layout.vue'),
    redirect: '/dashboard/vehicle-appointment-manage',
    children: [
      {
        path: 'vehicle-appointment-manage',
        name: 'VehicleAppointmentManage',
        component: () => import('@/views/VehicleAppointmentManagement/VehicleAppointmentManage.vue')
      },
      {
        path: 'appointment-order-manage',
        name: 'AppointmentOrderManage',
        component: () => import('@/views/VehicleAppointmentManagement/AppointmentOrderManage.vue')
      },
      {
        path: 'vehicle-whitelist-manage',
        name: 'VehicleWhitelistManage',
        component: () => import('@/views/VehicleAppointmentManagement/VehicleWhitelistManage.vue')
      },
      {
        path: 'EquipmentManagement/InformationManagement',
        name: 'EquipmentManagementInformationManagement',
        component: () => import('@/views/EquipmentManagement/InformationManagement.vue')
      },
      {
        path: 'EquipmentManagement/EquipmentTag',
        name: 'EquipmentManagementEquipmentTag',
        component: () => import('@/views/EquipmentManagement/EquipmentTag.vue')
      },
      {
        path: 'LargeScreenManagement/DataReportDesign',
        name: 'LargeScreenManagementDataReportDesign',
        component: () => import('@/views/LargeScreenManagement/DataReportDesign.vue')
      },
      {
        path: 'LargeScreenManagement/LargeScreenPresentation',
        name: 'LargeScreenManagementLargeScreenPresentation',
        component: () => import('@/views/LargeScreenManagement/LargeScreenPresentation.vue')
      },
      {
        path: 'appointment-status-manage',
        name: 'AppointmentStatusManage',
        component: () => import('@/views/VehicleAppointmentManagement/AppointmentStatusManage.vue')
      },
      {
        path: 'vehicle-scheduling/vehicle-pre-entry-management',
        name: 'VehiclePreEntryManagement',
        component: () => import('@/views/vehicle-scheduling/vehicle-pre-entry-management.vue')
      },
      {
        path: 'vehicle-scheduling/vehicle-entry-management',
        name: 'VehicleEntryManagement',
        component: () => import('@/views/vehicle-scheduling/vehicle-entry-management.vue')
      },
      {
        path: 'vehicle-scheduling/vehicle-exit-management',
        name: 'VehicleExitManagement',
        component: () => import('@/views/vehicle-scheduling/vehicle-exit-management.vue')
      },
      {
        path: 'vehicle-scheduling/driver-one-key-navigation',
        name: 'DriverOneKeyNavigation',
        component: () => import('@/views/vehicle-scheduling/driver-one-key-navigation.vue')
      },
      {
        path: 'vehicle-scheduling/vehicle-entry-exit-record-query',
        name: 'VehicleEntryExitRecordQuery',
        component: () => import('@/views/vehicle-scheduling/vehicle-entry-exit-record-query.vue')
      },
      {
        path: 'parking-lot-management/parking-management',
        name: 'ParkingManagement',
        component: () => import('@/views/parking-lot-management/parking-management.vue')
      },
      {
        path: 'parking-lot-management/parking-charges',
        name: 'ParkingCharges',
        component: () => import('@/views/parking-lot-management/parking-charges.vue')
      },
      {
        path: 'parking-lot-management/parking-space-information-management',
        name: 'ParkingSpaceInformationManagement',
        component: () => import('@/views/parking-lot-management/parking-space-information-management.vue')
      },
      {
        path: 'parking-lot-management/permission-management',
        name: 'PermissionManagement',
        component: () => import('@/views/parking-lot-management/permission-management.vue')
      },
      {
        path: 'parking-lot-management/visual-management',
        name: 'VisualManagement',
        component: () => import('@/views/parking-lot-management/visual-management.vue')
      },
      {
        path: 'personnel-access-management/personnel-information',
        name: 'PersonnelInformation',
        component: () => import('@/views/personnel-access-management/personnel-information.vue')
      },
      {
        path: 'personnel-access-management/personnel-appointment',
        name: 'PersonnelAppointment',
        component: () => import('@/views/personnel-access-management/personnel-appointment.vue')
      },
      {
        path: 'personnel-access-management/personnel-access-record',
        name: 'PersonnelAccessRecord',
        component: () => import('@/views/personnel-access-management/personnel-access-record.vue')
      },
      {
        path: 'platform-management/platform-information-maintenance',
        name: 'PlatformInformationMaintenance',
        component: () => import('@/views/platform-management/platform-information-maintenance.vue')
      },
      {
        path: 'parking-lot-management/parking-space-status-record',
        name: 'ParkingSpaceStatusRecord',
        component: () => import('@/views/parking-lot-management/parking-space-status-record.vue')
      },
      {
        path: 'parking-lot-management/alarm-information-management',
        name: 'AlarmInformationManagement',
        component: () => import('@/views/parking-lot-management/alarm-information-management.vue')
      },
      {
        path: 'personnel-access-management/personnel-whitelist',
        name: 'PersonnelWhitelist',
        component: () => import('@/views/personnel-access-management/personnel-whitelist.vue')
      },
      {
        path: 'platform-management/platform-queue-query',
        name: 'PlatformQueueQuery',
        component: () => import('@/views/platform-management/platform-queue-query.vue')
      },
      {
        path: 'platform-management/platform-allocation-management',
        name: 'PlatformAllocationManagement',
        component: () => import('@/views/platform-management/platform-allocation-management.vue')
      },
      {
        path: 'platform-management/platform-status-management',
        name: 'PlatformStatusManagement',
        component: () => import('@/views/platform-management/platformStatusManagement.vue')
      },
      {
        path: 'platform-management/led-display',
        name: 'LedDisplay',
        component: () => import('@/views/platform-management/ledDisplay.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router