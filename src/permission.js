import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Cookies from 'js-cookie'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  // NProgress.start()
  const componentsData = Cookies.get('app_component');
  
  if (componentsData != undefined && componentsData != 'undefined') {
    const res = JSON.parse(componentsData);
    console.log(store);
    store.dispatch('components/setComponentsList', res);
  }
  console.log('one for ');
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
