const generateId = () => {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
const state = {
  storeList: [],
  activeComponent: '',
  componentMap: {
    customText: {
      name: 'customText',
      type: 'TextUi',
      classify: 'TextMenu',
      title: '自定义文本',
      instance: false,
      updateId: '',
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
        text: '自定义文本',
        align: 'left',
        fontFamily: 'monospace',
        lineHeight: '1.5',
        fontSize: '16px',
        isBold: false,
        hasBorder: false
      }
    },
    customTable: {
      name: 'customTable',
      type: 'XTableUi',
      classify: '',
      title: '自定义表单',
      instance: false,
      updateId: '',
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
        columns: [{
          prop: 'name',
          label: '货物名称'
        }, {
          prop: 'spec',
          label: '货物规格',
          width: 180,
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
          name: 'ES300大',
          spec: '25g*137mm*1400m',
          total: '1851.24',
          price: '0.000',
          prices: '0.0000',
          note: '107'
        },{
          name: 'ES300大',
          spec: '25g*137mm*1400m',
          total: '1851.24',
          price: '0.000',
          prices: '0.0000',
          note: '107'
        },{
          name: 'ES300大',
          spec: '25g*137mm*1400m',
          total: '1851.24',
          price: '0.000',
          prices: '0.0000',
          note: '107'
        },{
          name: 'ES300大',
          spec: '25g*137mm*1400m',
          total: '1851.24',
          price: '0.000',
          prices: '0.0000',
          note: '107'
        },{
          name: 'ES300大',
          spec: '25g*137mm*1400m',
          total: '1851.24',
          price: '0.000',
          prices: '0.0000',
          note: '107'
        },{
          name: 'ES300大',
          spec: '25g*137mm*1400m',
          total: '1851.24',
          price: '0.000',
          prices: '0.0000',
          note: '107'
        },{
          name: 'ES300大',
          spec: '25g*137mm*1400m',
          total: '1851.24',
          price: '0.000',
          prices: '0.0000',
          note: '107'
        }]
      }
    },
    qrCode: {
      name: 'qrCode',
      type: 'QrCodeUi',
      classify: 'QrCodeMenu',
      title: '二维码',
      updateId: '',
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
    xLine: {
      name: 'xLine',
      type: 'XLineUi',
      classify: 'LineMenu',
      instance: false,
      title: '横线',
      updateId: '',
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
        width: 100,
        height: 1
      }
    },
    barCode: {
      name: 'barCode',
      type: 'BarCodeUi',
      classify: 'BarCodeMenu',
      instance: false,
      title: '条形码',
      updateId: '',
      position: {
        clientX:'',
        clientY: ''
      },
      default: {
        width:'',
        height: '',
        x: '',
        y: ''
      },
      props: {
        format: 'CODE128',
        lineWidth: 2,
        bodyHeight: 40,
        fontSize: 14,
        displayValue: '1',
        data: '123456789',
      }
    },
    yLine: {
      name: 'yLine',
      type: 'YLineUi',
      classify: 'LineMenu',
      title: '竖线',
      updateId: '',
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
        height: 60,
        width: 1
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
            icon: 'education',
            component: {
              type: 'TextUi'
            }
          },
          {
            title: '横线',
            id: 'xLine',
            icon: 'form',
            component: {
              type: 'XLineUi'
            }
          },
          {
            title: '竖线',
            id: 'yLine',
            icon: 'form',
            component: {
              type: 'YLineUi'
            }
          },
          {
            title: '二维码',
            id: 'qrCode',
            icon: 'edit',
            component: {
              type: 'QrCodeUi'
            }
          },
          {
            title: '条形码',
            id: 'barCode',
            icon: 'edit',
            component: {
              type: 'BarCodeUi'
            }
          },
          {
            title: '表单',
            id: 'customTable',
            icon: 'edit',
            component: {
              type: 'XTableUi'
            }
          }
        ]
      }
    ]
  }
}
const mutations = {
  ADD_COMPONENT: (state, payload) => {
    state.storeList.push(payload)
  },
  SET_ACTIVE: (state, id) => {
    state.activeComponent = state.storeList.find(item => item.id === id) || ''
  },
  DELETE_COMPONENT: (state, id) => {
    state.storeList.map((v, i) => {
      if (v.id == id) {
        state.storeList.splice(i, 1);
      }
    })
  }
}

const actions = {
  addComponent({ commit }, payload) {
    const id = generateId()
    const entity = state.componentMap[payload.componentId]
    if (!entity) {
      throw new Error(`${payload.componentId} 未找到该组件`)
    }
    const component = JSON.parse(JSON.stringify(entity))
    component.id = id
    const getComponent = Object.assign(component, payload.props)
    commit('ADD_COMPONENT', getComponent)
  },
  deleteComponent({ commit }, id) {
    commit('DELETE_COMPONENT', id);
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
