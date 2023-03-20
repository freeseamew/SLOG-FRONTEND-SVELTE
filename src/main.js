import './styles/main.css'
import App from './App.svelte'
import { auth } from './stores'

await auth.refresh() // 여기서 await을 해서 호출해도 정상작동하기는 함

const app = new App({
  target: document.getElementById('app'),
})

export default app