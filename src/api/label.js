import request from '@/utils/request'

export default {
  // 获取标签列表数据
  getTagList: (param) => request.get('/api/Tag', param),
  // 新增标签
  postTagData: (param) => request.post('/api/Tag', param),
  // 获取标签对应的内容
  getTagContainById: (id) => request.get('/api/Tag/' + id),
  // 更新标签对应的内容
  updateTagData: (param) => request.put('/api/Tag', param),
  // 删除标签
  deleteTagData: (id) => request.delete('api/Tag/' + id)
}
