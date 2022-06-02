/* index.ts */

import OBSWebSocket from './socket/obsws'
import { Slider, SceneList, AuthForm } from './views'
import { wait_for } from './socket/timers'

// ---

let obsws: OBSWebSocket
const slider = new Slider()
const authform = new AuthForm()
const scenediv = new SceneList()

// ---

authform.on_submit(async ev => {
  ev.preventDefault()
  authform.disable()

  obsws = new OBSWebSocket(authform.current_input)

  await obsws.start()

  try {
    await wait_for(() => obsws.isconnected)
  } catch (e) {
    if (obsws.error) authform.show_error(obsws.error)
    else authform.show_error('Connection timed out')
    authform.enable()
    return
  }

  let scenelist = await obsws.get_scene_list()

  slider.slide_left()
  scenediv.update(scenelist.scenes, scenelist.active as number)

  obsws.events.on('ConnectionClosed', async reason => {
    console.error(reason)
    scenediv.update([], -1)
    slider.slide_right()
    authform.enable()
    authform.show_error('Connection closed server side')
  })

  obsws.events.on('SwitchScenes', async (from_scene, to_scene) => {
    let scenelist = await obsws.get_scene_list()
    scenediv.update(scenelist.scenes, scenelist.active as number)
  })
})

scenediv.on_click(async ev => {
  if (ev.target.tagName !== 'BUTTON') return
  if (ev.target.classList.contains('selected')) return

  await obsws.switch_to_scene(ev.target.name)

  let scenelist = await obsws.get_scene_list()
  scenediv.update(scenelist.scenes, scenelist.active as number)
})
