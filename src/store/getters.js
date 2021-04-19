const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,

  // design UI
  componentList: state => state.components.components.componentList,
  storeList: state => state.components.storeList,
  activeComponent: state => state.components.activeComponent,
  components: state => state.components,
  pageAttribute: state => state.components.page,
  lineTop: state => state.components.line.top,
  lineLeft: state => state.components.line.left,
  // 测试标签版本
  printData: state => state.components.componentPrintDataList

}
export default getters
