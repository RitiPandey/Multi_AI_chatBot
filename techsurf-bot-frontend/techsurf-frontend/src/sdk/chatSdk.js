(function(window, document){
  const scriptId = "techsurf-embed";
  if (document.getElementById(scriptId)) return;
  const root = document.createElement("div");
  root.id = "techsurf-widget";
  root.style.position = "fixed";
  root.style.bottom = "20px";
  root.style.right = "20px";
  root.style.zIndex = 9999;
  root.innerHTML = `<button id="ts-open" style="background:#6b21a8;color:#fff;padding:10px 14px;border-radius:999px;border:none;cursor:pointer">Chat with Bot</button>`;
  document.body.appendChild(root);

  document.getElementById("ts-open").onclick = () => {
    window.open("https://your-frontend-url/chat", "_blank");
  };
})(window, document);
