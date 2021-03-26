/**
 * 存储localStorage
 * expired 按分钟为单位
 */
export const set = (name, content, expired) => {
  if (!name) return undefined
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.removeItem(name)
  window.localStorage.setItem(name, content)
  if (expired) {
    window.localStorage.removeItem(`${name}__expires__`)
    window.localStorage.setItem(`${name}__expires__`, Date.now() + 1000 * 60 * expired)
  }
}

/**
   * 获取localStorage
   */
export const get = name => {
  if (!name) return undefined
  const temp = window.localStorage.getItem(name) || undefined
  try {
    const expired = window.localStorage.getItem(`${name}__expires__`) || Date.now + 1
    const now = Date.now()
    if (now >= expired) {
      remove(name)
      return false
    }
    return JSON.parse(temp)
  } catch (e) {
    return temp
  }
}

/**
   * 删除localStorage
   */
export const remove = name => {
  if (!name) window.localStorage.clear()
  window.localStorage.removeItem(name)
  window.localStorage.removeItem(`${name}__expires__`)
}
