import { param } from '@/utils'
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
  deleteTagData: (id) => request.delete('/label?id=' + id),

  

  // 获取自定义字段列表数据
  getCustomList: () => request.get('/custom'),

  // 新增自定义字段
  postCustom: (param) => request.post('/custom', param),

  //获取自定义字段内容
  getCustomById: (id) => request.get('/custom/' + id),

  // 更新自定义内容
  updateCustom: (param) => request.put('/custom', param),

  // 保存模板自定义字段
  newTemplateDynamic: (param) => request.post('/TemplateDynamic', param),


  // 根据ID获取对应模板数据
  getTemplateDynamicDataById: (id) => request.get('/TemplateDynamic/' + id),


  // 新增模板数据
  newDynamicMaterial: (param) => request.post('/DynamicMaterial', param),

  getDynamicMaterialById: (id) => request.get('/DynamicMaterial/' + id),

  deleteDynamicMaterialById: (param) => request.delete('/DynamicMaterial?id=' + param),

  updateDynamicMaterial: (param) => request.put('/DynamicMaterial', param),
  

}
