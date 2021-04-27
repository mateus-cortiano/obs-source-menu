import { OBSWebSocket } from "./obsws.js";


async function main() {

  async function delay(ms) { return new Promise(R => setTimeout(R, ms)); };

  async function getSceneList() {
    let Names = [];
    let R = await ws.call("GetSceneList");
    R['scenes'].forEach(E => {
      if (!E['name'].startsWith('.'))
      Names.push(E['name']);
    });
    let Active = Names.indexOf(R['current-scene']);
    return {"scenes": Names, "active": Active};
  }

  async function updateButtons() {
    let R = await getSceneList();
    appendButtons(R["scenes"], R["active"]);
  }

  async function setup() {
    await updateButtons();
    ws.addEventListener('message', handleEvent)
  }

  async function handleEvent(event) {
    let R = JSON.parse(event.data);
    switch(R['update-type']) {
      case "SwitchScenes":
        await updateButtons(); 
    }
  }

  async function switchToScene(event) {
    let el = document.getElementsByClassName('selected');
    el[0].className = "";
    event.srcElement.className = "selected";
    await ws.send("SetCurrentScene", {"scene-name": event.srcElement.textContent});
  }

  function appendButtons(names, active) {
    let buttonDiv = document.getElementById('btn-container');
    buttonDiv.innerHTML = ""
    names.forEach((element, i) => {
      let el = document.createElement('button');
      el.textContent = element;
      if (i == active) el.className = "selected";
      el.addEventListener("click", switchToScene);
      buttonDiv.appendChild(el);
    })
  }

  var ws = new OBSWebSocket();
  while (!ws.connected) await delay(1000);
  setup();
}

main();