import"./assets/styles-cqjgQ4qf.js";import{f as y,i}from"./assets/vendor-pFO7b1jt.js";const r=document.getElementById("datetime-picker"),t=document.getElementById("start-btn");let n=null,u;y(r,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){n=e[0],n&&n.getTime()<=new Date().getTime()?(i.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}),t.disabled=!0,t.style.backgroundColor="#cfcfcf"):(t.disabled=!1,t.style.backgroundColor=" #4e75ff",t.style.color="#ffff")}});function o(e){return String(e).padStart(2,"0")}function g(e){const l=Math.floor(e/864e5),f=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:l,hours:f,minutes:m,seconds:h}}function b(){const e=n-new Date,{days:s,hours:a,minutes:d,seconds:c}=g(e);document.querySelector("[data-days]").textContent=o(s),document.querySelector("[data-hours]").textContent=o(a),document.querySelector("[data-minutes]").textContent=o(d),document.querySelector("[data-seconds]").textContent=o(c),р,e<=0&&(clearInterval(u),t.disabled=!1,r.disabled=!1,i.success({title:"Done",message:"The timer has finished",position:"topRight"}))}t.addEventListener("click",()=>{t.disabled=!0,r.disabled=!0,t.style.backgroundColor="",u=setInterval(b,1e3)});
//# sourceMappingURL=1-timer.js.map
