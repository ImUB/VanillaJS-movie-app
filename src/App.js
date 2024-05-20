import { Component } from './core/imub.js'
import TheHeader from './components/TheHeader.js'
import TheFooter from './components/TheFooter.js'

export default class App extends Component {
  render() {
    const theHeader = new TheHeader().el
    const theFooter = new TheFooter().el
    const routerView = document.createElement('router-view')
    
    this.el.append(
      theHeader,
      routerView,
      theFooter
    )
  }
}