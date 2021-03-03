import { Object } from 'core-js'

const generateId = () => {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
const state = {
  maxComponentId: 0,
  storeList: [],
  vw: 480,
  vh: 350,
  labelName: '',
  LeftMargin: 10,
  RightMargin: 10,
  TopMargin: 10,
  isBolder: true,
  BottomMargin: 10,
  activeComponent: '',
  componentMap: {
    customText: {
      type: 'TextBox',
      userControlledProperties: 'TextMenu',
      title: '自定义文本',
      properties: {
        width: 95,
        height: 28,
        x_position: '',
        y_position: '',
        text: '自定义文本', // 页面显示的字段
        align: 'left',
        fontFamily: 'monospace',
        lineHeight: '1.5',
        fontSize: '16px',
        isBold: false,
        hasBorder: false,
        color: '#000',
        dataSource: {
          origin: 'EndUserInput',
          apiWebData: 'employeeName',
          formular: '',
          option: ''
        }
      }
    },
    customInput: {
      type: 'LabelBox',
      userControlledProperties: 'InputMenu',
      title: '文本框',
      properties: {
        width: 147,
        height: 28,
        x_position: '',
        y_position: '',
        fontSize: '12px',
        isField: false,
        fieldLendge: '',
        text: '文本内容',
        color: '#000'
      }
    },
    customTable: {
      type: 'Grid',
      userControlledProperties: 'TableMenu',
      title: '自定义表单',
      properties: {
        width: 662,
        height: '',
        x_position: '',
        y_position: '',
        showSection: true,
        cols: 7,
        showTotal: false,
        tableData: ['name', 'standard', 'total', 'price', 'prices', 'note'],
        tableDataOption: [{
          name: '货物名称',
          key: 'name'
        }, {
          name: '货物规格',
          key: 'standard'
        }, {
          name: '数量',
          key: 'total'
        }, {
          name: '单价',
          key: 'price'
        }, {
          name: '金额',
          key: 'prices'
        }, {
          name: '备注',
          key: 'note'
        }],
        columns: [{
          prop: 'name',
          label: '货物名称'
        }, {
          prop: 'standard',
          label: '货物规格',
          width: 180
        }, {
          prop: 'total',
          label: '数量'
        }, {
          prop: 'price',
          label: '单价'
        }, {
          prop: 'prices',
          label: '金额'
        }, {
          prop: 'note',
          label: '备注'
        }],
        data: [{
          name: '',
          spec: '',
          total: '',
          price: '',
          prices: '',
          note: ''
        }, {
          name: '',
          spec: '',
          total: '',
          price: '',
          prices: '',
          note: ''
        }, {
          name: '',
          spec: '',
          total: '',
          price: '',
          prices: '',
          note: ''
        }, {
          name: '',
          spec: '',
          total: '',
          price: '',
          prices: '',
          note: ''
        }, {
          name: '',
          spec: '',
          total: '',
          price: '',
          prices: '',
          note: ''
        }, {
          name: '',
          spec: '',
          total: '',
          price: '',
          prices: '',
          note: ''
        }, {
          name: '',
          spec: '',
          total: '',
          price: '',
          prices: '',
          note: ''
        }]
      }
    },
    qrCode: {
      type: 'QRCodeBox',
      userControlledProperties: 'QrCodeMenu',
      title: '二维码',
      properties: {
        width: 160,
        height: 150,
        x_position: '',
        y_position: ''
      }
    },
    xLine: {
      type: 'H.Line',
      userControlledProperties: 'LineMenu',
      title: '横线',
      properties: {
        width: 100,
        height: 1,
        x_position: '',
        y_position: ''
      }
    },
    rectangle: {
      name: 'rectangle',
      type: 'RectangleUi',
      userControlledProperties: '',
      title: '边框',
      instance: false,
      position: {
        clientX: '',
        clientY: ''
      },
      default: {
        width: '',
        height: '',
        x: '',
        y: ''
      },
      props: {

      }
    },
    barCode: {
      type: 'BarCode',
      userControlledProperties: 'BarCodeMenu',
      title: '条形码',
      properties: {
        width: 90,
        height: 48,
        x_position: '',
        y_position: '',
        text: '条形码显示的文字',
        format: 'CODE128',
        textPosition: 'bottom',
        lineWidth: 2,
        bodyHeight: 40,
        fontSize: 14,
        displayValue: false,
        data: ' '
      }
    },
    yLine: {
      type: 'V.Line',
      userControlledProperties: 'LineMenu',
      title: '竖线',
      properties: {
        height: 60,
        width: 1,
        x_position: '',
        y_position: ''
      }
    }
  },
  components: {
    componentList: [
      {
        title: '构图元素',
        list: [
          {
            title: '自定义文本',
            id: 'customText',
            icon: 'wenben',
            component: {
              type: 'TextBox'
            }
          },
          {
            title: '文本框',
            id: 'customInput',
            icon: 'wenben',
            component: {
              type: 'LabelBox'
            }
          },
          {
            title: '横线',
            id: 'xLine',
            icon: 'hengxian',
            component: {
              type: 'H.Line'
            }
          },
          {
            title: '竖线',
            id: 'yLine',
            icon: 'shuxian',
            component: {
              type: 'V.Line'
            }
          },
          {
            title: '二维码',
            id: 'qrCode',
            icon: 'ico',
            component: {
              type: 'QRCodeBox'
            }
          },
          {
            title: '条形码',
            id: 'barCode',
            icon: 'icon-life-barcode',
            component: {
              type: 'BarCode'
            }
          },
          {
            title: '表单',
            id: 'customTable',
            icon: 'table',
            component: {
              type: 'Grid'
            }
          }
          // {
          //   title: '边框',
          //   id: 'rectangle',
          //   icon: 'biankuang',
          //   component: {
          //     type: 'YLineUi'
          //   }
          // }
        ]
      }
    ]
  }
}
const mutations = {
  SET_MAXCOMPONENTID: (state, payload) => {
    state.maxComponentId = payload
  },
  SET_STORELIST: (state, payload) => {
    state.storeList = payload
  },
  SET_LABELNAME: (state, contain) => {
    state.labelName = contain.name
  },
  ADD_COMPONENT: (state, payload) => {
    state.storeList.push(payload)
  },
  SET_ACTIVE: (state, id) => {
    state.activeComponent = state.storeList.find(item => item.id === id) || ''
  },
  SET_BOARDWIDTH: (state, width) => {
    state.vw = width
  },
  SET_LEFTMARGIN: (state, payload) => {
    state.LeftMargin = payload
  },
  SET_RIGHTMARGIN: (state, payload) => {
    state.RightMargin = payload
  },
  SET_TOPMARGIN: (state, payload) => {
    state.TopMargin = payload
  },
  SET_BOTTOMMARGIN: (state, payload) => {
    state.BottomMargin = payload
  },
  SET_BOARDBOARDER: (state, payload) => {
    state.isBolder = payload
  },
  SET_BOARDHEIGHT: (state, height) => {
    state.vh = height
  },
  CLEAR_COMPONENT: (state, payload) => {
    state.storeList = []
    state.activeComponent = ''
  },
  DELETE_COMPONENT: (state, id) => {
    state.storeList.map((v, i) => {
      if (v.id == id) {
        state.storeList.splice(i, 1)
      }
    })
  },
  UPDATE_COMPONENT: (state, component) => {
    state.storeList = state.storeList.map((item) => {
      let newItem = { ...item }
      if (item.id === component.id) {
        newItem = component
      }
      return newItem
    })
  }
}

const actions = {
  setComponentID({ commit }, payload) {
    commit('SET_MAXCOMPONENTID', payload)
  },
  addComponent({ commit }, payload) {
    const id = state.maxComponentId + 1
    state.maxComponentId++
    const entity = state.componentMap[payload.componentId]
    if (!entity) {
      throw new Error(`${payload.componentId} 未找到该组件`)
    }
    const component = JSON.parse(JSON.stringify(entity))
    component.id = id.toString()
    const newObjProperties = Object.assign({}, component.properties, payload.properties)
    const getComponent = Object.assign(component, { properties: newObjProperties })
    commit('ADD_COMPONENT', getComponent)
  },
  setLabelName({ commit }, payload) {
    commit('SET_LABELNAME', payload)
  },
  setBoardWidth({ commit }, width) {
    commit('SET_BOARDWIDTH', width)
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
  setBoardHeight({ commit }, height) {
    commit('SET_BOARDHEIGHT', height)
  },
  clearAllComponent({ commit }, payload) {
    commit('CLEAR_COMPONENT')
  },
  setComponentsList({ commit, state }, payload) {
    commit('SET_STORELIST', payload)
  },
  updateComponent({ commit, state }, payload) {
    const current = state.storeList.find(item => item.id === payload.id)
    const newCurrent = JSON.parse(JSON.stringify(current))
    const updateObjProperties = Object.assign({}, newCurrent.properties, payload.update)
    const component = Object.assign(newCurrent, { properties: updateObjProperties })
    commit('UPDATE_COMPONENT', component)
  },
  deleteComponent({ commit }, id) {
    commit('DELETE_COMPONENT', id)
    commit('SET_ACTIVE', '')
  },
  setActive({ commit }, id) {
    commit('SET_ACTIVE', id || '')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
