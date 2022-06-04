/* index.ts */

import Views from './views'
import OBSWebSocket from './socket/obsws'
import timers from './socket/timers'

// ---

let obsws: OBSWebSocket
const slider = new Views.Slider()
const authform = new Views.AuthForm()
const scenediv = new Views.SceneList()

// ---

async function update_scenes() {
  let scenelist = await obsws.get_scene_list()
  scenediv.update(scenelist.scenes, scenelist.active as number)
}

authform.on_submit(async ev => {
  ev.preventDefault()
  authform.disable()

  obsws = new OBSWebSocket(authform.current_input)

  await obsws.start()

  try {
    await timers.wait_for(() => obsws.isconnected)
  } catch (e) {
    if (obsws.error) authform.show_error(obsws.error)
    else authform.show_error('Connection timed out')
    authform.enable()
    return
  }

  await update_scenes()
  slider.slide_left()

  obsws.events.on('ConnectionClosed', async reason => {
    scenediv.clear_list()
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
  await update_scenes()
})
