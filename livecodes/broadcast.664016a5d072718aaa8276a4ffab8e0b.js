var T=`<div id="broadcast-container" class="modal-container">\r
  <div class="modal-title">Broadcast</div>\r
  <div id="broadcast-status" class="modal-status"></div>\r
  <div id="broadcast-screen-container" class="modal-screen-container">\r
    <div class="modal-screen">\r
      <div class="description">\r
        Broadcast the result page to other browsers/devices in real time. Please visit the\r
        <a href="{{DOCS_BASE_URL}}features/broadcast" target="_blank" rel="noopener"\r
          >documentations</a\r
        >\r
        for details.\r
      </div>\r
      <form id="broadcast-form">\r
        <div>\r
          <label for="broadcast-server-url">Server URL</label>\r
          <input type="text" id="broadcast-server-url" placeholder="Required" />\r
        </div>\r
        <div class="padded">\r
          <input type="checkbox" id="broadcast-source" />\r
          <label for="broadcast-source">Include source code</label>\r
        </div>\r
        <button id="broadcast-btn" class="wide-button" type="submit">Broadcast</button>\r
        <div id="broadcast-channel-url-section">\r
          <label>Channel URL</label>\r
          <a id="broadcast-channel-url" href="#" target="_blank"></a>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
</div>\r
`;var v=e=>e.replace(/{{APP_VERSION}}/g,"4").replace(/{{SDK_VERSION}}/g,"0.0.2").replace(/{{COMMIT_SHA}}/g,"b09b1b6").replace(/{{REPO_URL}}/g,"https://github.com/live-codes/livecodes").replace(/{{DOCS_BASE_URL}}/g,"/livecodes/docs/");var S=v(T);var E={getUrl:()=>"https://livecodes-broadcast.onrender.com/"};var M=e=>e.querySelector("#broadcast-status"),H=e=>e.querySelector("#broadcast-form"),x=e=>e.querySelector("#broadcast-server-url"),y=e=>e.querySelector("#broadcast-source"),q=e=>e.querySelector("#broadcast-btn"),b=e=>e.querySelector("#broadcast-channel-url-section"),h=e=>e.querySelector("#broadcast-channel-url");var N=async({modal:e,notifications:u,eventsManager:k,deps:n})=>{let p=document.createElement("div");p.innerHTML=S;let o=p.firstChild;e.show(o);let i=M(o),f=H(o),r=x(o),c=y(o),s=q(o),d=b(o),g=h(o),t=n.getBroadcastData(),a=()=>{s.disabled=!1,t=n.getBroadcastData(),t?.isBroadcasting?(i.innerText="Broadcasting...",r.disabled=!0,c.disabled=!0,s.innerText="Stop broadcast",c.checked=t?.broadcastSource===!0,t?.channelUrl&&(d.style.display="unset",g.innerText=t.channelUrl,g.href=t.channelUrl)):(i.innerText="",r.disabled=!1,c.disabled=!1,s.innerText="Broadcast",d.style.display="none"),r.value=r.value.trim()||t?.serverUrl||E.getUrl()};a(),k.addEventListener(f,"submit",async B=>{if(B.preventDefault(),t=n.getBroadcastData(),t?.isBroadcasting){let L=t.serverUrl;fetch(L,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({channel:t.channel,channelToken:t.channelToken,stop:!0})}).catch(()=>{}),n.setBroadcastData({isBroadcasting:!1,channel:"",channelUrl:"",channelToken:"",broadcastSource:!1,serverUrl:L}),a();return}let m=r.value.trim();if(!m){u.error("Server URL is required!");return}s.disabled=!0,s.innerText="Connecting...";let l=await n.broadcast({serverUrl:m,channel:"",channelToken:"",broadcastSource:c.checked});if(!l||"error"in l){u.error("Broadcast failed!"),a();return}n.setBroadcastData({isBroadcasting:!0,serverUrl:m,channel:l.channel,channelUrl:l.channelUrl,channelToken:l.channelToken||"",broadcastSource:c.checked}),a(),u.success("Broadcasting...")})};export{N as createBroadcastUI};
//# sourceMappingURL=broadcast.js.map
