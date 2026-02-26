import { useState, useEffect, useRef } from "react";

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, stroke = "currentColor", strokeWidth = 1.5 }) => {
  const p = {
    leaf:     <><path d="M2 22 L12 12"/><path d="M12 2C12 2 22 8 22 15C22 19.4 17.4 22 12 22C6.6 22 2 19.4 2 15C2 8 12 2 12 2Z"/></>,
    dna:      <><path d="M2 15c6.667-6 13.333-6 20 0"/><path d="M2 9c6.667 6 13.333 6 20 0"/><path d="M2 9v6"/><path d="M22 9v6"/><path d="M5.5 10.5v3"/><path d="M8.5 8.5v7"/><path d="M11.5 7.5v9"/><path d="M14.5 8.5v7"/><path d="M17.5 10.5v3"/></>,
    globe:    <><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    sparkle:  <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></>,
    timeline: <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/><circle cx="7" cy="6" r="2" fill={stroke}/><circle cx="12" cy="12" r="2" fill={stroke}/><circle cx="17" cy="18" r="2" fill={stroke}/></>,
    plus:     <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    close:    <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>,
    chevron:  <path d="M6 9l6 6 6-6"/>,
    camera:   <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
    drop:     <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>,
    sun:      <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>,
    seedling: <><path d="M12 22V12"/><path d="M12 12C12 12 7 10 7 5C7 2 9 1 12 1C15 1 17 2 17 5C17 10 12 12 12 12Z"/></>,
    arrow:    <path d="M5 12h14M12 5l7 7-7 7"/>,
    heart:    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    star:     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
    log:      <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    sprout:   <><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></>,
    chart:    <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    photo:    <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    link:     <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {p[name]}
    </svg>
  );
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const style = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Jost:wght@300;400;500&display=swap');

  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  :root {
    --ink:#1A1810; --ink-mid:#3D3A32; --ink-soft:#7A7060; --ink-faint:#B0A898;
    --paper:#F5F1EA; --paper-mid:#EDE8DF; --paper-dark:#E2DDD3;
    --moss:#2C3D2E; --moss-mid:#3D5540; --moss-light:#5C7A5E;
    --moss-pale:#C8D8C4; --moss-mist:#EBF0E8;
    --rust:#8C4A2A; --gold:#8A6A2A;
    --health-good:#5C7A5E; --health-mid:#B8902A; --health-bad:#8C4A2A;
    --border:rgba(26,24,16,.10); --border-md:rgba(26,24,16,.16);
    --shadow:0 1px 4px rgba(26,24,16,.08),0 4px 16px rgba(26,24,16,.04);
    --shadow-lg:0 4px 24px rgba(26,24,16,.14),0 1px 4px rgba(26,24,16,.08);
  }
  html,body{background:var(--paper)}
  body{font-family:'Jost',sans-serif;color:var(--ink);min-height:100vh;overflow-x:hidden}
  .app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--paper);display:flex;flex-direction:column}
  .status-bar{height:48px;background:var(--moss);flex-shrink:0}
  .scroll-area{flex:1;overflow-y:auto;padding-bottom:80px}

  /* HEADER */
  .header{background:var(--moss);padding:0 24px 24px}
  .header-inner{display:flex;align-items:center;justify-content:space-between;padding:8px 0 20px}
  .brand{display:flex;flex-direction:column;gap:1px}
  .brand-eyebrow{font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--moss-pale);opacity:.7}
  .brand-name{font-family:'Fraunces',serif;font-size:24px;font-weight:300;font-style:italic;color:#fff;letter-spacing:-.3px;line-height:1}
  .header-counts{display:flex;gap:20px;align-items:center}
  .hcount{text-align:right}
  .hcount-num{font-family:'Fraunces',serif;font-size:22px;font-weight:400;color:#fff;line-height:1}
  .hcount-label{font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--moss-pale);opacity:.7}
  .hcount-divider{width:1px;height:32px;background:rgba(255,255,255,.15)}
  .search-bar{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:4px;padding:10px 14px}
  .search-bar input{flex:1;background:none;border:none;outline:none;font-family:'Jost',sans-serif;font-size:13px;color:#fff;font-weight:300}
  .search-bar input::placeholder{color:rgba(255,255,255,.35)}

  /* FILTER */
  .filter-strip{padding:16px 24px 0;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid var(--border)}
  .filter-strip::-webkit-scrollbar{display:none}
  .fchip{flex-shrink:0;padding:8px 16px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;background:none;color:var(--ink-soft);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .18s;white-space:nowrap}
  .fchip.active{color:var(--moss);border-bottom-color:var(--moss)}

  /* GRID */
  .grid-wrap{padding:20px 16px 0}
  .grid-meta{font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--ink-faint);padding:0 8px 16px}
  .plant-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border)}

  /* CARD */
  .plant-card{background:var(--paper);cursor:pointer;transition:background .15s;animation:cardIn .35s ease both;overflow:hidden;position:relative}
  @keyframes cardIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .plant-card:nth-child(1){animation-delay:.03s}.plant-card:nth-child(2){animation-delay:.06s}
  .plant-card:nth-child(3){animation-delay:.09s}.plant-card:nth-child(4){animation-delay:.12s}
  .plant-card:nth-child(5){animation-delay:.15s}.plant-card:nth-child(6){animation-delay:.18s}
  .plant-card:nth-child(7){animation-delay:.21s}.plant-card:nth-child(8){animation-delay:.24s}
  .plant-card:active{background:var(--paper-mid)}
  .plant-card.wide{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr}
  .card-photo{position:relative;aspect-ratio:1;overflow:hidden;background:var(--paper-dark)}
  .plant-card.wide .card-photo{aspect-ratio:unset;min-height:180px}
  .card-photo img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
  .plant-card:hover .card-photo img{transform:scale(1.04)}
  .card-photo-fallback{width:100%;height:100%;min-height:140px;display:flex;align-items:center;justify-content:center;background:var(--moss-mist);color:var(--moss-pale)}
  .health-line{position:absolute;bottom:0;left:0;right:0;height:2px}
  .health-line.thriving{background:var(--health-good)}.health-line.ok{background:var(--health-mid)}.health-line.needs-love{background:var(--health-bad)}

  /* photo-due badge on card */
  .photo-due-badge{position:absolute;top:8px;left:8px;background:rgba(245,241,234,.92);padding:3px 7px;display:flex;align-items:center;gap:4px;font-size:9px;font-weight:500;letter-spacing:.5px;color:var(--ink-soft)}

  .card-body{padding:14px 16px 16px}
  .plant-card.wide .card-body{display:flex;flex-direction:column;justify-content:center;padding:24px}
  .card-tag{font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:6px}
  .card-name{font-family:'Fraunces',serif;font-size:17px;font-weight:400;color:var(--ink);line-height:1.2;margin-bottom:3px}
  .plant-card.wide .card-name{font-size:22px}
  .card-botanical{font-family:'Fraunces',serif;font-size:11px;font-style:italic;font-weight:300;color:var(--ink-soft);margin-bottom:10px}

  /* sparkline on card */
  .card-sparkline{height:20px;margin-top:4px}

  .card-meta{display:flex;flex-direction:column;gap:4px}
  .card-meta-row{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--ink-soft);font-weight:300}

  /* FAB */
  .add-fab{position:fixed;bottom:80px;right:20px;width:48px;height:48px;background:var(--moss);color:#fff;border:none;border-radius:4px;cursor:pointer;box-shadow:var(--shadow-lg);display:flex;align-items:center;justify-content:center;z-index:140;transition:transform .15s}
  .add-fab:active{transform:scale(.93)}

  /* TAB BAR */
  .tab-bar{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--paper);border-top:1px solid var(--border-md);display:flex;z-index:150;padding-bottom:env(safe-area-inset-bottom,8px)}
  .tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px 4px 8px;cursor:pointer;border:none;background:none;gap:4px;font-family:'Jost',sans-serif;transition:color .2s;color:var(--ink-faint)}
  .tab.active{color:var(--moss)}
  .tab-label{font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase}

  /* OVERLAY / SHEET */
  .overlay{position:fixed;inset:0;background:rgba(26,24,16,.5);backdrop-filter:blur(10px);z-index:200;display:flex;align-items:flex-end;animation:fadeIn .2s ease}
  @keyframes fadeIn{from{opacity:0}}
  @keyframes slideUp{from{transform:translateY(100%)}}
  .sheet{background:var(--paper);border-radius:14px 14px 0 0;width:100%;max-height:93vh;overflow-y:auto;animation:slideUp .3s cubic-bezier(.32,.72,0,1);padding-bottom:48px}
  .sheet-handle{width:32px;height:3px;background:var(--border-md);border-radius:2px;margin:14px auto 0}

  /* DETAIL MODAL */
  .modal-img{height:260px;margin:16px 16px 0;overflow:hidden;position:relative;background:var(--paper-dark)}
  .modal-img img{width:100%;height:100%;object-fit:cover}
  .modal-img-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--moss-mist);color:var(--moss-pale)}
  .modal-img-close{position:absolute;top:12px;right:12px;width:30px;height:30px;background:rgba(245,241,234,.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--ink)}
  .health-strip{position:absolute;bottom:0;left:0;right:0;height:3px}
  .health-strip.thriving{background:var(--health-good)}.health-strip.ok{background:var(--health-mid)}.health-strip.needs-love{background:var(--health-bad)}
  .modal-body{padding:22px 22px 0}
  .modal-eyebrow{font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:6px;display:flex;align-items:center;gap:8px}
  .modal-eyebrow-dot{width:6px;height:6px;border-radius:50%}
  .modal-eyebrow-dot.thriving{background:var(--health-good)}.modal-eyebrow-dot.ok{background:var(--health-mid)}.modal-eyebrow-dot.needs-love{background:var(--health-bad)}
  .modal-name{font-family:'Fraunces',serif;font-size:32px;font-weight:400;color:var(--ink);line-height:1.05;margin-bottom:4px}
  .modal-botanical{font-family:'Fraunces',serif;font-size:15px;font-style:italic;font-weight:300;color:var(--ink-soft);margin-bottom:0}

  /* plant voice */
  .plant-voice{font-family:'Fraunces',serif;font-size:14px;font-style:italic;font-weight:300;color:var(--moss-mid);line-height:1.7;margin-top:14px;padding-left:14px;border-left:1.5px solid var(--moss-pale)}

  .divider{height:1px;background:var(--border);margin:20px 0}
  .section-label{font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:12px}

  /* HEALTH ARC */
  .health-arc-wrap{background:var(--paper-mid);padding:16px;margin-bottom:4px}
  .arc-chart{width:100%;height:52px;display:block}
  .arc-legend{display:flex;gap:16px;margin-top:8px}
  .arc-legend-item{display:flex;align-items:center;gap:5px;font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--ink-soft)}
  .arc-dot{width:7px;height:7px;border-radius:50%}
  .arc-history{margin-top:12px;display:flex;flex-direction:column;gap:0}
  .arc-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-top:1px solid var(--border);font-size:12px;font-weight:300;color:var(--ink-mid)}
  .arc-row:first-child{border-top:none}
  .arc-date{font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--ink-faint);width:70px;flex-shrink:0}
  .arc-status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
  .arc-status-dot.thriving{background:var(--health-good)}.arc-status-dot.ok{background:var(--health-mid)}.arc-status-dot.needs-love{background:var(--health-bad)}

  /* health update form inline */
  .health-update-row{display:flex;gap:8px;margin-top:10px}
  .health-btn{flex:1;padding:8px 0;border:1px solid var(--border-md);background:none;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;color:var(--ink-soft);transition:all .15s}
  .health-btn:active,.health-btn.selected{background:var(--moss);color:#fff;border-color:var(--moss)}

  /* PHOTO DIARY */
  .photo-diary-wrap{}
  .photo-prompt{background:var(--moss-mist);border-left:2px solid var(--moss-pale);padding:12px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px}
  .photo-prompt-text{font-size:12px;font-weight:300;color:var(--moss-mid);line-height:1.5;flex:1}
  .photo-prompt-text strong{font-weight:500;color:var(--moss)}
  .photo-add-btn{padding:7px 14px;background:var(--moss);border:none;color:#fff;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;white-space:nowrap}
  .photo-strip{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px}
  .photo-strip::-webkit-scrollbar{display:none}
  .photo-thumb{flex-shrink:0;position:relative}
  .photo-thumb img{width:80px;height:80px;object-fit:cover;display:block}
  .photo-thumb-date{position:absolute;bottom:0;left:0;right:0;background:rgba(26,24,16,.55);font-size:8px;font-weight:500;letter-spacing:.5px;color:#fff;padding:3px 5px;text-align:center}
  .photo-empty{font-size:12px;font-weight:300;color:var(--ink-faint);font-style:italic}

  /* hidden file input */
  .file-input{display:none}

  /* MILESTONES */
  .milestone-list{display:flex;flex-direction:column;gap:0}
  .milestone-row{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)}
  .milestone-row:last-child{border-bottom:none}
  .milestone-icon{color:var(--moss-pale);flex-shrink:0;margin-top:1px}
  .milestone-text{font-size:13px;font-weight:300;color:var(--ink-mid);line-height:1.5;flex:1}
  .milestone-text strong{font-weight:500;color:var(--ink)}
  .milestone-date{font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--ink-faint);flex-shrink:0;margin-top:2px}

  /* CARE LOG */
  .care-log-list{display:flex;flex-direction:column;gap:0}
  .care-log-row{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);align-items:flex-start}
  .care-log-row:last-child{border-bottom:none}
  .care-log-icon{color:var(--ink-faint);flex-shrink:0;margin-top:1px}
  .care-log-text{font-size:13px;font-weight:300;color:var(--ink-mid);line-height:1.5;flex:1}
  .care-log-date{font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--ink-faint);flex-shrink:0;white-space:nowrap;margin-top:2px}
  .log-quick-btns{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
  .log-quick-btn{padding:7px 12px;border:1px solid var(--border-md);background:none;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;cursor:pointer;color:var(--ink-soft);display:flex;align-items:center;gap:5px;transition:all .15s}
  .log-quick-btn:active{background:var(--moss);color:#fff;border-color:var(--moss)}
  .log-note-row{display:flex;gap:8px}
  .log-note-input{flex:1;padding:9px 12px;border:1px solid var(--border-md);background:var(--paper);font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:var(--ink);outline:none}
  .log-note-input:focus{border-color:var(--moss)}
  .log-note-btn{padding:9px 14px;background:var(--moss);border:none;color:#fff;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;cursor:pointer}

  /* PROPAGATION */
  .propagation-block{background:var(--moss-mist);padding:14px 16px;border-left:2px solid var(--moss-pale)}
  .prop-title{font-size:11px;font-weight:500;letter-spacing:.5px;color:var(--moss);margin-bottom:4px}
  .prop-text{font-size:13px;font-weight:300;color:var(--moss-mid);line-height:1.6}
  .prop-parent-link{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--moss);margin-top:6px;cursor:pointer;text-decoration:underline;text-underline-offset:2px}

  /* care table */
  .care-table{width:100%;border-collapse:collapse}
  .care-table td{padding:10px 0;border-bottom:1px solid var(--border);font-size:13px}
  .care-table td:first-child{color:var(--ink-faint);font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;width:80px;padding-right:12px}
  .care-table td:last-child{color:var(--ink-mid);font-weight:300}
  .care-table tr:last-child td{border-bottom:none}

  /* other modal pieces */
  .origin-block{background:var(--moss-mist);padding:14px 16px;border-left:2px solid var(--moss-pale)}
  .origin-block-title{font-size:11px;font-weight:500;letter-spacing:.5px;color:var(--moss);margin-bottom:4px}
  .origin-block-text{font-size:13px;font-weight:300;color:var(--moss-mid);line-height:1.65}
  .personality-text{font-family:'Fraunces',serif;font-size:15px;font-style:italic;font-weight:300;color:var(--ink-mid);line-height:1.8;padding-left:14px;border-left:1.5px solid var(--moss-pale)}
  .tag-row{display:flex;flex-wrap:wrap;gap:6px}
  .detail-tag{padding:4px 10px;border:1px solid var(--border-md);font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--ink-soft)}
  .modal-date{font-size:11px;font-weight:300;color:var(--ink-faint);text-align:center;margin-top:24px;letter-spacing:.5px}
  .bp-item{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px}
  .bp-badge{font-size:9px;font-weight:500;letter-spacing:1px;text-transform:uppercase;padding:3px 8px;border:1px solid var(--border-md);color:var(--ink-soft);white-space:nowrap;flex-shrink:0;margin-top:1px}
  .bp-text{font-size:12px;font-weight:300;color:var(--ink-mid);line-height:1.6}
  .bp-text strong{font-weight:500;color:var(--ink)}

  /* FAMILY TREE */
  .tree-view{padding:0}
  .view-header{padding:24px 24px 20px;border-bottom:1px solid var(--border)}
  .view-title{font-family:'Fraunces',serif;font-size:28px;font-weight:400;color:var(--ink);margin-bottom:4px}
  .view-sub{font-size:12px;font-weight:300;color:var(--ink-soft);letter-spacing:.3px}
  .tree-svg-wrap{overflow-x:auto;background:var(--paper-mid);border-bottom:1px solid var(--border)}
  .family-list{padding:0 16px}
  .family-block{border-bottom:1px solid var(--border);padding:20px 8px}
  .family-block:last-child{border-bottom:none}
  .family-block-header{display:flex;align-items:baseline;gap:12px;margin-bottom:8px}
  .family-swatch{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-bottom:-1px}
  .family-block-name{font-family:'Fraunces',serif;font-size:20px;font-weight:400;color:var(--ink)}
  .family-block-order{font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint)}
  .family-block-desc{font-size:12px;font-weight:300;color:var(--ink-soft);line-height:1.7;margin-bottom:14px;padding-left:22px}
  .family-members{display:flex;flex-direction:column;gap:0;padding-left:22px}
  .family-member{display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--border);cursor:pointer}
  .family-member:first-child{border-top:none}
  .fm-thumb{width:40px;height:40px;overflow:hidden;flex-shrink:0;background:var(--paper-dark)}
  .fm-thumb img{width:100%;height:100%;object-fit:cover}
  .fm-thumb-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--moss-mist);color:var(--moss-pale)}
  .fm-name{font-family:'Fraunces',serif;font-size:14px;font-weight:400;color:var(--ink)}
  .fm-botanical{font-family:'Fraunces',serif;font-size:11px;font-style:italic;font-weight:300;color:var(--ink-faint)}
  .fm-cousin{font-size:10px;font-weight:500;letter-spacing:.5px;color:var(--moss-mid);margin-top:2px}
  .fm-arrow{margin-left:auto;color:var(--ink-faint)}
  .cousin-callout{margin:16px 24px;padding:14px 16px;background:var(--moss-mist);border-left:2px solid var(--moss-pale)}
  .cousin-callout-text{font-size:12px;font-weight:300;color:var(--moss-mid);line-height:1.7}
  .cousin-callout-text strong{font-weight:500;color:var(--moss)}

  /* BENEFITS */
  .benefits-view{padding:0}
  .benefits-header{background:var(--moss);padding:24px 24px 20px}
  .benefits-title{font-family:'Fraunces',serif;font-size:28px;font-weight:300;font-style:italic;color:#fff;margin-bottom:4px}
  .benefits-sub{font-size:12px;font-weight:300;letter-spacing:.3px;color:var(--moss-pale);opacity:.8}
  .bcat-strip{display:flex;overflow-x:auto;scrollbar-width:none;background:var(--moss);border-top:1px solid rgba(255,255,255,.1)}
  .bcat-strip::-webkit-scrollbar{display:none}
  .bcat-btn{flex-shrink:0;padding:12px 16px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:none;background:none;color:rgba(255,255,255,.45);border-bottom:2px solid transparent;transition:all .18s;white-space:nowrap}
  .bcat-btn.active{color:#fff;border-bottom-color:#fff}
  .bplant-row{border-bottom:1px solid var(--border)}
  .bplant-head{display:flex;align-items:center;gap:14px;padding:16px 24px;cursor:pointer;transition:background .15s}
  .bplant-head:active{background:var(--paper-mid)}
  .bplant-thumb{width:44px;height:44px;overflow:hidden;flex-shrink:0;background:var(--paper-dark)}
  .bplant-thumb img{width:100%;height:100%;object-fit:cover}
  .bplant-thumb-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--moss-mist);color:var(--moss-pale)}
  .bplant-name{font-family:'Fraunces',serif;font-size:16px;font-weight:400;color:var(--ink)}
  .bplant-count{font-size:10px;font-weight:500;letter-spacing:1px;color:var(--ink-faint)}
  .bplant-chevron{margin-left:auto;color:var(--ink-faint);transition:transform .2s}
  .bplant-chevron.open{transform:rotate(180deg)}
  .bplant-benefits{padding:0 24px 16px}
  .benefit-row{display:flex;gap:14px;padding:12px 0;border-top:1px solid var(--border);align-items:flex-start}
  .benefit-label{font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint);width:64px;flex-shrink:0;padding-top:2px;line-height:1.4}
  .benefit-body{font-size:13px;font-weight:300;color:var(--ink-mid);line-height:1.65;flex:1}
  .benefit-body strong{font-weight:500;color:var(--ink)}

  /* ORIGINS */
  .map-container{position:relative;overflow:hidden;height:280px;background:#C8D8E8}
  .map-svg{width:100%;height:100%;display:block}
  .map-legend{padding:20px 24px 0}
  .map-legend-title{font-family:'Fraunces',serif;font-size:22px;font-weight:400;color:var(--ink);margin-bottom:4px}
  .map-legend-sub{font-size:12px;font-weight:300;color:var(--ink-soft);margin-bottom:20px}
  .region-row{border-top:1px solid var(--border);padding:16px 0;cursor:pointer}
  .region-row:last-child{border-bottom:1px solid var(--border)}
  .region-row-head{display:flex;align-items:center;gap:12px}
  .region-swatch{width:8px;height:8px;border-radius:50%;flex-shrink:0}
  .region-row-name{font-family:'Fraunces',serif;font-size:17px;font-weight:400;color:var(--ink);flex:1}
  .region-row-count{font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-faint)}
  .region-body{padding:12px 0 0 20px}
  .region-desc{font-size:12px;font-weight:300;color:var(--ink-soft);line-height:1.65;margin-bottom:12px}
  .region-chips{display:flex;flex-wrap:wrap;gap:6px}
  .region-chip{padding:5px 12px;border:1px solid var(--border-md);font-size:11px;font-weight:500;letter-spacing:.5px;color:var(--ink-mid);cursor:pointer}

  /* TIMELINE */
  .timeline-view{padding:0}
  .tl-year-header{padding:16px 24px 10px;background:var(--paper);font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink-faint);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10}
  .tl-item{display:flex;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s}
  .tl-item:active{background:var(--paper-mid)}
  .tl-spine{width:48px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;padding-top:20px}
  .tl-spine-dot{width:8px;height:8px;border-radius:50%;border:1.5px solid var(--paper);flex-shrink:0}
  .tl-spine-dot.thriving{background:var(--health-good)}.tl-spine-dot.ok{background:var(--health-mid)}.tl-spine-dot.needs-love{background:var(--health-bad)}
  .tl-spine-line{width:1px;flex:1;background:var(--border);margin-top:6px}
  .tl-content{flex:1;padding:18px 20px 18px 0;display:flex;gap:14px}
  .tl-thumb{width:64px;height:64px;flex-shrink:0;overflow:hidden;background:var(--paper-dark)}
  .tl-thumb img{width:100%;height:100%;object-fit:cover}
  .tl-thumb-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--moss-mist);color:var(--moss-pale)}
  .tl-info{flex:1}
  .tl-date{font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:4px}
  .tl-name{font-family:'Fraunces',serif;font-size:16px;font-weight:400;color:var(--ink);margin-bottom:2px}
  .tl-botanical{font-family:'Fraunces',serif;font-size:11px;font-style:italic;font-weight:300;color:var(--ink-faint);margin-bottom:6px}
  .tl-age{font-size:11px;font-weight:500;letter-spacing:.5px;color:var(--moss-mid)}

  /* STATS */
  .stats-view{padding:0}
  .stats-hero{background:var(--moss);padding:24px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px}
  .stat-cell{text-align:center;padding:0 8px}
  .stat-cell:not(:last-child){border-right:1px solid rgba(255,255,255,.15)}
  .stat-num{font-family:'Fraunces',serif;font-size:36px;font-weight:300;color:#fff;line-height:1}
  .stat-lbl{font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--moss-pale);opacity:.7;margin-top:4px}
  .stats-section{padding:20px 24px 0}
  .stats-section-label{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:16px}
  .bar-row{display:flex;align-items:center;gap:12px;margin-bottom:10px}
  .bar-label{font-size:12px;font-weight:300;color:var(--ink-mid);width:100px;flex-shrink:0}
  .bar-track{flex:1;height:3px;background:var(--paper-dark)}
  .bar-fill{height:100%;background:var(--moss-light);transition:width .7s cubic-bezier(.34,1.2,.64,1)}
  .bar-count{font-size:11px;font-weight:500;color:var(--ink-faint);width:16px;text-align:right}
  .facts-list{margin-top:8px}
  .fact-row{display:flex;gap:14px;padding:14px 0;border-top:1px solid var(--border);align-items:flex-start}
  .fact-icon{color:var(--moss-pale);flex-shrink:0;margin-top:1px}
  .fact-text{font-size:13px;font-weight:300;color:var(--ink-mid);line-height:1.6}
  .fact-text strong{font-weight:500;color:var(--ink)}
  .diff-row{display:flex;flex-wrap:wrap;gap:8px}
  .diff-chip{padding:6px 14px;border:1px solid var(--border-md);font-size:11px;font-weight:500;letter-spacing:.5px;color:var(--ink-mid)}

  /* ADD FORM */
  .form-header{padding:22px 22px 18px;border-bottom:1px solid var(--border)}
  .form-title{font-family:'Fraunces',serif;font-size:24px;font-weight:400;color:var(--ink)}
  .form-body{padding:20px 22px}
  .form-group{margin-bottom:16px}
  .form-label{display:block;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:8px}
  .form-input,.form-select,.form-textarea{width:100%;padding:12px 14px;border:1px solid var(--border-md);background:var(--paper);font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);outline:none;transition:border-color .18s;border-radius:0}
  .form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--moss)}
  .form-textarea{resize:none;height:80px}
  .form-select{appearance:none;cursor:pointer}
  .submit-btn{width:100%;padding:15px;background:var(--moss);color:#fff;border:none;font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;margin-top:8px;border-radius:0}
  .submit-btn:active{background:var(--moss-mid)}
  .empty{text-align:center;padding:64px 24px;color:var(--ink-faint)}
  .empty h3{font-family:'Fraunces',serif;font-size:22px;font-weight:400;color:var(--ink-soft);margin-bottom:8px}
  .empty p{font-size:13px;font-weight:300;line-height:1.6}
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All","Tropical","Trailing","Rare","Succulents & Cacti"];
const HEALTH_LABEL = { thriving:"Thriving", ok:"Doing okay", "needs-love":"Needs attention" };
const BENEFIT_CATS = ["All","Medicinal","Air","Edible","Cultural","Folklore","Feng Shui"];
const LOG_TYPES = [
  { type:"watered",   icon:"drop",    label:"Watered"    },
  { type:"fertilised",icon:"sparkle", label:"Fertilised" },
  { type:"repotted",  icon:"sprout",  label:"Repotted"   },
  { type:"new-leaf",  icon:"leaf",    label:"New leaf"   },
  { type:"pest",      icon:"close",   label:"Pest found" },
  { type:"trimmed",   icon:"chart",   label:"Trimmed"    },
];

const PLANT_PHOTOS = {
  "Monstera Deliciosa":"https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80",
  "String of Hearts":"https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&q=80",
  "Dwarf Chenille Plant":"https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=600&q=80",
  "Salix Caprea Pendula":"https://images.unsplash.com/photo-1542601906897-ecd47f2cd39b?w=600&q=80",
  "Money Tree":"https://images.unsplash.com/photo-1632321405902-24afac19c312?w=600&q=80",
  "Fiddle Leaf Fig":"https://images.unsplash.com/photo-1555955210-c3a7bcb4db5c?w=600&q=80",
  "Hoya Burtoniae":"https://images.unsplash.com/photo-1459156212016-c812468e2115?w=600&q=80",
  "Golden Pothos":"https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600&q=80",
};

const PLANT_ORIGINS = {
  "Monstera Deliciosa":  { country:"Mexico & Panama",         desc:"Grows as an epiphyte in humid cloud forests, climbing trees toward filtered light." },
  "String of Hearts":    { country:"South Africa & Zimbabwe", desc:"Trails over rocky outcrops in dry scrubland, storing water in its tubers." },
  "Dwarf Chenille Plant":{ country:"Malaysia & Indonesia",    desc:"Thrives in warm, humid jungle margins with bright filtered light." },
  "Salix Caprea Pendula":{ country:"British Isles to Caucasus",desc:"Grows along stream banks and boggy ground in cool, moist climates." },
  "Money Tree":          { country:"Mexico to Honduras",      desc:"Found in swampy wetlands and riverbanks, naturally growing near water." },
  "Fiddle Leaf Fig":     { country:"Sierra Leone to Cameroon",desc:"Grows in humid lowland jungle clearings where light breaks through the canopy." },
  "Hoya Burtoniae":      { country:"Philippines",             desc:"An epiphyte found clinging to mossy tree branches in Philippine cloud forests." },
  "Golden Pothos":       { country:"Solomon Islands",         desc:"Originally from a single island, now one of the world's most widely distributed houseplants." },
};

const REGIONS = [
  { id:"central-america",name:"Central America", color:"#4A7A5A",plants:["Monstera Deliciosa","Money Tree"],desc:"Steamy tropical rainforests from Mexico to Panama.",mapX:18,mapY:42},
  { id:"west-africa",    name:"West Africa",     color:"#8B6914",plants:["Fiddle Leaf Fig"],               desc:"Humid lowland jungles of the Congo basin and Guinea coast.",mapX:47,mapY:45},
  { id:"southern-africa",name:"Southern Africa", color:"#A07840",plants:["String of Hearts"],              desc:"Rocky semi-arid savannas of Zimbabwe and South Africa.",mapX:51,mapY:58},
  { id:"southeast-asia", name:"Southeast Asia",  color:"#6A4A3A",plants:["Dwarf Chenille Plant","Hoya Burtoniae","Golden Pothos"],desc:"Malaysian jungles to Philippine cloud forests.",mapX:74,mapY:45},
  { id:"europe-asia",    name:"Europe & W. Asia",color:"#4A5A6A",plants:["Salix Caprea Pendula"],          desc:"Temperate woodlands and stream banks across Europe.",mapX:51,mapY:32},
];

const FAMILIES = [
  { name:"Araceae",     order:"Alismatales", color:"#4A7A5A",desc:"The arum family — one of the most iconic houseplant families on Earth.",members:["Monstera Deliciosa","Golden Pothos"],sharedTraits:"Both thrive in humid indirect light and are known air purifiers." },
  { name:"Apocynaceae", order:"Gentianales", color:"#7A5A8A",desc:"The dogbane family — spanning succulents, climbing vines, and flowering tropicals.",members:["String of Hearts","Hoya Burtoniae"],sharedTraits:"Both are trailing vines that store water and produce intricate small flowers." },
  { name:"Euphorbiaceae",order:"Malpighiales",color:"#8A4A3A",desc:"The spurge family — over 7,000 species from rainforest canopies to desert succulents.",members:["Dwarf Chenille Plant"],sharedTraits:"A dramatic singleton from a remarkable family." },
  { name:"Salicaceae",  order:"Malpighiales",color:"#4A5A7A",desc:"The willow family — ancient trees that provided the precursor to aspirin.",members:["Salix Caprea Pendula"],sharedTraits:"The sole woody plant in your collection." },
  { name:"Malvaceae",   order:"Malvales",    color:"#8A6A2A",desc:"The mallow family — home to cotton, cacao, hibiscus, and the Money Tree.",members:["Money Tree"],sharedTraits:"A family of remarkable generosity to humanity." },
  { name:"Moraceae",    order:"Rosales",     color:"#6A5A3A",desc:"The mulberry family — including figs and the sacred Bodhi tree.",members:["Fiddle Leaf Fig"],sharedTraits:"Shares family with the tree of Buddha's enlightenment." },
];

const PLANT_BENEFITS = {
  "Monstera Deliciosa":[{cat:"Air",text:"<strong>Removes formaldehyde and benzene</strong> from indoor air. NASA's Clean Air Study found Araceae among the most effective air purifiers."},{cat:"Edible",text:"<strong>The fruit is edible when fully ripe</strong> — tasting like pineapple and banana. Unripe fruit contains irritating calcium oxalates."},{cat:"Cultural",text:"<strong>Deeply embedded in Mexican craft traditions</strong> — the leaf form appears in weaving, pottery, and textile design."},{cat:"Folklore",text:"<strong>Called 'the delicious monster'</strong> by early European naturalists who believed it to be carnivorous."}],
  "String of Hearts":[{cat:"Medicinal",text:"<strong>Used in traditional Zulu medicine</strong> for abdominal pain. Tubers contain alkaloids with pharmaceutical interest."},{cat:"Folklore",text:"<strong>Known as 'Rosary Vine'</strong> — the heart-shaped leaves were seen as a rosary bringing spiritual protection."},{cat:"Cultural",text:"<strong>A Victorian gift between lovers</strong> — a living symbol of enduring affection."},{cat:"Feng Shui",text:"<strong>Placed in the southwest corner</strong>, the trailing form channels energy and attracts romantic harmony."}],
  "Dwarf Chenille Plant":[{cat:"Medicinal",text:"<strong>Used in traditional Southeast Asian medicine</strong> for skin conditions and fever. Contains antimicrobial tannins and flavonoids."},{cat:"Cultural",text:"<strong>Inspired motifs in Malaysian batik</strong> fabric design. A symbol of boldness across Southeast Asia."},{cat:"Folklore",text:"<strong>Planted near doorways in Indonesian tradition</strong> to ward off envy — the red colour thought to absorb negative energy."},{cat:"Air",text:"<strong>Contributes meaningfully to indoor humidity</strong> and oxygen production in dry or air-conditioned spaces."}],
  "Salix Caprea Pendula":[{cat:"Medicinal",text:"<strong>Willow bark contains salicin</strong> — the natural compound from which aspirin was synthesised in 1897. Used for pain and fever for 4,000+ years."},{cat:"Cultural",text:"<strong>Sacred to the moon goddess</strong> in Celtic tradition. Druid wands were often made from willow."},{cat:"Folklore",text:"<strong>Appears in the folklore of nearly every culture</strong> that encountered it — associated with grief, the moon, and the space between worlds."},{cat:"Edible",text:"<strong>Young catkins are edible in early spring</strong>, used as famine food. Inner bark was ground into flour in lean times."}],
  "Money Tree":[{cat:"Feng Shui",text:"<strong>Perhaps the most powerful feng shui plant in your collection.</strong> The braided trunk and five-leaf clusters represent the five elements."},{cat:"Cultural",text:"<strong>A Taiwanese truck driver braided five Pachira plants</strong> in the 1980s as a good luck charm — sparking a global craze."},{cat:"Air",text:"<strong>Removes toluene and xylene</strong> from indoor air — compounds common in paints and furniture."},{cat:"Edible",text:"<strong>Seeds are edible when roasted</strong>, reportedly tasting like chestnuts. Used in traditional Brazilian cooking."}],
  "Fiddle Leaf Fig":[{cat:"Air",text:"<strong>Large leaf surface area</strong> makes the Fiddle Leaf one of the most effective air purifiers, absorbing CO₂ at a remarkable rate."},{cat:"Cultural",text:"<strong>In West African cultures, fig trees mark sacred boundaries</strong> — planted at village edges to invoke ancestral protection."},{cat:"Folklore",text:"<strong>The Bodhi tree under which Buddha found enlightenment</strong> was a Ficus — a direct cousin. The genus carries an association with wisdom."},{cat:"Feng Shui",text:"<strong>Large upward-facing leaves lift the energy of a room.</strong> Considered one of the most powerful plants for raising a home's vibration."}],
  "Hoya Burtoniae":[{cat:"Cultural",text:"<strong>Deeply woven into Philippine cultural identity</strong> — gifted at weddings as a symbol of enduring love and loyalty."},{cat:"Folklore",text:"<strong>A flowering hoya foretells good fortune</strong> in Filipino folklore. Star-shaped flowers in perfect clusters were associated with answered prayers."},{cat:"Medicinal",text:"<strong>Hoya latex used topically</strong> in Philippine medicine for skin ailments. Anti-inflammatory compounds identified in modern research."},{cat:"Feng Shui",text:"<strong>The spiralling growth traces chi</strong> through a space. A flowering hoya attracts joy and positive relationships."}],
  "Golden Pothos":[{cat:"Air",text:"<strong>One of the most studied air-purifying plants.</strong> NASA ranked it top for removing benzene, formaldehyde, xylene, and carbon monoxide."},{cat:"Medicinal",text:"<strong>Used in Ayurvedic medicine</strong> as a poultice for skin conditions. Latex has antibacterial properties under active study."},{cat:"Feng Shui",text:"<strong>The trailing form softens sharp corners</strong> (poison arrows in feng shui). Placed on cabinets, it draws energy downward and grounds a space."},{cat:"Cultural",text:"<strong>From a single remote Pacific island</strong> to arguably the world's most distributed houseplant — a testament to adaptability."},{cat:"Folklore",text:"<strong>Known as 'Devil's Ivy'</strong> — refuses to die even in the dark. Victorian lore held that if a pothos died, misfortune would follow."}],
};

// ─── PLANT VOICE GENERATOR ────────────────────────────────────────────────────
function getPlantVoice(plant) {
  const careLog = plant.careLog || [];
  const lastWater = careLog.filter(e=>e.type==="watered").sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
  const daysSinceWater = lastWater ? Math.floor((Date.now()-new Date(lastWater.date))/86400000) : null;
  const lastHealth = (plant.healthLog||[]).slice(-1)[0];
  const voices = {
    "Monstera Deliciosa": () => {
      if (daysSinceWater !== null && daysSinceWater > 10) return `${daysSinceWater} days without water. I'm not angry, I'm just… making my feelings known.`;
      if (plant.health === "needs-love") return `I am struggling. Dramatically. Someone look at me.`;
      if (daysSinceWater !== null && daysSinceWater < 3) return `Freshly watered and feeling magnificent. A new leaf may be imminent.`;
      return `Doing well. Plotting a new fenestration. Don't rush me.`;
    },
    "String of Hearts": () => {
      if (daysSinceWater !== null && daysSinceWater > 14) return `Still here. Honestly, the neglect suits me.`;
      if (plant.health === "thriving") return `Quiet out here on the vine. Quietly thriving. That's the whole plan.`;
      return `Trailing along. Finding my light. Asking for nothing.`;
    },
    "Dwarf Chenille Plant": () => {
      if (plant.health === "needs-love") return `The catkins are looking less dramatic than usual. This is unacceptable.`;
      if (daysSinceWater !== null && daysSinceWater < 4) return `Watered recently. Good. I have standards.`;
      return `Still the most interesting plant in this room. Just saying.`;
    },
    "Salix Caprea Pendula": () => {
      if (plant.health === "thriving") return `Ancient and unbothered. The weeping is just my aesthetic.`;
      return `I have survived centuries of rain. I will survive this.`;
    },
    "Money Tree": () => {
      if (plant.health === "thriving") return `Prosperous. Grounded. Five elements in perfect harmony.`;
      if (daysSinceWater !== null && daysSinceWater > 14) return `Even fortune favours those who remember to water their plants.`;
      return `Good vibes incoming. I can feel it.`;
    },
    "Fiddle Leaf Fig": () => {
      if (plant.health === "needs-love") return `You moved me, didn't you. I knew it. I will remember this.`;
      if (plant.health === "ok") return `Things are tolerable. I'm not saying they're good. Tolerable.`;
      return `The light is exactly right today. I may allow a new leaf.`;
    },
    "Hoya Burtoniae": () => {
      if (plant.health === "thriving") return `Still here. Still waiting to bloom. Good things take time.`;
      return `The star-shaped flowers are forming. They come when they're ready.`;
    },
    "Golden Pothos": () => {
      if (daysSinceWater !== null && daysSinceWater > 14) return `Honestly I've been through worse. Still thriving. It's fine.`;
      if (plant.health === "thriving") return `Alive, well, and incredibly easy about the whole thing.`;
      return `Still here. Always will be. That's kind of my whole thing.`;
    },
  };
  const fn = voices[plant.name];
  return fn ? fn() : `Growing quietly. Learning. Getting there.`;
}

// ─── HEALTH ARC SPARKLINE ─────────────────────────────────────────────────────
const HEALTH_VAL = { thriving:3, ok:2, "needs-love":1 };
const HEALTH_COLOR = { thriving:"var(--health-good)", ok:"var(--health-mid)", "needs-love":"var(--health-bad)" };

function Sparkline({ log, width=80, height=20 }) {
  if (!log || log.length < 2) return null;
  const vals = log.map(e=>HEALTH_VAL[e.status]||2);
  const min=1, max=3, W=width, H=height, pad=3;
  const pts = vals.map((v,i)=>{
    const x = pad + (i/(vals.length-1))*(W-pad*2);
    const y = H - pad - ((v-min)/(max-min))*(H-pad*2);
    return `${x},${y}`;
  }).join(" ");
  const lastColor = HEALTH_COLOR[log[log.length-1]?.status] || "var(--health-good)";
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polyline points={pts} fill="none" stroke={lastColor} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" opacity=".8"/>
      {vals.map((v,i)=>{
        const x=pad+(i/(vals.length-1))*(W-pad*2);
        const y=H-pad-((v-min)/(max-min))*(H-pad*2);
        return <circle key={i} cx={x} cy={y} r="2" fill={HEALTH_COLOR[log[i]?.status]}/>
      })}
    </svg>
  );
}

function ArcChart({ log }) {
  if (!log||log.length<2) return <div style={{fontSize:12,fontWeight:300,color:"var(--ink-faint)",fontStyle:"italic"}}>No history yet — start logging health updates below.</div>;
  const vals=log.map(e=>HEALTH_VAL[e.status]||2);
  const W=320, H=52, pad=8;
  const pts=vals.map((v,i)=>{
    const x=pad+(i/(vals.length-1))*(W-pad*2);
    const y=H-pad-((v-1)/(2))*(H-pad*2);
    return `${x},${y}`;
  }).join(" ");
  const lastColor=HEALTH_COLOR[log[log.length-1]?.status]||"var(--health-good)";
  return (
    <div className="health-arc-wrap">
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block"}}>
        <line x1={pad} y1={H-pad} x2={W-pad} y2={H-pad} stroke="var(--border-md)" strokeWidth="1"/>
        <line x1={pad} y1={(H-pad*2)/2+pad} x2={W-pad} y2={(H-pad*2)/2+pad} stroke="var(--border)" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1={pad} y1={pad} x2={W-pad} y2={pad} stroke="var(--border)" strokeWidth="1" strokeDasharray="3,3"/>
        <polyline points={pts} fill="none" stroke={lastColor} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        {vals.map((v,i)=>{
          const x=pad+(i/(vals.length-1))*(W-pad*2);
          const y=H-pad-((v-1)/2)*(H-pad*2);
          return <circle key={i} cx={x} cy={y} r="3" fill={HEALTH_COLOR[log[i]?.status]} stroke="var(--paper)" strokeWidth="1.5"/>;
        })}
      </svg>
      <div className="arc-legend">
        {["thriving","ok","needs-love"].map(s=>(
          <div key={s} className="arc-legend-item">
            <div className="arc-dot" style={{background:HEALTH_COLOR[s]}}/>
            {HEALTH_LABEL[s]}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Photo({ plant, fallback="card-photo-fallback", showLatestDiary=false }) {
  const [err,setErr]=useState(false);
  // Use latest diary photo if requested and available
  const diaryPhotos = plant.diaryPhotos||[];
  const latestDiary = showLatestDiary && diaryPhotos.length>0 ? diaryPhotos[diaryPhotos.length-1] : null;
  const src = latestDiary?.dataUrl || plant.customPhoto || PLANT_PHOTOS[plant.name];
  if(!err&&src) return <img src={src} alt={plant.name} onError={()=>setErr(true)}/>;
  return <div className={fallback}><Icon name="leaf" size={24} stroke="currentColor" strokeWidth={1}/></div>;
}

function getAge(d){
  const days=Math.floor((Date.now()-new Date(d))/86400000);
  if(days<30) return `${days} days`;
  if(days<365) return `${Math.floor(days/30)} months`;
  const y=Math.floor(days/365),m=Math.floor((days%365)/30);
  return m>0?`${y}y ${m}mo`:`${y} years`;
}
function fmtDate(d){return new Date(d).toLocaleDateString("en-US",{month:"long",year:"numeric"});}
function fmtShort(d){return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric"});}
function fmtFull(d){return new Date(d).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});}

function photoDue(plant) {
  const photos = plant.diaryPhotos||[];
  if(photos.length===0) return true;
  const last = new Date(photos[photos.length-1].date);
  return (Date.now()-last.getTime()) > 30*24*60*60*1000;
}

function getMilestones(plant, plants) {
  const ms = [];
  ms.push({ icon:"heart", text:<>Welcomed <strong>{plant.name}</strong> into your collection</>, date:plant.added });
  const log = plant.healthLog||[];
  log.forEach(e=>{
    if(e.status!==log[log.indexOf(e)-1]?.status){
      ms.push({ icon:"chart", text:<>Health changed to <strong>{HEALTH_LABEL[e.status]}</strong>{e.note?` — ${e.note}`:""}</>, date:e.date });
    }
  });
  const careLog = plant.careLog||[];
  careLog.filter(e=>["repotted","new-leaf","pest"].includes(e.type)).forEach(e=>{
    const labels={repotted:"Repotted",repot:"Repotted","new-leaf":"New leaf spotted","pest":"Pest found and treated"};
    ms.push({ icon:e.type==="new-leaf"?"leaf":e.type==="repotted"?"sprout":"close", text:<><strong>{labels[e.type]||e.type}</strong>{e.note?` — ${e.note}`:""}</>, date:e.date });
  });
  const daysOld=Math.floor((Date.now()-new Date(plant.added))/86400000);
  if(daysOld>=180) ms.push({ icon:"star", text:<><strong>6 months</strong> together</>, date:new Date(new Date(plant.added).getTime()+180*86400000).toISOString() });
  if(daysOld>=365) ms.push({ icon:"star", text:<><strong>One year</strong> together</>, date:new Date(new Date(plant.added).getTime()+365*86400000).toISOString() });
  if(plant.parentId){
    const parent=plants.find(p=>p.id===plant.parentId);
    if(parent) ms.push({ icon:"link", text:<>Propagated from <strong>{parent.name}</strong></>, date:plant.added });
  }
  return ms.sort((a,b)=>new Date(a.date)-new Date(b.date));
}

// ─── VIEWS ────────────────────────────────────────────────────────────────────
function GardenView({ plants, filter, setFilter, search, setSearch, onSelect }) {
  const filtered=plants.filter(p=>{
    const mc=filter==="All"||p.category===filter;
    const ms=!search||[p.name,p.botanical,p.room].some(v=>v?.toLowerCase().includes(search.toLowerCase()));
    return mc&&ms;
  });
  return (
    <>
      <div className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-eyebrow">Plant journal</span>
            <span className="brand-name">Leafy</span>
          </div>
          <div className="header-counts">
            <div className="hcount"><div className="hcount-num">{plants.length}</div><div className="hcount-label">Plants</div></div>
            <div className="hcount-divider"/>
            <div className="hcount"><div className="hcount-num">{plants.filter(p=>p.health==="thriving").length}</div><div className="hcount-label">Thriving</div></div>
          </div>
        </div>
        <div className="search-bar">
          <Icon name="leaf" size={15} stroke="rgba(255,255,255,.4)" strokeWidth={1.5}/>
          <input placeholder="Search your collection…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>
      <div className="filter-strip">
        {CATEGORIES.map(c=><button key={c} className={`fchip ${filter===c?"active":""}`} onClick={()=>setFilter(c)}>{c}</button>)}
      </div>
      <div className="grid-wrap">
        <div className="grid-meta">{filtered.length} {filtered.length===1?"specimen":"specimens"}{filter!=="All"?` · ${filter}`:""}</div>
        {filtered.length===0?(
          <div className="empty"><h3>No plants found</h3><p>Try a different search or category.</p></div>
        ):(
          <div className="plant-grid">
            {filtered.map((p,i)=>{
              const hl=p.healthLog||[{status:p.health,date:p.added}];
              const due=photoDue(p);
              return (
                <div key={p.id} className={`plant-card ${i===0&&!search&&filter==="All"?"wide":""}`} onClick={()=>onSelect(p.id)}>
                  <div className="card-photo">
                    <Photo plant={p} showLatestDiary={true}/>
                    <div className={`health-line ${p.health}`}/>
                    {due&&<div className="photo-due-badge"><Icon name="camera" size={9} stroke="var(--ink-soft)" strokeWidth={1.5}/> Photo due</div>}
                  </div>
                  <div className="card-body">
                    <div className="card-tag">{p.category}</div>
                    <div className="card-name">{p.name}</div>
                    <div className="card-botanical">{p.botanical}</div>
                    {hl.length>=2&&<div className="card-sparkline"><Sparkline log={hl} width={i===0&&!search&&filter==="All"?120:80} height={18}/></div>}
                    <div className="card-meta" style={{marginTop:6}}>
                      {p.water&&<div className="card-meta-row"><Icon name="drop" size={11} stroke="var(--ink-faint)" strokeWidth={1.5}/>{p.water}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function FamilyView({ plants, onSelect }) {
  const present=FAMILIES.filter(f=>f.members.some(n=>plants.find(p=>p.name===n)));
  const cousins=present.filter(f=>f.members.filter(n=>plants.find(p=>p.name===n)).length>1);
  const TreeSVG = () => {
    const W=380,H=300,cx=W/2;
    const orders={};
    present.forEach(f=>{if(!orders[f.order])orders[f.order]=[];orders[f.order].push(f);});
    const ol=Object.entries(orders);
    const oSp=W/(ol.length+1);
    const nodes=[],edges=[];
    nodes.push({id:"root",label:"Plantae",x:cx,y:24,r:20,bg:"#2C3D2E",fg:"#fff"});
    ol.forEach(([order,fams],oi)=>{
      const ox=oSp*(oi+1),oy=90;
      nodes.push({id:`o-${order}`,label:order,x:ox,y:oy,r:14,bg:"#3D5540",fg:"#fff"});
      edges.push({x1:cx,y1:44,x2:ox,y2:76});
      fams.forEach((fam,fi)=>{
        const t=fams.length,fx=ox+(fi-(t-1)/2)*Math.min(55,110/t),fy=162;
        nodes.push({id:`f-${fam.name}`,label:fam.name,x:fx,y:fy,r:18,bg:fam.color,fg:"#fff"});
        edges.push({x1:ox,y1:104,x2:fx,y2:144});
        fam.members.filter(n=>plants.find(p=>p.name===n)).forEach((pname,pi,arr)=>{
          const pp=plants.find(p=>p.name===pname);
          const px=fx+(pi-(arr.length-1)/2)*Math.min(36,60/arr.length),py=248;
          nodes.push({id:`p-${pname}`,label:pname.split(" ")[0],x:px,y:py,r:13,bg:"#F5F1EA",fg:fam.color,border:fam.color});
          edges.push({x1:fx,y1:180,x2:px,y2:235});
        });
      });
    });
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:H,display:"block"}}>
        {[{y:24,l:"Kingdom"},{y:90,l:"Order"},{y:162,l:"Family"},{y:248,l:"Genus"}].map(lv=>(
          <text key={lv.l} x="8" y={lv.y+3} fontSize="7" fill="#B0A898" fontFamily="Jost" fontWeight="500" letterSpacing="1.5">{lv.l.toUpperCase()}</text>
        ))}
        {edges.map((e,i)=><line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#C8D8C4" strokeWidth="1" strokeDasharray="3,3" opacity=".8"/>)}
        {nodes.map(n=>(
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.bg} stroke={n.border||"none"} strokeWidth={n.border?"1.5":"0"} style={{filter:"drop-shadow(0 1px 3px rgba(0,0,0,.12))"}}/>
            <text x={n.x} y={n.y+.5} textAnchor="middle" dominantBaseline="middle" fontSize={n.r>16?"7.5":n.r>12?"7":"6.5"} fill={n.fg} fontWeight="400" fontFamily="Jost">{n.label.length>9?n.label.slice(0,8)+"…":n.label}</text>
          </g>
        ))}
      </svg>
    );
  };
  return (
    <div className="tree-view">
      <div className="view-header"><div className="view-title">Botanical family</div><div className="view-sub">How your plants relate in the living world</div></div>
      <div className="tree-svg-wrap"><TreeSVG/></div>
      {cousins.length>0&&<div className="cousin-callout"><div className="cousin-callout-text">{cousins.map(f=>{const ns=f.members.filter(n=>plants.find(p=>p.name===n));return <span key={f.name}><strong>{ns.join(" and ")}</strong> are botanical cousins — both {f.name}. {f.sharedTraits} </span>;})}</div></div>}
      <div className="family-list">
        {present.map(fam=>{
          const fps=fam.members.filter(n=>plants.find(p=>p.name===n));
          return (
            <div key={fam.name} className="family-block">
              <div className="family-block-header"><div className="family-swatch" style={{background:fam.color}}/><span className="family-block-name">{fam.name}</span><span className="family-block-order">{fam.order}</span></div>
              <div className="family-block-desc">{fam.desc}</div>
              <div className="family-members">
                {fps.map(name=>{
                  const p=plants.find(pl=>pl.name===name);
                  return (
                    <div key={name} className="family-member" onClick={()=>onSelect(p.id)}>
                      <div className="fm-thumb"><Photo plant={p} fallback="fm-thumb-fallback"/></div>
                      <div style={{flex:1}}><div className="fm-name">{p.name}</div><div className="fm-botanical">{p.botanical}</div>{fps.length>1&&<div className="fm-cousin">Cousin of {fps.filter(n=>n!==name).join(", ")}</div>}</div>
                      <div className="fm-arrow"><Icon name="arrow" size={14} stroke="var(--ink-faint)" strokeWidth={1.5}/></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OriginsView({ plants, onSelect }) {
  const [active,setActive]=useState(null);
  return (
    <div style={{padding:0}}>
      <div className="map-container">
        <svg viewBox="0 0 400 220" className="map-svg">
          <rect width="400" height="220" fill="#C8D8E8"/>
          <path d="M30,30 L90,25 L100,35 L95,55 L80,70 L70,80 L55,75 L40,60 L25,45 Z" fill="#D8DED0" stroke="#fff" strokeWidth=".5"/>
          <path d="M70,80 L80,70 L85,85 L75,95 L65,88 Z" fill="#D8DED0" stroke="#fff" strokeWidth=".5"/>
          <path d="M65,88 L85,85 L95,100 L100,130 L85,155 L70,160 L55,145 L50,120 L55,100 Z" fill="#D8DED0" stroke="#fff" strokeWidth=".5"/>
          <path d="M155,25 L185,20 L195,30 L190,45 L175,50 L160,45 L150,35 Z" fill="#D8DED0" stroke="#fff" strokeWidth=".5"/>
          <path d="M160,50 L195,45 L210,60 L215,90 L205,120 L190,145 L170,148 L155,130 L148,100 L150,70 Z" fill="#D8DED0" stroke="#fff" strokeWidth=".5"/>
          <path d="M195,20 L290,15 L310,30 L305,60 L280,70 L250,65 L220,55 L195,45 Z" fill="#D8DED0" stroke="#fff" strokeWidth=".5"/>
          <path d="M270,60 L295,58 L305,70 L295,85 L275,80 Z" fill="#D8DED0" stroke="#fff" strokeWidth=".5"/>
          <path d="M300,110 L340,105 L355,120 L350,145 L325,155 L300,145 L290,130 Z" fill="#D8DED0" stroke="#fff" strokeWidth=".5"/>
          {REGIONS.map(r=>{const pos={x:r.mapX*4,y:r.mapY*2.2};const has=r.plants.some(n=>plants.find(p=>p.name===n));if(!has)return null;const isA=active===r.id;return(<g key={r.id} onClick={()=>setActive(active===r.id?null:r.id)} style={{cursor:"pointer"}}>{isA&&<circle cx={pos.x} cy={pos.y} r="16" fill={r.color} opacity=".2"/>}<circle cx={pos.x} cy={pos.y} r={isA?8:6} fill={r.color} stroke="#F5F1EA" strokeWidth="1.5"/><text x={pos.x} y={pos.y+.5} textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fill="#fff" fontWeight="500" fontFamily="Jost">{r.plants.filter(n=>plants.find(p=>p.name===n)).length}</text></g>);})}
        </svg>
      </div>
      <div className="map-legend">
        <div className="map-legend-title">Geographic origins</div>
        <div className="map-legend-sub">Tap a region to explore</div>
        {REGIONS.filter(r=>r.plants.some(n=>plants.find(p=>p.name===n))).map(r=>(
          <div key={r.id} className="region-row" onClick={()=>setActive(active===r.id?null:r.id)}>
            <div className="region-row-head"><div className="region-swatch" style={{background:r.color}}/><span className="region-row-name">{r.name}</span><span className="region-row-count">{r.plants.filter(n=>plants.find(p=>p.name===n)).length} plants</span></div>
            {active===r.id&&<div className="region-body"><div className="region-desc">{r.desc}</div><div className="region-chips">{r.plants.filter(n=>plants.find(p=>p.name===n)).map(name=>{const p=plants.find(pl=>pl.name===name);return <span key={name} className="region-chip" onClick={e=>{e.stopPropagation();onSelect(p.id)}}>{name}</span>;})}</div></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitsView({ plants }) {
  const [cat,setCat]=useState("All");
  const [open,setOpen]=useState(null);
  return (
    <div className="benefits-view">
      <div className="benefits-header"><div className="benefits-title">Plant benefits</div><div className="benefits-sub">Medicinal, cultural, mythological & more</div></div>
      <div className="bcat-strip">{BENEFIT_CATS.map(c=><button key={c} className={`bcat-btn ${cat===c?"active":""}`} onClick={()=>setCat(c)}>{c}</button>)}</div>
      <div>
        {plants.filter(p=>PLANT_BENEFITS[p.name]).map(plant=>{
          const all=PLANT_BENEFITS[plant.name]||[];
          const filtered=cat==="All"?all:all.filter(b=>b.cat===cat);
          if(!filtered.length) return null;
          const isOpen=open===plant.id;
          return (
            <div key={plant.id} className="bplant-row">
              <div className="bplant-head" onClick={()=>setOpen(isOpen?null:plant.id)}>
                <div className="bplant-thumb"><Photo plant={plant} fallback="bplant-thumb-fallback"/></div>
                <div style={{flex:1}}><div className="bplant-name">{plant.name}</div><div className="bplant-count">{filtered.length} {filtered.length===1?"benefit":"benefits"}</div></div>
                <div className={`bplant-chevron ${isOpen?"open":""}`}><Icon name="chevron" size={16} stroke="var(--ink-faint)" strokeWidth={1.5}/></div>
              </div>
              {isOpen&&<div className="bplant-benefits">{filtered.map((b,i)=><div key={i} className="benefit-row"><div className="benefit-label">{b.cat}</div><div className="benefit-body" dangerouslySetInnerHTML={{__html:b.text}}/></div>)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineView({ plants, onSelect }) {
  const sorted=[...plants].sort((a,b)=>new Date(a.added)-new Date(b.added));
  const byYear=sorted.reduce((acc,p)=>{const y=new Date(p.added).getFullYear();if(!acc[y])acc[y]=[];acc[y].push(p);return acc;},{});
  return (
    <div className="timeline-view">
      {Object.entries(byYear).map(([year,yp])=>(
        <div key={year}>
          <div className="tl-year-header">{year}</div>
          {yp.map((p,i)=>(
            <div key={p.id} className="tl-item" onClick={()=>onSelect(p.id)}>
              <div className="tl-spine"><div className={`tl-spine-dot ${p.health}`}/>{i<yp.length-1&&<div className="tl-spine-line"/>}</div>
              <div className="tl-content">
                <div className="tl-thumb"><Photo plant={p} showLatestDiary={true} fallback="tl-thumb-fallback"/></div>
                <div className="tl-info">
                  <div className="tl-date">{fmtDate(p.added)}</div>
                  <div className="tl-name">{p.name}</div>
                  <div className="tl-botanical">{p.botanical}</div>
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

function StatsView({ plants }) {
  const thriving=plants.filter(p=>p.health==="thriving").length;
  const families=plants.reduce((a,p)=>{if(p.family){a[p.family]=(a[p.family]||0)+1}return a;},{});
  const topFamily=Object.entries(families).sort((a,b)=>b[1]-a[1])[0];
  const difficulties=plants.reduce((a,p)=>{if(p.difficulty){a[p.difficulty]=(a[p.difficulty]||0)+1}return a;},{});
  const regions=REGIONS.filter(r=>r.plants.some(n=>plants.find(p=>p.name===n)));
  const oldest=[...plants].sort((a,b)=>new Date(a.added)-new Date(b.added))[0];
  const newest=[...plants].sort((a,b)=>new Date(b.added)-new Date(a.added))[0];
  return (
    <div className="stats-view">
      <div className="stats-hero">
        <div className="stat-cell"><div className="stat-num">{plants.length}</div><div className="stat-lbl">Plants</div></div>
        <div className="stat-cell"><div className="stat-num">{thriving}</div><div className="stat-lbl">Thriving</div></div>
        <div className="stat-cell"><div className="stat-num">{regions.length}</div><div className="stat-lbl">Regions</div></div>
      </div>
      <div className="stats-section">
        <div className="stats-section-label">By plant family</div>
        {Object.entries(families).sort((a,b)=>b[1]-a[1]).map(([f,c])=>(
          <div className="bar-row" key={f}><div className="bar-label">{f}</div><div className="bar-track"><div className="bar-fill" style={{width:`${(c/plants.length)*100}%`}}/></div><div className="bar-count">{c}</div></div>
        ))}
      </div>
      <div className="stats-section" style={{marginTop:8}}>
        <div className="stats-section-label">Care difficulty</div>
        <div className="diff-row">{["Unkillable","Easy","Moderate","Tricky"].filter(d=>difficulties[d]).map(d=><span key={d} className="diff-chip">{difficulties[d]}× {d}</span>)}</div>
      </div>
      <div className="stats-section" style={{marginTop:8}}>
        <div className="stats-section-label">Geographic origins</div>
        {regions.map(r=>{const c=r.plants.filter(n=>plants.find(p=>p.name===n)).length;return(<div className="bar-row" key={r.id}><div className="bar-label">{r.name}</div><div className="bar-track"><div className="bar-fill" style={{width:`${(c/plants.length)*100}%`,background:r.color}}/></div><div className="bar-count">{c}</div></div>);})}
      </div>
      <div className="stats-section" style={{marginTop:8,paddingBottom:8}}>
        <div className="stats-section-label">Notes</div>
        <div className="facts-list">
          {oldest&&<div className="fact-row"><div className="fact-icon"><Icon name="seedling" size={16} stroke="var(--moss-pale)" strokeWidth={1.5}/></div><div className="fact-text"><strong>Oldest</strong> — {oldest.name}, {getAge(oldest.added)} in your care.</div></div>}
          {newest&&newest.id!==oldest?.id&&<div className="fact-row"><div className="fact-icon"><Icon name="plus" size={16} stroke="var(--moss-pale)" strokeWidth={1.5}/></div><div className="fact-text"><strong>Most recent</strong> — {newest.name}, added {fmtDate(newest.added)}.</div></div>}
          {topFamily&&<div className="fact-row"><div className="fact-icon"><Icon name="dna" size={16} stroke="var(--moss-pale)" strokeWidth={1.5}/></div><div className="fact-text"><strong>Largest family</strong> — {topFamily[1]} specimens from {topFamily[0]}.</div></div>}
          <div className="fact-row"><div className="fact-icon"><Icon name="globe" size={16} stroke="var(--moss-pale)" strokeWidth={1.5}/></div><div className="fact-text"><strong>{Math.round((thriving/plants.length)*100)}% thriving</strong> — {thriving} of {plants.length} specimens in good health.</div></div>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
function DetailModal({ plant, plants, onClose, onUpdate }) {
  const [logNote,setLogNote]=useState("");
  const [pendingHealth,setPendingHealth]=useState(null);
  const [healthNote,setHealthNote]=useState("");
  const fileRef=useRef();
  const origin=PLANT_ORIGINS[plant.name];
  const benefits=PLANT_BENEFITS[plant.name]?.slice(0,2);
  const voice=getPlantVoice(plant);
  const milestones=getMilestones(plant,plants);
  const careLog=plant.careLog||[];
  const healthLog=plant.healthLog||[{status:plant.health,date:plant.added,note:"Initial health"}];
  const diaryPhotos=plant.diaryPhotos||[];
  const parent=plant.parentId?plants.find(p=>p.id===plant.parentId):null;
  const children=plants.filter(p=>p.parentId===plant.id);

  function addLog(type, note="") {
    const entry={type,note,date:new Date().toISOString(),id:Date.now()};
    onUpdate({...plant, careLog:[...careLog,entry]});
  }

  function addHealthUpdate() {
    if(!pendingHealth) return;
    const entry={status:pendingHealth,note:healthNote,date:new Date().toISOString()};
    onUpdate({...plant, health:pendingHealth, healthLog:[...healthLog,entry]});
    setPendingHealth(null);
    setHealthNote("");
  }

  function addDiaryPhoto(e) {
    const file=e.target.files?.[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>{
      const entry={dataUrl:ev.target.result,date:new Date().toISOString(),id:Date.now()};
      onUpdate({...plant,diaryPhotos:[...diaryPhotos,entry]});
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="sheet">
        <div className="sheet-handle"/>
        <div className="modal-img">
          <Photo plant={plant} showLatestDiary={true} fallback="modal-img-fallback"/>
          <button className="modal-img-close" onClick={onClose}><Icon name="close" size={14} stroke="var(--ink)" strokeWidth={1.5}/></button>
          <div className={`health-strip ${plant.health}`}/>
        </div>

        <div className="modal-body">
          {/* Name + voice */}
          <div className="modal-eyebrow">
            <div className={`modal-eyebrow-dot ${plant.health}`}/>
            {HEALTH_LABEL[plant.health]} · {plant.category}
          </div>
          <div className="modal-name">{plant.name}</div>
          <div className="modal-botanical">{plant.botanical}</div>
          <div className="plant-voice">"{voice}"</div>

          {/* Propagation */}
          {(parent||children.length>0)&&(
            <>
              <div className="divider"/>
              <div className="section-label">Lineage</div>
              <div className="propagation-block">
                {parent&&<><div className="prop-title">Propagated from</div><div className="prop-text">{parent.name}<span className="prop-parent-link" onClick={()=>{ onClose(); setTimeout(()=>onClose(),0); }}> <Icon name="link" size={12} stroke="var(--moss)" strokeWidth={1.5}/> View parent</span></div></>}
                {children.length>0&&<><div className="prop-title" style={{marginTop:parent?12:0}}>Cuttings taken</div><div className="prop-text">{children.map(c=>c.name).join(", ")}</div></>}
              </div>
            </>
          )}

          {/* Health arc */}
          <div className="divider"/>
          <div className="section-label">Health over time</div>
          <ArcChart log={healthLog}/>
          <div className="arc-history">
            {[...healthLog].reverse().slice(0,4).map((e,i)=>(
              <div key={i} className="arc-row">
                <span className="arc-date">{fmtShort(e.date)}</span>
                <div className={`arc-status-dot ${e.status}`}/>
                <span>{HEALTH_LABEL[e.status]}{e.note?` — ${e.note}`:""}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:12}}>
            <div style={{fontSize:10,fontWeight:500,letterSpacing:"2px",textTransform:"uppercase",color:"var(--ink-faint)",marginBottom:8}}>Update health</div>
            <div className="health-update-row">
              {["thriving","ok","needs-love"].map(s=>(
                <button key={s} className={`health-btn ${pendingHealth===s?"selected":""}`} onClick={()=>setPendingHealth(pendingHealth===s?null:s)}>{HEALTH_LABEL[s]}</button>
              ))}
            </div>
            {pendingHealth&&(
              <div style={{marginTop:8,display:"flex",gap:8}}>
                <input className="log-note-input" placeholder="Optional note…" value={healthNote} onChange={e=>setHealthNote(e.target.value)} style={{flex:1}}/>
                <button className="log-note-btn" onClick={addHealthUpdate}>Save</button>
              </div>
            )}
          </div>

          {/* Photo diary */}
          <div className="divider"/>
          <div className="section-label">Photo diary</div>
          <div className="photo-diary-wrap">
            {photoDue(plant)&&(
              <div className="photo-prompt">
                <div className="photo-prompt-text">
                  <strong>Monthly photo due.</strong> Take a photo today to track how {plant.name.split(" ")[0]} is growing.
                </div>
                <button className="photo-add-btn" onClick={()=>fileRef.current?.click()}>Add photo</button>
              </div>
            )}
            {diaryPhotos.length>0?(
              <div className="photo-strip">
                {[...diaryPhotos].reverse().map(p=>(
                  <div key={p.id} className="photo-thumb">
                    <img src={p.dataUrl} alt="diary"/>
                    <div className="photo-thumb-date">{fmtShort(p.date)}</div>
                  </div>
                ))}
              </div>
            ):(
              <div className="photo-empty">No photos yet — add your first one above.</div>
            )}
            {!photoDue(plant)&&(
              <button className="log-note-btn" style={{marginTop:10}} onClick={()=>fileRef.current?.click()}>Add photo</button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="file-input" onChange={addDiaryPhoto}/>
          </div>

          {/* Care log */}
          <div className="divider"/>
          <div className="section-label">Care log</div>
          <div className="log-quick-btns">
            {LOG_TYPES.map(lt=>(
              <button key={lt.type} className="log-quick-btn" onClick={()=>addLog(lt.type)}>
                <Icon name={lt.icon} size={12} stroke="currentColor" strokeWidth={1.5}/>
                {lt.label}
              </button>
            ))}
          </div>
          <div className="log-note-row">
            <input className="log-note-input" placeholder="Add a note…" value={logNote} onChange={e=>setLogNote(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&logNote.trim()){addLog("note",logNote.trim());setLogNote("");}}}/>
            <button className="log-note-btn" onClick={()=>{if(logNote.trim()){addLog("note",logNote.trim());setLogNote("");}}}>Log</button>
          </div>
          {careLog.length>0&&(
            <div className="care-log-list" style={{marginTop:12}}>
              {[...careLog].reverse().slice(0,6).map((e,i)=>{
                const lt=LOG_TYPES.find(l=>l.type===e.type);
                return (
                  <div key={i} className="care-log-row">
                    <div className="care-log-icon"><Icon name={lt?.icon||"log"} size={14} stroke="var(--ink-faint)" strokeWidth={1.5}/></div>
                    <div className="care-log-text">{lt?.label||"Note"}{e.note?`: ${e.note}`:""}</div>
                    <div className="care-log-date">{fmtShort(e.date)}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Milestones */}
          <div className="divider"/>
          <div className="section-label">Milestones</div>
          <div className="milestone-list">
            {milestones.map((m,i)=>(
              <div key={i} className="milestone-row">
                <div className="milestone-icon"><Icon name={m.icon} size={14} stroke="var(--moss-pale)" strokeWidth={1.5}/></div>
                <div className="milestone-text">{m.text}</div>
                <div className="milestone-date">{fmtShort(m.date)}</div>
              </div>
            ))}
          </div>

          {/* Origin */}
          {origin&&(
            <>
              <div className="divider"/>
              <div className="section-label">In the wild</div>
              <div className="origin-block"><div className="origin-block-title">{origin.country}</div><div className="origin-block-text">{origin.desc}</div></div>
            </>
          )}

          {/* Personality */}
          {plant.personality&&(
            <>
              <div className="divider"/>
              <div className="section-label">Character</div>
              <div className="personality-text">{plant.personality}</div>
            </>
          )}

          {/* Care */}
          <div className="divider"/>
          <div className="section-label">Care</div>
          <table className="care-table"><tbody>
            {plant.water&&<tr><td>Water</td><td>{plant.water}</td></tr>}
            {plant.light&&<tr><td>Light</td><td>{plant.light}</td></tr>}
            {plant.humidity&&<tr><td>Humidity</td><td>{plant.humidity}</td></tr>}
            {plant.difficulty&&<tr><td>Difficulty</td><td>{plant.difficulty}</td></tr>}
            {plant.room&&<tr><td>Location</td><td>{plant.room}</td></tr>}
          </tbody></table>

          {/* Benefits preview */}
          {benefits?.length>0&&(
            <>
              <div className="divider"/>
              <div className="section-label">Benefits</div>
              {benefits.map((b,i)=>(
                <div key={i} className="bp-item">
                  <span className="bp-badge">{b.cat}</span>
                  <div className="bp-text" dangerouslySetInnerHTML={{__html:b.text}}/>
                </div>
              ))}
            </>
          )}

          {plant.tags?.length>0&&(<><div className="divider"/><div className="tag-row">{plant.tags.map((t,i)=><span key={i} className="detail-tag">{t}</span>)}</div></>)}
          <div className="modal-date">Added {fmtFull(plant.added)} · {getAge(plant.added)} in your care</div>
        </div>
      </div>
    </div>
  );
}

// ─── ADD FORM ─────────────────────────────────────────────────────────────────
function AddForm({ plants, onAdd, onClose }) {
  const [form,setForm]=useState({name:"",botanical:"",room:"",water:"",light:"",humidity:"",difficulty:"Easy",category:"Tropical",notes:"",health:"thriving",parentId:""});
  const f=(k,v)=>setForm(p=>({...p,[k]:v}));
  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="sheet">
        <div className="sheet-handle"/>
        <div className="form-header"><div className="form-title">Add a new plant</div></div>
        <div className="form-body">
          {[["name","Common name","e.g. Monstera"],["botanical","Botanical name","e.g. Monstera deliciosa"],["room","Room / Location","e.g. Living Room"],["water","Watering frequency","e.g. Weekly"],["light","Light requirements","e.g. Bright indirect"],["humidity","Humidity","e.g. High"]].map(([key,label,ph])=>(
            <div className="form-group" key={key}><label className="form-label">{label}</label><input className="form-input" placeholder={ph} value={form[key]} onChange={e=>f(key,e.target.value)}/></div>
          ))}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={e=>f("category",e.target.value)}>{CATEGORIES.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}</select>
          </div>
          <div className="form-group">
            <label className="form-label">Health status</label>
            <select className="form-select" value={form.health} onChange={e=>f("health",e.target.value)}><option value="thriving">Thriving</option><option value="ok">Doing okay</option><option value="needs-love">Needs attention</option></select>
          </div>
          <div className="form-group">
            <label className="form-label">Propagated from (optional)</label>
            <select className="form-select" value={form.parentId} onChange={e=>f("parentId",e.target.value)}>
              <option value="">— None —</option>
              {plants.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="form-label">Notes</label><textarea className="form-textarea" placeholder="Where did you get it? Any memories?" value={form.notes} onChange={e=>f("notes",e.target.value)}/></div>
          <button className="submit-btn" onClick={()=>{if(!form.name.trim())return;onAdd({...form,id:Date.now(),family:"",tags:[],emoji:"🌿",added:new Date().toISOString().split("T")[0],personality:`${form.name} is finding their place in your collection.`,careLog:[],healthLog:[{status:form.health,date:new Date().toISOString(),note:"Initial health"}],diaryPhotos:[],parentId:form.parentId?Number(form.parentId):null});}}>Add to collection</button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const INITIAL_PLANTS = [
  { id:1,name:"Monstera Deliciosa",botanical:"Monstera deliciosa",family:"Araceae",emoji:"🌿",room:"",health:"thriving",water:"Weekly",light:"Bright indirect",humidity:"High",difficulty:"Easy",category:"Tropical",notes:"",personality:"The drama queen of the collection — she'll unfurl a new fenestrated leaf and demand you stop everything to admire it. Deeply theatrical, endlessly forgiving.",tags:["pet-safe: no","air-purifying","fast grower"],added:"2023-03-15",careLog:[{type:"watered",note:"",date:"2025-02-15T10:00:00Z",id:1},{type:"new-leaf",note:"Beautiful new fenestration!",date:"2024-11-20T10:00:00Z",id:2}],healthLog:[{status:"thriving",date:"2023-03-15",note:"First day home"},{status:"ok",date:"2023-08-01",note:"Summer heat stress"},{status:"thriving",date:"2023-10-15",note:"Recovered beautifully"},{status:"thriving",date:"2024-06-01",note:"Growing season"}],diaryPhotos:[],parentId:null},
  { id:2,name:"String of Hearts",botanical:"Ceropegia woodii",family:"Apocynaceae",emoji:"💚",room:"",health:"thriving",water:"Every 2 weeks",light:"Bright indirect",humidity:"Low–medium",difficulty:"Easy",category:"Trailing",notes:"",personality:"Delicate in appearance, surprisingly tough in spirit. The more you leave her alone, the more she flourishes.",tags:["trailing","pet-safe: yes","drought tolerant"],added:"2023-06-02",careLog:[{type:"watered",note:"",date:"2025-02-10T10:00:00Z",id:1}],healthLog:[{status:"thriving",date:"2023-06-02",note:"First day home"},{status:"thriving",date:"2024-01-01",note:"Growing long trails"}],diaryPhotos:[],parentId:null},
  { id:3,name:"Dwarf Chenille Plant",botanical:"Acalypha hispida",family:"Euphorbiaceae",emoji:"🌺",room:"",health:"thriving",water:"Every 5–7 days",light:"Bright direct",humidity:"High",difficulty:"Moderate",category:"Tropical",notes:"",personality:"Absolutely unbothered by being the most dramatic-looking plant in the room.",tags:["flowering","statement plant"],added:"2023-09-20",careLog:[],healthLog:[{status:"thriving",date:"2023-09-20",note:"First day home"}],diaryPhotos:[],parentId:null},
  { id:4,name:"Salix Caprea Pendula",botanical:"Salix caprea 'Pendula'",family:"Salicaceae",emoji:"🌳",room:"",health:"thriving",water:"Keep moist",light:"Full sun to partial shade",humidity:"Medium–high",difficulty:"Moderate",category:"Rare",notes:"",personality:"A weeping willow in miniature — ancient energy, graceful droop, unshakeable calm.",tags:["statement plant","unique form"],added:"2023-11-08",careLog:[],healthLog:[{status:"ok",date:"2023-11-08",note:"First day home"},{status:"thriving",date:"2024-02-01",note:"Settled in well"}],diaryPhotos:[],parentId:null},
  { id:5,name:"Money Tree",botanical:"Pachira aquatica",family:"Malvaceae",emoji:"🌴",room:"",health:"thriving",water:"Every 1–2 weeks",light:"Bright indirect",humidity:"Medium",difficulty:"Easy",category:"Tropical",notes:"",personality:"Arrives with good vibes and genuinely delivers. The optimist of the group.",tags:["pet-safe: yes","feng shui","air-purifying"],added:"2024-01-14",careLog:[{type:"watered",note:"",date:"2025-02-12T10:00:00Z",id:1},{type:"fertilised",note:"Spring feed",date:"2024-03-01T10:00:00Z",id:2}],healthLog:[{status:"thriving",date:"2024-01-14",note:"First day home"}],diaryPhotos:[],parentId:null},
  { id:6,name:"Fiddle Leaf Fig",botanical:"Ficus lyrata",family:"Moraceae",emoji:"🌿",room:"",health:"ok",water:"Weekly",light:"Bright indirect, consistent",humidity:"Medium–high",difficulty:"Tricky",category:"Tropical",notes:"",personality:"The moody architect. Move her once and she'll sulk for a month.",tags:["statement plant","pet-safe: no","sensitive"],added:"2024-03-29",careLog:[{type:"pest",note:"Found spider mites, treated with neem oil",date:"2024-09-15T10:00:00Z",id:1}],healthLog:[{status:"thriving",date:"2024-03-29",note:"First day home"},{status:"needs-love",date:"2024-09-15",note:"Spider mite outbreak"},{status:"ok",date:"2024-10-01",note:"Recovering after treatment"}],diaryPhotos:[],parentId:null},
  { id:7,name:"Hoya Burtoniae",botanical:"Hoya burtoniae",family:"Apocynaceae",emoji:"🌸",room:"",health:"thriving",water:"Every 10–14 days",light:"Bright indirect",humidity:"Medium",difficulty:"Easy",category:"Trailing",notes:"",personality:"The collector's gem — fuzzy leaves, burgundy undersides, clusters of tiny star-shaped flowers.",tags:["flowering","trailing","collector's plant"],added:"2024-06-10",careLog:[],healthLog:[{status:"thriving",date:"2024-06-10",note:"First day home"}],diaryPhotos:[],parentId:null},
  { id:8,name:"Golden Pothos",botanical:"Epipremnum aureum",family:"Araceae",emoji:"🍃",room:"",health:"thriving",water:"Every 1–2 weeks",light:"Low–bright indirect",humidity:"Adaptable",difficulty:"Unkillable",category:"Trailing",notes:"",personality:"The ride-or-die. Survives neglect, forgives forgetfulness, thrives in almost any light.",tags:["air-purifying","easy propagation","pet-safe: no"],added:"2024-08-05",careLog:[{type:"watered",note:"",date:"2025-02-18T10:00:00Z",id:1}],healthLog:[{status:"thriving",date:"2024-08-05",note:"First day home"},{status:"thriving",date:"2025-01-01",note:"Still unstoppable"}],diaryPhotos:[],parentId:null},
];

const TABS=[
  {id:"garden",  label:"Garden",   icon:"leaf"},
  {id:"family",  label:"Family",   icon:"dna"},
  {id:"origins", label:"Origins",  icon:"globe"},
  {id:"benefits",label:"Benefits", icon:"sparkle"},
  {id:"timeline",label:"Timeline", icon:"timeline"},
];

export default function LeafyApp() {
  const [plants,setPlants]=useState(()=>{try{const s=localStorage.getItem("leafy_v6");return s?JSON.parse(s):INITIAL_PLANTS}catch{return INITIAL_PLANTS}});
  const [tab,setTab]=useState("garden");
  const [selected,setSelected]=useState(null);
  const [showForm,setShowForm]=useState(false);
  const [filter,setFilter]=useState("All");
  const [search,setSearch]=useState("");

  useEffect(()=>{try{localStorage.setItem("leafy_v6",JSON.stringify(plants))}catch{}},[plants]);

  const selPlant=selected?plants.find(p=>p.id===selected):null;
  function updatePlant(updated){setPlants(prev=>prev.map(p=>p.id===updated.id?updated:p));}

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="status-bar"/>
        <div className="scroll-area">
          {tab==="garden"   &&<GardenView plants={plants} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} onSelect={setSelected}/>}
          {tab==="family"   &&<FamilyView plants={plants} onSelect={setSelected}/>}
          {tab==="origins"  &&<OriginsView plants={plants} onSelect={setSelected}/>}
          {tab==="benefits" &&<BenefitsView plants={plants}/>}
          {tab==="timeline" &&<TimelineView plants={plants} onSelect={setSelected}/>}
        </div>
        <div className="tab-bar">
          {TABS.map(t=>(
            <button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              <Icon name={t.icon} size={18} stroke="currentColor" strokeWidth={tab===t.id?1.5:1.2}/>
              <span className="tab-label">{t.label}</span>
            </button>
          ))}
        </div>
        {tab==="garden"&&<button className="add-fab" onClick={()=>setShowForm(true)}><Icon name="plus" size={20} stroke="#fff" strokeWidth={1.5}/></button>}
        {selPlant&&<DetailModal plant={selPlant} plants={plants} onClose={()=>setSelected(null)} onUpdate={updatePlant}/>}
        {showForm&&<AddForm plants={plants} onAdd={p=>{setPlants(prev=>[p,...prev]);setShowForm(false)}} onClose={()=>setShowForm(false)}/>}
      </div>
    </>
  );
}
