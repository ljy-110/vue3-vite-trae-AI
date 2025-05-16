<template>
  <div class="equipment-info">
    <div class="header">
      <h2>设备信息管理</h2>
      <div class="operation-group">
        <el-upload
          class="upload-demo"
          action="/api/equipment/import"
          :on-success="handleImportSuccess"
          :on-error="handleImportError"
          :before-upload="beforeUpload"
          accept=".xlsx,.xls"
        >
          <el-button type="primary">
            <el-icon><Upload /></el-icon>批量导入
          </el-button>
        </el-upload>
        <el-button type="success" @click="handleExport">
          <el-icon><Download /></el-icon>批量导出
        </el-button>
        <el-button type="primary" @click="showAddDialog">
          <el-icon><Plus /></el-icon>新增设备
        </el-button>
      </div>
    </div>

    <!-- 搜索表单 -->
    <el-form :model="searchForm" class="search-form">
      <el-row :gutter="20">
        <el-col :span="6">
        <el-form-item label="设备名称">
            <el-input 
              v-model="searchForm.name" 
              placeholder="请输入设备名称" 
              clearable 
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备类型">
            <el-select 
              v-model="searchForm.type" 
              placeholder="请选择设备类型" 
              clearable 
              class="w-full"
            >
              <el-option
                v-for="item in equipmentTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备状态">
            <el-select 
              v-model="searchForm.status" 
              placeholder="请选择设备状态" 
              clearable
              class="w-full"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="search-buttons">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 设备列表 -->
    <el-table
      v-loading="loading"
      :data="equipmentList"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="code" label="设备编号" />
      <el-table-column prop="name" label="设备名称" />
      <el-table-column prop="type" label="设备类型">
        <template #default="{ row }">
          {{ getEquipmentTypeName(row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="model" label="设备型号" />
      <el-table-column prop="manufacturer" label="设备厂商" />
      <el-table-column prop="location" label="安装位置" />
      <el-table-column prop="status" label="设备状态">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusName(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="purchaseDate" label="购买日期" />
      <el-table-column prop="lastMaintenance" label="最后维护时间" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑设备对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="设备编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择设备类型">
            <el-option
              v-for="item in equipmentTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号" prop="model">
          <el-input v-model="form.model" placeholder="请输入设备型号" />
        </el-form-item>
        <el-form-item label="设备厂商" prop="manufacturer">
          <el-input v-model="form.manufacturer" placeholder="请输入设备厂商" />
        </el-form-item>
        <el-form-item label="安装位置" prop="location">
          <el-input v-model="form.location" placeholder="请输入安装位置" />
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择设备状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="购买日期" prop="purchaseDate">
          <el-date-picker
            v-model="form.purchaseDate"
            type="date"
            placeholder="请选择购买日期"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Download, Upload, Plus } from '@element-plus/icons-vue'
import axios from 'axios'

// 列表数据
const loading = ref(false)
const equipmentList = ref([
  {
    code: 'EQ001',
    name: '服务器A',
    type: 'server',
    model: 'Dell R740',
    manufacturer: 'Dell',
    location: '机房1',
    status: 'normal',
    purchaseDate: '2023-01-15'
  },
  {
    code: 'EQ002',
    name: '摄像头B',
    type: 'camera',
    model: 'Hikvision DS-2CD2T47G0-L',
    manufacturer: '海康威视',
    location: '大厅',
    status: 'normal',
    purchaseDate: '2023-02-20'
  },
  {
    code: 'EQ003',
    name: '门禁C',
    type: 'access',
    model: 'Yale YMF40',
    manufacturer: '耶鲁',
    location: '主入口',
    status: 'maintenance',
    purchaseDate: '2023-03-10'
  },
  {
    code: 'EQ004',
    name: '传感器D',
    type: 'sensor',
    model: 'MQ-2',
    manufacturer: 'Generic',
    location: '实验室',
    status: 'fault',
    purchaseDate: '2023-04-05'
  },
  {
    code: 'EQ005',
    name: '显示屏E',
    type: 'display',
    model: 'LG 27UK850',
    manufacturer: 'LG',
    location: '会议室',
    status: 'disabled',
    purchaseDate: '2023-05-12'
  }
])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 搜索表单
const searchForm = reactive({
  name: '',
  type: '',
  status: ''
})

// 新增/编辑表单
const dialogVisible = ref(false)
const dialogTitle = ref('新增设备')
const formRef = ref(null)
const form = reactive({
  code: '',
  name: '',
  type: '',
  model: '',
  manufacturer: '',
  location: '',
  status: '',
  purchaseDate: ''
})

// 表单校验规则
const rules = {
  code: [
    { required: true, message: '请输入设备编号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入设备名称', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择设备类型', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择设备状态', trigger: 'change' }
  ]
}

// 设备类型选项
const equipmentTypes = [
  { label: '服务器', value: 'server' },
  { label: '摄像头', value: 'camera' },
  { label: '门禁', value: 'access' },
  { label: '传感器', value: 'sensor' },
  { label: '显示屏', value: 'display' }
]

// 状态选项
const statusOptions = [
  { label: '正常', value: 'normal' },
  { label: '故障', value: 'fault' },
  { label: '维护中', value: 'maintenance' },
  { label: '停用', value: 'disabled' }
]

// 获取设备类型名称
const getEquipmentTypeName = (type) => {
  const found = equipmentTypes.find(item => item.value === type)
  return found ? found.label : type
}

// 获取状态名称和类型
const getStatusName = (status) => {
  const found = statusOptions.find(item => item.value === status)
  return found ? found.label : status
}

const getStatusType = (status) => {
  const typeMap = {
    normal: 'success',
    fault: 'danger',
    maintenance: 'warning',
    disabled: 'info'
  }
  return typeMap[status] || 'info'
}

// 获取设备列表
const fetchEquipmentList = async () => {
  // loading.value = true
  // try {
  //   const response = await axios.get('/api/equipment/list', {
  //     params: {
  //       page: currentPage.value,
  //       pageSize: pageSize.value,
  //       ...searchForm
  //     }
  //   })
  //   equipmentList.value = response.data.list
  //   total.value = response.data.total
  // } catch (error) {
  //   console.error('获取设备列表失败:', error)
  //   ElMessage.error('获取设备列表失败')
  // } finally {
  //   loading.value = false
  // }
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchEquipmentList()
}

// 重置搜索
const resetSearch = () => {
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = ''
  })
  handleSearch()
}

// 分页处理
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchEquipmentList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchEquipmentList()
}

// 显示新增对话框
const showAddDialog = () => {
  dialogTitle.value = '新增设备'
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
  dialogVisible.value = true
  nextTick(() => {
    if (formRef.value) {
      formRef.value.resetFields()
    }
  })
}

// 编辑设备
const handleEdit = (row) => {
  dialogTitle.value = '编辑设备'
  Object.assign(form, row)
  dialogVisible.value = true
}

// 删除设备
const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确认删除该设备吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      await axios.delete(`/api/equipment/${row.id}`)
      ElMessage.success('删除成功')
      fetchEquipmentList()
    } catch (error) {
      console.error('删除设备失败:', error)
      ElMessage.error('删除设备失败')
    }
  }).catch(() => {})
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (form.id) {
          // 编辑
          await axios.put(`/api/equipment/${form.id}`, form)
          ElMessage.success('编辑成功')
        } else {
          // 新增
          await axios.post('/api/equipment', form)
          ElMessage.success('添加成功')
        }
        dialogVisible.value = false
        fetchEquipmentList()
      } catch (error) {
        console.error('保存设备失败:', error)
        ElMessage.error('保存设备失败')
      }
    }
  })
}

// 文件上传前的校验
const beforeUpload = (file) => {
  const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                  file.type === 'application/vnd.ms-excel'
  if (!isExcel) {
    ElMessage.error('只能上传 Excel 文件!')
    return false
  }
  return true
}

// 导入成功处理
const handleImportSuccess = (response) => {
  if (response.success) {
    ElMessage.success('导入成功')
    fetchEquipmentList()
  } else {
    ElMessage.error(response.message || '导入失败')
  }
}

// 导入失败处理
const handleImportError = () => {
  ElMessage.error('导入失败')
}

// 导出处理
const handleExport = async () => {
  try {
    const response = await axios.get('/api/equipment/export', {
      params: searchForm,
      responseType: 'blob'
    })
    
    const blob = new Blob([response.data], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `设备信息_${new Date().getTime()}.xlsx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败')
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchEquipmentList()
})
</script>

<style lang="scss" scoped>
.equipment-info {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.operation-group {
  display: flex;
  gap: 10px;
}

.search-form {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;

  :deep(.el-form-item) {
    margin-bottom: 0;
  }

  :deep(.el-form-item__label) {
    font-weight: normal;
  }

  :deep(.w-full) {
    width: 100%;
  }

  .search-buttons {
    display: flex;
    justify-content: flex-end;
    
    .el-button {
      margin-left: 12px;
      
      &:first-child {
        margin-left: 0;
      }
    }
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

:deep(.el-upload) {
  width: auto;
}

:deep(.upload-demo) {
  display: inline-block;
}
</style>