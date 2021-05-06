import request from '@/utils/request'

export default {
  // 获取标签列表数据
  getTagList: () => request.get('/label'),
  // 新增标签
  postTagData: (param) => request.post('/label', param),
  // 获取标签对应的内容
  getTagContainById: (id) => request.get('/label/' + id),
  // 更新标签对应的内容
  updateTagData: (param) => request.put('/label', param),
  // 删除标签
  deleteTagData: (id) => request.delete('api/Tag/' + id)
}
