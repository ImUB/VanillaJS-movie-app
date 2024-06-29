import { Store } from "../core/imub";

interface State {
  photo: string
  name: string
  email: string
  blog: string
  github: string
  repo: string
}
export default new Store<State>({
  photo: 'https://heropy.blog/css/images/logo.png',
  name: 'ImUB / ImYuBi',
  email: 'dladbql1234@gmail.com',
  blog: 'https://imub.github.io',
  github: 'https://github.com/imub',
  repo: 'https://github.com/imub/vanillajs-movie-app'
})