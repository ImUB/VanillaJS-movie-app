// Component
interface ComponentPayload {
  tagName?: string
  props?: {
    [key: string]: unknown
  }
  state?: {
    [key: string]: unknown
  }
}
export class Component {
  public el
  public props
  public state

  constructor(payload: ComponentPayload = {}) {
    const { 
      tagName = 'div', 
      state = {},
      props = {}
    } = payload
    this.el = document.createElement(tagName)
    this.state = state
    this.props = props
    this.render() 
  }
  render() {
    // ...
  }
}

///// Router
interface Route {
  path: string
  component: typeof Component
}

type Routes = Route[]

// 페이지 렌더링!
function routeRender(routes: Routes) {
  // 접속할 때 해시모드가 아니면(해시가 없으면) /#/로 리다이렉트!
  if(!location.hash) {
    history.replaceState(null, '', '/#/') // (상태, 제목, 주소)
  }
  const routerView = document.querySelector('router-view')
  const [hash, queryString = ''] = location.hash.split('?') // 물음표를 기준으로 hash, qurystring으로 구분
  
  // 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  interface Query{
    [key: string]: string
  }
  const query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=')
      acc[key] = value
      return acc
    }, {} as Query)
  history.replaceState(query, '')

  const currentRoute = routes
    .find(route => new RegExp(`${route.path}/?$`).test(hash))
  if (routerView) {
    routerView.innerHTML = ''
    currentRoute && routerView.append(new currentRoute.component().el)
  }
  
  
  
  // 3) 화면 출력 후
  window.scrollTo(0, 0)
}
export function createRouter(routes: Routes) {
  // 원하는(필요한) 곳에서 호출할 수 잇또록 함수 데이터를 반환!
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}

// STORE
interface StoreObservers {
  [key: string]:SubscribeCallback[]
}
interface SubscribeCallback {
  (arg: unknown): void
}
export class Store<S> {
  public state = {} as S// 상태 데이터
  private observers = {} as StoreObservers
  constructor(state: S) {
    for (const key in state) {
      // 각 상태에 대한 변경 감시(Setter) 설정!
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: val => {
          state[key] = val
          if(Array.isArray(this.observers[key])) { // 호출할 콜백이 있는경우
            this.observers[key].forEach(observer => observer(val))
          }
        }
      })
    }
  }
  // 상태 변경 구독!
  subscribe(key: string, cb: SubscribeCallback) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : this.observers[key] = [cb]
  }
}