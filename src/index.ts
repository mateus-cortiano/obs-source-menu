import { OBSWebSocket } from './obsws'
import { OBSMessage } from './util/types'
import { wait_for_condition, wait_for } from './util/timers'

const doc: Document = document
const authDiv: HTMLElement = doc.getElementById('auth-div')!
const sceneListDiv: HTMLElement = doc.getElementById('scene-list')!
const connectBtn: HTMLElement = doc.getElementById('connect-btn')!

connectBtn.addEventListener('click', event => {
  event.preventDefault()
  const hostInput = doc.getElementById('host-input') as HTMLInputElement
  const passInput = doc.getElementById('password-input') as HTMLInputElement
  let host = hostInput.value as string
  let pass = passInput.value as string
  connect(host, pass)
})

async function connect(host: string, pass: string): Promise<any> {
  authDiv.className = 'fade-out-mid'

  var ws = new OBSWebSocket(host || 'ws://localhost:4444', pass)

  await wait_for_condition(() => {
    return ws.isconnected
  })

  if (ws.isconnected) {
    authDiv.className = 'fade-out-end'
    await wait_for(900)
    authDiv.remove()

    const updateButtons = async function (exclude: string = '.') {
      let response: OBSMessage = await ws.get_scene_list(exclude)

      sceneListDiv.innerHTML = ''
      response['scenes'].forEach((element: string, i: number) => {
        let el = doc.createElement('button')
        el.textContent = element
        if (i == response['active']) el.className = 'selected'
        el.addEventListener('click', () => {
          sceneListDiv.getElementsByClassName('selected')[0].className = ''
          el.className = 'selected'
          ws.switch_to_scene(el.textContent as string)
        })
        sceneListDiv.appendChild(el)
      })
    }

    await updateButtons()
    ws.add_event_listener('TransitionBegin', updateButtons)
    ws.add_event_listener('SwitchScenes', updateButtons)
    sceneListDiv.className = 'fade-in-image'
  }
}
