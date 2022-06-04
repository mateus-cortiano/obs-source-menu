/* views.ts */

import $ from 'jquery'

// ---

export namespace Views {
  export class Slider {
    private slider_div = $('div[name="slider"]')

    slide_left() {
      this.slider_div.addClass('slider-swipe-left')
    }

    slide_right() {
      this.slider_div.removeClass('slider-swipe-left')
    }
  }

  export class AuthForm {
    private host_input = $('input[name="host-input"]')
    private pass_input = $('input[name="password-input"]')
    private connect_btn = $('button[name="connect-btn"]')
    private error_div = $('div[name="error"]')

    get current_host_input() {
      return String(this.host_input.val() || '')
    }

    get current_pass_input() {
      return String(this.host_input.val() || '')
    }

    get current_input(): { host: string; password: string } {
      return {
        host: this.current_host_input,
        password: this.current_pass_input
      }
    }

    on_submit(callback: (event: JQuery.ClickEvent) => any) {
      this.connect_btn.on('click', callback)
      return this
    }

    disable() {
      this.host_input.attr('disabled', '')
      this.pass_input.attr('disabled', '')
      this.connect_btn.attr('disabled', '')
    }

    enable() {
      this.host_input.removeAttr('disabled')
      this.pass_input.removeAttr('disabled')
      this.connect_btn.removeAttr('disabled')
    }

    show_error(message: string) {
      this.error_div.text(message)
      this.error_div.removeClass('hidden')
      setTimeout(() => {
        this.error_div.addClass('hidden')
      }, 6000)
    }
  }

  export class SceneList {
    private scene_div = $('div[name="scene-list"]')

    private create_btn(name: string) {
      let el = $(`<button>${name}</button>`)
      el.attr('name', name)
      return el
    }

    on_click(callback: (event: JQuery.ClickEvent) => any) {
      this.scene_div.on('click', callback)
      return this
    }

    update(scenes: Array<string>, active: number) {
      this.scene_div.children().remove()

      scenes.forEach((scene, ind) => {
        let btn = this.create_btn(scene)

        if (ind === active) btn.addClass('selected')

        this.scene_div.append(btn)
      })
    }

    clear_list() {
      this.update([], -1)
    }

    get current_selected() {
      for (let el of this.scene_div.children())
        if (el.classList.contains('selected')) return el
    }
  }
}

export default Views
