import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;1,9..144,200;1,9..144,300;1,9..144,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{
  --ink:#0E0F17;--ink-mid:#2A2F3C;--ink-faint:#586074;--ink-ghost:#8D96AD;
  --parchment:#151927;--linen:#1A1F30;--linen-dark:#252B3F;
  --clay:#3A4158;--clay-light:#637197;
  --moss:#152726;--moss-mid:#1D3835;--moss-light:#2D5A52;--moss-pale:#63B39E;--moss-mist:#B9E2D6;
  --ochre:#A8814E;--rust:#A05063;
  --blush:#A86D8D;--blush-light:#C58DA8;--blush-mist:#E5C6D8;--blush-deep:#D36CA2;
  --border:rgba(28,26,20,.08);--border-md:rgba(28,26,20,.14);--border-dk:rgba(28,26,20,.22);
  --shadow-lg:0 8px 40px rgba(28,26,20,.18),0 2px 8px rgba(28,26,20,.10);
}
html,body{background:var(--ink);min-height:100vh}
body{font-family:'Jost',sans-serif;color:var(--ink);overflow-x:hidden}
.app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--parchment);display:flex;flex-direction:column}
.scroll-area{flex:1;overflow-y:auto;padding-bottom:80px}
.status-bar{height:44px;background:var(--moss);flex-shrink:0}
.garden-scene{background:var(--moss);overflow:hidden}
.scene-title-block{padding:28px 28px 0;position:relative;z-index:10}
.scene-eyebrow{font-size:9px;font-weight:500;letter-spacing:4px;text-transform:uppercase;color:var(--moss-pale);opacity:.7;margin-bottom:6px}
.scene-title{font-family:'Fraunces',serif;font-size:38px;font-weight:200;font-style:italic;color:var(--parchment);line-height:1}
.scene-title em{font-style:normal;color:var(--moss-pale);font-size:28px;font-weight:300}
.scene-stats{display:flex;padding:16px 28px 0;position:relative;z-index:10}
.scene-stat{display:flex;flex-direction:column;gap:2px;padding-right:20px}
.scene-stat+.scene-stat{border-left:1px solid rgba(255,255,255,.12);padding-left:20px}
.scene-stat-n{font-family:'Fraunces',serif;font-size:20px;font-weight:300;color:var(--parchment);line-height:1}
.scene-stat-l{font-size:8px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--moss-pale);opacity:.65}
.scene-painting{display:block;width:100%}
.search-wrap{padding:12px 20px;border-bottom:1px solid var(--border-md);background:var(--linen)}
.search-inner{display:flex;align-items:center;gap:10px;background:var(--parchment);border:1px solid var(--border-md);padding:9px 13px}
.search-inner input{flex:1;background:none;border:none;outline:none;font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:var(--ink)}
.search-inner input::placeholder{color:var(--ink-ghost)}
.filter-row{display:flex;align-items:center;padding:0 20px;border-bottom:1px solid var(--border-md);overflow-x:auto;scrollbar-width:none;background:var(--parchment)}
.filter-row::-webkit-scrollbar{display:none}
.fchip{flex-shrink:0;padding:12px 13px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border:none;background:none;color:var(--ink-faint);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .18s;white-space:nowrap}
.fchip.active{color:var(--moss);border-bottom-color:var(--moss-pale)}
.view-toggle{margin-left:auto;display:flex;padding:0 4px;flex-shrink:0}
.vtoggle{padding:10px 8px;background:none;border:none;cursor:pointer;color:var(--ink-faint);display:flex;align-items:center;transition:color .15s}
.vtoggle.active{color:var(--moss)}
.section-head{padding:22px 22px 12px;display:flex;align-items:baseline;gap:10px}
.section-head-title{font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:300;font-style:italic;color:var(--ink-mid)}
.section-head-line{flex:1;height:1px;background:var(--border-md)}
.section-head-count{font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-ghost)}
.portrait-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--border);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.portrait-card{background:var(--parchment);cursor:pointer;display:flex;flex-direction:column;align-items:center;padding:18px 10px 14px;position:relative;transition:background .15s;animation:fadeUp .4s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.portrait-card:nth-child(1){animation-delay:.04s}.portrait-card:nth-child(2){animation-delay:.08s}.portrait-card:nth-child(3){animation-delay:.12s}
.portrait-card:nth-child(4){animation-delay:.16s}.portrait-card:nth-child(5){animation-delay:.2s}.portrait-card:nth-child(6){animation-delay:.24s}
.portrait-card:nth-child(7){animation-delay:.28s}.portrait-card:nth-child(8){animation-delay:.32s}.portrait-card:nth-child(9){animation-delay:.36s}
.portrait-card:active{background:var(--linen)}
.dashboard-head{padding:22px 22px 10px}
.dashboard-title{font-family:'Fraunces',serif;font-size:20px;font-weight:300;color:var(--moss-mist);margin-bottom:5px}
.dashboard-sub{font-size:11px;font-weight:300;color:var(--ink-ghost)}
.dash-grid{padding:4px 16px 14px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.flip-wrap{perspective:1200px}
.flip-card{position:relative;width:100%;height:468px;border-radius:18px;cursor:pointer;transform-style:preserve-3d}
.flip-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .8s cubic-bezier(.22,.61,.36,1)}
.flip-inner.flipped{transform:rotateY(180deg)}
.flip-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:18px;display:flex;flex-direction:column;padding:13px 12px;background:#F1EBDE;border:1px solid #D7CEBC;box-shadow:0 6px 20px rgba(0,0,0,.22);color:#2E382E;overflow:hidden}
.flip-face::before{content:"";position:absolute;inset:9px;border:1px solid #8C9A7C;border-radius:11px;pointer-events:none}
.flip-face::after{content:"";position:absolute;inset:14px;border:1px solid #B6B094;border-radius:9px;opacity:.55;pointer-events:none}
.flip-front{background:radial-gradient(70% 45% at 50% 10%,rgba(173,195,152,.2),transparent 70%),#F1EBDE}
.flip-back{transform:rotateY(180deg);background:radial-gradient(80% 50% at 50% 8%,rgba(173,195,152,.18),transparent 72%),#F1EBDE}
.flip-eyebrow{font-size:8px;letter-spacing:1.4px;text-transform:uppercase;color:#68745F;text-align:center;margin-top:4px}
.flip-name{font-family:'Fraunces',serif;font-size:20px;line-height:1.05;color:#2A332A;text-align:center;margin-top:8px}
.flip-bot{font-family:'Cormorant Garamond',serif;font-size:13px;color:#3D493A;font-style:italic;text-align:center;margin-top:2px}
.flip-sil{display:flex;justify-content:center;align-items:center;height:158px;margin:10px 0 6px}
.flip-family{font-family:'Cormorant Garamond',serif;font-size:17px;text-align:center;color:#394238;margin-top:auto}
.flip-mini{font-size:10px;color:#5F6D57;text-align:center;margin-top:2px}
.flip-rule{height:1px;background:#CFC5B0;margin:8px 6px}
.flip-section{font-family:'Fraunces',serif;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#4D5A46;text-align:center;background:#E5DECC;padding:4px 8px;margin:6px 0}
.flip-meta{display:grid;grid-template-columns:auto 1fr;gap:5px 8px;font-size:11px;line-height:1.35;position:relative;z-index:1}
.flip-k{font-weight:500;color:#374234;white-space:nowrap}
.flip-v{color:#2C332C}
.flip-fact{margin-top:auto;font-family:'Cormorant Garamond',serif;font-size:14px;line-height:1.25;color:#394337;font-style:italic;padding:8px;border-top:1px solid #CFC5B0}
.flip-actions{display:flex;justify-content:space-between;align-items:center;margin-top:8px;gap:8px;position:relative;z-index:2}
.flip-hint{font-size:9px;color:#6C775F;letter-spacing:.4px}
.flip-open{background:#E5DECC;color:#2E382E;border:1px solid #9AA488;padding:6px 8px;font-size:9px;letter-spacing:.8px;text-transform:uppercase;cursor:pointer;font-weight:500}
.pip{width:5px;height:5px;border-radius:50%;position:absolute;top:10px;right:10px}
.pip.thriving{background:var(--moss-light)}.pip.ok{background:var(--ochre)}.pip.needs-love{background:var(--rust)}
.portrait-sil{width:64px;height:68px;display:flex;align-items:flex-end;justify-content:center;margin-bottom:10px}
.portrait-nick{font-size:8px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--blush-deep);margin-bottom:3px;text-align:center;min-height:12px}
.portrait-name{font-family:'Fraunces',serif;font-size:11px;font-weight:300;color:var(--ink);text-align:center;line-height:1.3}
.table-row{display:flex;align-items:center;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s;animation:fadeUp .3s ease both}
.table-row:active{background:var(--linen)}
.table-sil{width:64px;height:64px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--linen)}
.table-body{flex:1;padding:11px 13px;min-width:0}
.table-nick{font-size:8px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--blush-deep);margin-bottom:2px;min-height:12px}
.table-nick-ghost{font-size:8px;font-weight:300;letter-spacing:1px;text-transform:uppercase;color:var(--ink-ghost);font-style:italic;margin-bottom:2px;cursor:pointer}
.table-nick-input{font-family:'Jost',sans-serif;font-size:8px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--blush-deep);background:none;border:none;border-bottom:1px solid var(--blush);outline:none;width:100%;margin-bottom:2px}
.table-nick-wrap{display:flex;align-items:center;gap:4px;cursor:pointer}
.table-nick-wrap:hover .table-nick{opacity:.7}
.table-name{font-family:'Fraunces',serif;font-size:14px;font-weight:400;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.table-bot{font-family:'Cormorant Garamond',serif;font-size:11px;font-style:italic;font-weight:300;color:var(--ink-faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.table-fact{font-size:10px;font-weight:300;color:var(--ink-mid);line-height:1.5;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.table-right{padding:0 13px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:4px}
.tpip{width:7px;height:7px;border-radius:50%}
.tpip.thriving{background:var(--moss-light)}.tpip.ok{background:var(--ochre)}.tpip.needs-love{background:var(--rust)}
.table-hlbl{font-size:8px;font-weight:500;letter-spacing:.5px;text-transform:uppercase;color:var(--ink-ghost);white-space:nowrap}
.tab-bar{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--ink);border-top:1px solid rgba(255,255,255,.06);display:flex;z-index:150;padding-bottom:env(safe-area-inset-bottom,6px)}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px 4px 8px;cursor:pointer;border:none;background:none;gap:4px;font-family:'Jost',sans-serif;color:rgba(255,255,255,.3);transition:color .2s}
.tab.active{color:var(--moss-pale)}
.tab-label{font-size:8px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase}
.fab{position:fixed;bottom:76px;right:20px;width:46px;height:46px;background:var(--moss);color:var(--parchment);border:none;cursor:pointer;box-shadow:var(--shadow-lg);display:flex;align-items:center;justify-content:center;z-index:140;transition:transform .15s}
.fab:active{transform:scale(.92)}
.overlay{position:fixed;inset:0;background:rgba(28,26,20,.65);backdrop-filter:blur(12px);z-index:200;display:flex;align-items:flex-end;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0}}
@keyframes slideUp{from{transform:translateY(100%)}}
.sheet{background:var(--parchment);border-radius:16px 16px 0 0;width:100%;max-height:94vh;overflow-y:auto;animation:slideUp .3s cubic-bezier(.32,.72,0,1);padding-bottom:56px}
.sheet-handle{width:36px;height:3px;background:var(--border-dk);border-radius:2px;margin:14px auto 0}
.d-hero{height:220px;background:var(--moss);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;margin:16px 16px 0}
.d-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.6}
.d-close{position:absolute;top:12px;right:12px;width:28px;height:28px;background:rgba(237,229,212,.88);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:3;color:var(--ink)}
.d-hbar{position:absolute;bottom:0;left:0;right:0;height:3px;z-index:3}
.d-hbar.thriving{background:var(--moss-light)}.d-hbar.ok{background:var(--ochre)}.d-hbar.needs-love{background:var(--rust)}
.d-body{padding:22px 22px 0}
.d-eyebrow{font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink-ghost);display:flex;align-items:center;gap:8px;margin-bottom:8px}
.dpip{width:5px;height:5px;border-radius:50%}
.dpip.thriving{background:var(--moss-light)}.dpip.ok{background:var(--ochre)}.dpip.needs-love{background:var(--rust)}
.nick-row{display:flex;align-items:center;gap:8px;margin-bottom:4px;cursor:pointer}
.nick-label{font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--blush-deep)}
.nick-input{font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--blush-deep);background:none;border:none;border-bottom:1px solid var(--blush);outline:none;min-width:80px}
.nick-ghost{font-size:10px;font-weight:300;color:var(--ink-ghost);font-style:italic}
.d-name{font-family:'Fraunces',serif;font-size:30px;font-weight:300;color:var(--ink);line-height:1.05;margin-bottom:3px}
.d-bot{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;font-weight:300;color:var(--ink-mid)}
.plant-voice{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;font-weight:300;color:var(--moss-mid);line-height:1.75;margin-top:14px;padding-left:14px;border-left:1.5px solid var(--moss-mist)}
.d-div{height:1px;background:var(--border-md);margin:20px 0}
.d-lbl{font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink-ghost);margin-bottom:12px}
.arc-wrap{background:var(--linen);padding:14px}
.arc-legend{display:flex;gap:16px;margin-top:8px}
.arc-legend-item{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--ink-mid)}
.arc-dot{width:6px;height:6px;border-radius:50%}
.arc-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-top:1px solid var(--border);font-size:12px;font-weight:300;color:var(--ink-mid)}
.arc-row:first-child{border-top:none}
.arc-date{font-size:9px;font-weight:500;letter-spacing:.5px;color:var(--ink-ghost);width:65px;flex-shrink:0}
.arc-sdot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.arc-sdot.thriving{background:var(--moss-light)}.arc-sdot.ok{background:var(--ochre)}.arc-sdot.needs-love{background:var(--rust)}
.h-btns{display:flex;gap:6px;margin-top:10px}
.h-btn{flex:1;padding:8px 0;border:1px solid var(--border-md);background:none;font-family:'Jost',sans-serif;font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;color:var(--ink-mid);transition:all .15s}
.h-btn.sel{background:var(--moss);color:var(--parchment);border-color:var(--moss)}
.photo-prompt{background:var(--blush-mist);border-left:2px solid var(--blush);padding:12px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px}
.photo-prompt-text{font-size:12px;font-weight:300;color:var(--blush-deep);line-height:1.5;flex:1}
.photo-prompt-text strong{font-weight:500}
.photo-btn{padding:7px 12px;background:var(--moss);border:none;color:var(--parchment);font-family:'Jost',sans-serif;font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;white-space:nowrap}
.photo-strip{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px}
.photo-strip::-webkit-scrollbar{display:none}
.photo-thumb{flex-shrink:0;position:relative}
.photo-thumb img{width:76px;height:76px;object-fit:cover;display:block}
.photo-thumb-date{position:absolute;bottom:0;left:0;right:0;background:rgba(28,26,20,.55);font-size:8px;font-weight:500;color:var(--parchment);padding:3px 5px;text-align:center}
.photo-empty{font-size:12px;font-weight:300;color:var(--ink-ghost);font-style:italic}
.file-input{display:none}
.log-btns{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.log-btn{padding:7px 11px;border:1px solid var(--border-md);background:none;font-family:'Jost',sans-serif;font-size:9px;font-weight:500;letter-spacing:1px;text-transform:uppercase;cursor:pointer;color:var(--ink-mid);display:flex;align-items:center;gap:5px;transition:all .15s}
.log-btn:active{background:var(--moss);color:var(--parchment);border-color:var(--moss)}
.log-note-row{display:flex;gap:8px}
.log-input{flex:1;padding:9px 12px;border:1px solid var(--border-md);background:var(--linen);font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:var(--ink);outline:none}
.log-input:focus{border-color:var(--moss-mid)}
.log-save{padding:9px 14px;background:var(--moss);border:none;color:var(--parchment);font-family:'Jost',sans-serif;font-size:11px;font-weight:500;cursor:pointer}
.log-row{display:flex;gap:10px;padding:9px 0;border-top:1px solid var(--border);align-items:flex-start;font-size:12px;font-weight:300;color:var(--ink-mid)}
.log-row:first-child{border-top:none}
.log-date{font-size:9px;font-weight:500;letter-spacing:.5px;color:var(--ink-ghost);white-space:nowrap;margin-top:1px}
.ms-row{display:flex;gap:12px;padding:9px 0;border-top:1px solid var(--border);align-items:flex-start}
.ms-row:first-child{border-top:none}
.ms-text{font-size:13px;font-weight:300;color:var(--ink-mid);line-height:1.5;flex:1}
.ms-text strong{font-weight:500;color:var(--ink)}
.ms-date{font-size:9px;font-weight:500;letter-spacing:.5px;color:var(--ink-ghost);white-space:nowrap;margin-top:2px;flex-shrink:0}
.care-table{width:100%;border-collapse:collapse}
.care-table td{padding:9px 0;border-bottom:1px solid var(--border);font-size:13px}
.care-table td:first-child{font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-ghost);width:80px;padding-right:12px}
.care-table td:last-child{color:var(--ink-mid);font-weight:300}
.care-table tr:last-child td{border-bottom:none}
.origin-block{background:var(--linen);padding:14px 16px;border-left:2px solid var(--moss-pale)}
.origin-title{font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--moss-mid);margin-bottom:4px}
.origin-text{font-size:13px;font-weight:300;color:var(--ink-mid);line-height:1.65}
.fact-block{background:var(--linen);padding:14px 16px;border-left:2px solid var(--clay-light)}
.fact-text-i{font-family:'Cormorant Garamond',serif;font-size:15px;font-style:italic;font-weight:300;color:var(--ink-mid);line-height:1.7}
.bp-item{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px}
.bp-badge{font-size:8px;font-weight:500;letter-spacing:1px;text-transform:uppercase;padding:3px 8px;border:1px solid var(--border-md);color:var(--ink-mid);white-space:nowrap;flex-shrink:0;margin-top:2px}
.bp-text{font-size:12px;font-weight:300;color:var(--ink-mid);line-height:1.6}
.bp-text strong{font-weight:500;color:var(--ink)}
.tag-row{display:flex;flex-wrap:wrap;gap:6px}
.tag{padding:4px 10px;border:1px solid var(--border-dk);font-size:10px;font-weight:400;letter-spacing:.5px;color:var(--ink-mid)}
.detail-date{font-size:11px;font-weight:300;color:var(--ink-ghost);text-align:center;margin-top:24px;letter-spacing:.5px}
.view-header{padding:24px 24px 20px;border-bottom:1px solid var(--border-md)}
.view-title{font-family:'Fraunces',serif;font-size:26px;font-weight:300;color:var(--ink);margin-bottom:4px}
.view-sub{font-size:12px;font-weight:300;color:var(--ink-faint)}
.family-block{border-bottom:1px solid var(--border);padding:18px 20px}
.family-header{display:flex;align-items:baseline;gap:10px;margin-bottom:8px}
.family-swatch{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.family-name-t{font-family:'Fraunces',serif;font-size:18px;font-weight:400;color:var(--ink)}
.family-order-t{font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-ghost)}
.family-desc-t{font-size:12px;font-weight:300;color:var(--ink-faint);line-height:1.7;margin-bottom:12px;padding-left:18px}
.family-members-t{padding-left:18px}
.family-member-t{display:flex;align-items:center;gap:12px;padding:9px 0;border-top:1px solid var(--border);cursor:pointer}
.family-member-t:first-child{border-top:none}
.fm-sil{width:36px;height:36px;background:var(--linen);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.fm-nick{font-size:8px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--blush-deep)}
.fm-name{font-family:'Fraunces',serif;font-size:13px;font-weight:400;color:var(--ink)}
.fm-bot{font-family:'Cormorant Garamond',serif;font-size:11px;font-style:italic;color:var(--ink-faint)}
.cousin-note{margin:0 20px 16px;padding:12px 14px;background:var(--linen);border-left:2px solid var(--moss-pale);font-size:12px;font-weight:300;color:var(--moss-mid);line-height:1.7}
.cousin-note strong{font-weight:500;color:var(--moss)}
.ben-header{background:var(--moss);padding:24px 24px 0}
.ben-title{font-family:'Fraunces',serif;font-size:26px;font-weight:200;font-style:italic;color:var(--parchment);margin-bottom:4px}
.ben-sub{font-size:11px;font-weight:300;color:var(--moss-pale);opacity:.8;padding-bottom:20px}
.ben-cats{display:flex;overflow-x:auto;scrollbar-width:none;background:var(--moss);border-top:1px solid rgba(255,255,255,.08)}
.ben-cats::-webkit-scrollbar{display:none}
.ben-cat{flex-shrink:0;padding:11px 14px;font-family:'Jost',sans-serif;font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:none;background:none;color:rgba(255,255,255,.35);border-bottom:2px solid transparent;transition:all .18s;white-space:nowrap}
.ben-cat.active{color:var(--moss-pale);border-bottom-color:var(--moss-pale)}
.ben-plant-row{border-bottom:1px solid var(--border)}
.ben-plant-head{display:flex;align-items:center;gap:12px;padding:14px 20px;cursor:pointer;transition:background .15s}
.ben-plant-head:active{background:var(--linen)}
.ben-sil{width:40px;height:40px;background:var(--linen);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ben-plant-name{font-family:'Fraunces',serif;font-size:15px;font-weight:400;color:var(--ink);flex:1}
.ben-plant-nick{font-size:8px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--blush-deep);margin-bottom:2px}
.ben-count{font-size:9px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--ink-ghost)}
.ben-chev{color:var(--ink-ghost);transition:transform .2s}
.ben-chev.open{transform:rotate(180deg)}
.ben-items{padding:0 20px 14px}
.ben-row{display:flex;gap:12px;padding:11px 0;border-top:1px solid var(--border);align-items:flex-start}
.ben-lbl{font-size:8px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-ghost);width:60px;flex-shrink:0;padding-top:2px}
.ben-body{font-size:12px;font-weight:300;color:var(--ink-mid);line-height:1.65;flex:1}
.ben-body strong{font-weight:500;color:var(--ink)}
.map-cont{height:260px;background:#2A3A4A}
.map-svg{width:100%;height:100%;display:block}
.region-row{border-top:1px solid var(--border);padding:14px 20px;cursor:pointer}
.region-row:last-child{border-bottom:1px solid var(--border)}
.region-head{display:flex;align-items:center;gap:10px}
.region-sw{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.region-name{font-family:'Fraunces',serif;font-size:16px;font-weight:400;color:var(--ink);flex:1}
.region-count{font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-ghost)}
.region-body{padding:10px 0 0 17px}
.region-desc{font-size:12px;font-weight:300;color:var(--ink-faint);line-height:1.65;margin-bottom:10px}
.region-chips{display:flex;flex-wrap:wrap;gap:6px}
.region-chip{padding:4px 10px;border:1px solid var(--border-md);font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--ink-mid);cursor:pointer}
.tl-year{padding:13px 20px 9px;font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink-ghost);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10;background:var(--parchment)}
.tl-row{display:flex;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s}
.tl-row:active{background:var(--linen)}
.tl-spine{width:44px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;padding-top:18px}
.tl-dot{width:7px;height:7px;border-radius:50%;border:1.5px solid var(--parchment);flex-shrink:0}
.tl-dot.thriving{background:var(--moss-light)}.tl-dot.ok{background:var(--ochre)}.tl-dot.needs-love{background:var(--rust)}
.tl-line{width:1px;flex:1;background:var(--border-md);margin-top:5px}
.tl-content{flex:1;padding:16px 18px 16px 0;display:flex;gap:12px}
.tl-sil{width:56px;height:56px;flex-shrink:0;background:var(--linen);display:flex;align-items:center;justify-content:center}
.tl-info{flex:1}
.tl-date{font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-ghost);margin-bottom:3px}
.tl-nick{font-size:8px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--blush-deep);margin-bottom:2px}
.tl-name{font-family:'Fraunces',serif;font-size:15px;font-weight:400;color:var(--ink);margin-bottom:1px}
.tl-bot{font-family:'Cormorant Garamond',serif;font-size:11px;font-style:italic;font-weight:300;color:var(--ink-faint);margin-bottom:4px}
.tl-age{font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--moss-mid)}
.stats-hero{background:var(--ink);padding:24px;display:grid;grid-template-columns:1fr 1fr 1fr}
.stat-cell{text-align:center;padding:0 8px}
.stat-cell:not(:last-child){border-right:1px solid rgba(255,255,255,.08)}
.stat-num{font-family:'Fraunces',serif;font-size:34px;font-weight:200;color:var(--parchment);line-height:1}
.stat-lbl{font-size:8px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--moss-pale);opacity:.6;margin-top:4px}
.stats-sec{padding:20px 22px 0}
.stats-sec-lbl{font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink-ghost);margin-bottom:14px}
.bar-row{display:flex;align-items:center;gap:10px;margin-bottom:9px}
.bar-lbl{font-size:11px;font-weight:300;color:var(--ink-mid);width:110px;flex-shrink:0}
.bar-track{flex:1;height:2px;background:var(--linen-dark)}
.bar-fill{height:100%;background:var(--moss-light);transition:width .8s cubic-bezier(.34,1.2,.64,1)}
.bar-n{font-size:10px;font-weight:500;color:var(--ink-ghost);width:18px;text-align:right}
.fact-row-s{display:flex;gap:12px;padding:12px 0;border-top:1px solid var(--border);align-items:flex-start}
.fact-row-s:first-child{border-top:none}
.fact-text-s{font-size:13px;font-weight:300;color:var(--ink-mid);line-height:1.6}
.fact-text-s strong{font-weight:500;color:var(--ink)}
.form-head{padding:22px 22px 18px;border-bottom:1px solid var(--border-md)}
.form-title{font-family:'Fraunces',serif;font-size:22px;font-weight:400;color:var(--ink)}
.form-body{padding:18px 22px}
.form-group{margin-bottom:14px}
.form-lbl{display:block;font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-ghost);margin-bottom:7px}
.form-in,.form-sel,.form-ta{width:100%;padding:11px 13px;border:1px solid var(--border-md);background:var(--linen);font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);outline:none;transition:border-color .18s;border-radius:0}
.form-in:focus,.form-sel:focus,.form-ta:focus{border-color:var(--moss-mid)}
.form-ta{resize:none;height:76px}
.form-sel{appearance:none;cursor:pointer}
.form-submit{width:100%;padding:14px;background:var(--moss);color:var(--parchment);border:none;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;margin-top:8px}
.empty{text-align:center;padding:56px 24px}
.empty h3{font-family:'Fraunces',serif;font-size:20px;font-weight:300;color:var(--ink-mid);margin-bottom:8px}
.empty p{font-size:13px;font-weight:300;color:var(--ink-faint);line-height:1.6}
`;

const Ic = ({n,size=20,stroke="currentColor",sw=1.5})=>{
  const d={
    leaf:<><path d="M2 22L12 12"/><path d="M12 2C12 2 22 8 22 15C22 19.4 17.4 22 12 22C6.6 22 2 19.4 2 15C2 8 12 2 12 2Z"/></>,
    dna:<><path d="M2 15c6.667-6 13.333-6 20 0"/><path d="M2 9c6.667 6 13.333 6 20 0"/><path d="M2 9v6M22 9v6"/></>,
    globe:<><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    sparkle:<><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></>,
    time:<><path d="M12 22c10 0 10-20 0-20S2 12 12 12"/><polyline points="12 6 12 12 16 14"/></>,
    plus:<><path d="M12 5v14M5 12h14"/></>,
    x:<><path d="M18 6L6 18M6 6l12 12"/></>,
    chev:<path d="M6 9l6 6 6-6"/>,
    drop:<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>,
    heart:<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    star:<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
    sprout:<><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/></>,
    ok:<polyline points="20 6 9 17 4 12"/>,
    grid:<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    list:<><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M3 15h18M9 3v18"/></>,
    link:<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    pen:<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    cam:<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d[n]}</svg>;
};

const SFN={
  monstera:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 42" stroke={f} strokeWidth="1.5" strokeLinecap="round"/><path d="M40 42C28 36 14 28 20 14C26 4 40 14 40 42Z" fill={f} opacity=".9"/><path d="M40 42C52 36 66 28 60 14C54 4 40 14 40 42Z" fill={f} opacity=".9"/></svg>,
  hearts:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 10L40 72" stroke={f} strokeWidth="1.5" strokeLinecap="round"/>{[20,36,52,65].map((y,i)=><path key={i} d={`M40 ${y}C37 ${y-5} 30 ${y-5} 30 ${y+2}C30 ${y+7} 35 ${y+9} 40 ${y+14}C45 ${y+9} 50 ${y+7} 50 ${y+2}C50 ${y-5} 43 ${y-5} 40 ${y}Z`} fill={f} opacity={1-.15*i}/>)}</svg>,
  willow:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 22" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 22C36 14 28 10 30 6" stroke={f} strokeWidth="1.5" strokeLinecap="round"/><path d="M40 22C44 14 52 10 50 6" stroke={f} strokeWidth="1.5" strokeLinecap="round"/>{[[28,40,18,62],[32,44,22,66],[48,40,62,62],[46,44,58,66]].map(([x1,y1,x2,y2],i)=><path key={i} d={`M${x1} ${y1}Q${x1-4} ${(y1+y2)/2} ${x2} ${y2}`} stroke={f} strokeWidth="1" strokeLinecap="round" opacity={.7-.05*i}/>)}</svg>,
  moneytree:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72C38 60 36 50 40 40C44 50 42 60 40 72Z" fill={f}/><path d="M40 40C26 34 16 22 22 12C28 4 40 12 40 40Z" fill={f} opacity=".9"/><path d="M40 40C54 34 64 22 58 12C52 4 40 12 40 40Z" fill={f} opacity=".9"/></svg>,
  fiddle:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 40" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 40C22 38 12 24 18 12C24 4 40 10 40 40Z" fill={f} opacity=".9"/><path d="M40 40C58 38 68 24 62 12C56 4 40 10 40 40Z" fill={f} opacity=".9"/></svg>,
  hoya:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><ellipse cx="29" cy="40" rx="6" ry="9" transform="rotate(-15 29 40)" fill={f} opacity=".8"/><ellipse cx="51" cy="40" rx="6" ry="9" transform="rotate(15 51 40)" fill={f} opacity=".8"/><ellipse cx="33" cy="26" rx="5" ry="7" transform="rotate(-20 33 26)" fill={f} opacity=".7"/><ellipse cx="47" cy="26" rx="5" ry="7" transform="rotate(20 47 26)" fill={f} opacity=".7"/><path d="M40 72Q40 50 40 40" stroke={f} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  pothos:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M52 30C62 26 66 16 60 12C54 8 46 14 52 30Z" fill={f} opacity=".9"/><path d="M28 30C18 26 14 16 20 12C26 8 34 14 28 30Z" fill={f} opacity=".9"/><path d="M40 14Q52 28 64 48" stroke={f} strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M40 14Q28 28 16 48" stroke={f} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>,
  ivy:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M34 32C24 26 18 16 23 10C28 5 37 10 34 32Z" fill={f} opacity=".9"/><path d="M34 50C22 44 16 32 21 24C26 16 36 20 34 50Z" fill={f} opacity=".85"/><path d="M36 18C44 12 54 10 55 18C56 26 46 28 36 18Z" fill={f} opacity=".85"/><path d="M40 72Q37 56 34 40Q31 24 34 12" stroke={f} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>,
  swiss:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 40" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 40C24 38 12 26 17 14C22 6 40 12 40 40Z" fill={f} opacity=".9"/><path d="M40 40C56 38 68 26 63 14C58 6 40 12 40 40Z" fill={f} opacity=".9"/><circle cx="28" cy="26" r="5" fill="#E2D8C4" opacity=".45"/><circle cx="52" cy="26" r="5" fill="#E2D8C4" opacity=".45"/></svg>,
  africamilk:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 12" stroke={f} strokeWidth="3" strokeLinecap="round"/>{[24,36,48,60].map((y,i)=><g key={i}><path d={`M40 ${y}L${28-i} ${y-10}`} stroke={f} strokeWidth="2" strokeLinecap="round"/><path d={`M40 ${y}L${52+i} ${y-10}`} stroke={f} strokeWidth="2" strokeLinecap="round"/></g>)}</svg>,
  philo:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 42" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 42C24 38 14 24 20 12C26 4 40 14 40 42Z" fill={f} opacity=".9"/><path d="M40 42C56 38 66 24 60 12C54 4 40 14 40 42Z" fill={f} opacity=".9"/></svg>,
  spider:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 46" stroke={f} strokeWidth="2" strokeLinecap="round"/>{[[28,38,16,22],[52,38,64,22],[26,42,12,36],[54,42,68,36],[32,32,28,16],[48,32,52,16]].map(([x1,y1,x2,y2],i)=><path key={i} d={`M40 46Q${x1} ${y1} ${x2} ${y2}`} stroke={f} strokeWidth="1.5" strokeLinecap="round" fill="none"/>)}</svg>,
  croton:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 38" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 38C24 34 14 20 20 10C26 2 40 12 40 38Z" fill={f} opacity=".9"/><path d="M40 38C56 34 66 20 60 10C54 2 40 12 40 38Z" fill={f} opacity=".9"/></svg>,
  seaonion:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="60" rx="16" ry="14" fill={f} opacity=".6"/><ellipse cx="40" cy="60" rx="16" ry="14" stroke={f} strokeWidth="1.5" fill="none"/>{[30,36,40,44,50].map((x,i)=><path key={i} d={`M${x} ${54-i*2}Q${x} ${34} ${x} 12`} stroke={f} strokeWidth="1" strokeLinecap="round" fill="none" opacity=".8"/>)}</svg>,
  christmas:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 52" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 52Q28 46 20 36Q14 26 20 20Q26 14 34 20Q38 26 40 34" fill={f} opacity=".9"/><path d="M40 52Q52 46 60 36Q66 26 60 20Q54 14 46 20Q42 26 40 34" fill={f} opacity=".9"/></svg>,
  chocosoldier:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 52" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 52C30 46 26 36 30 28C34 22 40 32 40 52Z" fill={f} opacity=".9"/><path d="M40 52C50 46 54 36 50 28C46 22 40 32 40 52Z" fill={f} opacity=".9"/><path d="M40 34C32 28 28 18 32 12C36 8 40 18 40 34Z" fill={f} opacity=".8"/><path d="M40 34C48 28 52 18 48 12C44 8 40 18 40 34Z" fill={f} opacity=".8"/></svg>,
  stringarrows:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 10L40 72" stroke={f} strokeWidth="1.5" strokeLinecap="round"/>{[22,36,50,64].map((y,i)=><g key={i}><path d={`M40 ${y}L26 ${y-6}L30 ${y}L26 ${y+6}L40 ${y}Z`} fill={f} opacity={.9-.1*i}/><path d={`M40 ${y}L54 ${y-6}L50 ${y}L54 ${y+6}L40 ${y}Z`} fill={f} opacity={.9-.1*i}/></g>)}</svg>,
  jade:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 48" stroke={f} strokeWidth="2.5" strokeLinecap="round"/><path d="M40 48L26 34M40 48L54 34" stroke={f} strokeWidth="2" strokeLinecap="round"/><ellipse cx="16" cy="20" rx="6" ry="8" fill={f} opacity=".8"/><ellipse cx="64" cy="20" rx="6" ry="8" fill={f} opacity=".8"/><ellipse cx="28" cy="16" rx="5" ry="7" fill={f} opacity=".8"/><ellipse cx="52" cy="16" rx="5" ry="7" fill={f} opacity=".8"/></svg>,
  moonlight:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 42" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 42C22 38 12 22 18 10C24 2 40 14 40 42Z" fill={f} opacity=".9"/><path d="M40 42C58 38 68 22 62 10C56 2 40 14 40 42Z" fill={f} opacity=".9"/><path d="M20 28C10 22 9 12 15 8" stroke={f} strokeWidth="2" opacity=".6" strokeLinecap="round"/><path d="M60 28C70 22 71 12 65 8" stroke={f} strokeWidth="2" opacity=".6" strokeLinecap="round"/></svg>,
  olive:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 44" stroke={f} strokeWidth="2.5" strokeLinecap="round"/><path d="M40 44L26 32L18 20M40 44L54 32L62 20" stroke={f} strokeWidth="1.5" strokeLinecap="round" fill="none"/>{[14,22,30,38,46,54,62].map((x,i)=><ellipse key={i} cx={x} cy={10+Math.sin(i*.9)*7} rx="3" ry="5" transform={`rotate(${-20+i*5} ${x} ${10+Math.sin(i*.9)*7})`} fill={f} opacity=".75"/>)}</svg>,
  def:(f,s)=><svg width={s} height={s} viewBox="0 0 80 80" fill="none"><path d="M40 72L40 38" stroke={f} strokeWidth="2" strokeLinecap="round"/><path d="M40 38C24 34 14 22 20 10C26 2 40 14 40 38Z" fill={f} opacity=".9"/><path d="M40 38C56 34 66 22 60 10C54 2 40 14 40 38Z" fill={f} opacity=".9"/></svg>,
};
const SMAP={"Monstera Deliciosa":"monstera","String of Hearts":"hearts","Dwarf Chenille Plant":"def","Salix Caprea Pendula":"willow","Money Tree":"moneytree","Fiddle Leaf Fig":"fiddle","Hoya Burtoniae":"hoya","Golden Pothos":"pothos","English Ivy":"ivy","Swiss Cheese Plant":"swiss","African Milk Tree":"africamilk","Pink Princess Philodendron":"philo","Philodendron White Princess":"philo","Spider Plant Bonnie":"spider","Croton Petra":"croton","Climbing Sea Onion":"seaonion","Christmas Cactus":"christmas","Chocolate Soldier Plant":"chocosoldier","String of Arrows":"stringarrows","Jade Plant":"jade","Moonlight Philodendron":"moonlight","Olea Europaea Mission":"olive"};
const Sil=({name,size=64,fill="var(--moss)"})=>{const fn=SFN[SMAP[name]]||SFN.def;return fn(fill,size);};

function Panorama(){
  const W=430,H=200,gY=168;
  const PL=[
    {n:"Salix Caprea Pendula",x:30,sc:1.3,z:1},{n:"Fiddle Leaf Fig",x:84,sc:1.2,z:2},
    {n:"African Milk Tree",x:140,sc:1.1,z:1},{n:"Monstera Deliciosa",x:196,sc:1.15,z:3},
    {n:"Money Tree",x:250,sc:1.05,z:2},{n:"Swiss Cheese Plant",x:302,sc:.95,z:1},
    {n:"Moonlight Philodendron",x:355,sc:1.1,z:2},{n:"Fiddle Leaf Fig",x:406,sc:1.0,z:1},
    {n:"String of Hearts",x:58,sc:.65,z:4,yo:28},{n:"Golden Pothos",x:118,sc:.6,z:4,yo:32},
    {n:"Hoya Burtoniae",x:220,sc:.68,z:4,yo:26},{n:"Spider Plant Bonnie",x:328,sc:.58,z:4,yo:30},
    {n:"English Ivy",x:172,sc:.6,z:4,yo:36},{n:"Climbing Sea Onion",x:280,sc:.7,z:4,yo:20},
  ];
  return(
    <svg viewBox={`0 0 ${W} ${H}`} className="scene-painting" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="psk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1A2016"/><stop offset="100%" stopColor="#2C3D28"/></linearGradient>
        <radialGradient id="pgl" cx="50%" cy="85%" r="55%"><stop offset="0%" stopColor="#3D5535" stopOpacity=".4"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        <radialGradient id="pvg" cx="50%" cy="50%" r="70%"><stop offset="55%" stopColor="transparent"/><stop offset="100%" stopColor="#0A0C08" stopOpacity=".55"/></radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#psk)"/>
      <rect width={W} height={H} fill="url(#pgl)"/>
      {[{y:gY,c:"#1C2418"},{y:gY+10,c:"#141610"},{y:gY+18,c:"#0E0F0A"}].map((g,i)=><rect key={i} x={0} y={g.y} width={W} height={H-g.y} fill={g.c}/>)}
      <rect x={0} y={gY-8} width={W} height={6} fill="#C4D4BC" opacity=".1" rx="3"/>
      {[...PL].sort((a,b)=>(a.z)-(b.z)).map((p,i)=>{
        const sh=86*p.sc,sw=68*p.sc,yb=gY-sh+12-(p.yo||0),op=.5+p.z*.1,fc=p.z>2?"#6B8A60":"#3D5535";
        return <g key={i} transform={`translate(${p.x-sw/2},${yb})`} opacity={op}><ellipse cx={sw/2} cy={sh-6} rx={sw*0.38} ry={6} fill={fc} opacity=".18"/>{(SFN[SMAP[p.n]]||SFN.def)(fc,sw)}</g>;
      })}
      <rect x={0} y={gY+8} width={W} height={H-gY} fill="#0A0C08" opacity=".65"/>
      <rect width={W} height={H} fill="url(#pvg)"/>
    </svg>
  );
}

const CATS=["All","Tropical","Trailing","Succulent","Rare","Other"];
const HL={thriving:"Thriving",ok:"Okay","needs-love":"Needs love"};
const BCATS=["All","Medicinal","Air","Edible","Cultural","Folklore","Feng Shui"];
const LOG_TYPES=[{type:"watered",icon:"drop",label:"Watered"},{type:"fertilised",icon:"sparkle",label:"Fertilised"},{type:"repotted",icon:"sprout",label:"Repotted"},{type:"new-leaf",icon:"leaf",label:"New leaf"},{type:"pest",icon:"x",label:"Pest"},{type:"trimmed",icon:"ok",label:"Trimmed"}];
const HV={thriving:3,ok:2,"needs-love":1};
const HC={thriving:"var(--moss-light)",ok:"var(--ochre)","needs-love":"var(--rust)"};

const ORIGINS={"Monstera Deliciosa":{country:"Mexico & Panama",desc:"An epiphyte in humid cloud forests, climbing trees toward filtered light."},"String of Hearts":{country:"South Africa & Zimbabwe",desc:"Trails over rocky outcrops in dry scrubland, storing water in its tubers."},"Dwarf Chenille Plant":{country:"Malaysia & Indonesia",desc:"Thrives in warm humid jungle margins."},"Salix Caprea Pendula":{country:"British Isles to Caucasus",desc:"Grows along stream banks in cool moist climates."},"Money Tree":{country:"Mexico to Honduras",desc:"Found in swampy wetlands and riverbanks."},"Fiddle Leaf Fig":{country:"Sierra Leone to Cameroon",desc:"Grows in humid lowland jungle clearings."},"Hoya Burtoniae":{country:"Philippines",desc:"An epiphyte on mossy tree branches in Philippine cloud forests."},"Golden Pothos":{country:"Solomon Islands",desc:"Originally from a single island, now one of the world's most distributed houseplants."},"English Ivy":{country:"Europe & Western Asia",desc:"Climbs walls and tree trunks across temperate woodlands."},"Swiss Cheese Plant":{country:"Mexico & Central America",desc:"A climbing rainforest vine with fenestrated leaves."},"African Milk Tree":{country:"Central Africa",desc:"Grows in dry rocky savanna landscapes."},"Pink Princess Philodendron":{country:"Colombia",desc:"Found in humid Andean cloud forests."},"Philodendron White Princess":{country:"South America",desc:"Rare variegated form from tropical rainforest understory."},"Spider Plant Bonnie":{country:"South & Coastal Africa",desc:"Grows in rocky grasslands, producing arching runners naturally."},"Croton Petra":{country:"Indonesia & Pacific Islands",desc:"Thrives in open forest clearings, vivid in full sun."},"Climbing Sea Onion":{country:"Tanzania & East Africa",desc:"Grows in rocky coastal scrub, bulb exposed above soil."},"Christmas Cactus":{country:"Coastal Mountains of Brazil",desc:"Epiphytic in humid montane rainforests."},"Chocolate Soldier Plant":{country:"Mexico",desc:"Grows in dry rocky slopes, adapted to intense sun."},"String of Arrows":{country:"South Africa",desc:"Trails over rocks in dry scrubland."},"Jade Plant":{country:"South Africa & Mozambique",desc:"Grows in rocky coastal and inland scrub."},"Moonlight Philodendron":{country:"South America",desc:"Cultivated hybrid, ancestors found in Amazonian understory."},"Olea Europaea Mission":{country:"Mediterranean Basin",desc:"Grown across the Mediterranean for millennia in dry hillsides."}};

const REGIONS=[{id:"c-am",name:"Central America",color:"#4A7A5A",plants:["Monstera Deliciosa","Money Tree","Swiss Cheese Plant","Christmas Cactus"],desc:"Steamy tropical rainforests from Mexico to Panama.",mapX:18,mapY:42},{id:"s-am",name:"South America",color:"#7A5A4A",plants:["Pink Princess Philodendron","Philodendron White Princess","Moonlight Philodendron"],desc:"Andean cloud forests and Amazonian understory.",mapX:22,mapY:56},{id:"w-afr",name:"West Africa",color:"#8B6914",plants:["Fiddle Leaf Fig"],desc:"Humid lowland jungles.",mapX:47,mapY:45},{id:"e-afr",name:"East Africa",color:"#A07840",plants:["African Milk Tree","Climbing Sea Onion","Spider Plant Bonnie"],desc:"Rocky savanna and coastal scrubland.",mapX:53,mapY:50},{id:"s-afr",name:"Southern Africa",color:"#C4922A",plants:["String of Hearts","String of Arrows","Jade Plant"],desc:"Rocky semi-arid savannas.",mapX:51,mapY:60},{id:"sea",name:"Southeast Asia",color:"#6A4A3A",plants:["Dwarf Chenille Plant","Hoya Burtoniae","Golden Pothos","Croton Petra"],desc:"Malaysian jungles to Philippine cloud forests.",mapX:74,mapY:45},{id:"eur",name:"Europe & W. Asia",color:"#4A5A6A",plants:["Salix Caprea Pendula","English Ivy","Olea Europaea Mission"],desc:"Temperate woodlands and Mediterranean hillsides.",mapX:51,mapY:32}];

const FAMILIES=[{name:"Araceae",order:"Alismatales",color:"#4A7A5A",desc:"The most iconic houseplant family on Earth.",members:["Monstera Deliciosa","Golden Pothos","English Ivy","Swiss Cheese Plant","Pink Princess Philodendron","Philodendron White Princess","Moonlight Philodendron"],sharedTraits:"All thrive in humid indirect light and purify air."},{name:"Apocynaceae",order:"Gentianales",color:"#7A5A8A",desc:"The dogbane family — succulents, vines, and flowering tropicals.",members:["String of Hearts","Hoya Burtoniae","String of Arrows"],sharedTraits:"All are trailing vines storing water and producing intricate flowers."},{name:"Euphorbiaceae",order:"Malpighiales",color:"#8A4A3A",desc:"The spurge family — 7,000+ species from rainforest to desert.",members:["Dwarf Chenille Plant","African Milk Tree","Croton Petra"],sharedTraits:"All contain milky latex sap."},{name:"Salicaceae",order:"Malpighiales",color:"#4A5A7A",desc:"The willow family — ancient trees that gave us the precursor to aspirin.",members:["Salix Caprea Pendula"],sharedTraits:"The sole weeping tree in your collection."},{name:"Malvaceae",order:"Malvales",color:"#8A6A2A",desc:"Home to cotton, cacao, hibiscus, and the Money Tree.",members:["Money Tree"],sharedTraits:"A family of remarkable generosity to humanity."},{name:"Moraceae",order:"Rosales",color:"#6A5A3A",desc:"The mulberry family — figs and the sacred Bodhi tree.",members:["Fiddle Leaf Fig"],sharedTraits:"Shares family with the tree of Buddha's enlightenment."},{name:"Asparagaceae",order:"Asparagales",color:"#5A7A6A",desc:"A diverse group including spider plants and agave.",members:["Spider Plant Bonnie","Climbing Sea Onion"],sharedTraits:"Both produce offset plantlets."},{name:"Cactaceae",order:"Caryophyllales",color:"#8A7A5A",desc:"Succulent plants native to the Americas.",members:["Christmas Cactus","Chocolate Soldier Plant"],sharedTraits:"Both succulents with distinctive padded forms."},{name:"Crassulaceae",order:"Saxifragales",color:"#6A8A5A",desc:"The stonecrop family — drought-tolerant succulents.",members:["Jade Plant"],sharedTraits:"Stores water in thick leaves. Extremely long-lived."},{name:"Oleaceae",order:"Lamiales",color:"#7A6A4A",desc:"The olive family — cultivated for thousands of years.",members:["Olea Europaea Mission"],sharedTraits:"One of the oldest cultivated plant families."},{name:"Araliaceae",order:"Apiales",color:"#5A6A4A",desc:"The ivy family — shade-loving climbers.",members:["English Ivy"],sharedTraits:"Remarkable adaptability to low light."}];

const BENEFITS={"Monstera Deliciosa":[{cat:"Air",text:"<strong>Removes formaldehyde and benzene</strong> from indoor air. Ranked among NASA's most effective air purifiers."},{cat:"Edible",text:"<strong>The fruit is edible when fully ripe</strong> — tasting like pineapple and banana."},{cat:"Cultural",text:"<strong>Deeply embedded in Mexican craft traditions.</strong>"},{cat:"Folklore",text:"<strong>Called 'the delicious monster'</strong> by early naturalists who believed it carnivorous."}],"String of Hearts":[{cat:"Medicinal",text:"<strong>Used in traditional Zulu medicine</strong> for abdominal pain."},{cat:"Folklore",text:"<strong>Known as 'Rosary Vine'</strong> — thought to bring protection."},{cat:"Feng Shui",text:"<strong>Placed in the southwest corner</strong> to attract romantic harmony."}],"English Ivy":[{cat:"Air",text:"<strong>NASA top-ranked air purifier</strong> — effective against benzene and formaldehyde."},{cat:"Medicinal",text:"<strong>Ivy extract is still used in modern cough syrups.</strong>"},{cat:"Folklore",text:"<strong>Symbol of fidelity and eternal life</strong> in ancient Greece and Rome."}],"Swiss Cheese Plant":[{cat:"Air",text:"<strong>A powerful oxygen producer</strong> — large-leafed Araceae release significant oxygen."},{cat:"Cultural",text:"<strong>The fenestrated leaf is one of the most recognised shapes in modern design.</strong>"},{cat:"Folklore",text:"<strong>Placed in the east corner</strong> for good fortune in Mexican folk belief."}],"African Milk Tree":[{cat:"Cultural",text:"<strong>Used as a living fence</strong> in its native range to protect crops."},{cat:"Folklore",text:"<strong>The three-sided stem</strong> is symbolic of the Holy Trinity in some communities."},{cat:"Medicinal",text:"<strong>Latex used in traditional African medicine</strong> for skin conditions."}],"Pink Princess Philodendron":[{cat:"Air",text:"<strong>Processes VOCs effectively</strong> as a Philodendron."},{cat:"Cultural",text:"<strong>Individual specimens sold for over $1,000</strong> during the 2020s plant boom."},{cat:"Folklore",text:"<strong>The pink variegation cannot be reliably reproduced</strong> — each plant is a genetic original."}],"Philodendron White Princess":[{cat:"Air",text:"<strong>Effective at removing airborne toxins</strong> as part of the Araceae family."},{cat:"Feng Shui",text:"<strong>White in feng shui represents clarity</strong> — said to bring mental and creative clarity."}],"Spider Plant Bonnie":[{cat:"Air",text:"<strong>Highly effective against formaldehyde and xylene.</strong>"},{cat:"Cultural",text:"<strong>The curled leaf form</strong> is a single natural mutation found in one plant in the 1960s."}],"Croton Petra":[{cat:"Cultural",text:"<strong>A mainstay of tropical garden design</strong> across Southeast Asia and the Caribbean."},{cat:"Folklore",text:"<strong>In Hawaiian tradition</strong>, associated with spiritual protection."}],"Climbing Sea Onion":[{cat:"Medicinal",text:"<strong>The bulb contains cardiac glycosides</strong> historically used to treat heart conditions."},{cat:"Folklore",text:"<strong>Believed to bring good luck</strong> — vines from a single bulb represent persistent growth."}],"Christmas Cactus":[{cat:"Cultural",text:"<strong>One of the world's most popular flowering houseplants</strong> — a traditional gift for generations."},{cat:"Folklore",text:"<strong>Brazilian legend holds</strong> a poor child prayed for a gift and the plant bloomed."}],"Jade Plant":[{cat:"Feng Shui",text:"<strong>Called the 'money plant'</strong> — round leaves resemble coins, attract wealth."},{cat:"Folklore",text:"<strong>Given as a wedding gift in Xhosa tradition</strong> — can live 100+ years."}],"Moonlight Philodendron":[{cat:"Air",text:"<strong>Removes formaldehyde and VOCs.</strong>"},{cat:"Folklore",text:"<strong>Finding a perfect leaf unfurling at night</strong> is considered an omen of creative inspiration."}],"Olea Europaea Mission":[{cat:"Edible",text:"<strong>'Mission' was developed by Spanish missionaries in 1700s California</strong> and can produce edible olives."},{cat:"Cultural",text:"<strong>The olive branch is one of humanity's oldest peace symbols.</strong>"}],"Dwarf Chenille Plant":[{cat:"Medicinal",text:"<strong>Used in traditional Southeast Asian medicine</strong> for skin conditions."},{cat:"Folklore",text:"<strong>Planted near doorways in Indonesian tradition</strong> to ward off negative energy."}],"Salix Caprea Pendula":[{cat:"Medicinal",text:"<strong>Willow bark contains salicin</strong> — the compound from which aspirin was synthesised."},{cat:"Folklore",text:"<strong>Sacred to the moon goddess</strong> in Celtic tradition."}],"Money Tree":[{cat:"Feng Shui",text:"<strong>The braided trunk and five-leaf clusters</strong> represent the five elements — activates abundance."},{cat:"Cultural",text:"<strong>A Taiwanese truck driver braided five plants</strong> in the 1980s — sparking a global craze."}],"Fiddle Leaf Fig":[{cat:"Cultural",text:"<strong>Fig trees mark sacred boundaries</strong> in West African cultures."},{cat:"Folklore",text:"<strong>The Bodhi tree of Buddha's enlightenment</strong> was a Ficus — a direct cousin."}],"Hoya Burtoniae":[{cat:"Cultural",text:"<strong>Gifted at weddings in the Philippines</strong> as a symbol of enduring love."},{cat:"Folklore",text:"<strong>A flowering hoya foretells good fortune</strong> — star flowers associated with answered prayers."}],"Golden Pothos":[{cat:"Air",text:"<strong>NASA's top pick</strong> for removing benzene, formaldehyde, xylene, and carbon monoxide."},{cat:"Folklore",text:"<strong>Known as 'Devil's Ivy'</strong> — refuses to die even in the dark."}],"String of Arrows":[{cat:"Folklore",text:"<strong>Arrow-shaped leaves were protective symbols</strong> in Southern African tradition."},{cat:"Cultural",text:"<strong>Far rarer than String of Hearts in cultivation</strong> — a true collector's plant."}],"Chocolate Soldier Plant":[{cat:"Medicinal",text:"<strong>The pads were used topically</strong> in Mexican folk medicine to soothe sunburn."},{cat:"Cultural",text:"<strong>The velvety markings</strong> are a naturally occurring camouflage pattern."}]};

const UNDERRATED={"Monstera Deliciosa":"Its fruit takes 14 months to ripen — longer than almost any other edible plant.","String of Hearts":"The tubers on its roots can be replanted to grow entirely new plants.","Dwarf Chenille Plant":"The fuzzy catkins are not flowers — they're clusters of hundreds of tiny true flowers.","Salix Caprea Pendula":"Willow roots seek water so aggressively they can penetrate concrete pipes.","Money Tree":"The 'braided' trunk is actually 5 separate trees twisted together while young.","Fiddle Leaf Fig":"In the wild it grows to 15 metres — a genuine full-sized jungle tree.","Hoya Burtoniae":"Its star-shaped flowers drip nectar so sweet it can fall — don't place it over furniture.","Golden Pothos":"The same species can look completely different depending on the light it grows in.","English Ivy":"It doesn't damage brick — it clings to mortar, which is already weakening.","Swiss Cheese Plant":"The holes evolved to survive hurricane-force winds on the jungle floor.","African Milk Tree":"It's not a cactus — it's a Euphorbia, convergently evolved to look like one.","Pink Princess Philodendron":"The pink sections have no chlorophyll — they cannot photosynthesise at all.","Philodendron White Princess":"A leaf can be half white — the plant survives entirely on the green half.","Spider Plant Bonnie":"The curled leaf form is a single natural mutation found in one plant in the 1960s.","Croton Petra":"The brighter the light, the more vivid — essentially a living mood ring.","Climbing Sea Onion":"The bulb can live for decades out of soil — just sitting on a shelf, still alive.","Christmas Cactus":"Blooming is triggered by darkness, not cold — covering it at night induces flowers.","Chocolate Soldier Plant":"The soft velvety texture is made of tiny hair-like structures called trichomes.","String of Arrows":"Its leaves are so varied botanists once classified it as multiple different species.","Jade Plant":"A healthy jade can live for over 100 years — some are passed down as heirlooms.","Moonlight Philodendron":"Young leaves emerge almost fluorescent yellow-green, then deepen over days.","Olea Europaea Mission":"Olive trees can live for thousands of years — some still producing fruit since Roman times."};

function getVoice(plant){
  const cl=plant.careLog||[];
  const lw=cl.filter(e=>e.type==="watered").sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
  const days=lw?Math.floor((Date.now()-new Date(lw.date))/86400000):null;
  const V={"Monstera Deliciosa":()=>days>10?`${days} days without water. I'm not angry — just noting it for the record.`:plant.health==="needs-love"?"I am struggling. Dramatically.":"Doing well. Plotting a new fenestration.","String of Hearts":()=>days>14?"Still here. The neglect suits me, honestly.":"Trailing along. Quietly thriving.","Dwarf Chenille Plant":()=>plant.health==="needs-love"?"The catkins are looking less dramatic. Unacceptable.":"Still the most interesting plant in this room.","Salix Caprea Pendula":()=>plant.health==="thriving"?"Ancient and unbothered. The weeping is just my aesthetic.":"I have survived centuries of rain. I will survive this.","Money Tree":()=>plant.health==="thriving"?"Prosperous. Grounded. Five elements in perfect harmony.":"Even fortune favours those who remember to water.","Fiddle Leaf Fig":()=>plant.health==="needs-love"?"You moved me, didn't you. I will remember this.":plant.health==="ok"?"Things are tolerable. Not saying they're good.":"The light is exactly right. I may allow a new leaf.","Hoya Burtoniae":()=>"Still here. Still waiting to bloom. Good things take time.","Golden Pothos":()=>days>14?"Honestly I've been through worse. Still here.":"Alive, well, and incredibly easy about the whole thing.","English Ivy":()=>plant.health==="thriving"?"Cool and calm. I have covered cathedrals. This shelf is nothing.":"A little water and I'll be climbing again.","Swiss Cheese Plant":()=>"Every hole in my leaves was earned through a storm.","African Milk Tree":()=>plant.health==="thriving"?"Standing tall. A fence of one.":"I store water in my stem for moments exactly like this.","Pink Princess Philodendron":()=>"My pink is not an accident. It is a genetic choice, but still mine.","Philodendron White Princess":()=>"No two of my leaves will ever be the same. I find that beautiful.","Spider Plant Bonnie":()=>"My curls are not an accident. I was made this way and I love it.","Croton Petra":()=>plant.health==="thriving"?"I am having a very colourful day.":"Less colour when unhappy. Give me more light.","Climbing Sea Onion":()=>"I climb from a single bulb. Slow, deliberate, quietly extraordinary.","Christmas Cactus":()=>"I bloom when the world is dark. That's the whole point.","Chocolate Soldier Plant":()=>"Sun-tolerant, drought-resistant, unabashedly velvet.","String of Arrows":()=>"Pointed in a direction. Trailing toward whatever comes next.","Jade Plant":()=>plant.health==="thriving"?"I may outlive everyone in this building.":"A little dry. I'll store it for later.","Moonlight Philodendron":()=>"My new leaves glow. By the time you notice, I've already grown.","Olea Europaea Mission":()=>plant.health==="thriving"?"I have been tended by human hands for eight thousand years. I know patience.":"The Mediterranean made me. I accept no substitutes."};
  return V[plant.name]?.() ?? "Growing quietly. Finding my light.";
}

function fmtFull(d){return new Date(d).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});}
function fmtShort(d){return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric"});}
function getAge(d){const days=Math.floor((Date.now()-new Date(d))/86400000);if(days<30)return `${days}d`;if(days<365)return `${Math.floor(days/30)}mo`;const y=Math.floor(days/365),m=Math.floor((days%365)/30);return m>0?`${y}y ${m}mo`:`${y}y`;}
function photoDue(p){const ph=p.diaryPhotos||[];if(!ph.length)return true;return(Date.now()-new Date(ph[ph.length-1].date).getTime())>30*86400000;}

function getMilestones(plant,plants){
  const ms=[];
  ms.push({icon:"heart",text:<>Welcomed {plant.nickname?<strong>{plant.nickname}</strong>:<span>{plant.name}</span>} into the garden</>,date:plant.added});
  (plant.healthLog||[]).forEach((e,i,a)=>{if(i>0&&e.status!==a[i-1].status)ms.push({icon:"ok",text:<>Health changed to <strong>{HL[e.status]}</strong>{e.note?` — ${e.note}`:""}</>,date:e.date});});
  (plant.careLog||[]).filter(e=>["repotted","new-leaf","pest"].includes(e.type)).forEach(e=>{const lb={"repotted":"Repotted","new-leaf":"New leaf","pest":"Pest treated"};ms.push({icon:e.type==="new-leaf"?"leaf":e.type==="repotted"?"sprout":"x",text:<><strong>{lb[e.type]}</strong>{e.note?` — ${e.note}`:""}</>,date:e.date});});
  const dO=Math.floor((Date.now()-new Date(plant.added))/86400000);
  if(dO>=180)ms.push({icon:"star",text:<><strong>6 months</strong> together</>,date:new Date(new Date(plant.added).getTime()+180*86400000).toISOString()});
  if(dO>=365)ms.push({icon:"star",text:<><strong>One year</strong> together</>,date:new Date(new Date(plant.added).getTime()+365*86400000).toISOString()});
  if(plant.parentId){const par=plants.find(p=>p.id===plant.parentId);if(par)ms.push({icon:"link",text:<>Propagated from <strong>{par.nickname||par.name}</strong></>,date:plant.added});}
  return ms.sort((a,b)=>new Date(a.date)-new Date(b.date));
}

function ArcChart({log}){
  if(!log||log.length<2)return <div style={{fontSize:11,fontWeight:300,color:"var(--ink-ghost)",fontStyle:"italic",padding:"8px 0"}}>No history yet.</div>;
  const vals=log.map(e=>HV[e.status]||2);
  const W=300,H=48,pd=8;
  const pts=vals.map((v,i)=>{const x=pd+(i/(vals.length-1))*(W-pd*2);const y=H-pd-((v-1)/2)*(H-pd*2);return `${x},${y}`;}).join(" ");
  return(
    <div className="arc-wrap">
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block"}}>
        {[H-pd,(H-pd*2)/2+pd,pd].map((y,i)=><line key={i} x1={pd} y1={y} x2={W-pd} y2={y} stroke="var(--border-md)" strokeWidth="1" strokeDasharray={i>0?"3,3":""}/>)}
        <polyline points={pts} fill="none" stroke={HC[log[log.length-1]?.status]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        {vals.map((v,i)=>{const x=pd+(i/(vals.length-1))*(W-pd*2);const y=H-pd-((v-1)/2)*(H-pd*2);return <circle key={i} cx={x} cy={y} r="3" fill={HC[log[i]?.status]} stroke="var(--parchment)" strokeWidth="1.5"/>;})}</svg>
      <div className="arc-legend">{["thriving","ok","needs-love"].map(s=><div key={s} className="arc-legend-item"><div className="arc-dot" style={{background:HC[s]}}/>{HL[s]}</div>)}</div>
    </div>
  );
}

function NickEdit({plant,onUpdate}){
  const [ed,setEd]=useState(false);
  const [v,setV]=useState(plant.nickname||"");
  const ref=useRef();
  useEffect(()=>{if(ed)ref.current?.focus();},[ed]);
  function save(){onUpdate({...plant,nickname:v.trim()||undefined});setEd(false);}
  if(ed)return <span style={{display:"inline-flex",alignItems:"center",gap:6}}><input ref={ref} className="nick-input" value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")save();if(e.key==="Escape")setEd(false);}} placeholder="Name her…"/><button style={{background:"none",border:"none",cursor:"pointer",color:"var(--moss-mid)",display:"flex"}} onClick={save}><Ic n="ok" size={12} sw={2}/></button></span>;
  return <div className="nick-row" onClick={()=>setEd(true)}>{plant.nickname?<span className="nick-label">{plant.nickname}</span>:<span className="nick-ghost">Name her…</span>}<Ic n="pen" size={10} stroke="var(--blush)" sw={1.5}/></div>;
}

function TableRow({plant,index,onSelect,onUpdate}){
  const [editingNick,setEditingNick]=useState(false);
  const [nickVal,setNickVal]=useState(plant.nickname||"");
  const nickRef=useRef();
  useEffect(()=>{if(editingNick)nickRef.current?.focus();},[editingNick]);
  function saveNick(e){e.stopPropagation();onUpdate({...plant,nickname:nickVal.trim()||undefined});setEditingNick(false);}
  function startEdit(e){e.stopPropagation();setNickVal(plant.nickname||"");setEditingNick(true);}
  return(
    <div className="table-row" style={{animationDelay:`${index*.03}s`}} onClick={()=>onSelect(plant)}>
      <div className="table-sil"><Sil name={plant.name} size={38} fill="var(--moss-mid)"/></div>
      <div className="table-body">
        {editingNick?(
          <span style={{display:"flex",alignItems:"center",gap:4}} onClick={e=>e.stopPropagation()}>
            <input ref={nickRef} className="table-nick-input" value={nickVal} onChange={e=>setNickVal(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter")saveNick(e);if(e.key==="Escape"){setEditingNick(false);e.stopPropagation();}}}
              placeholder="Name her…"/>
            <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--blush-deep)",display:"flex",padding:0}} onClick={saveNick}><Ic n="ok" size={10} sw={2}/></button>
          </span>
        ):(
          <div className="table-nick-wrap" onClick={startEdit}>
            {plant.nickname
              ? <span className="table-nick">{plant.nickname}</span>
              : <span className="table-nick-ghost">name her…</span>}
            <Ic n="pen" size={8} stroke="var(--blush)" sw={1.5}/>
          </div>
        )}
        <div className="table-name">{plant.name}</div>
        <div className="table-bot">{plant.botanical}</div>
        {UNDERRATED[plant.name]&&<div className="table-fact">{UNDERRATED[plant.name]}</div>}
      </div>
      <div className="table-right">
        <div className={`tpip ${plant.health}`}/>
        <div className="table-hlbl">{HL[plant.health]}</div>
      </div>
    </div>
  );
}

function PlantDashboardCard({plant,onSelect}){
  const [flipped,setFlipped]=useState(false);
  const origin=ORIGINS[plant.name]?.country||"Unknown";
  const difficulty=plant.tags?.includes("easy")?"Easy":plant.tags?.includes("rare")?"Special care":"Moderate";
  return(
    <div className="flip-wrap">
      <div className="flip-card" onClick={()=>setFlipped(v=>!v)}>
        <div className={`flip-inner ${flipped?"flipped":""}`}>
          <div className="flip-face flip-front">
            <div className="flip-eyebrow">Collection card</div>
            <div className="flip-name">{plant.name}</div>
            <div className="flip-bot">{plant.botanical}</div>
            <div className="flip-sil"><Sil name={plant.name} size={120} fill="var(--moss-pale)"/></div>
            <div className="flip-family">{plant.family} Family</div>
            <div className="flip-mini">Health · {HL[plant.health]}</div>
            <div className="flip-actions"><span className="flip-hint">Tap to flip</span><Ic n="sparkle" size={13} stroke="#6C775F" sw={1.7}/></div>
          </div>
          <div className="flip-face flip-back">
            <div className="flip-name" style={{fontSize:16,marginTop:4}}>Plant Notes</div>
            <div className="flip-rule"/>
            <div className="flip-meta">
              <div className="flip-k">Common</div><div className="flip-v">{plant.name}</div>
              <div className="flip-k">Scientific</div><div className="flip-v"><em>{plant.botanical}</em></div>
              <div className="flip-k">Family</div><div className="flip-v">{plant.family}</div>
              <div className="flip-k">Origin</div><div className="flip-v">{origin}</div>
            </div>
            <div className="flip-section">Care guide</div>
            <div className="flip-meta">
              <div className="flip-k">Light</div><div className="flip-v">{plant.light}</div>
              <div className="flip-k">Water</div><div className="flip-v">{plant.water}</div>
              <div className="flip-k">Humidity</div><div className="flip-v">{plant.humidity}</div>
              <div className="flip-k">Room</div><div className="flip-v">{plant.room||"Unplaced"}</div>
            </div>
            <div className="flip-section">Growth info</div>
            <div className="flip-meta">
              <div className="flip-k">Category</div><div className="flip-v">{plant.category}</div>
              <div className="flip-k">Difficulty</div><div className="flip-v">{difficulty}</div>
              <div className="flip-k">Toxicity</div><div className="flip-v">{plant.toxic?"Toxic to pets":"Pet-friendly"}</div>
            </div>
            <div className="flip-fact">{UNDERRATED[plant.name]||"This specimen is part of your curated indoor garden story."}</div>
            <div className="flip-actions">
              <span className="flip-hint">Tap card again to return</span>
              <button className="flip-open" onClick={(e)=>{e.stopPropagation();onSelect(plant);}}>Open full profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GardenView({plants,filter,setFilter,search,setSearch,viewMode,setViewMode,onSelect,onUpdate}){
  const filtered=plants.filter(p=>{const mc=filter==="All"||p.category===filter;const ms=!search||[p.name,p.botanical,p.nickname].some(v=>v?.toLowerCase().includes(search.toLowerCase()));return mc&&ms;});
  return(
    <>
      <div className="garden-scene">
        <div className="scene-title-block"><div className="scene-eyebrow">A personal collection</div><div className="scene-title">Sierra's<br/><em>garden</em></div></div>
        <div className="scene-stats">
          <div className="scene-stat"><div className="scene-stat-n">{plants.length}</div><div className="scene-stat-l">Plants</div></div>
          <div className="scene-stat"><div className="scene-stat-n">{plants.filter(p=>p.health==="thriving").length}</div><div className="scene-stat-l">Thriving</div></div>
          <div className="scene-stat"><div className="scene-stat-n">{plants.filter(p=>p.nickname).length}</div><div className="scene-stat-l">Named</div></div>
        </div>
        <Panorama/>
      </div>
      <div className="search-wrap"><div className="search-inner"><Ic n="leaf" size={14} stroke="var(--ink-ghost)" sw={1.5}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or nickname…"/></div></div>
      <div className="filter-row">
        {CATS.map(c=><button key={c} className={`fchip${filter===c?" active":""}`} onClick={()=>setFilter(c)}>{c}</button>)}
        <div className="view-toggle">
          <button className={`vtoggle${viewMode==="grid"?" active":""}`} onClick={()=>setViewMode("grid")}><Ic n="grid" size={15} sw={1.5}/></button>
          <button className={`vtoggle${viewMode==="table"?" active":""}`} onClick={()=>setViewMode("table")}><Ic n="list" size={15} sw={1.5}/></button>
        </div>
      </div>
      <div className="dashboard-head">
        <div className="dashboard-title">Plant dashboard cards</div>
        <div className="dashboard-sub">Each plant is now an interactive front/back botanical card.</div>
      </div>
      {filtered.length>0&&<div className="dash-grid">{filtered.map(p=><PlantDashboardCard key={`dash-${p.id}`} plant={p} onSelect={onSelect}/>)}</div>}
      {filtered.length===0&&<div className="empty"><h3>No plants found</h3><p>Try a different filter or search term.</p></div>}
      {viewMode==="table"&&filtered.length>0&&(
        <div>
          {filtered.map((p,i)=>(
            <TableRow key={p.id} plant={p} index={i} onSelect={onSelect} onUpdate={onUpdate}/>
          ))}
        </div>
      )}
    </>
  );
}

function DetailModal({plant,plants,onClose,onUpdate}){
  const [tab,setTab]=useState("journal");
  const [logNote,setLogNote]=useState("");
  const [hlNote,setHlNote]=useState("");
  const fileRef=useRef();

  function logCare(type){
    const entry={id:Date.now(),type,note:logNote,date:new Date().toISOString()};
    onUpdate({...plant,careLog:[...(plant.careLog||[]),entry]});
    setLogNote("");
  }
  function setHealth(status){
    const entry={status,note:hlNote,date:new Date().toISOString()};
    onUpdate({...plant,health:status,healthLog:[...(plant.healthLog||[]),entry]});
    setHlNote("");
  }
  function addPhoto(e){
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      const photo={id:Date.now(),url:ev.target.result,date:new Date().toISOString()};
      onUpdate({...plant,diaryPhotos:[...(plant.diaryPhotos||[]),photo]});
    };
    reader.readAsDataURL(file);
  }

  const ms=getMilestones(plant,plants);
  const bens=BENEFITS[plant.name]||[];

  const TABS=[{id:"journal",label:"Journal"},{id:"health",label:"Health"},{id:"photos",label:"Photos"},{id:"care",label:"Care"},{id:"origin",label:"Origin"},{id:"benefits",label:"Benefits"}];

  return(
    <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="sheet">
        <div className="sheet-handle"/>
        <div className="d-hero">
          <div className="d-hero-sil" style={{position:"relative",zIndex:2}}><Sil name={plant.name} size={140} fill="rgba(212,221,208,0.55)"/></div>
          <div className={`d-hbar ${plant.health}`}/>
          <button className="d-close" onClick={onClose}><Ic n="x" size={14} sw={2}/></button>
        </div>
        <div className="d-body">
          <div className="d-eyebrow"><div className={`dpip ${plant.health}`}/>{HL[plant.health]} · {plant.room||"Unplaced"} · {getAge(plant.added)}</div>
          <NickEdit plant={plant} onUpdate={onUpdate}/>
          <div className="d-name">{plant.name}</div>
          <div className="d-bot">{plant.botanical}</div>
          <div className="plant-voice">"{getVoice(plant)}"</div>
        </div>
        <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",borderBottom:"1px solid var(--border-md)",marginTop:16}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,padding:"10px 14px",border:"none",background:"none",fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:500,letterSpacing:"1.5px",textTransform:"uppercase",cursor:"pointer",color:tab===t.id?"var(--moss)":"var(--ink-ghost)",borderBottom:`2px solid ${tab===t.id?"var(--moss-pale)":"transparent"}`,marginBottom:-1,transition:"all .18s"}}>{t.label}</button>)}
        </div>
        <div style={{padding:"20px 22px 0"}}>
          {tab==="journal"&&(
            <div>
              <div className="d-lbl">Milestones</div>
              {ms.map((m,i)=>(
                <div key={i} className="ms-row">
                  <div style={{color:"var(--clay-light)",flexShrink:0,marginTop:2}}><Ic n={m.icon} size={14} stroke="var(--clay-light)" sw={1.5}/></div>
                  <div className="ms-text">{m.text}</div>
                  <div className="ms-date">{fmtShort(m.date)}</div>
                </div>
              ))}
              {ms.length===0&&<div style={{fontSize:12,fontWeight:300,color:"var(--ink-ghost)",fontStyle:"italic"}}>No milestones recorded yet.</div>}
              <div className="d-div"/>
              <div className="d-lbl">Care log</div>
              <div className="log-btns">
                {LOG_TYPES.map(lt=><button key={lt.type} className="log-btn" onClick={()=>logCare(lt.type)}><Ic n={lt.icon} size={12} sw={1.5}/>{lt.label}</button>)}
              </div>
              <div className="log-note-row">
                <input className="log-input" value={logNote} onChange={e=>setLogNote(e.target.value)} placeholder="Optional note…" onKeyDown={e=>{if(e.key==="Enter"&&logNote)logCare("note");}}/>
                {logNote&&<button className="log-save" onClick={()=>logCare("note")}>Save</button>}
              </div>
              <div style={{marginTop:12}}>
                {[...(plant.careLog||[])].reverse().slice(0,8).map((e,i)=>(
                  <div key={i} className="log-row">
                    <div className="log-date">{fmtShort(e.date)}</div>
                    <div>{LOG_TYPES.find(l=>l.type===e.type)?.label||"Note"}{e.note?` — ${e.note}`:""}</div>
                  </div>
                ))}
                {(plant.careLog||[]).length===0&&<div className="photo-empty">No care events logged yet.</div>}
              </div>
            </div>
          )}
          {tab==="health"&&(
            <div>
              <div className="d-lbl">Health arc</div>
              <ArcChart log={plant.healthLog||[{status:plant.health,date:plant.added}]}/>
              <div className="d-div"/>
              <div className="d-lbl">Update health</div>
              <input className="log-input" style={{marginBottom:8}} value={hlNote} onChange={e=>setHlNote(e.target.value)} placeholder="Optional note about current condition…"/>
              <div className="h-btns">
                {["thriving","ok","needs-love"].map(s=><button key={s} className={`h-btn${plant.health===s?" sel":""}`} onClick={()=>setHealth(s)}>{HL[s]}</button>)}
              </div>
              <div className="d-div"/>
              <div className="d-lbl">History</div>
              <div className="arc-history">
                {[...(plant.healthLog||[])].reverse().slice(0,6).map((e,i)=>(
                  <div key={i} className="arc-row">
                    <div className="arc-date">{fmtShort(e.date)}</div>
                    <div className={`arc-sdot ${e.status}`}/>
                    <div>{HL[e.status]}{e.note?` — ${e.note}`:""}</div>
                  </div>
                ))}
                {(plant.healthLog||[]).length===0&&<div className="photo-empty">No health history yet.</div>}
              </div>
            </div>
          )}
          {tab==="photos"&&(
            <div>
              {photoDue(plant)&&(
                <div className="photo-prompt">
                  <div className="photo-prompt-text"><strong>Time for a portrait.</strong> Document how she looks today.</div>
                  <button className="photo-btn" onClick={()=>fileRef.current.click()}>Add photo</button>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="file-input" onChange={addPhoto}/>
              {(plant.diaryPhotos||[]).length>0?(
                <div className="photo-strip">
                  {[...(plant.diaryPhotos||[])].reverse().map(ph=>(
                    <div key={ph.id} className="photo-thumb">
                      <img src={ph.url} alt="Plant portrait"/>
                      <div className="photo-thumb-date">{fmtShort(ph.date)}</div>
                    </div>
                  ))}
                </div>
              ):<div className="photo-empty">No photos yet. Add your first portrait.</div>}
              {!photoDue(plant)&&<button className="log-btn" style={{marginTop:12}} onClick={()=>fileRef.current.click()}><Ic n="cam" size={12} sw={1.5}/>Add photo</button>}
            </div>
          )}
          {tab==="care"&&(
            <div>
              <div className="d-lbl">Care guide</div>
              <table className="care-table">
                <tbody>
                  {[["Water",plant.water],["Light",plant.light],["Soil",plant.soil],["Humidity",plant.humidity],["Family",plant.family],["Toxic",plant.toxic?"Yes — keep away from pets":"Non-toxic"]].map(([k,v])=>v?<tr key={k}><td>{k}</td><td>{v}</td></tr>:null)}
                </tbody>
              </table>
              <div className="d-div"/>
              <div className="d-lbl">Underrated fact</div>
              <div className="fact-block"><div className="fact-text-i">{UNDERRATED[plant.name]||"A fascinating plant with many secrets still to discover."}</div></div>
              <div className="d-div"/>
              <div className="tag-row">
                {(plant.tags||[]).map(t=><div key={t} className="tag">{t}</div>)}
              </div>
            </div>
          )}
          {tab==="origin"&&(
            <div>
              <div className="d-lbl">Native range</div>
              {ORIGINS[plant.name]&&(
                <div className="origin-block">
                  <div className="origin-title">{ORIGINS[plant.name].country}</div>
                  <div className="origin-text">{ORIGINS[plant.name].desc}</div>
                </div>
              )}
              <div className="d-div"/>
              <div className="d-lbl">Plant family</div>
              <div style={{fontSize:13,fontWeight:300,color:"var(--ink-mid)",lineHeight:1.65}}>
                {plant.family&&<><strong style={{fontWeight:500,color:"var(--ink)"}}>{plant.family}</strong> — {FAMILIES.find(f=>f.name===plant.family)?.desc||""}</>}
              </div>
              {FAMILIES.find(f=>f.members.includes(plant.name))&&(
                <>
                  <div className="d-div"/>
                  <div className="d-lbl">Garden companions in this family</div>
                  {FAMILIES.find(f=>f.members.includes(plant.name))?.members.filter(m=>m!==plant.name).slice(0,4).map(m=>{
                    const mp=plants.find(p=>p.name===m);if(!mp)return null;
                    return <div key={m} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderTop:"1px solid var(--border)"}}>
                      <div className="fm-sil"><Sil name={mp.name} size={28} fill="var(--moss-mid)"/></div>
                      <div><div className="fm-nick">{mp.nickname||""}</div><div className="fm-name">{mp.name}</div></div>
                    </div>;
                  })}
                </>
              )}
            </div>
          )}
          {tab==="benefits"&&(
            <div>
              <div className="d-lbl">Known benefits</div>
              {bens.length===0&&<div className="photo-empty">No benefits documented yet.</div>}
              {bens.map((b,i)=>(
                <div key={i} className="bp-item">
                  <div className="bp-badge">{b.cat}</div>
                  <div className="bp-text" dangerouslySetInnerHTML={{__html:b.text}}/>
                </div>
              ))}
            </div>
          )}
          <div className="detail-date">Added {fmtFull(plant.added)}</div>
        </div>
      </div>
    </div>
  );
}

function FamilyView({plants,onSelect}){
  const [open,setOpen]=useState(null);
  const myFamilies=FAMILIES.filter(f=>f.members.some(m=>plants.find(p=>p.name===m)));
  return(
    <div>
      <div className="view-header"><div className="view-title">Family tree</div><div className="view-sub">Your collection by botanical lineage</div></div>
      <div style={{background:"var(--linen)",padding:"14px 20px",borderBottom:"1px solid var(--border-md)",fontSize:12,fontWeight:300,color:"var(--ink-mid)",lineHeight:1.65}}>
        Your {plants.length} plants span <strong style={{fontWeight:500,color:"var(--ink)"}}>{myFamilies.length} botanical families</strong> across {new Set(REGIONS.flatMap(r=>r.plants).filter(n=>plants.find(p=>p.name===n)).map(n=>REGIONS.find(r=>r.plants.includes(n))?.id)).size} regions of the world.
      </div>
      {myFamilies.map(f=>{
        const myMembers=f.members.filter(m=>plants.find(p=>p.name===m));
        const isOpen=open===f.name;
        return(
          <div key={f.name} className="family-block">
            <div className="family-header" onClick={()=>setOpen(isOpen?null:f.name)} style={{cursor:"pointer"}}>
              <div className="family-swatch" style={{background:f.color,marginTop:4}}/>
              <div className="family-name-t">{f.name}</div>
              <div className="family-order-t">{f.order}</div>
              <div style={{marginLeft:"auto",color:"var(--ink-ghost)",transition:"transform .2s",transform:isOpen?"rotate(180deg)":"none"}}><Ic n="chev" size={16} sw={1.5}/></div>
            </div>
            <div className="family-desc-t">{f.desc}</div>
            {isOpen&&(
              <div className="family-members-t">
                {myMembers.map(m=>{const mp=plants.find(p=>p.name===m);if(!mp)return null;return(
                  <div key={m} className="family-member-t" onClick={()=>onSelect(mp)}>
                    <div className="fm-sil"><Sil name={mp.name} size={28} fill="var(--moss-mid)"/></div>
                    <div><div className="fm-nick">{mp.nickname||""}</div><div className="fm-name">{mp.name}</div><div className="fm-bot">{mp.botanical}</div></div>
                  </div>
                );})}
                {myMembers.length>1&&<div className="cousin-note" style={{margin:"10px 0 0"}}><strong>Shared trait:</strong> {f.sharedTraits}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function OriginsView({plants,onSelect}){
  const [open,setOpen]=useState(null);
  const myRegions=REGIONS.filter(r=>r.plants.some(n=>plants.find(p=>p.name===n)));
  return(
    <div>
      <div className="view-header"><div className="view-title">Origins</div><div className="view-sub">Where your plants call home</div></div>
      <div className="map-cont">
        <svg className="map-svg" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet">
          <rect width="100" height="60" fill="#2A3A4A"/>
          <ellipse cx="20" cy="40" rx="16" ry="12" fill="#3A5040" opacity=".7"/>
          <ellipse cx="50" cy="28" rx="22" ry="14" fill="#3A5040" opacity=".7"/>
          <ellipse cx="52" cy="50" rx="10" ry="8" fill="#3A5040" opacity=".7"/>
          <ellipse cx="75" cy="40" rx="14" ry="10" fill="#3A5040" opacity=".7"/>
          <ellipse cx="83" cy="28" rx="10" ry="7" fill="#3A5040" opacity=".7"/>
          {myRegions.map(r=><circle key={r.id} cx={r.mapX} cy={r.mapY} r="2.5" fill={r.color} opacity=".9"/>)}
        </svg>
      </div>
      {myRegions.map(r=>{
        const myP=r.plants.filter(n=>plants.find(p=>p.name===n));
        const isOpen=open===r.id;
        return(
          <div key={r.id} className="region-row">
            <div className="region-head" onClick={()=>setOpen(isOpen?null:r.id)}>
              <div className="region-sw" style={{background:r.color}}/>
              <div className="region-name">{r.name}</div>
              <div className="region-count">{myP.length} plant{myP.length!==1?"s":""}</div>
              <div style={{color:"var(--ink-ghost)",marginLeft:8,transition:"transform .2s",transform:isOpen?"rotate(180deg)":"none"}}><Ic n="chev" size={16} sw={1.5}/></div>
            </div>
            {isOpen&&(
              <div className="region-body">
                <div className="region-desc">{r.desc}</div>
                <div className="region-chips">
                  {myP.map(n=>{const mp=plants.find(p=>p.name===n);return mp?<div key={n} className="region-chip" onClick={()=>onSelect(mp)}>{mp.nickname||mp.name}</div>:null;})}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function BenefitsView({plants,onSelect}){
  const [cat,setCat]=useState("All");
  const [open,setOpen]=useState(null);
  const myPlants=plants.filter(p=>BENEFITS[p.name]?.length>0);
  return(
    <div>
      <div className="ben-header">
        <div className="ben-title">Benefits</div>
        <div className="ben-sub">What your plants do for you</div>
        <div className="ben-cats">
          {BCATS.map(c=><button key={c} className={`ben-cat${cat===c?" active":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
      </div>
      {myPlants.map(p=>{
        const bens=(BENEFITS[p.name]||[]).filter(b=>cat==="All"||b.cat===cat);
        if(!bens.length)return null;
        const isOpen=open===p.id;
        return(
          <div key={p.id} className="ben-plant-row">
            <div className="ben-plant-head" onClick={()=>setOpen(isOpen?null:p.id)}>
              <div className="ben-sil"><Sil name={p.name} size={32} fill="var(--moss-mid)"/></div>
              <div style={{flex:1}}><div className="ben-plant-nick">{p.nickname||""}</div><div className="ben-plant-name">{p.name}</div></div>
              <div className="ben-count">{bens.length}</div>
              <div className={`ben-chev${isOpen?" open":""}`}><Ic n="chev" size={16} sw={1.5}/></div>
            </div>
            {isOpen&&(
              <div className="ben-items">
                {bens.map((b,i)=>(
                  <div key={i} className="ben-row">
                    <div className="ben-lbl">{b.cat}</div>
                    <div className="ben-body" dangerouslySetInnerHTML={{__html:b.text}}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TimelineView({plants,onSelect}){
  const sorted=[...plants].sort((a,b)=>new Date(a.added)-new Date(b.added));
  const byYear={};
  sorted.forEach(p=>{const y=new Date(p.added).getFullYear();if(!byYear[y])byYear[y]=[];byYear[y].push(p);});
  return(
    <div>
      <div className="view-header"><div className="view-title">Timeline</div><div className="view-sub">Your collection in the order it grew</div></div>
      {Object.entries(byYear).sort(([a],[b])=>Number(a)-Number(b)).map(([year,yPlants])=>(
        <div key={year}>
          <div className="tl-year">{year}</div>
          {yPlants.map((p,i,arr)=>(
            <div key={p.id} className="tl-row" onClick={()=>onSelect(p)}>
              <div className="tl-spine">
                <div className={`tl-dot ${p.health}`}/>
                {i<arr.length-1&&<div className="tl-line"/>}
              </div>
              <div className="tl-content">
                <div className="tl-sil"><Sil name={p.name} size={44} fill="var(--moss-mid)"/></div>
                <div className="tl-info">
                  <div className="tl-date">{fmtShort(p.added)}</div>
                  {p.nickname&&<div className="tl-nick">{p.nickname}</div>}
                  <div className="tl-name">{p.name}</div>
                  <div className="tl-bot">{p.botanical}</div>
                  <div className="tl-age">{getAge(p.added)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function StatsView({plants}){
  const thriving=plants.filter(p=>p.health==="thriving").length;
  const ok=plants.filter(p=>p.health==="ok").length;
  const needs=plants.filter(p=>p.health==="needs-love").length;
  const fams=[...new Set(plants.map(p=>p.family).filter(Boolean))];
  const famCounts=fams.map(f=>({name:f,count:plants.filter(p=>p.family===f).length})).sort((a,b)=>b.count-a.count).slice(0,6);
  const rooms=[...new Set(plants.map(p=>p.room).filter(Boolean))];
  const roomCounts=rooms.map(r=>({name:r,count:plants.filter(p=>p.room===r).length})).sort((a,b)=>b.count-a.count).slice(0,6);
  const oldest=[...plants].sort((a,b)=>new Date(a.added)-new Date(b.added))[0];
  const newest=[...plants].sort((a,b)=>new Date(b.added)-new Date(a.added))[0];
  return(
    <div>
      <div className="stats-hero">
        <div className="stat-cell"><div className="stat-num">{plants.length}</div><div className="stat-lbl">Plants</div></div>
        <div className="stat-cell"><div className="stat-num">{thriving}</div><div className="stat-lbl">Thriving</div></div>
        <div className="stat-cell"><div className="stat-num">{fams.length}</div><div className="stat-lbl">Families</div></div>
      </div>
      <div className="stats-sec">
        <div className="stats-sec-lbl">Health overview</div>
        {[{l:"Thriving",n:thriving,c:"var(--moss-light)"},{l:"Okay",n:ok,c:"var(--ochre)"},{l:"Needs love",n:needs,c:"var(--rust)"}].map(r=>(
          <div key={r.l} className="bar-row">
            <div className="bar-lbl">{r.l}</div>
            <div className="bar-track"><div className="bar-fill" style={{width:`${(r.n/plants.length)*100}%`,background:r.c}}/></div>
            <div className="bar-n">{r.n}</div>
          </div>
        ))}
      </div>
      {famCounts.length>0&&<><div className="d-div" style={{margin:"20px 22px"}}/><div className="stats-sec"><div className="stats-sec-lbl">By family</div>{famCounts.map(r=><div key={r.name} className="bar-row"><div className="bar-lbl" style={{fontSize:10}}>{r.name}</div><div className="bar-track"><div className="bar-fill" style={{width:`${(r.count/plants.length)*100}%`}}/></div><div className="bar-n">{r.count}</div></div>)}</div></>}
      {roomCounts.length>0&&<><div className="d-div" style={{margin:"20px 22px"}}/><div className="stats-sec"><div className="stats-sec-lbl">By room</div>{roomCounts.map(r=><div key={r.name} className="bar-row"><div className="bar-lbl" style={{fontSize:10}}>{r.name}</div><div className="bar-track"><div className="bar-fill" style={{width:`${(r.count/plants.length)*100}%`}}/></div><div className="bar-n">{r.count}</div></div>)}</div></>}
      <div className="d-div" style={{margin:"20px 22px"}}/>
      <div className="stats-sec">
        <div className="stats-sec-lbl">Garden notes</div>
        <div className="fact-row-s"><div className="fact-text-s"><strong>Oldest resident:</strong> {oldest?.name} — {getAge(oldest?.added||new Date())} in your care.</div></div>
        <div className="fact-row-s"><div className="fact-text-s"><strong>Newest arrival:</strong> {newest?.name} — welcomed {fmtShort(newest?.added||new Date())}.</div></div>
        <div className="fact-row-s"><div className="fact-text-s"><strong>Named plants:</strong> {plants.filter(p=>p.nickname).length} of {plants.length} have been named.</div></div>
      </div>
    </div>
  );
}

function AddPlantForm({plants,onAdd,onClose}){
  const [form,setForm]=useState({name:"",botanical:"",family:"",category:"Tropical",health:"ok",room:"",light:"",water:"",soil:"",humidity:"",toxic:false,tags:"",parentId:"",added:new Date().toISOString().split("T")[0],notes:""});
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  function submit(e){
    e.preventDefault();
    const plant={...form,id:Date.now().toString(),tags:form.tags.split(",").map(t=>t.trim()).filter(Boolean),careLog:[],healthLog:[{status:form.health,date:new Date().toISOString()}],diaryPhotos:[],added:new Date(form.added).toISOString()};
    onAdd(plant);onClose();
  }
  return(
    <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="sheet">
        <div className="sheet-handle"/>
        <div className="form-head" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div className="form-title">New plant</div>
          <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--ink-mid)"}} onClick={onClose}><Ic n="x" size={18} sw={1.5}/></button>
        </div>
        <form className="form-body" onSubmit={submit}>
          <div className="form-group"><label className="form-lbl">Common name *</label><input className="form-in" value={form.name} onChange={set("name")} required placeholder="e.g. Monstera Deliciosa"/></div>
          <div className="form-group"><label className="form-lbl">Botanical name</label><input className="form-in" value={form.botanical} onChange={set("botanical")} placeholder="e.g. Monstera deliciosa"/></div>
          <div className="form-group"><label className="form-lbl">Family</label><input className="form-in" value={form.family} onChange={set("family")} placeholder="e.g. Araceae"/></div>
          <div className="form-group"><label className="form-lbl">Category</label><select className="form-sel" value={form.category} onChange={set("category")}>{CATS.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}</select></div>
          <div className="form-group"><label className="form-lbl">Room</label><input className="form-in" value={form.room} onChange={set("room")} placeholder="e.g. Living room"/></div>
          <div className="form-group"><label className="form-lbl">Current health</label><select className="form-sel" value={form.health} onChange={set("health")}>{["thriving","ok","needs-love"].map(h=><option key={h} value={h}>{HL[h]}</option>)}</select></div>
          <div className="form-group"><label className="form-lbl">Light</label><input className="form-in" value={form.light} onChange={set("light")} placeholder="e.g. Bright indirect"/></div>
          <div className="form-group"><label className="form-lbl">Water</label><input className="form-in" value={form.water} onChange={set("water")} placeholder="e.g. Weekly, allow to dry"/></div>
          <div className="form-group"><label className="form-lbl">Soil</label><input className="form-in" value={form.soil} onChange={set("soil")} placeholder="e.g. Well-draining mix"/></div>
          <div className="form-group"><label className="form-lbl">Date added</label><input type="date" className="form-in" value={form.added} onChange={set("added")}/></div>
          <div className="form-group"><label className="form-lbl">Propagated from</label><select className="form-sel" value={form.parentId} onChange={set("parentId")}><option value="">None</option>{plants.map(p=><option key={p.id} value={p.id}>{p.nickname||p.name}</option>)}</select></div>
          <div className="form-group"><label className="form-lbl">Tags (comma separated)</label><input className="form-in" value={form.tags} onChange={set("tags")} placeholder="e.g. rare, trailing, pet-safe"/></div>
          <div className="form-group"><label className="form-lbl">Notes</label><textarea className="form-ta" value={form.notes} onChange={set("notes")} placeholder="Anything else to remember…"/></div>
          <button type="submit" className="form-submit">Add to garden</button>
        </form>
      </div>
    </div>
  );
}

const SEED_PLANTS = [
  {id:"1",name:"Monstera Deliciosa",botanical:"Monstera deliciosa",family:"Araceae",category:"Tropical",health:"thriving",room:"Living room",light:"Bright indirect",water:"Weekly",soil:"Well-draining",humidity:"High",toxic:true,tags:["iconic","air-purifier","statement"],added:"2022-03-15T00:00:00Z",careLog:[{id:1,type:"watered",note:"",date:"2024-11-01T00:00:00Z"},{id:2,type:"new-leaf",note:"Unfurling a large fenestrated leaf",date:"2024-10-15T00:00:00Z"}],healthLog:[{status:"ok",date:"2022-03-15T00:00:00Z"},{status:"thriving",date:"2023-01-10T00:00:00Z"}],diaryPhotos:[]},
  {id:"2",name:"String of Hearts",botanical:"Ceropegia woodii",family:"Apocynaceae",category:"Trailing",health:"thriving",room:"Bedroom",light:"Bright indirect",water:"Fortnightly",soil:"Succulent mix",humidity:"Low",toxic:false,tags:["trailing","hearts","easy"],added:"2022-07-20T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2022-07-20T00:00:00Z"}],diaryPhotos:[]},
  {id:"3",name:"Dwarf Chenille Plant",botanical:"Acalypha reptans",family:"Euphorbiaceae",category:"Tropical",health:"ok",room:"Study",light:"Bright indirect to direct",water:"Twice weekly",soil:"Rich loamy mix",humidity:"High",toxic:false,tags:["fuzzy","unusual","flowering"],added:"2023-02-10T00:00:00Z",careLog:[],healthLog:[{status:"ok",date:"2023-02-10T00:00:00Z"}],diaryPhotos:[]},
  {id:"4",name:"Salix Caprea Pendula",botanical:"Salix caprea 'Pendula'",family:"Salicaceae",category:"Other",health:"thriving",room:"Garden",light:"Full sun to partial shade",water:"Frequent — water-loving",soil:"Moist loamy",humidity:"Medium",toxic:false,tags:["weeping","outdoor","ancient"],added:"2021-11-05T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2021-11-05T00:00:00Z"}],diaryPhotos:[]},
  {id:"5",name:"Money Tree",botanical:"Pachira aquatica",family:"Malvaceae",category:"Tropical",health:"thriving",room:"Office",light:"Bright indirect",water:"Weekly",soil:"Well-draining",humidity:"Medium",toxic:false,tags:["feng-shui","braided","lucky"],added:"2022-01-01T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2022-01-01T00:00:00Z"}],diaryPhotos:[]},
  {id:"6",name:"Fiddle Leaf Fig",botanical:"Ficus lyrata",family:"Moraceae",category:"Tropical",health:"ok",room:"Living room",light:"Bright indirect",water:"Weekly",soil:"Well-draining",humidity:"Medium",toxic:true,tags:["statement","dramatic","fussy"],added:"2023-04-01T00:00:00Z",careLog:[],healthLog:[{status:"needs-love",date:"2023-04-01T00:00:00Z"},{status:"ok",date:"2023-08-15T00:00:00Z"}],diaryPhotos:[]},
  {id:"7",name:"Hoya Burtoniae",botanical:"Hoya burtoniae",family:"Apocynaceae",category:"Trailing",health:"thriving",room:"Bedroom",light:"Bright indirect",water:"Fortnightly",soil:"Orchid mix",humidity:"Medium",toxic:false,tags:["trailing","star-flowers","fragrant"],added:"2023-06-12T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2023-06-12T00:00:00Z"}],diaryPhotos:[]},
  {id:"8",name:"Golden Pothos",botanical:"Epipremnum aureum",family:"Araceae",category:"Trailing",health:"thriving",room:"Kitchen",light:"Low to bright indirect",water:"Weekly",soil:"Any well-draining",humidity:"Low to medium",toxic:true,tags:["trailing","beginner","air-purifier"],added:"2021-06-01T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2021-06-01T00:00:00Z"}],diaryPhotos:[]},
  {id:"9",name:"English Ivy",botanical:"Hedera helix",family:"Araliaceae",category:"Trailing",health:"ok",room:"Hallway",light:"Low to medium indirect",water:"Twice weekly",soil:"Rich well-draining",humidity:"Medium",toxic:true,tags:["trailing","classic","air-purifier"],added:"2022-09-14T00:00:00Z",careLog:[],healthLog:[{status:"ok",date:"2022-09-14T00:00:00Z"}],diaryPhotos:[]},
  {id:"10",name:"Swiss Cheese Plant",botanical:"Monstera adansonii",family:"Araceae",category:"Tropical",health:"thriving",room:"Living room",light:"Bright indirect",water:"Weekly",soil:"Well-draining",humidity:"High",toxic:true,tags:["trailing","fenestrated","statement"],added:"2023-01-22T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2023-01-22T00:00:00Z"}],diaryPhotos:[]},
  {id:"11",name:"African Milk Tree",botanical:"Euphorbia trigona",family:"Euphorbiaceae",category:"Succulent",health:"thriving",room:"Windowsill",light:"Bright direct",water:"Monthly",soil:"Cactus mix",humidity:"Low",toxic:true,tags:["succulent","structural","rare"],added:"2023-03-08T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2023-03-08T00:00:00Z"}],diaryPhotos:[]},
  {id:"12",name:"Pink Princess Philodendron",botanical:"Philodendron erubescens 'Pink Princess'",family:"Araceae",category:"Rare",health:"ok",room:"Study",light:"Bright indirect",water:"Weekly",soil:"Well-draining rich",humidity:"High",toxic:true,tags:["rare","variegated","pink"],added:"2023-09-01T00:00:00Z",careLog:[],healthLog:[{status:"ok",date:"2023-09-01T00:00:00Z"}],diaryPhotos:[]},
  {id:"13",name:"Philodendron White Princess",botanical:"Philodendron erubescens 'White Princess'",family:"Araceae",category:"Rare",health:"thriving",room:"Bedroom",light:"Bright indirect",water:"Weekly",soil:"Well-draining rich",humidity:"High",toxic:true,tags:["rare","variegated","white"],added:"2024-01-15T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2024-01-15T00:00:00Z"}],diaryPhotos:[]},
  {id:"14",name:"Spider Plant Bonnie",botanical:"Chlorophytum comosum 'Bonnie'",family:"Asparagaceae",category:"Tropical",health:"thriving",room:"Kitchen",light:"Bright indirect",water:"Weekly",soil:"Well-draining",humidity:"Medium",toxic:false,tags:["curly","easy","air-purifier"],added:"2022-05-17T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2022-05-17T00:00:00Z"}],diaryPhotos:[]},
  {id:"15",name:"Croton Petra",botanical:"Codiaeum variegatum 'Petra'",family:"Euphorbiaceae",category:"Tropical",health:"ok",room:"Conservatory",light:"Bright direct",water:"Twice weekly",soil:"Rich loamy",humidity:"High",toxic:true,tags:["colourful","dramatic","sun-loving"],added:"2023-07-04T00:00:00Z",careLog:[],healthLog:[{status:"ok",date:"2023-07-04T00:00:00Z"}],diaryPhotos:[]},
  {id:"16",name:"Climbing Sea Onion",botanical:"Bowiea volubilis",family:"Asparagaceae",category:"Rare",health:"thriving",room:"Windowsill",light:"Bright indirect to direct",water:"Monthly",soil:"Sandy well-draining",humidity:"Low",toxic:true,tags:["rare","unusual","bulb"],added:"2023-10-30T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2023-10-30T00:00:00Z"}],diaryPhotos:[]},
  {id:"17",name:"Christmas Cactus",botanical:"Schlumbergera bridgesii",family:"Cactaceae",category:"Succulent",health:"ok",room:"Windowsill",light:"Bright indirect",water:"Fortnightly",soil:"Cactus mix",humidity:"Medium",toxic:false,tags:["flowering","festive","easy"],added:"2022-12-01T00:00:00Z",careLog:[],healthLog:[{status:"ok",date:"2022-12-01T00:00:00Z"}],diaryPhotos:[]},
  {id:"18",name:"Chocolate Soldier Plant",botanical:"Kalanchoe tomentosa",family:"Cactaceae",category:"Succulent",health:"thriving",room:"Windowsill",light:"Bright direct",water:"Fortnightly",soil:"Cactus mix",humidity:"Low",toxic:true,tags:["velvety","succulent","easy"],added:"2023-05-20T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2023-05-20T00:00:00Z"}],diaryPhotos:[]},
  {id:"19",name:"String of Arrows",botanical:"Ceropegia linearis",family:"Apocynaceae",category:"Trailing",health:"thriving",room:"Bedroom",light:"Bright indirect",water:"Fortnightly",soil:"Succulent mix",humidity:"Low",toxic:false,tags:["trailing","rare","arrows"],added:"2024-02-14T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2024-02-14T00:00:00Z"}],diaryPhotos:[]},
  {id:"20",name:"Jade Plant",botanical:"Crassula ovata",family:"Crassulaceae",category:"Succulent",health:"thriving",room:"Living room",light:"Bright direct",water:"Monthly",soil:"Succulent mix",humidity:"Low",toxic:true,tags:["succulent","lucky","long-lived"],added:"2020-08-01T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2020-08-01T00:00:00Z"}],diaryPhotos:[]},
  {id:"21",name:"Moonlight Philodendron",botanical:"Philodendron 'Moonlight'",family:"Araceae",category:"Tropical",health:"thriving",room:"Office",light:"Bright indirect",water:"Weekly",soil:"Rich well-draining",humidity:"High",toxic:true,tags:["hybrid","glowing","lush"],added:"2023-11-11T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2023-11-11T00:00:00Z"}],diaryPhotos:[]},
  {id:"22",name:"Olea Europaea Mission",botanical:"Olea europaea 'Mission'",family:"Oleaceae",category:"Other",health:"thriving",room:"Garden",light:"Full sun",water:"Monthly once established",soil:"Well-draining stony",humidity:"Low",toxic:false,tags:["edible","ancient","mediterranean"],added:"2021-04-22T00:00:00Z",careLog:[],healthLog:[{status:"thriving",date:"2021-04-22T00:00:00Z"}],diaryPhotos:[]},
];

const STORAGE_KEY = "leafy_v8";

export default function App() {
  const [plants, setPlants] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : SEED_PLANTS; }
    catch { return SEED_PLANTS; }
  });
  const [tab, setTab] = useState("garden");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(plants)); } catch {} }, [plants]);

  function updatePlant(updated) { setPlants(ps => ps.map(p => p.id === updated.id ? updated : p)); if (selected?.id === updated.id) setSelected(updated); }
  function addPlant(p) { setPlants(ps => [...ps, p]); }

  const TABS = [
    { id:"garden", icon:"leaf",    label:"Garden"   },
    { id:"family", icon:"dna",     label:"Family"   },
    { id:"origins",icon:"globe",   label:"Origins"  },
    { id:"stats",  icon:"sparkle", label:"Stats"    },
    { id:"time",   icon:"time",    label:"Timeline" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="status-bar"/>
        <div className="scroll-area">
          {tab === "garden"  && <GardenView plants={plants} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} viewMode={viewMode} setViewMode={setViewMode} onSelect={setSelected} onUpdate={updatePlant}/>}
          {tab === "family"  && <FamilyView plants={plants} onSelect={p=>{setSelected(p);}} />}
          {tab === "origins" && <OriginsView plants={plants} onSelect={p=>{setSelected(p);}} />}
          {tab === "stats"   && <StatsView plants={plants}/>}
          {tab === "time"    && <TimelineView plants={plants} onSelect={p=>{setSelected(p);}} />}
          {tab === "benefits"&& <BenefitsView plants={plants} onSelect={p=>{setSelected(p);}} />}
        </div>
        <div className="tab-bar">
          {TABS.map(t => (
            <button key={t.id} className={`tab${tab===t.id?" active":""}`} onClick={()=>setTab(t.id)}>
              <Ic n={t.icon} size={18} stroke="currentColor" sw={1.5}/>
              <span className="tab-label">{t.label}</span>
            </button>
          ))}
        </div>
        <button className="fab" onClick={() => setShowAdd(true)}>
          <Ic n="plus" size={20} sw={2}/>
        </button>
        {selected && <DetailModal plant={selected} plants={plants} onClose={()=>setSelected(null)} onUpdate={updatePlant}/>}
        {showAdd && <AddPlantForm plants={plants} onAdd={addPlant} onClose={()=>setShowAdd(false)}/>}
      </div>
    </>
  );
}
