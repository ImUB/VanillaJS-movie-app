import { Component } from "../core/imub";
import aboutStore from '../store/about';

export default class TheFooter extends Component {
  constructor() {
    super({
      tagName: 'footer'
    })
  }
  render() {
    const {blog, repo} = aboutStore.state
    this.el.innerHTML = /* html */ `
      <div>
        <a href="${blog}">
          Github Repository
        </a>
      </div>
      <div>
        <a href="${repo}">
          ${new Date().getFullYear()}
          ImUB
        </a>
      </div>
    `
  }
}