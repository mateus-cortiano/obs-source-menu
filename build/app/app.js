var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OBSWebSocket from "./obsws.js";
import { backoff_timer, wait_for } from "./util/funcs.js";
const doc = document;
const authDiv = doc.getElementById("auth-div");
const sceneListDiv = doc.getElementById("scene-list");
const authElements = {};
function keyEventHandler(ev) {
    switch (ev.key) {
        case "Enter":
            connect();
            break;
    }
}
function returnElement(attributes) {
    let el = doc.createElement(attributes["tag"]);
    for (const attr in attributes)
        el.setAttribute(attr, attributes[attr]);
    el.textContent = attributes["textContent"];
    return el;
}
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        authDiv.className = "fade-out-mid";
        let host = authElements["host"].value || "ws://localhost:4444";
        let pass = authElements["pass"].value;
        var ws = new OBSWebSocket(host, pass);
        yield backoff_timer(() => { return ws.isconnected; });
        if (ws.isconnected) {
            authDiv.className = "fade-out-end";
            yield wait_for(900);
            authDiv.remove();
            const updateButtons = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let response = yield ws.get_scene_list();
                    sceneListDiv.innerHTML = "";
                    response['scenes'].forEach((element, i) => {
                        let el = doc.createElement("button");
                        el.textContent = element;
                        if (i == response["active"])
                            el.className = "selected";
                        el.addEventListener("click", () => {
                            sceneListDiv.getElementsByClassName("selected")[0].className = "";
                            el.className = "selected";
                            ws.switch_to_scene(el.textContent);
                        });
                        sceneListDiv.appendChild(el);
                    });
                });
            };
            yield updateButtons();
            ws.add_event_listener("TransitionBegin", () => __awaiter(this, void 0, void 0, function* () { return yield updateButtons(); }));
            ws.add_event_listener("SwitchScenes", () => __awaiter(this, void 0, void 0, function* () { return yield updateButtons(); }));
            sceneListDiv.className = "fade-in-image";
        }
    });
}
function main() {
    const authForm = [
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
