parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"McTt":[function(require,module,exports) {
function e(e){return i(e)||n(e)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function n(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function i(e){if(Array.isArray(e)){for(var a=0,n=new Array(e.length);a<e.length;a++)n[a]=e[a];return n}}var c={TransportCapacity:{eng:"Cargo Bay Extension",id:"TransportCapacity",colNames:["UnlockPrice","UnlockTime"],data:[[1e3,60],[4e3,3600],[15e3,14400],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800],[8e6,864e3]]},ShipmentComputer:{eng:"Shipment Computer",id:"ShipmentComputer",colNames:["UnlockPrice","UnlockTime"],data:[[8e3,14400],[12e3,28800],[25e3,86400],[5e4,172800],[1e5,259200],[25e4,345600],[5e5,432e3],[1e6,518400],[2e6,604800],[4e6,691200]]},Trader:{eng:"Trade Boost",id:"Trader",colNames:["UnlockPrice","UnlockTime"],data:[[15e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[2e5,259200],[35e4,345600],[55e4,432e3],[8e5,518400],[2e6,604800],[5e6,604800]]},MiningBoost:{eng:"Mining Boost",id:"MiningBoost",colNames:["UnlockPrice","UnlockTime"],data:[[2e3,300],[4e3,3600],[25e3,14400],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},EMP:{eng:"EMP",id:"EMP",colNames:["UnlockPrice","UnlockTime"],data:[[2500,7200],[5e3,14400],[25e3,43200],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},Repair:{eng:"Remote Repair",id:"Repair",colNames:["UnlockPrice","UnlockTime"],data:[[8e3,14400],[12e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},WeakShield:{eng:"Alpha Shield",id:"WeakShield",colNames:["UnlockPrice","UnlockTime"],data:[[1e3,300],[2500,3600],[8e3,14400],[15e3,86400],[25e3,172800]]},StandardShield:{eng:"Delta Shield",id:"StandardShield",colNames:["UnlockPrice","UnlockTime"],data:[[8e3,14400],[12e3,28800],[25e3,57600],[5e4,86400],[15e4,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},StrongShield:{eng:"Omega Shield",id:"StrongShield",colNames:["UnlockPrice","UnlockTime"],data:[[3e4,43200],[45e3,86400],[75e3,172800],[1e5,259200],[2e5,345600],[35e4,432e3],[7e5,518400],[1e6,604800],[25e5,604800],[5e6,604800]]},Teleport:{eng:"Teleport",id:"Teleport",colNames:["UnlockPrice","UnlockTime"],data:[[8e3,7200],[12e3,14400],[25e3,43200],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},TimeWarp:{eng:"Time Warp",id:"TimeWarp",colNames:["UnlockPrice","UnlockTime"],data:[[8e3,14400],[12e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},RedStarExtender:{eng:"Red Star Life Extender",id:"RedStarExtender",colNames:["UnlockPrice","UnlockTime"],data:[[8e3,7200],[12e3,14400],[25e3,43200],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},WeakBattery:{eng:"Weak Battery",id:"WeakBattery",colNames:["UnlockPrice","UnlockTime"],data:[[0,0]]},Battery:{eng:"Battery",id:"Battery",colNames:["UnlockPrice","UnlockTime"],data:[[1e3,120],[5e3,3600],[12500,14400],[25e3,86400],[5e4,172800],[1e5,259200],[25e4,345600],[5e5,432e3],[75e4,518400],[1e6,604800]]},Laser:{eng:"Laser",id:"Laser",colNames:["UnlockPrice","UnlockTime"],data:[[8e3,14400],[12e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},Stealth:{eng:"Stealth",id:"Stealth",colNames:["UnlockPrice","UnlockTime"],data:[[25e3,28800],[5e4,57600],[75e3,86400],[1e5,172800],[2e5,259200],[35e4,345600],[55e4,432e3],[8e5,518400],[2e6,604800],[5e6,604800]]},MineralStorageCapacity:{eng:"Hydrogen Bay Extension",id:"MineralStorageCapacity",colNames:["UnlockPrice","UnlockTime"],data:[[2500,7200],[5e3,14400],[2e4,43200],[5e4,86400],[1e5,172800],[2e5,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},MassMining:{eng:"Remote Mining",id:"MassMining",colNames:["UnlockPrice","UnlockTime"],data:[[15e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[2e5,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800],[8e6,604800]]},Unity:{eng:"Unity",id:"Unity",colNames:["UnlockPrice","UnlockTime"],data:[[12e3,14400],[25e3,28800],[45e3,57600],[9e4,86400],[17e4,172800],[3e5,259200],[6e5,345600],[1e6,432e3],[25e5,518400],[5e6,604800]]},Fortify:{eng:"Fortify",id:"Fortify",colNames:["UnlockPrice","UnlockTime"],data:[[15e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[2e5,259200],[35e4,345600],[55e4,432e3],[8e5,518400],[2e6,604800],[5e6,604800]]},Salvage:{eng:"Salvage",id:"Salvage",colNames:["UnlockPrice","UnlockTime"],data:[[3e4,43200],[5e4,86400],[75e3,172800],[1e5,259200],[2e5,345600],[35e4,432e3],[7e5,518400],[1e6,604800],[25e5,604800],[5e6,604800]]},Supress:{eng:"Suppress",id:"Supress",colNames:["UnlockPrice","UnlockTime"],data:[[3e4,43200],[5e4,86400],[75e3,172800],[1e5,259200],[2e5,345600],[35e4,432e3],[7e5,518400],[1e6,604800],[25e5,604800],[5e6,604800]]},ShipmentDrone:{eng:"Shipment Drone",id:"ShipmentDrone",colNames:["UnlockPrice","UnlockTime"],data:[[15e4,86400],[2e5,172800],[35e4,259200],[5e5,345600],[75e4,432e3],[1e6,518400],[2e6,604800],[3e6,604800],[5e6,604800],[8e6,604800]]},Destiny:{eng:"Destiny",id:"Destiny",colNames:["UnlockPrice","UnlockTime"],data:[[2e5,86400],[3e5,172800],[4e5,259200],[5e5,345600],[6e5,432e3],[8e5,518400],[1e6,604800],[35e5,604800],[6e6,604800],[8e6,604800]]},PassiveShield:{eng:"Passive Shield",id:"PassiveShield",colNames:["UnlockPrice","UnlockTime"],data:[[15e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[2e5,259200],[35e4,345600],[55e4,432e3],[8e5,518400],[2e6,604800],[5e6,604800]]},MirrorShield:{eng:"Mirror Shield",id:"MirrorShield",colNames:["UnlockPrice","UnlockTime"],data:[[5e4,86400],[1e5,172800],[2e5,259200],[4e5,345600],[6e5,432e3],[8e5,518400],[1e6,604800],[35e5,604800],[6e6,604800],[8e6,604800]]},HydrogenUpload:{eng:"Hydrogen Upload",id:"HydrogenUpload",colNames:["UnlockPrice","UnlockTime"],data:[[2e4,43200],[35e3,86400],[65e3,172800],[1e5,259200],[2e5,345600],[35e4,432e3],[7e5,518400],[1e6,604800],[25e5,604800],[5e6,604800]]},MiningUnity:{eng:"Mining Unity",id:"MiningUnity",colNames:["UnlockPrice","UnlockTime"],data:[[3e4,43200],[5e4,86400],[75e3,172800],[1e5,259200],[2e5,345600],[35e4,432e3],[7e5,518400],[1e6,604800],[25e5,604800],[5e6,604800]]},MassBattery:{eng:"Mass Battery",id:"MassBattery",colNames:["UnlockPrice","UnlockTime"],data:[[15e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[2e5,259200],[35e4,345600],[55e4,432e3],[8e5,518400],[2e6,604800],[5e6,604800]]},DualLaser:{eng:"Dual Laser",id:"DualLaser",colNames:["UnlockPrice","UnlockTime"],data:[[25e3,43200],[5e4,86400],[75e3,172800],[1e5,259200],[2e5,345600],[35e4,432e3],[7e5,518400],[1e6,604800],[25e5,604800],[5e6,604800]]},Barrier:{eng:"Barrier",id:"Barrier",colNames:["UnlockPrice","UnlockTime"],data:[[15e4,86400],[3e5,172800],[4e5,259200],[5e5,345600],[6e5,432e3],[8e5,518400],[1e6,604800],[35e5,604800],[6e6,604800],[8e6,604800]]},Impulse:{eng:"Impulse",id:"Impulse",colNames:["UnlockPrice","UnlockTime"],data:[[3e4,43200],[6e4,86400],[8e4,172800],[1e5,259200],[2e5,345600],[35e4,432e3],[55e4,518400],[8e5,604800],[2e6,604800],[5e6,604800]]},Barrage:{eng:"Barrage",id:"Barrage",colNames:["UnlockPrice","UnlockTime"],data:[[12e4,86400],[3e5,172800],[4e5,259200],[5e5,345600],[6e5,432e3],[8e5,518400],[1e6,604800],[35e5,604800],[6e6,604800],[7e6,604800]]},TradeBurst:{eng:"Trade Burst",id:"TradeBurst",colNames:["UnlockPrice","UnlockTime"],data:[[2e4,86400],[35e3,172800],[65e3,259200],[1e5,345600],[2e5,432e3],[35e4,518400],[7e5,604800],[1e6,691200],[25e5,777600],[5e6,864e3]]},Leap:{eng:"Leap",id:"Leap",colNames:["UnlockPrice","UnlockTime"],data:[[4e5,172800],[5e5,259200],[6e5,345600],[7e5,432e3],[8e5,518400],[1e6,604800],[2e6,604800],[4e6,604800],[6e6,604800],[8e6,604800]]},Vengeance:{eng:"Vengeance",id:"Vengeance",colNames:["UnlockPrice","UnlockTime"],data:[[2e5,86400],[3e5,172800],[4e5,259200],[5e5,345600],[6e5,432e3],[8e5,518400],[1e6,604800],[35e5,604800],[6e6,604800],[8e6,604800]]},ShipmentBeam:{eng:"Shipment Beam",id:"ShipmentBeam",colNames:["UnlockPrice","UnlockTime"],data:[[8e4,86400],[1e5,172800],[12e4,259200],[14e4,345600],[16e4,432e3],[18e4,518400],[25e4,604800],[3e5,604800],[35e4,604800],[4e5,604800]]},Sanctuary:{eng:"Sanctuary",id:"Sanctuary",colNames:["UnlockPrice","UnlockTime"],data:[[5e4,86400]]},Crunch:{eng:"Crunch",id:"Crunch",colNames:["UnlockPrice","UnlockTime"],data:[[15e4,86400],[23e4,172800],[36e4,259200],[55e4,345600],[85e4,432e3],[13e5,518400],[2e6,604800],[3e6,604800],[5e6,604800],[8e6,604800]]},Recall:{eng:"Recall",id:"Recall",colNames:["UnlockPrice","UnlockTime"],data:[[15e4,172800]]},AlphaRocket:{eng:"AlphaRocket",id:"AlphaRocket",colNames:["UnlockPrice","UnlockTime"],data:[[15e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[2e5,259200],[35e4,345600],[55e4,432e3],[8e5,518400]]},Enrich:{eng:"Enrich",id:"Enrich",colNames:["UnlockPrice","UnlockTime"],data:[[8e3,14400],[12e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[25e4,259200],[5e5,345600],[1e6,432e3],[2e6,518400],[4e6,604800]]},Rush:{eng:"Rush",id:"Rush",colNames:["UnlockPrice","UnlockTime"],data:[[15e3,28800],[25e3,57600],[5e4,86400],[1e5,172800],[2e5,259200],[35e4,345600],[55e4,432e3],[8e5,518400],[2e6,604800],[5e6,604800]]},Genesis:{eng:"Genesis",id:"Genesis",colNames:["UnlockPrice","UnlockTime"],data:[[2e5,172800],[25e4,259200],[35e4,345600],[5e5,432e3],[8e5,518400],[15e5,604800],[2e6,604800],[3e6,604800],[5e6,604800],[8e6,604800]]},Entrust:{eng:"Entrust",id:"Entrust",colNames:["UnlockPrice","UnlockTime"],data:[[1e5,172800],[16e4,259200],[25e4,345600],[4e5,432e3],[65e4,518400],[1e6,604800],[15e5,691200],[25e5,777600],[4e6,864e3],[6e6,864e3]]},Offload:{eng:"Offload",id:"Offload",colNames:["UnlockPrice","UnlockTime"],data:[[1e5,172800],[12e4,259200],[14e4,345600],[16e4,432e3],[18e4,518400],[2e5,604800],[25e4,691200],[3e5,777600],[4e5,864e3],[5e5,864e3]]},AreaShield:{eng:"Area Shield",id:"AreaShield",colNames:["UnlockPrice","UnlockTime"],data:[[2e5,172800],[3e5,259200],[4e5,345600],[6e5,518400],[8e5,604800],[1e6,604800],[35e5,604800],[6e6,604800],[8e6,604800],[8e6,604800]]},AlphaDrone:{eng:"Alpha Drone",id:"AlphaDrone",colNames:["UnlockPrice","UnlockTime"],data:[[1e6,259200],[2e6,432e3],[3e6,604800],[4e6,691200],[5e6,777600],[6e6,864e3],[7e6,864e3],[8e6,864e3]]},Bond:{eng:"Bond",id:"Bond",colNames:["UnlockPrice","UnlockTime"],data:[[4e5,172800],[6e5,259200],[1e6,345600],[15e5,432e3],[2e6,518400],[3e6,604800],[4e6,604800],[5e6,604800],[6e6,604800],[8e6,604800]]},DeltaRocket:{eng:"Delta Rocket",id:"DeltaRocket",colNames:["UnlockPrice","UnlockTime"],data:[[2e5,172800],[35e4,259200],[5e5,345600],[75e4,432e3],[1e6,518400],[2e6,604800],[3e6,691200],[4e6,777600],[6e6,864e3],[8e6,864e3]]},BlastShield:{eng:"Blast Shield",id:"BlastShield",colNames:["UnlockPrice","UnlockTime"],data:[[1e5,86400],[15e4,172800],[25e4,259200],[5e5,345600],[75e4,432e3],[1e6,518400],[2e6,604800],[4e6,691200],[6e6,777600],[8e6,864e3]]},OmegaRocket:{eng:"Omega Rocket",id:"OmegaRocket",colNames:["UnlockPrice","UnlockTime"],data:[[2e6,259200],[25e5,345600],[3e6,432e3],[35e5,518400],[4e6,604800],[45e5,691200],[5e6,777600],[6e6,864e3],[7e6,864e3],[8e6,864e3]]},MiningDrone:{eng:"Mining Drone",id:"MiningDrone",colNames:["UnlockPrice","UnlockTime"],data:[[1e6,259200],[2e6,345600],[3e6,432e3],[4e6,518400],[5e6,604800],[6e6,604800],[7e6,604800],[8e6,604800],[8e6,604800],[8e6,604800]]},DartLauncher:{eng:"Dart Launcher",id:"DartLauncher",colNames:["UnlockPrice","UnlockTime"],data:[[4e6,432e3],[45e5,518400],[5e6,604800],[55e5,691200],[6e6,777600],[65e5,864e3],[7e6,864e3],[75e5,864e3],[8e6,864e3],[8e6,864e3]]},Dispatch:{eng:"Dispatch",id:"Dispatch",colNames:["UnlockPrice","UnlockTime"],data:[[2e5,86400],[3e5,172800],[4e5,259200],[5e5,345600],[6e5,432e3],[8e5,518400],[1e6,604800],[35e5,604800],[6e6,604800],[8e6,604800]]},HydroRocket:{eng:"Hydro Rocket",id:"HydroRocket",colNames:["UnlockPrice","UnlockTime"],data:[[2e6,259200],[225e4,345600],[25e5,432e3],[3e6,518400],[35e5,604800],[4e6,691200],[45e5,777600],[5e6,864e3],[6e6,864e3],[8e6,864e3]]}},o={trade:["TransportCapacity","ShipmentComputer","Trader","Rush","TradeBurst","ShipmentDrone","Offload","ShipmentBeam","Entrust","Dispatch","Recall"],mining:["MiningBoost","MineralStorageCapacity","Enrich","MassMining","HydrogenUpload","MiningUnity","Crunch","Genesis","HydroRocket","MiningDrone"],support:["EMP","Teleport","RedStarExtender","Repair","TimeWarp","Unity","Sanctuary","Stealth","Fortify","Impulse","AlphaRocket","Salvage","Supress","Destiny","Barrier","Vengeance","DeltaRocket","Leap","Bond","AlphaDrone","OmegaRocket"],shield:["WeakShield","StandardShield","StrongShield","PassiveShield","MirrorShield","AreaShield","BlastShield"],weapon:["WeakBattery","Battery","Laser","MassBattery","DualLaser","Barrage","DartLauncher"]},l=[].concat(e(o.trade),e(o.mining),e(o.weapon),e(o.shield),e(o.support));module.exports={modulesData:c,allModuleKeys:l,modulesByTypes:o};
},{}],"R+1h":[function(require,module,exports) {
"use strict";function e(e,o){return n(e)||t(e,o)||r()}function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function t(e,r){var t=[],n=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(n=(u=a.next()).done)&&(t.push(u.value),!r||t.length!==r);n=!0);}catch(c){o=!0,i=c}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return t}function n(e){if(Array.isArray(e))return e}function o(e,r){var t={};return r.split("").forEach(function(r,n){"A"===r?t[e[n]]=10:+r==r&&(t[e[n]]=+r)}),t}function i(e,r){var t="";return e.forEach(function(e,n){10==r[e]?t+="A":r[e]?t+=r[e]:t+="0"}),t}function u(e){var r=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return r?decodeURIComponent(r[1]):void 0}function a(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=t.expires;if("number"==typeof n&&n){var o=new Date;o.setTime(o.getTime()+1e3*n),n=t.expires=o}n&&n.toUTCString&&(t.expires=n.toUTCString());var i=e+"="+(r=encodeURIComponent(r));for(var u in t){i+="; "+u;var a=t[u];!0!==a&&(i+="="+a)}document.cookie=i}function c(e){a(e,"",{expires:-1})}function s(r){var t=r.split("&"),n={};return t.forEach(function(r){var t=e(r.split("="),2),o=t[0],i=t[1];o&&(void 0===i&&(i=!0),n[decodeURIComponent(o)]=decodeURIComponent(i))}),n}Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseModules=o,exports.stringifyModules=i,exports.getCookie=u,exports.setCookie=a,exports.deleteCookie=c,exports.parseQueryString=s;
},{}],"A6pM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t={data:{current:{},target:{}},changeCallbacks:[],onChange:function(t){this.changeCallbacks.push(t)},getSection:function(t){return this.data[t]},getLevel:function(t){var e=t.module,a=t.section;return this.data[a][e]||0},setData:function(t){var e=this;t.forEach(function(t){var a=t.module,n=t.level,s=t.section;e.data[s][a]=n}),this.emitCallbacks(t),console.log(this.data)},reset:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"current",e=Object.keys(this.data[t]).map(function(e){return{module:e,level:0,section:t}});this.setData(e)},emitCallbacks:function(t){var e=this;this.changeCallbacks.forEach(function(a){a(t,e.data)})}},e=t;exports.default=e;
},{}],"+Dtd":[function(require,module,exports) {
"use strict";function e(e){return n(e)||r(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function n(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var o=document.querySelector(".modal"),c=o.querySelector(".module-form__title"),l=o.querySelector(".module-form__icon"),a=o.querySelector(".btn--ok"),i=o.querySelector(".btn--cancel"),u=o.querySelector("select[name=from]"),s=o.querySelector("select[name=to]");o.addEventListener("click",function(e){e.target===o&&m.close()});var d=null;function f(e,t){var r=t?"selected":"";return'<option value="'.concat(e,'" ').concat(r," >").concat(e,"</option>")}function y(t,r){var n=e(Array(t.data.length+1).keys());u.innerHTML=n.map(function(e){return f(e,e==r.from)}).join(""),s.innerHTML=n.map(function(e){return f(e,e==r.to)}).join(""),c.innerHTML=t.eng||"-";var o=document.querySelector('[data-module-id="'.concat(t.id,'"] .module__icon')).getAttribute("style");l.setAttribute("style",o)}a.addEventListener("click",function(){d&&d({from:u.value,to:s.value}),m.close()}),i.addEventListener("click",function(){m.close()});var m={open:function(e){var t=e.moduleData,r=e.selected,n=e.onOk;y(t,r),o.style.display="block",o.scrollTop=0,d=n},close:function(){o.style.display=""}},p=m;exports.default=p;
},{}],"mpVp":[function(require,module,exports) {
function e(e,o){return n(e)||r(e,o)||t()}function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function r(e,t){var r=[],n=!0,o=!1,u=void 0;try{for(var c,a=e[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(i){o=!0,u=i}finally{try{n||null==a.return||a.return()}finally{if(o)throw u}}return r}function n(e){if(Array.isArray(e))return e}var o=require("./moduleData").modulesData,u=require("./moduleData").allModuleKeys,c=require("./urlModules").parseModules,a=require("./urlModules").stringifyModules,i=require("./urlModules").parseQueryString,l=require("./Model").default,d=require("./Modal").default,f=document.querySelector(".modules"),s=document.querySelector(".save-btn"),m=document.querySelector(".reset-btn"),v=document.querySelector(".result-credit .value"),h=document.querySelector(".result-duration .value"),y="cm",g="tm";function p(){if(!location.search)return[];var e=i(location.search.slice(1))[y],t=i(location.search.slice(1))[g],r=[];if(e){var n=c(u,e);Object.keys(n).filter(function(e){return n[e]}).forEach(function(e){r.push({module:e,level:n[e],section:"current"})})}if(t){var o=c(u,t);Object.keys(o).filter(function(e){return o[e]}).forEach(function(e){r.push({module:e,level:o[e],section:"target"})})}return r}function q(e){e.addEventListener("click",function(){var e=a(u,l.getSection("current")),t=a(u,l.getSection("target")),r="".concat(location.pathname,"?").concat(y,"=").concat(e,"&").concat(g,"=").concat(t);window.history.pushState("","",r)})}function M(e){e.addEventListener("click",function(){l.reset("current"),l.reset("target")})}function S(e,t){return t=t||0,e.filter(function(e,r){return r<t}).reduce(function(e,t){return e+ +t},0)}function E(t){return t.data.map(function(t){var r=e(t,2),n=r[0];r[1];return n})}function L(t){return t.data.map(function(t){var r=e(t,2);r[0];return r[1]})}function b(e,t){var r=0,n=0;Object.keys(t.target).forEach(function(e){var u=S(E(o[e]),t.current[e]),c=S(E(o[e]),t.target[e]);c>u&&(n+=c-u);var a=S(L(o[e]),t.current[e]),i=S(L(o[e]),t.target[e]);i>a&&(r+=i-a)});var u=n&&r?(n/r*24*60*60).toFixed(0):0,c=w(r);v.innerHTML=n?"".concat(j(n)," (").concat(j(u)," credit/day)"):"-",h.innerHTML=c||"-"}function k(e){e.forEach(function(e){var t=e.module,r=e.level,n=e.section,o=document.querySelector(".module[data-module-id='".concat(t,"']"));"current"===n?o.dataset.currentL=r:o.dataset.targetL=r})}function D(e){e.querySelectorAll("button").forEach(function(e){var t=e.dataset.moduleId;o[t]?e.addEventListener("click",function(){d.open({moduleData:o[t],selected:{from:l.getLevel({section:"current",module:t}),to:l.getLevel({section:"target",module:t})},onOk:function(e){l.setData([{module:t,level:e.from,section:"current"},{module:t,level:e.to,section:"target"}])}})}):console.log("there are no module this name: ".concat(t))})}function w(e){var t=Math.floor(e/86400),r=Math.floor((e-86400*t)/3600),n=Math.floor((e-86400*t-3600*r)/60),o=[];return t&&o.push(t+"d"),r&&o.push(r+"h"),n&&o.push(n+"m"),o.join(" ")}function j(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}D(f),q(s),M(m),l.onChange(b),l.onChange(k),l.setData(p());
},{"./moduleData":"McTt","./urlModules":"R+1h","./Model":"A6pM","./Modal":"+Dtd"}]},{},["mpVp"], null)
//# sourceMappingURL=script.b4e0cf6d.js.map