import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 从环境变量获取基础URL
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可在此添加请求头，如token
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 根据业务状态码处理响应
    if (res.code !== 200) {
      console.error('业务错误:', res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
    return res;
  },
  (error) => {
    console.error('响应拦截器错误:', error.message);
    return Promise.reject(error);
  }
);

export default service; // 导出实例