import { getValue } from "./data";

export function sendPost(callback) {
  let results = [];

  function handleXHRResult(xhr) {
    results.push(xhr.status);
    if (results.length === 2) {
      if (results[0] === 200 && results[1] === 200) {
        callback(2);
        console.log("callback 2");
      } else if (results[0] === 200 || results[1] === 200) {
        callback(1);
        console.log("callback 1");
      } else {
        callback(0);
        console.log("callbacl´k 0");
      }
    }
  }
  sendRequest("led", handleXHRResult);
}

export function sendRequest(key, handler) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      handler(xhr);
    }
  };

  if (key === "led") {
      //positions.reduce
    xhr.open("GET", "http://192.168.4.1/led?pos1=000000&pos2=", true);
  }
}
