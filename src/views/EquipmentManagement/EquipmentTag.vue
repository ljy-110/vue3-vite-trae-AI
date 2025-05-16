<template>
  <div class="equipment-tag">
    <!-- 标签列表 -->
    <div class="tag-list-container">
      <div class="header">
        <h2>设备标签管理</h2>
        <el-button type="primary" @click="handleAdd">新增标签</el-button>
      </div>
      
      <el-table :data="tagList" border style="width: 100%; margin-top: 20px;">
        <el-table-column prop="name" label="标签名称" width="150" />
        <el-table-column prop="description" label="标签描述" />
        <el-table-column label="标签条件" min-width="300">
          <template #default="{ row }">
            <el-tag 
              v-for="condition in row.conditions" 
              :key="condition.id"
              style="margin-right: 5px; margin-bottom: 5px;"
            >
              {{ condition.type }}: {{ condition.value }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deviceCount" label="设备数量" width="100" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" style="color: #F56C6C" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增/编辑标签对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="650px"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="标签描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="请输入标签描述"
          />
        </el-form-item>
        <el-form-item label="标签条件">
          <div class="condition-container">
            <div class="condition-item" v-for="(condition, index) in form.conditions" :key="index">
              <el-select v-model="condition.type" placeholder="选择条件类型" style="width: 150px;">
                <el-option label="设备区域" value="area" />
                <el-option label="设备专题" value="topic" />
                <el-option label="设备类型" value="type" />
                <el-option label="设备厂商" value="manufacturer" />
                <el-option label="设备型号" value="model" />
              </el-select>
              <el-select
                v-model="condition.value"
                placeholder="选择条件值"
                style="width: 200px; margin: 0 10px;"
              >
                <el-option
                  v-for="option in getOptionsByType(condition.type)"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
              <el-button type="danger" :icon="Delete" circle @click="removeCondition(index)" />
            </div>
          </div>
          <el-button type="primary" plain @click="addCondition" style="margin-top: 10px;">
            添加条件
          </el-button>
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
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

// 表单引用
const formRef = ref(null)

// 标签列表数据
const tagList = ref([
  {
    id: 1,
    name: '重要设备',
    description: '所有重要区域的核心设备',
    conditions: [
      { id: 1, type: '设备区域', value: '核心机房' },
      { id: 2, type: '设备类型', value: '服务器' }
    ],
    deviceCount: 15
  },
  {
    id: 2,
    name: '监控设备',
    description: '所有监控类设备',
    conditions: [
      { id: 3, type: '设备类型', value: '摄像头' },
      { id: 4, type: '设备厂商', value: '海康威视' }
    ],
    deviceCount: 28
  }
])

// 对话框相关
const dialogVisible = ref(false)
const dialogTitle = ref('新增标签')
const isEdit = ref(false)
const editId = ref(null)

// 表单数据
const form = reactive({
  name: '',
  description: '',
  conditions: []
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入标签描述', trigger: 'blur' },
    { max: 200, message: '不能超过 200 个字符', trigger: 'blur' }
  ]
}

// 条件选项数据
const optionsData = {
  area: [
    { label: '核心机房', value: '核心机房' },
    { label: '配电室', value: '配电室' },
    { label: '监控室', value: '监控室' },
    { label: '办公区', value: '办公区' }
  ],
  topic: [
    { label: '安防监控', value: '安防监控' },
    { label: '能源管理', value: '能源管理' },
    { label: '环境监测', value: '环境监测' }
  ],
  type: [
    { label: '服务器', value: '服务器' },
    { label: '摄像头', value: '摄像头' },
    { label: '空调', value: '空调' },
    { label: '传感器', value: '传感器' }
  ],
  manufacturer: [
    { label: '海康威视', value: '海康威视' },
    { label: '戴尔', value: '戴尔' },
    { label: '联想', value: '联想' },
    { label: '华为', value: '华为' }
  ],
  model: [
    { label: 'PowerEdge R740', value: 'PowerEdge R740' },
    { label: 'ThinkSystem SR650', value: 'ThinkSystem SR650' },
    { label: 'DS-2CD2385FWD-I', value: 'DS-2CD2385FWD-I' }
  ]
}

// 根据条件类型获取对应的选项
const getOptionsByType = (type) => {
  const typeMap = {
    'area': 'area',
    'topic': 'topic',
    'type': 'type',
    'manufacturer': 'manufacturer',
    'model': 'model'
  }
  return optionsData[typeMap[type]] || []
}

// 添加条件
const addCondition = () => {
  form.conditions.push({
    type: '',
    value: ''
  })
}

// 移除条件
const removeCondition = (index) => {
  form.conditions.splice(index, 1)
}

// 新增标签
const handleAdd = () => {
  isEdit.value = false
  dialogTitle.value = '新增标签'
  Object.assign(form, {
    name: '',
    description: '',
    conditions: []
  })
  dialogVisible.value = true
  
  nextTick(() => {
    if (formRef.value) {
      formRef.value.resetFields()
    }
  })
}

// 编辑标签
const handleEdit = (row) => {
  isEdit.value = true
  editId.value = row.id
  dialogTitle.value = '编辑标签'
  
  Object.assign(form, {
    name: row.name,
    description: row.description,
    conditions: row.conditions.map(c => ({
      type: c.type,
      value: c.value
    }))
  })
  
  dialogVisible.value = true
}

// 删除标签
const handleDelete = (row) => {
  ElMessageBox.confirm('确认删除该标签吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里应该调用删除API
    tagList.value = tagList.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}

// 提交表单
const handleSubmit = () => {
  if (!formRef.value) return
  
  formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        // 编辑模式
        const index = tagList.value.findIndex(item => item.id === editId.value)
        if (index !== -1) {
          tagList.value[index] = {
            ...tagList.value[index],
            name: form.name,
            description: form.description,
            conditions: form.conditions.map((c, index) => ({
              id: Date.now() + index,
              type: c.type,
              value: c.value
            }))
          }
        }
      } else {
        // 新增模式
        tagList.value.push({
          id: Date.now(),
          name: form.name,
          description: form.description,
          conditions: form.conditions.map((c, index) => ({
            id: Date.now() + index,
            type: c.type,
            value: c.value
          })),
          deviceCount: Math.floor(Math.random() * 30) + 1 // 随机生成设备数量
        })
      }
      dialogVisible.value = false
      ElMessage.success(isEdit.value ? '编辑成功' : '添加成功')
    }
  })
}
</script>

<style lang="scss" scoped>
.equipment-tag {
  padding: 20px;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.condition-container {
  margin-bottom: 10px;
}

.condition-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>