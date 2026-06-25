:root, [data-theme="light"] {
  --bg:             #f7f6f2;
  --surface:        #ffffff;
  --surface-2:      #f9f8f5;
  --surface-offset: #f0eeea;
  --border:         rgba(40,37,29,0.10);
  --divider:        rgba(40,37,29,0.06);
  --text:           #1a1814;
  --text-muted:     #6b6a65;
  --text-faint:     #a8a7a2;
  --primary:        #01696f;
  --primary-hover:  #0c4e54;
  --primary-light:  #e0f0f0;
  /* ACCENTO MARKETPLACE — per il calcolatore di un altro marketplace,
     cambia questi 3 valori con il colore del brand (es. Subito #e30613).
     --accent governa il pill attivo e i dettagli; --accent-name colora "Tengo";
     --primary-light va impostato su una versione chiara dello stesso colore. */
  --accent:         #01696f;
  --accent-name:    #01696f;
  --coin-gold:      #f6d78b;
  --coin-gold-deep: #d9a93c;
  --gold-bg:        #fdf6e3;
  --success:        #437a22;
  --success-bg:     #edf5e6;
  --success-border: rgba(67,122,34,0.15);
  --warning:        #964219;
  --warning-bg:     #fdf3eb;
  --warning-border: rgba(150,66,25,0.2);
  --error:          #a12c7b;
  --error-bg:       #fbecf5;
  --error-border:   rgba(161,44,123,0.2);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
  --r-sm: 0.375rem; --r-md: 0.625rem; --r-lg: 0.875rem; --r-xl: 1.25rem;
  --transition: 160ms cubic-bezier(0.16,1,0.3,1);
}
[data-theme="dark"] {
  --bg:             #131210;
  --surface:        #1c1b18;
  --surface-2:      #222120;
  --surface-offset: #2a2927;
  --border:         rgba(255,255,255,0.08);
  --divider:        rgba(255,255,255,0.05);
  --text:           #e8e7e3;
  --text-muted:     #8a8984;
  --text-faint:     #5c5b57;
  --primary:        #4f98a3;
  --primary-hover:  #6db0bb;
  --primary-light:  #1e3535;
  --accent:         #4f98a3;
  --accent-name:    #4f98a3;
  --coin-gold:      #f2cf75;
  --coin-gold-deep: #d9a93c;
  --gold-bg:        #2a2417;
  --success:        #6daa45;
  --success-bg:     #1e2e15;
  --success-border: rgba(109,170,69,0.2);
  --warning:        #bb653b;
  --warning-bg:     #2d1e10;
  --warning-border: rgba(187,101,59,0.3);
  --error:          #d163a7;
  --error-bg:       #2e1525;
  --error-border:   rgba(209,99,167,0.3);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans','Helvetica Neue',sans-serif;font-size:1rem;color:var(--text);background:var(--bg);min-height:100dvh;line-height:1.6;transition:background var(--transition),color var(--transition)}
input,button,select{font:inherit;color:inherit}
button{cursor:pointer;background:none;border:none}
:focus-visible{outline:2px solid var(--primary);outline-offset:3px;border-radius:var(--r-sm)}
input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
input[type=number]{-moz-appearance:textfield;appearance:textfield}

/* HEADER */
.site-header{position:sticky;top:0;z-index:100;background:var(--surface);border-bottom:1px solid var(--border);backdrop-filter:blur(12px)}
.header-inner{max-width:960px;margin:0 auto;padding:.75rem 1.5rem;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:.5rem;font-size:1.0625rem;font-weight:800;color:var(--text);text-decoration:none;letter-spacing:-.02em}
.logo-mark{width:34px;height:34px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.logo-accent{color:var(--accent-name);transition:color var(--transition)}
.header-right{display:flex;align-items:center;gap:.625rem}
.theme-toggle{width:36px;height:36px;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;color:var(--text-muted);transition:background var(--transition),color var(--transition)}
.theme-toggle:hover{background:var(--surface-offset);color:var(--text)}

/* MARKETPLACE SELECT (dropdown) */
.market-select{position:relative}
.market-trigger{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem .75rem;border-radius:999px;font-size:.8125rem;font-weight:700;color:var(--accent);background:var(--primary-light);border:1.5px solid var(--accent);white-space:nowrap;transition:all var(--transition)}
.market-trigger:hover{filter:brightness(.97)}
.market-trigger .market-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.market-caret{transition:transform var(--transition)}
.market-select.open .market-caret{transform:rotate(180deg)}
.market-menu{position:absolute;top:calc(100% + .5rem);right:0;min-width:190px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-md);padding:.375rem;opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity var(--transition),transform var(--transition),visibility var(--transition);z-index:300}
.market-select.open .market-menu{opacity:1;visibility:visible;transform:translateY(0)}
.market-item{display:flex;align-items:center;gap:.5rem;width:100%;padding:.55rem .65rem;border-radius:var(--r-md);font-size:.875rem;font-weight:600;color:var(--text-muted);background:transparent;text-align:left;transition:background var(--transition),color var(--transition)}
.market-item:hover{background:var(--surface-offset);color:var(--text)}
.market-item.active{color:var(--text)}
.market-item .market-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.market-active-check{margin-left:auto;color:var(--accent);display:flex}
.market-soon-tag{font-size:.5625rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--text-faint);background:var(--surface-offset);padding:1px .4rem;border-radius:999px;margin-left:auto}
.market-toast{position:absolute;left:50%;transform:translateX(-50%) translateY(.5rem);top:100%;background:var(--text);color:var(--surface);font-size:.8125rem;font-weight:600;padding:.6rem 1rem;border-radius:var(--r-md);box-shadow:var(--shadow-md);opacity:0;pointer-events:none;transition:opacity var(--transition),transform var(--transition);z-index:400;white-space:nowrap;max-width:90vw}
.market-toast.show{opacity:1;transform:translateX(-50%) translateY(.75rem)}

/* TABS */
.tabs-nav{max-width:960px;margin:0 auto;padding:1.25rem 1.5rem .25rem;display:flex;gap:.375rem;overflow-x:auto;scrollbar-width:none}
.tabs-nav::-webkit-scrollbar{display:none}
.tab-btn{padding:.45rem .9rem;border-radius:var(--r-md);font-size:.8125rem;font-weight:600;color:var(--text-muted);background:transparent;border:1px solid transparent;white-space:nowrap;transition:all var(--transition)}
.tab-btn:hover{background:var(--surface-offset);color:var(--text)}
.tab-btn.active{background:var(--surface);border-color:var(--border);color:var(--text);box-shadow:var(--shadow-sm)}

/* LAYOUT */
.main{max-width:960px;margin:0 auto;padding:1.25rem 1.5rem 2rem}
.tab-panel{display:none}
.tab-panel.active{display:block}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:start}
@media(max-width:700px){.grid-2{grid-template-columns:1fr}.main{padding:1rem 1rem 2rem}.tabs-nav{padding:1rem 1rem .25rem}}

/* CARDS */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:1.5rem;box-shadow:var(--shadow-sm)}
.card-label{font-size:.6875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:1.25rem;display:flex;align-items:center;justify-content:space-between}

/* CARD HEAD con icona (nuovo layout) */
.card-head{display:flex;align-items:center;gap:.6rem;margin-bottom:1.4rem}
.card-head-icon{width:34px;height:34px;border-radius:10px;background:var(--primary-light);color:var(--accent);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.card-head-label{font-size:.8125rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em}

/* RESULT HERO — "Ti resta" in evidenza dorata */
.result-hero{background:var(--gold-bg);border:1px solid var(--coin-gold);border-radius:var(--r-lg);padding:1.1rem 1.25rem;margin-bottom:1rem}
.result-hero-top{display:flex;align-items:center;gap:.6rem}
.result-hero-coin{width:30px;height:30px;border-radius:50%;background:var(--coin-gold);color:#7a5a12;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.result-hero-label{font-size:1.0625rem;font-weight:800;color:var(--text)}
.result-hero-value{margin-left:auto;font-size:1.75rem;font-weight:800;color:var(--accent);font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.result-hero-rows{margin-top:.9rem;padding-top:.85rem;border-top:1px solid rgba(150,120,40,.18);display:flex;flex-direction:column;gap:.55rem}
.result-hero-row{display:flex;align-items:center;justify-content:space-between;font-size:.875rem}
.result-hero-row .rh-k{display:flex;align-items:center;gap:.5rem;color:var(--text-muted);font-weight:600}
.result-hero-row .rh-k svg{color:var(--text-faint)}
.result-hero-row .rh-v{font-weight:700;font-variant-numeric:tabular-nums;color:var(--text)}
#res-margine{color:var(--success)}
.stima-pill{display:inline-flex;align-items:center;gap:.25rem;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding:2px .45rem;border-radius:999px;background:var(--coin-gold);color:#7a5a12;border:1px solid rgba(150,120,40,.25)}
.stima-i{cursor:help;opacity:.8}

/* BREAKDOWN come card separata */
.breakdown-card{background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-lg);padding:.85rem 1.1rem;margin-bottom:1rem}

/* WARNING note */
.result-warning{display:flex;gap:.6rem;align-items:flex-start;background:var(--gold-bg);border:1px solid var(--coin-gold);border-radius:var(--r-md);padding:.75rem .9rem;font-size:.75rem;color:var(--text-muted);line-height:1.45;margin-bottom:1rem}
.result-warning svg{color:var(--coin-gold-deep);flex-shrink:0;margin-top:1px}

/* INPUTS */
.field{margin-bottom:1rem}
.field:last-child{margin-bottom:0}
.field>label{display:block;font-size:.6875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.4rem}
.input-wrap{position:relative;display:flex;align-items:center}
.input-pre,.input-suf{position:absolute;font-size:.875rem;font-weight:600;color:var(--text-muted);pointer-events:none}
.input-pre{left:1rem}
.input-suf{right:1rem}
.input-wrap input{width:100%;padding:.7rem 1rem .7rem 2.25rem;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-md);font-size:1rem;font-weight:600;color:var(--text);transition:border-color var(--transition),box-shadow var(--transition)}
.input-wrap input.no-pre{padding-left:1rem}
.input-wrap input.has-suf{padding-right:2.5rem}
.input-wrap input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px color-mix(in oklch,var(--primary) 15%,transparent);background:var(--surface)}
.input-wrap input::placeholder{color:var(--text-faint);font-weight:400}

/* TOGGLE ROW */
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:.7rem 1rem;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-md);margin-bottom:1rem}
.toggle-row-label{font-size:.8125rem;font-weight:500;color:var(--text-muted)}
.toggle{position:relative;width:40px;height:22px;background:var(--border);border-radius:11px;cursor:pointer;border:none;transition:background var(--transition);flex-shrink:0}
.toggle.on{background:var(--primary)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;background:white;border-radius:50%;transition:transform var(--transition);box-shadow:0 1px 3px rgba(0,0,0,.2)}
.toggle.on::after{transform:translateX(18px)}

/* BUMP ROW */
.bump-wrap{border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden;margin-bottom:1rem}
.bump-top{display:flex;align-items:center;justify-content:space-between;padding:.7rem 1rem;background:var(--bg)}
.bump-top-label{font-size:.8125rem;font-weight:500;color:var(--text-muted)}
.bump-top-right{display:flex;align-items:center;gap:.75rem}
.bump-cost-tag{font-size:.8125rem;font-weight:700;color:var(--warning);font-variant-numeric:tabular-nums}
.bump-detail{padding:.5rem 1rem .6rem;background:var(--bg);border-top:1px dashed var(--divider);font-size:.6875rem;color:var(--text-faint);display:none}
.bump-detail.show{display:block}
.bump-mode-row{display:flex;gap:.4rem;margin-bottom:.5rem}
.bump-mode-btn{flex:1;padding:.4rem .5rem;font-size:.6875rem;font-weight:700;color:var(--text-muted);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);transition:all var(--transition)}
.bump-mode-btn.active{background:var(--primary-light);border-color:var(--primary);color:var(--primary)}
.bump-note{font-size:.6875rem;color:var(--text-faint);line-height:1.5}

/* SEPARATOR */
.sep{border:none;border-top:1px solid var(--divider);margin:1.25rem 0}

/* KPI PRIMARY */
.kpi-box{padding:1.25rem 1.5rem;border-radius:var(--r-lg);background:var(--success-bg);border:1px solid var(--success-border);transition:background var(--transition),border-color var(--transition)}
.kpi-box.neutral{background:var(--surface-offset);border-color:var(--border)}
.kpi-box.warn{background:var(--warning-bg);border-color:var(--warning-border)}
.kpi-box.bad{background:var(--error-bg);border-color:var(--error-border)}
.kpi-box-label{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:.2rem;display:flex;align-items:center;gap:.5rem}
.kpi-box-value{font-size:2rem;font-weight:800;letter-spacing:-.03em;color:var(--success);font-variant-numeric:tabular-nums;transition:color var(--transition)}
.kpi-box.neutral .kpi-box-value{color:var(--text-muted)}
.kpi-box.warn .kpi-box-value{color:var(--warning)}
.kpi-box.bad .kpi-box-value{color:var(--error)}
.badge{display:inline-flex;align-items:center;font-size:.6875rem;font-weight:700;padding:2px .5rem;border-radius:999px;margin-top:.4rem}
.badge.good{background:rgba(67,122,34,.12);color:var(--success)}
.badge.ok{background:rgba(1,105,111,.12);color:var(--primary)}
.badge.warn{background:rgba(150,66,25,.12);color:var(--warning)}
.badge.bad{background:rgba(161,44,123,.12);color:var(--error)}

/* STIMA PILL */
.stima-pill{display:inline-flex;align-items:center;gap:.25rem;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding:2px .45rem;border-radius:999px;background:rgba(150,66,25,.10);color:var(--warning);border:1px solid rgba(150,66,25,.15)}
[data-theme="dark"] .stima-pill{background:rgba(187,101,59,.15);border-color:rgba(187,101,59,.2)}

/* KPI GRID */
.kpi-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:.75rem}
.kpi-mini{padding:.875rem 1rem;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-lg)}
.kpi-mini-label{font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-faint);margin-bottom:.15rem}
.kpi-mini-value{font-size:1.125rem;font-weight:700;color:var(--text);font-variant-numeric:tabular-nums}

/* BREAKDOWN */
.breakdown{background:var(--bg);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;margin-top:.75rem}
.br-row{display:flex;justify-content:space-between;align-items:center;padding:.6rem 1rem;border-bottom:1px solid var(--divider);font-size:.875rem}
.br-row:last-child{border-bottom:none}
.br-row.total{background:var(--surface-offset);font-weight:700;font-size:.9375rem}
.br-row.br-info{font-size:.75rem;color:var(--text-faint);background:var(--surface-2)}
.br-row.br-info .br-key{color:var(--text-faint)}
.br-row.br-info .br-val{color:var(--text-muted);font-weight:500}
.br-key{color:var(--text-muted)}
.br-row.total .br-key{color:var(--text)}
.br-val{font-weight:500;font-variant-numeric:tabular-nums}
.br-val.neg{color:var(--error)}
.br-val.pos{color:var(--success)}

/* OFFERTE */
.offer-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.6rem;margin-top:.5rem}
@media(max-width:420px){.offer-grid{grid-template-columns:1fr 1fr}}
.offer-intro{font-size:.75rem;color:var(--text-muted);line-height:1.5;margin:.25rem 0 .75rem}
.offer-card{padding:.875rem .75rem;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-lg);text-align:center}
.offer-card-custom{background:var(--primary-light);border-color:color-mix(in oklch,var(--primary) 20%,transparent)}
.offer-disc{font-size:.625rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--primary);margin-bottom:.45rem}
.offer-net-label{font-size:.5625rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-faint);margin-bottom:.05rem}
.offer-net{font-size:1.125rem;font-weight:800;color:var(--success);font-variant-numeric:tabular-nums;line-height:1.1}
.offer-acq{font-size:.625rem;color:var(--text-muted);margin-top:.35rem;line-height:1.3}
.custom-row{display:flex;gap:.75rem;align-items:flex-end;margin-top:.75rem}
.custom-row .field{flex:1;margin:0}

/* REVERSE */
.reverse-box{padding:1.25rem;border-radius:var(--r-lg);background:var(--primary-light);border:1px solid color-mix(in oklch,var(--primary) 20%,transparent);text-align:center;margin-top:1rem}
.reverse-box-label{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--primary);margin-bottom:.2rem}
.reverse-box-value{font-size:1.75rem;font-weight:800;color:var(--primary);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.reverse-box-sub{font-size:.6875rem;color:var(--text-muted);margin-top:.3rem}

/* OFFERTE COLLAPSE */
.collapsible-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;padding:.5rem 0}
.collapsible-icon{font-size:.75rem;color:var(--text-muted);transition:transform var(--transition)}
.collapsible-icon.open{transform:rotate(180deg)}
.collapsible-body{overflow:hidden;transition:max-height .3s ease}

/* SIMULATORE OFFERTE TOGGLE (botão) */
.offerte-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;padding:.7rem .9rem;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-lg);cursor:pointer;font-family:inherit;transition:background var(--transition),border-color var(--transition);margin-bottom:.25rem}
.offerte-toggle:hover{background:var(--surface-offset);border-color:var(--primary-light)}
.offerte-toggle[aria-expanded="true"]{background:var(--primary-light);border-color:var(--accent)}
.offerte-toggle-left{display:flex;align-items:center;gap:.5rem;font-size:.8125rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--text-muted)}
.offerte-toggle[aria-expanded="true"] .offerte-toggle-left{color:var(--accent)}
.offerte-toggle-left svg{color:var(--accent)}

/* COPY BUTTON */
.btn-copy{width:100%;padding:.85rem 1rem;background:var(--accent);color:white;border-radius:var(--r-lg);border:none;cursor:pointer;transition:background var(--transition),box-shadow var(--transition);display:flex;flex-direction:column;align-items:center;gap:.2rem;margin-top:1rem}
.btn-copy-main{display:flex;align-items:center;justify-content:center;gap:.5rem;font-size:.875rem;font-weight:700}
.btn-copy-sub{font-size:.6875rem;font-weight:500;opacity:.85;font-weight:400}
.btn-copy:hover{background:var(--primary-hover);box-shadow:var(--shadow-md)}
.btn-copy.copied{background:var(--success)}

/* DISCLAIMER BOTTOM */
.disclaimer{max-width:960px;margin:.5rem auto 0;padding:0 1.5rem 2rem;font-size:.6875rem;color:var(--text-faint);line-height:1.7}
.disclaimer strong{color:var(--text-muted)}
@media(max-width:700px){.disclaimer{padding:0 1rem 2rem}}

/* FOOTER */
.site-footer{margin-top:3rem;background:var(--surface-2);border-top:1px solid var(--border)}
.footer-inner{max-width:960px;margin:0 auto;padding:2.5rem 1.5rem 2rem}
.footer-brand{max-width:560px}
.footer-logo{display:flex;align-items:center;gap:.5rem;font-size:1rem;font-weight:800;letter-spacing:-.02em;color:var(--text);margin-bottom:.875rem}
.logo-mark-sm{width:30px;height:30px;border-radius:0}
.footer-about{font-size:.875rem;color:var(--text-muted);line-height:1.65;margin-bottom:1.125rem}
.footer-mail{display:inline-flex;align-items:center;gap:.4rem;font-size:.875rem;font-weight:700;color:var(--accent);text-decoration:none;padding:.4rem .75rem;border-radius:999px;background:var(--primary-light);transition:filter var(--transition)}
.footer-mail:hover{filter:brightness(.97)}
.footer-mail-note{font-size:.75rem;color:var(--text-faint);line-height:1.55;margin-top:.625rem}
.footer-legal{border-top:1px solid var(--border);background:var(--bg)}
.footer-legal p{max-width:960px;margin:0 auto;padding:.25rem 1.5rem;font-size:.6875rem;color:var(--text-faint);line-height:1.7}
.footer-legal p:first-child{padding-top:1.25rem}
.footer-legal p:last-child{padding-bottom:1.5rem}
.footer-legal strong{color:var(--text-muted)}
.footer-copy{font-weight:600}
@media(max-width:700px){.footer-inner{padding:2rem 1rem 1.5rem}.footer-legal p{padding-left:1rem;padding-right:1rem}}

/* ======= TAB: PREZZO OBIETTIVO ======= */
.guide-hero{background:var(--primary-light);border:1px solid color-mix(in oklch,var(--primary) 20%,transparent);border-radius:var(--r-xl);padding:1.75rem;margin-bottom:1.5rem}
.guide-hero-title{font-size:1.125rem;font-weight:800;color:var(--primary);margin-bottom:.4rem}
.guide-hero-sub{font-size:.875rem;color:var(--text-muted);line-height:1.6}
.guide-step-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem}
@media(max-width:600px){.guide-step-grid{grid-template-columns:1fr}}
.guide-step{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:1.25rem}
.guide-step-num{width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;font-size:.75rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:.75rem}
.guide-step-title{font-size:.875rem;font-weight:700;color:var(--text);margin-bottom:.35rem}
.guide-step-text{font-size:.8125rem;color:var(--text-muted);line-height:1.55}
.formula-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:1.5rem;margin-bottom:1.5rem}
.formula-box-title{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:1rem}
.formula-display{background:var(--bg);border:1px solid var(--border);border-radius:var(--r-lg);padding:1rem 1.25rem;font-family:monospace;font-size:.875rem;color:var(--text);line-height:1.8;margin-bottom:.75rem}
.formula-note{font-size:.75rem;color:var(--text-faint);line-height:1.6}
.obiettivo-calc{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:1.5rem}
.obiettivo-calc-title{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:1.25rem}

/* ======= TAB: STORICO ======= */
.storico-empty{text-align:center;padding:3rem 1.5rem;color:var(--text-faint)}
.storico-empty svg{margin:0 auto 1rem;opacity:.4}
.storico-empty p{font-size:.875rem}
.storico-empty strong{color:var(--text-muted)}
.storico-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem}
.storico-header-title{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted)}
.btn-clear{padding:.4rem .8rem;font-size:.75rem;font-weight:600;color:var(--error);border:1px solid var(--error-border);border-radius:var(--r-md);background:transparent;transition:all var(--transition)}
.btn-clear:hover{background:var(--error-bg)}
.btn-clear.armed{background:var(--error);color:#fff;border-color:var(--error)}
.storico-list{display:flex;flex-direction:column;gap:.625rem}
.storico-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;box-shadow:var(--shadow-sm)}
.storico-item-left{flex:1;min-width:0}
.storico-item-date{font-size:.625rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text-faint);margin-bottom:.2rem}
.storico-item-desc{font-size:.875rem;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.storico-item-detail{font-size:.75rem;color:var(--text-muted);margin-top:.15rem}
.storico-item-right{text-align:right;flex-shrink:0}
.storico-netto{font-size:1.25rem;font-weight:800;font-variant-numeric:tabular-nums}
.storico-netto.pos{color:var(--success)}
.storico-netto.neg{color:var(--error)}
.storico-stima-label{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-faint);margin-top:.1rem}
.btn-del{width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:var(--text-faint);border-radius:var(--r-sm);transition:all var(--transition);flex-shrink:0}
.btn-del:hover{background:var(--error-bg);color:var(--error)}
.btn-salva{width:100%;padding:.75rem 1rem;background:var(--surface);color:var(--primary);border:1px solid var(--border);border-radius:var(--r-lg);font-size:.8125rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;cursor:pointer;transition:all var(--transition);display:flex;align-items:center;justify-content:center;gap:.5rem;margin-top:1rem}
.btn-salva:hover{background:var(--primary-light);border-color:var(--primary);box-shadow:var(--shadow-md)}
.btn-salva.saved{background:var(--success-bg);color:var(--success);border-color:var(--success-border)}

/* ======= TAB: FAQ ======= */
.faq-list{display:flex;flex-direction:column;gap:.5rem}
.faq-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--shadow-sm)}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;cursor:pointer;font-size:.9375rem;font-weight:600;color:var(--text);gap:1rem;user-select:none}
.faq-q:hover{background:var(--surface-offset)}
.faq-arrow{font-size:.75rem;color:var(--text-faint);transition:transform var(--transition);flex-shrink:0}
.faq-item.open .faq-arrow{transform:rotate(180deg)}
.faq-a{display:none;padding:.25rem 1.25rem 1.25rem;font-size:.875rem;color:var(--text-muted);line-height:1.7}
.faq-a strong{color:var(--text)}
.faq-a code{font-family:monospace;background:var(--bg);padding:.1rem .35rem;border-radius:var(--r-sm);font-size:.8125rem}
.faq-item.open .faq-a{display:block}
.faq-disclaimer{margin-top:1.5rem;padding:1rem 1.25rem;background:var(--warning-bg);border:1px solid var(--warning-border);border-radius:var(--r-lg);font-size:.8125rem;color:var(--text-muted);line-height:1.6}
.faq-disclaimer strong{color:var(--warning)}


/* EXPORT & SESSION DISCLAIMER */
.btn-export{padding:.4rem .9rem;font-size:.75rem;font-weight:600;color:var(--primary);border:1px solid color-mix(in oklch,var(--primary) 30%,transparent);border-radius:var(--r-md);background:transparent;transition:all var(--transition);display:flex;align-items:center;gap:.375rem}
.btn-export:hover{background:var(--primary-light);border-color:var(--primary)}
.storico-actions{display:flex;align-items:center;gap:.5rem}
.session-disclaimer{display:flex;align-items:flex-start;gap:.625rem;padding:.875rem 1rem;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-lg);margin-bottom:1rem;font-size:.8rem;color:var(--text-muted);line-height:1.55}
.session-disclaimer svg{flex-shrink:0;margin-top:1px;color:var(--primary)}
.session-disclaimer strong{color:var(--text)}

/* REVERSE RESULT (V1 style) */
.reverse-result{margin-top:1rem;padding:1.25rem;border-radius:var(--r-lg);background:var(--primary-light);border:1px solid color-mix(in oklch,var(--primary) 20%,transparent);text-align:center}
.reverse-result-label{font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--primary);margin-bottom:.25rem}
.reverse-result-value{font-size:1.75rem;font-weight:800;color:var(--primary);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.reverse-result-sub{font-size:.75rem;color:var(--text-muted);margin-top:.25rem}
/* INPUT TEXT */
.input-text{width:100%;padding:.7rem 1rem;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-md);font-size:1rem;font-weight:500;color:var(--text);transition:border-color var(--transition),box-shadow var(--transition)}
.input-text:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px color-mix(in oklch,var(--primary) 15%,transparent);background:var(--surface)}
.input-text::placeholder{color:var(--text-faint);font-weight:400}
/* OBIETTIVO STEP */
.ob-step{display:flex;gap:.75rem;align-items:flex-start}
.ob-step-num{width:28px;height:28px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:800;flex-shrink:0;border:1px solid color-mix(in oklch,var(--primary) 20%,transparent)}
.ob-step-title{font-size:.875rem;font-weight:600;margin-bottom:2px;color:var(--text)}
.ob-step-sub{font-size:.75rem;color:var(--text-muted)}
.ob-formula{padding:.875rem 1rem;background:var(--bg);border-radius:var(--r-lg);border:1px solid var(--border)}
.ob-formula-label{font-size:.625rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.375rem}
.ob-formula-code{font-size:.8125rem;color:var(--text-muted);font-family:monospace}
/* PAGE INTRO (SEO + UX) */
.page-intro{max-width:720px;margin:0 0 1.5rem}
.page-intro h1{font-size:1.5rem;font-weight:800;letter-spacing:-.02em;color:var(--text);line-height:1.2;margin-bottom:.5rem}
.page-intro p{font-size:.9375rem;color:var(--text-muted);line-height:1.6}
@media(max-width:700px){.page-intro h1{font-size:1.25rem}.page-intro p{font-size:.875rem}}

/* SEO CONTENT BLOCK */
.seo-content{max-width:760px;margin:2.5rem auto 0;padding:0 1.5rem}
.seo-content h2{font-size:1.25rem;font-weight:800;letter-spacing:-.02em;color:var(--text);margin:2rem 0 .75rem;line-height:1.25}
.seo-content h2:first-child{margin-top:0}
.seo-content h3{font-size:1rem;font-weight:700;color:var(--text);margin:1.5rem 0 .5rem}
.seo-content p{font-size:.9375rem;color:var(--text-muted);line-height:1.7;margin-bottom:.875rem}
.seo-content ul{margin:0 0 .875rem 1.25rem;color:var(--text-muted);font-size:.9375rem;line-height:1.7}
.seo-content li{margin-bottom:.35rem}
.seo-content strong{color:var(--text)}
.seo-content .example-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:1.25rem 1.5rem;margin:1rem 0;box-shadow:var(--shadow-sm)}
.seo-content .example-box .ex-row{display:flex;justify-content:space-between;font-size:.9375rem;padding:.3rem 0;color:var(--text-muted);font-variant-numeric:tabular-nums}
.seo-content .example-box .ex-row.tot{border-top:1px solid var(--divider);margin-top:.4rem;padding-top:.6rem;font-weight:700;color:var(--text)}
@media(max-width:700px){.seo-content{padding:0 1rem}}

/* MOBILE: prima gli input, poi il risultato (ordine naturale) */
@media(max-width:700px){
  #panel-calcolo .grid-2{display:flex;flex-direction:column}
}
