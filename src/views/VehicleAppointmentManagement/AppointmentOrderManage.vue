<script setup>
import { ref, computed } from 'vue';

// 模拟预约单数据
const appointmentList = ref([
  { id: '001', plateNumber: '京A12345', channel: '微信小程序', status: '待取号', appointmentTime: '2024-03-10 09:00' },
  { id: '002', plateNumber: '沪B67890', channel: 'APP', status: '已取号', appointmentTime: '2024-03-10 10:30' },
  { id: '003', plateNumber: '粤C11223', channel: '线下登记', status: '已完成', appointmentTime: '2024-03-10 14:00' },
]);

// 查询筛选参数
const channelFilter = ref('');
const statusFilter = ref(''); // 新增状态筛选参数

// 计算筛选后的预约单
const filteredAppointments = computed(() => {
  return appointmentList.value.filter(item => {
    const channelMatch = !channelFilter.value || item.channel === channelFilter.value;
    const statusMatch = !statusFilter.value || item.status === statusFilter.value;
    return channelMatch && statusMatch;
  });
});

// 状态标签类型
const getStatusType = (status) => {
  switch (status) {
    case '待取号': return 'info';
    case '已取号': return 'success';
    case '已完成': return 'primary';
    default: return 'default';
  }
};

// 人工取号方法
const handleTakeNumber = (row) => {
  console.log('人工取号，预约单:', row);
  // 实际业务逻辑：调用接口更新状态等
};

// 打印二维码方法
const handlePrint = (row) => {
  console.log('打印二维码，预约单:', row);
  // 实际业务逻辑：生成二维码并打印
};
</script>

<template>
  <div class="appointment-order-manage">
    <!-- 查询表单 -->
    <el-form label-width="80px" class="mb-4">
      <el-row gutter="20">
        <el-col :span="8">
          <el-form-item label="渠道筛选">
            <el-select v-model="channelFilter" placeholder="选择渠道筛选" style="width: 100%;">
              <el-option label="微信小程序" value="微信小程序" />
              <el-option label="APP" value="APP" />
              <el-option label="线下登记" value="线下登记" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态筛选">
            <el-select v-model="statusFilter" placeholder="选择状态筛选" style="width: 100%;">
              <el-option label="待取号" value="待取号" />
              <el-option label="已取号" value="已取号" />
              <el-option label="已完成" value="已完成" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="() => { channelFilter = ''; statusFilter = '' }">重置</el-button>
            <el-button type="primary" @click="() => {}">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 预约单表格 -->
    <el-table :data="filteredAppointments" border stripe>
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="plateNumber" label="车牌号码" />
      <el-table-column prop="channel" label="渠道" />
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
  </div>
</template>