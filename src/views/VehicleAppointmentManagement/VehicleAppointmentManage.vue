<template>
  <div class="vehicle-appointment-manage">
    <!-- 预约管理组合模块 -->
    <div class="appointment-container">

      <!-- 预约单管理 -->
      <el-card title="预约单管理" class="mb-4">
        <el-form label-width="120px" label-position="left" :inline="true">
          <el-form-item label="车牌号码">
            <el-input v-model="manualForm.plateNumber" placeholder="请输入车牌号码" />
          </el-form-item>
          <el-form-item label="预约时间">
            <el-date-picker v-model="manualForm.appointmentTime" type="datetime" placeholder="选择预约时间" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addManualAppointment">新增预约单</el-button>
            <el-button @click="batchImport">批量导入</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="appointmentList" border stripe>
          <el-table-column prop="id" label="编号" />
          <el-table-column prop="plateNumber" label="车牌号码" />
          <el-table-column prop="status" label="状态">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="appointmentTime" label="预约时间" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="text" size="small" @click="handleTakeNumber(row)">人工取号</el-button>
              <el-button type="text" size="small" @click="handlePrint(row)">打印二维码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-size="pageSize" :total="total" class="mt-3" />
      </el-card>
    </div>

    <!-- 状态分布饼图 -->
    <el-card title="预约单状态分布" class="mb-4">
      <div id="statusChart" style="width: 100%; height: 400px;"></div>
    </el-card>

    <!-- 车辆白名单管理 -->
    <el-card title="车辆白名单管理">
      <el-form label-width="120px" class="mb-3" label-position="left" :inline="true">
        <el-form-item label="车牌号码">
          <el-input v-model="whiteListForm.plateNumber" placeholder="请输入车牌号码" />
        </el-form-item>
        <el-form-item label="有效日期">
          <el-date-picker v-model="whiteListForm.validDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addWhiteList">添加白名单</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="whiteList" border>
        <el-table-column prop="plateNumber" label="车牌号码" />
        <el-table-column prop="validStart" label="生效日期" />
        <el-table-column prop="validEnd" label="失效日期" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="handleDeleteWhiteList(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
,<script setup>
import { ref, onMounted, watch } from 'vue'

import * as echarts from 'echarts'

// 人工预约单表单数据
const manualForm = ref({ plateNumber: '', appointmentTime: null })
// 预约单管理搜索关键字
const searchKey = ref('')
// 预约单列表数据
const appointmentList = ref([
  { id: 1, plateNumber: '粤A12345', status: '排队中', appointmentTime: '2024-03-20 09:30:00' },
  { id: 2, plateNumber: '沪B67890', status: '可入园', appointmentTime: '2024-03-20 10:15:00' },
  { id: 3, plateNumber: '京C11223', status: '作业中', appointmentTime: '2024-03-20 11:00:00' },
  { id: 4, plateNumber: '浙D44556', status: '可出园', appointmentTime: '2024-03-20 12:45:00' },
  { id: 5, plateNumber: '苏E77889', status: '已出园', appointmentTime: '2024-03-20 14:00:00' }
])
// 当前页/每页数量/总条数
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
// 白名单表单数据
const whiteListForm = ref({ plateNumber: '', validDate: [] })
// 统计各状态数量
const getStatusStatistics = () => {
  const statistics = { '排队中': 0, '可入园': 0, '作业中': 0, '可出园': 0, '已出园': 0 };
  appointmentList.value.forEach(item => {
    statistics[item.status]++;
  });
  return Object.entries(statistics).filter(([_, count]) => count > 0);
};

// 图表实例
const chartInstance = ref(null);

// 初始化图表
const initChart = () => {
  chartInstance.value = echarts.init(document.getElementById('statusChart'));
  const option = {
    title: { text: '预约单状态分布', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { top: 'bottom' },
    series: [{
      type: 'pie',
      radius: '60%',
      data: getStatusStatistics().map(([name, value]) => ({ name, value })),
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
    }]
  };
  chartInstance.value.setOption(option);
};

onMounted(() => {
  initChart();
  // 监听数据变化更新图表
  watch(appointmentList, () => {
    chartInstance.value && chartInstance.value.setOption({ series: [{ data: getStatusStatistics().map(([name, value]) => ({ name, value })) }] });
  }, { deep: true });
});

// 白名单列表
const whiteList = ref([
  { plateNumber: '粤A12345', validStart: '2024-01-01', validEnd: '2024-12-31' },
  { plateNumber: '沪B67890', validStart: '2024-02-15', validEnd: '2024-08-30' },
  { plateNumber: '京C11223', validStart: '2024-03-01', validEnd: '2024-03-31' }
])

// 状态类型映射
const getStatusType = (status) => {
  const map = {
    '排队中': 'info',
    '可入园': 'success',
    '作业中': 'warning',
    '可出园': 'primary',
    '已出园': 'danger'
  }
  return map[status] || 'default'
}

// 新增人工预约单
const addManualAppointment = () => {
  // 调用接口新增逻辑
}

// 批量导入预约单
const batchImport = () => {
  // 上传文件批量导入逻辑
}

// 人工取号
const handleTakeNumber = (row) => {
  // 调用接口取号逻辑
}

// 打印二维码
const handlePrint = (row) => {
  // 调用打印接口逻辑
}

// 添加白名单
const addWhiteList = () => {
  // 调用接口添加白名单逻辑
}

// 删除白名单
const handleDeleteWhiteList = (row) => {
  // 调用接口删除逻辑
}
</script>

<style scoped>
.mb-4 { margin-bottom: 20px; }
.mb-3 { margin-bottom: 15px; }
.mt-3 { margin-top: 15px; }
.el-button:focus { outline: none; }
</style>