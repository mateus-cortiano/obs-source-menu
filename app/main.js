
const host = document.getElementById('host');
const pass = document.getElementById('pass');
const submitButton = document.getElementById('submit-btn');

submitButton.addEventListener('click', async (e) => {
  let El = document.getElementById('auth');
  El.className = "fade-out-image";
  await new Promise(R => setTimeout(R, 900))
  El.remove();
  El = document.getElementById('btn-container');
  main(host.value, pass.value)
})


async function main(host="", pass="") {

  async function delay(ms) { return new Promise(R => setTimeout(R, ms)); };

  async function getSceneList() {
    let scene_names = []
    let res = await ws.call("GetSceneList");
    res['scenes'].forEach((el, i, arr) => {
      if (!el['name'].startsWith('.'))
        scene_names.push(el['name']);
    });
    let i_active = scene_names.indexOf(res['current-scene']);
    return {"scenes": scene_names, "active": i_active};
  }

  async function updateButtons() {
    let res = await getSceneList();
    appendButtons(res["scenes"], res["active"]);
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

  async function messageHandler(event) {
    let R = JSON.parse(event.data);
    switch(R['update-type']) {
      case "SceneCollectionChanged":
      case "SwitchScenes":
        await updateButtons().catch(e => console.error(e)); 
    }
  }

  try {
    var ws = new OBSWebSocket(host, pass);
  }
  catch (E) {
    console.error(E);
  }
  finally {
    for (let backoff = 50; !ws.connected; backoff *= 2) {
      await delay(backoff *= 2);
      if (backoff > 5000) return Promise.reject(new Error("Connection timeout expired"));
    }
    ws.addEventListener('message', messageHandler);
    let el = document.getElementById('btn-container');
    el.className = "fade-in-image";
    await updateButtons().catch(e => console.error(e));
  }
}