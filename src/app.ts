import OBSWebSocket from "./obsws.js";
import {OBSMessage} from "./util/types.js";
import {backoff_timer, wait_for} from "./util/funcs.js"

const doc: Document = document;
const authDiv: HTMLElement = doc.getElementById("auth-div")!;
const sceneListDiv: HTMLElement = doc.getElementById("scene-list")!;
const authElements: { [key: string]: any } = {};

function keyEventHandler(ev: KeyboardEvent): void {
  switch (ev.key) {
    case "Enter": connect(); break;
  }
}

function returnElement(attributes: { [key: string]: string }): any {
  let el = document.createElement(attributes["tag"]);
  for (const attr in attributes) el.setAttribute(attr, attributes[attr]);
  el.textContent = attributes["textContent"];
  return el;
}

async function connect(): Promise<any> {
  authDiv.className = "fade-out-mid";

  let host = authElements["host"].value || "ws://localhost:4444";
  let pass = authElements["pass"].value;

  var ws = new OBSWebSocket(host, pass);

  await backoff_timer(() => { return ws.isconnected; });

  if (ws.isconnected) {
    authDiv.className = "fade-out-end";
    await wait_for(900);
    authDiv.remove();

    const updateButtons = async function () {
      let response: OBSMessage = await ws.get_scene_list();
      
      sceneListDiv.innerHTML = "";
      response['scenes'].forEach((element: string, i: number) => {
        let el = document.createElement("button");
        el.textContent = element;
        if (i == response["active"]) el.className = "selected";
        el.addEventListener("click", () => {
          sceneListDiv.getElementsByClassName("selected")[0].className = "";
          el.className = "selected";
          ws.switch_to_scene(el.textContent as string);
        });
        sceneListDiv.appendChild(el);
      });
    };

    await updateButtons();
    ws.add_event_listener("SwitchScenes", async () => await updateButtons());
    sceneListDiv.className = "fade-in-image";
  }
}

function main(): void {
  const authForm: Array<{ [key: string]: string }> = [
    {
      name: "host",
      tag: "input",
      id: "host",
      type: "text",
      placeholder: "host",
      textContent: "",
    },
    {
      name: "pass",
      tag: "input",
      id: "pass",
      type: "password",
      placeholder: "password",
      textContent: "",
    },
    {
      name: "button",
      tag: "button",
      id: "connect-btn",
      textContent: "connect",
    },
  ];

  authForm.forEach((el) => {
    authElements[el["name"]] = returnElement(el);
    authDiv.appendChild(authElements[el["name"]]);
  });

  authElements["button"].addEventListener("click", connect);
  doc.addEventListener("keydown", keyEventHandler);
}

main();
