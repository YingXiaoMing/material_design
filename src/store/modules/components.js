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
        isBold: false,
        hasBorder: false
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
