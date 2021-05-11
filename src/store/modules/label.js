import label from '../../api/label'
import labelService from '../../api/label'

export default {
  namespaced: true,
  state: {
    labelVersion: {
      name: '测试版本',
      width: 480,
      height: 480,
      isShowBorder: true,
      LeftMargin: 10,
      RightMargin: 10,
      TopMargin: 10,
      BottomMargin: 10
    }
  },
  mutations: {
    SET_LABELVERSION: (state, contain) => {
      state.labelVersion.name = contain.name
    },
    SET_BOARDWIDTH: (state, width) => {
      state.labelVersion.width = width
    },
    SET_LEFTMARGIN: (state, payload) => {
      state.labelVersion.LeftMargin = payload
    },
    SET_RIGHTMARGIN: (state, payload) => {
      state.labelVersion.RightMargin = payload
    },
    SET_TOPMARGIN: (state, payload) => {
      state.labelVersion.TopMargin = payload
    },
    SET_BOTTOMMARGIN: (state, payload) => {
      state.labelVersion.BottomMargin = payload
    },
    SET_BOARDBOARDER: (state, payload) => {
      state.labelVersion.isShowBorder = payload
    },
    SET_BOARDHEIGHT: (state, height) => {
      state.labelVersion.height = height
    }

  },
  actions: {
    async getTagList(ctx) {
      const res = await labelService.getTagList()
      return res.data
    },
    async postTagData(ctx, param) {
      const res = await labelService.postTagData(param)
      return res
    },
    async getTagContainById(ctx, id) {
      const res = await labelService.getTagContainById(id)
      return res.data
    },
    async updateTagData(ctx, param) {
      const res = await labelService.updateTagData(param)
      return res
    },
    async deleteTagData(ctx, id) {
      const res = await labelService.deleteTagData(id)
      return res
    },
    async getCustomList(ctx) {
      const res = await labelService.getCustomList();
      console.log(res);
      return res.data
    },
    async postCustom(ctx, param) {
      const res = await labelService.postCustom(param);
      return res;
    },
    async getCustomById(ctx, id) {
      const res = await labelService.getCustomById(id);
      return res.data;
    },
    async updateCustom(ctx, param) {
      const res = await labelService.updateCustom(param);
      return res;
    },
    async newTemplateDynamic(ctx, param) {
      const res = await labelService.newTemplateDynamic(param);
      return res;
    },
    async getTemplateDynamicDataById(ctx, id) {
      const res = await labelService.getTemplateDynamicDataById(id);
      return res.data;
    },





    setLabelVersion({ commit }, container) {
      commit('SET_LABELVERSION', container)
    },
    setBoardWidth({ commit }, payload) {
      commit('SET_BOARDWIDTH', payload)
    },
    setBoardLeftMargin({ commit }, payload) {
      commit('SET_LEFTMARGIN', payload)
    },
    setBoardRightMargin({ commit }, payload) {
      commit('SET_RIGHTMARGIN', payload)
    },
    setBoardTopMargin({ commit }, payload) {
      commit('SET_TOPMARGIN', payload)
    },
    setBoardBottomMargin({ commit }, payload) {
      commit('SET_BOTTOMMARGIN', payload)
    },
    setBoardBorder({ commit }, payload) {
      commit('SET_BOARDBOARDER', payload)
    },
    setBoardHeight({ commit }, payload) {
      commit('SET_BOARDHEIGHT', payload)
    }
  }

}
