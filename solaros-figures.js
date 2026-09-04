/* ===========================================================================
 *  Solaros — figures
 *  ---------------------------------------------------------------------------
 *  GENERATED. Do not edit. Source: build/figures.js, ported from the Solaros
 *  Industrial Accents exploration (rev A, 2026-09-03).
 *
 *  Three parametric technical drawings. They are drawings that ARGUE, not
 *  decoration: each one is a mechanism the product actually has.
 *
 *    Solaros.rings(el, opts)       five identical machined rings on one axis
 *    Solaros.dispatcher(el, opts)  six prioritised events, one block, five VSMs
 *    Solaros.vsm(el, opts)         a five-state virtual state machine
 *
 *  Every stroke uses the published drafting classes — .sol-draft-visible,
 *  -thin, -hidden, -centre, -dim, -engrave — so a figure is styled by the
 *  delivery and is correct on any ground without being redrawn. Load
 *  solaros-web.css or solaros-canvas.css alongside it.
 *
 *  Each call returns { explode(v) } where v runs 0 to 1, or null if the target
 *  element is missing. Wire it to whatever control the page wants, or leave it
 *  assembled. Nothing here binds itself to a range input.
 *
 *  Usage:
 *    <svg viewBox="0 0 640 480" class="sol-fig"></svg>
 *    const fig = Solaros.rings(document.querySelector('.sol-fig'), {tilt: .58});
 *    fig.explode(0.6);
 * =========================================================================== */

(function (root) {
  "use strict";
  // C and D: five IDENTICAL machined rings on one axis, one generator, two
  // views. K is the tilt: the ellipse's height over its width. 0.30 is a low
  // view; 0.58 is tilted toward the reader. `occlude` fills each ring's top
  // face and wall with the card ground before drawing its lines, so a ring
  // hides what sits behind it and the stack reads solid; the bore stays open
  // because it is drawn as a hole. No teeth: the detail is the chamfer, the
  // groove round the wall, index marks on the rim, one locating notch, and
  // the part number.
  function solRings(svgId, K, occlude, step) {
    step = step || 44;
    var NS = 'http://www.w3.org/2000/svg';
    var svg = typeof svgId === 'string' ? document.getElementById(svgId) : svgId;
    if (!svg) return null;
    var CX = 320, R = 150, RY = R * K, H = 20, GAP = 5, RI = R - 34;
    var CY = 240 + (K - 0.3) * 40;
    function el(name, attrs, parent) { var e = document.createElementNS(NS, name); for (var k in attrs) e.setAttribute(k, attrs[k]); (parent || svg).appendChild(e); return e; }
    function ell(r, cy) { var ry = r * K; return 'M' + (CX - r) + ' ' + cy + ' a' + r + ' ' + ry + ' 0 1 0 ' + (2 * r) + ' 0 a' + r + ' ' + ry + ' 0 1 0 ' + (-2 * r) + ' 0'; }
    function front(r, cy) { var ry = r * K; return 'M' + (CX - r) + ' ' + cy + ' a' + r + ' ' + ry + ' 0 0 0 ' + (2 * r) + ' 0'; }
    function back(r, cy)  { var ry = r * K; return 'M' + (CX - r) + ' ' + cy + ' a' + r + ' ' + ry + ' 0 0 1 ' + (2 * r) + ' 0'; }
    el('path', { d: 'M' + CX + ' ' + (CY - 200) + ' V' + (CY + 150), class: 'sol-draft-centre' });
    var parts = [];
    // draw bottom ring first so higher rings paint over it
    for (var i = 4; i >= 0; i--) {
      var g = el('g', { class: 'sol-fig-part' });
      var top = CY - 40 + (i - 2) * (H + GAP);
      if (occlude) {
        // wall: front half band, then the top face as a ring (annulus)
        el('path', { d: front(R, top) + ' v' + H + ' ' + back(R, top + H).replace('M', 'L').replace(/a(\S+) (\S+) 0 0 1/, 'a$1 $2 0 0 0') + ' z', class: 'sol-draft-face' }, g);
        el('path', { d: ell(R, top) + ' ' + ell(RI, top), class: 'sol-draft-face', 'fill-rule': 'evenodd' }, g);
      }
      el('path', { d: ell(R, top), class: 'sol-draft-visible' }, g);
      el('path', { d: ell(R - 4, top), class: 'sol-draft-thin' }, g);
      el('path', { d: ell(RI, top), class: 'sol-draft-visible' }, g);
      el('path', { d: ell(RI + 3, top), class: 'sol-draft-thin' }, g);
      el('path', { d: front(RI, top), class: 'sol-draft-hidden', transform: 'translate(0 ' + H + ')' }, g);
      el('path', { d: 'M' + (CX - R) + ' ' + top + ' v' + H + ' M' + (CX + R) + ' ' + top + ' v' + H, class: 'sol-draft-visible' }, g);
      el('path', { d: front(R, top + H), class: 'sol-draft-visible' }, g);
      if (!occlude) el('path', { d: back(R, top + H), class: 'sol-draft-hidden' }, g);
      el('path', { d: front(R, top + H * 0.55), class: 'sol-draft-thin' }, g);
      el('path', { d: front(R, top + H * 0.55 + 2), class: 'sol-draft-thin' }, g);
      var ticks = '';
      for (var a = 0; a < 360; a += 15) {
        var rad = a * Math.PI / 180, r1 = R - 5, r2 = (a % 90 === 0) ? R - 15 : R - 10;
        ticks += 'M' + (CX + Math.cos(rad) * r1).toFixed(1) + ' ' + (top + Math.sin(rad) * r1 * K).toFixed(1)
               + 'L' + (CX + Math.cos(rad) * r2).toFixed(1) + ' ' + (top + Math.sin(rad) * r2 * K).toFixed(1);
      }
      el('path', { d: ticks, class: 'sol-draft-thin' }, g);
      var nx = CX + Math.cos(1.25) * R, ny = top + Math.sin(1.25) * RY;
      el('path', { d: 'M' + (nx - 6) + ' ' + ny + ' v' + H + ' M' + (nx + 6) + ' ' + ny + ' v' + H + ' M' + (nx - 6) + ' ' + (ny + H) + ' h12', class: 'sol-draft-visible' }, g);
      var t = el('text', { x: CX + R - 30, y: top + H - 6, 'text-anchor': 'end', class: 'sol-draft-engrave' }, g);
      t.textContent = 'RING-0' + (i + 1);
      parts[i] = g;
    }
    var y0 = CY - 40 - 2 * (H + GAP), y1 = y0 + 5 * (H + GAP) - GAP, dx = CX + R + 40;
    el('path', { d: 'M' + (CX + R + 8) + ' ' + y0 + ' H' + (dx + 6) + ' M' + (CX + R + 8) + ' ' + y1 + ' H' + (dx + 6), class: 'sol-draft-thin' });
    el('path', { d: 'M' + dx + ' ' + y0 + ' V' + y1, class: 'sol-draft-dim' });
    el('path', { d: 'M' + dx + ' ' + y0 + ' l-3 7 h6z M' + dx + ' ' + y1 + ' l-3 -7 h6z', class: 'sol-draft-dim', fill: 'var(--sol-text-dim)' });
    var dt = el('text', { x: dx + 10, y: (y0 + y1) / 2 + 3, class: 'sol-draft-dim-text' }); dt.textContent = '5 × 6.50';
    function apply(v) { parts.forEach(function (g, i) { g.setAttribute('transform', 'translate(0 ' + ((i - 2) * step * v) + ')'); }); }
    apply(0);
    return { explode: function (v) { apply(Number(v)); } };
  }

  // F: the dispatcher. EOS Max's one distinctive mechanic, drawn: a machined
  // block takes six prioritised events on pins of falling length (priority
  // read as length) and dispatches straight to virtual state machines, drawn
  // as small collars on the far side - no task scheduler, no ready-list scan.
  // One event (EV-02) and one machine (VSM-03) are drawn at full stroke, with
  // a path between them that passes through the block as a dashed line and
  // stays connected as the parts explode.
  function solDispatcher(svgId, K) {
    var NS = 'http://www.w3.org/2000/svg';
    var svg = typeof svgId === 'string' ? document.getElementById(svgId) : svgId;
    if (!svg) return null;
    function el(name, attrs, parent) { var e = document.createElementNS(NS, name); for (var k in attrs) e.setAttribute(k, attrs[k]); (parent || svg).appendChild(e); return e; }
    function ell(cx, cy, r) { var ry = r * K; return 'M' + (cx - r) + ' ' + cy + ' a' + r + ' ' + ry + ' 0 1 0 ' + (2 * r) + ' 0 a' + r + ' ' + ry + ' 0 1 0 ' + (-2 * r) + ' 0'; }

    var CX = 450, CY = 210, BW = 130, BH = 70, DZ = 46;
    var FLT = [CX - BW / 2, CY - BH / 2], FRT = [CX + BW / 2, CY - BH / 2];
    var FLB = [CX - BW / 2, CY + BH / 2], FRB = [CX + BW / 2, CY + BH / 2];
    var dx = DZ, dy = -DZ * K;
    var BLT = [FLT[0] + dx, FLT[1] + dy], BRT = [FRT[0] + dx, FRT[1] + dy], BRB = [FRB[0] + dx, FRB[1] + dy];
    var blockLeftX = FLT[0], blockRightX = FRT[0];

    el('path', { d: 'M' + CX + ' 20 V400', class: 'sol-draft-centre' });

    // top face and the one visible side face: lines only, no fill
    el('path', { d: 'M' + FLT.join(' ') + ' L' + FRT.join(' ') + ' L' + BRT.join(' ') + ' L' + BLT.join(' ') + ' Z', class: 'sol-draft-visible' });
    el('path', { d: 'M' + FRT.join(' ') + ' L' + BRT.join(' ') + ' L' + BRB.join(' ') + ' L' + FRB.join(' '), class: 'sol-draft-visible' });
    el('path', { d: 'M' + FLT.join(' ') + ' L' + FLB.join(' ') + ' L' + FRB.join(' '), class: 'sol-draft-visible' });

    // a shallow groove, inset from the top face
    var ctr = [(FLT[0] + FRT[0] + BRT[0] + BLT[0]) / 4, (FLT[1] + FRT[1] + BRT[1] + BLT[1]) / 4];
    function inset(p) { return [(ctr[0] + (p[0] - ctr[0]) * 0.78).toFixed(1), (ctr[1] + (p[1] - ctr[1]) * 0.78).toFixed(1)]; }
    el('path', { d: 'M' + inset(FLT).join(' ') + ' L' + inset(FRT).join(' ') + ' L' + inset(BRT).join(' ') + ' L' + inset(BLT).join(' ') + ' Z', class: 'sol-draft-thin' });

    // chamfer ticks at the four top-face corners
    [FLT, FRT, BRT, BLT].forEach(function (p) {
      el('path', { d: 'M' + (p[0] - 5) + ' ' + (p[1] + 6) + ' L' + (p[0] + 6) + ' ' + (p[1] - 5), class: 'sol-draft-thin' });
    });

    var plate = el('text', { x: CX, y: FLB[1] - 14, 'text-anchor': 'middle', class: 'sol-draft-engrave' });
    plate.textContent = 'DISPATCH';

    var travelPins = 60, travelSock = 26;

    // six event pins entering the left face, longest (highest priority) at
    // top; EV-02 is the one dispatched below, drawn at full stroke
    var pins = [];
    for (var i = 0; i < 6; i++) {
      var y = CY - 140 + i * 56;
      var len = 170 - i * 24;
      var farX = blockLeftX - len;
      var emph = (i === 1);
      var cls = emph ? 'sol-draft-visible' : 'sol-draft-thin';
      var g = el('g', { class: 'sol-fig-part' });
      el('path', { d: 'M' + farX + ' ' + (y - 5) + ' H' + blockLeftX + ' M' + farX + ' ' + (y + 5) + ' H' + blockLeftX, class: cls }, g);
      el('path', { d: ell(farX, y, 5), class: cls }, g);
      var t = el('text', { x: farX - 9, y: y + 3, 'text-anchor': 'end', class: emph ? 'sol-draft-engrave' : 'sol-draft-dim-text' }, g);
      t.textContent = 'EV-0' + (i + 1);
      svg.appendChild(g);
      pins.push({ g: g, y: y });
    }

    // tick scale beside the pins
    var scaleX = 168;
    el('path', { d: 'M' + scaleX + ' 60 V366', class: 'sol-draft-thin' });
    pins.forEach(function (p) { el('path', { d: 'M' + (scaleX - 6) + ' ' + p.y + ' H' + (scaleX + 6), class: 'sol-draft-thin' }); });

    // five sockets leaving the right face, small rings; VSM-03 is the target
    // above, drawn at full stroke
    var socks = [];
    var collarOff = 34;
    for (var j = 0; j < 5; j++) {
      var sy = CY - 112 + j * 56;
      var cx = blockRightX + collarOff;
      var emphS = (j === 2);
      var clsS = emphS ? 'sol-draft-visible' : 'sol-draft-thin';
      var g2 = el('g', { class: 'sol-fig-part' });
      el('path', { d: 'M' + blockRightX + ' ' + sy + ' H' + (cx - 14), class: clsS }, g2);
      el('path', { d: ell(cx, sy, 14), class: clsS }, g2);
      el('path', { d: ell(cx, sy, 11), class: 'sol-draft-thin' }, g2);
      el('path', { d: ell(cx, sy, 8), class: clsS }, g2);
      var t2 = el('text', { x: cx + 19, y: sy + 3, class: emphS ? 'sol-draft-engrave' : 'sol-draft-dim-text' }, g2);
      t2.textContent = 'VSM-0' + (j + 1);
      svg.appendChild(g2);
      socks.push({ g: g2, y: sy });
    }

    // the one dispatch path: EV-02 through the block to VSM-03, drawn on top
    // so it stays visibly connected as its ends withdraw
    var evY = pins[1].y, vsY = socks[2].y;
    var leadIn = el('path', { class: 'sol-draft-visible' });
    el('path', { d: 'M' + blockLeftX + ' ' + evY + ' L' + blockRightX + ' ' + vsY, class: 'sol-draft-hidden' });
    var leadOut = el('path', { class: 'sol-draft-visible' });
    var tick = el('path', { class: 'sol-draft-visible' });

    function apply(v) {
      pins.forEach(function (p) { p.g.setAttribute('transform', 'translate(' + (-travelPins * v) + ' 0)'); });
      socks.forEach(function (s) { s.g.setAttribute('transform', 'translate(' + (travelSock * v) + ' 0)'); });
      var evNearX = blockLeftX - travelPins * v;
      var vsNearX = blockRightX + travelSock * v;
      leadIn.setAttribute('d', 'M' + evNearX + ' ' + evY + ' L' + blockLeftX + ' ' + evY);
      leadOut.setAttribute('d', 'M' + blockRightX + ' ' + vsY + ' L' + vsNearX + ' ' + vsY);
      tick.setAttribute('d', 'M' + vsNearX + ' ' + (vsY - 6) + ' V' + (vsY + 6) + ' M' + (vsNearX - 6) + ' ' + vsY + ' H' + (vsNearX + 6));
    }
    apply(0);
    return { explode: function (v) { apply(Number(v)); } };
  }

  // G: the virtual state machine. The 1990s VSMT-OS diagram, drawn: a
  // process as five states on a plate, message-driven transitions as
  // engraved arcs, messages as pins entering from beyond the plate edge.
  // Three identical plates stacked (three processes on one MCU) - the top
  // at full stroke with every label, the two below at thin/dim stroke and
  // no text at all, same graph. Explode separates the outer two plates from
  // the fixed middle one, same wiring as solRings: the range's `input`
  // event sets a transform directly.
  //
  // The plate geometry itself (PW/PH/SK/RINGR and every pin, arc and label
  // offset below) is untouched from the first cut - drawn once in local
  // units with its own origin at the front edge's mid-point. A static
  // wrapper group scales and places that drawing in the card (SCALE, so the
  // plate fills ~78% of the viewBox width) and centres it vertically
  // (STATIC_Y); explode then moves the outer two plates by a real pixel
  // offset (opts.gap0 at rest, opts.gap1 at full travel) applied outside
  // that wrapper, so the offset is unaffected by SCALE and the stack stays
  // anchored on the fixed middle plate at both ends of the range.
  function solVsm(svgId, K, opts) {
    opts = opts || {};
    var palette = opts.palette === 'white' ? 'white' : 'violet';
    // No suffix. The artefact carried a second class set (.visW, .clW ...) so
    // its violet card could restyle every stroke. Canon names the ink as a
    // role instead, so .sol-violet resolves it to white and one class set
    // serves both grounds. `palette` is kept so callers do not break.
    var suf = '';
    function C(name) { return name + suf; }

    var NS = 'http://www.w3.org/2000/svg';
    var svg = typeof svgId === 'string' ? document.getElementById(svgId) : svgId;
    if (!svg) return null;
    function el(name, attrs, parent) { var e = document.createElementNS(NS, name); for (var k in attrs) e.setAttribute(k, attrs[k]); (parent || svg).appendChild(e); return e; }
    function ell(cx, cy, r) { var ry = r * K; return 'M' + (cx - r) + ' ' + cy + ' a' + r + ' ' + ry + ' 0 1 0 ' + (2 * r) + ' 0 a' + r + ' ' + ry + ' 0 1 0 ' + (-2 * r) + ' 0'; }
    function rot(v, deg) { var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return [v[0] * c - v[1] * s, v[0] * s + v[1] * c]; }

    // local, unscaled plate geometry - CX/cy0 are the wrapper's own origin
    var CX = 0, cy0 = 0, PW = 310, PH = 148, SK = 78, dyOff = -SK * K, RINGR = 12;
    // placement in the 900x460 viewBox: SCALE brings the plate's own
    // footprint (PW+SK = 388) up to ~702px, 78% of the 900 width; REAL_CX
    // and STATIC_Y were solved so the message-inclusive drawing, at both
    // gap0 and gap1, sits inside the card with a margin on every side
    var SCALE = 1.81, REAL_CX = 396, STATIC_Y = 120;
    var GAP0 = opts.gap0 != null ? opts.gap0 : 14;
    var GAP1 = opts.gap1 != null ? opts.gap1 : 90;

    var stateDefs = [
      { id: 'S1', fx: 0.08, fy: 0.52 },
      { id: 'S2', fx: 0.33, fy: 0.25 },
      { id: 'S3', fx: 0.66, fy: 0.28 },
      { id: 'S4', fx: 0.66, fy: 0.62 },
      { id: 'S5', fx: 0.33, fy: 0.66 }
    ];
    var trans = [[0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [3, 1], [4, 0], [4, 1]];
    var msgsIn = [
      { label: 'msg X', to: 0 },
      { label: 't.o. msg A', to: 1 },
      { label: 't.o. msg B', to: 2 },
      { label: 't.o. msg D', to: 2 },
      { label: 'msg E', to: 3 },
      { label: 't.o. msg F', to: 3 },
      { label: 'msg G', to: 3 },
      { label: 'msg H', to: 4 }
    ];
    var msgOut = { label: 'msg C', from: 2 };

    el('path', { d: 'M' + REAL_CX + ' 14 V446', class: C('sol-draft-centre') });

    function buildPlate(full) {
      var outer = el('g', { class: 'sol-fig-part' });
      var g = el('g', { transform: 'translate(' + REAL_CX + ' ' + STATIC_Y + ') scale(' + SCALE + ')' }, outer);
      var FL = [CX - PW / 2, cy0 + PH / 2];
      var FR = [CX + PW / 2, cy0 + PH / 2];
      var BL = [FL[0] + SK, FL[1] + dyOff];
      var BR = [FR[0] + SK, FR[1] + dyOff];
      var u = [FR[0] - FL[0], FR[1] - FL[1]];
      var w = [BL[0] - FL[0], BL[1] - FL[1]];
      function pt(fx, fy) { return [FL[0] + fx * u[0] + (1 - fy) * w[0], FL[1] + fx * u[1] + (1 - fy) * w[1]]; }
      var center = pt(0.5, 0.5);
      var mainCls = C(full ? 'sol-draft-visible' : 'sol-draft-thin');
      var restCls = C('sol-draft-thin');
      var H = 6;

      // top face, front edge with a shallow thickness so the plate reads solid
      el('path', { d: 'M' + FL.join(' ') + ' L' + FR.join(' ') + ' L' + BR.join(' ') + ' L' + BL.join(' ') + ' Z', class: mainCls }, g);
      el('path', { d: 'M' + FL[0] + ' ' + (FL[1]) + ' v' + H + ' M' + FR[0] + ' ' + (FR[1]) + ' v' + H, class: mainCls }, g);
      el('path', { d: 'M' + FL[0] + ' ' + (FL[1] + H) + ' L' + FR[0] + ' ' + (FR[1] + H), class: mainCls }, g);

      // groove, inset from the edge
      function inset(p) { return [(center[0] + (p[0] - center[0]) * 0.82).toFixed(1), (center[1] + (p[1] - center[1]) * 0.82).toFixed(1)]; }
      el('path', { d: 'M' + inset(FL).join(' ') + ' L' + inset(FR).join(' ') + ' L' + inset(BR).join(' ') + ' L' + inset(BL).join(' ') + ' Z', class: restCls }, g);

      // chamfered corners
      [FL, FR, BR, BL].forEach(function (p) {
        el('path', { d: 'M' + (p[0] - 5) + ' ' + (p[1] + 4) + ' L' + (p[0] + 5) + ' ' + (p[1] - 4), class: restCls }, g);
      });

      if (full) {
        // plate ID and a tick scale along the left edge - top plate only
        var lbl = el('text', { x: (FL[0] + FR[0]) / 2, y: FL[1] + H + 14, 'text-anchor': 'middle', class: C('sol-draft-engrave') }, g);
        lbl.textContent = 'VSM · PROCESS X';
        for (var t = 0; t <= 4; t++) {
          var tt = t / 4;
          var px = FL[0] + tt * w[0], py = FL[1] + tt * w[1];
          var pl = Math.hypot(w[0], w[1]) || 1;
          var perp = [-w[1] / pl * 7, w[0] / pl * 7];
          el('path', { d: 'M' + px + ' ' + py + ' l' + perp[0] + ' ' + perp[1], class: restCls }, g);
        }
      }

      var pts = stateDefs.map(function (s) { return pt(s.fx, s.fy); });

      // transitions: quadratic arcs bowed off the straight line so opposite
      // pairs (S2-S4/S4-S2) do not overlap, ending in a cross-tick, not an
      // arrowhead - kept on every plate, no text attached
      trans.forEach(function (tr) {
        var a = pts[tr[0]], b = pts[tr[1]];
        var d = [b[0] - a[0], b[1] - a[1]], len = Math.hypot(d[0], d[1]) || 1;
        var ux = d[0] / len, uy = d[1] / len;
        var start = [a[0] + ux * (RINGR + 2), a[1] + uy * (RINGR * K + 2)];
        var end = [b[0] - ux * (RINGR + 10), b[1] - uy * (RINGR * K + 10)];
        var mid = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
        var perp = [-uy, ux];
        var bow = (tr[0] < tr[1] ? 1 : -1) * 22;
        var ctrl = [mid[0] + perp[0] * bow, mid[1] + perp[1] * bow];
        el('path', { d: 'M' + start.join(' ') + ' Q' + ctrl.join(' ') + ' ' + end.join(' '), class: restCls, fill: 'none' }, g);
        el('path', { d: 'M' + end[0] + ' ' + (end[1] - 6) + ' V' + (end[1] + 6) + ' M' + (end[0] - 6) + ' ' + end[1] + ' H' + (end[0] + 6), class: restCls }, g);
      });

      // messages arriving from outside the plate, as short pins fanned
      // around the outward direction from the plate centre. S3 and S4 sit
      // close together on the plate's right side, so each state's fan gets
      // a fixed bias on top of its own spread, and the fan itself is wider
      // than a first cut (18deg, longer per-pin reach) to keep the S3 and
      // S4 label clusters from reading as one run of text
      var STATE_BIAS = [0, -6, -30, 26, 0];
      var seen = {};
      msgsIn.forEach(function (m) {
        var totalForState = msgsIn.filter(function (mm) { return mm.to === m.to; }).length;
        var fanIdx = seen[m.to] = (seen[m.to] || 0) + 1;
        var p = pts[m.to];
        var dv = [p[0] - center[0], p[1] - center[1]], dl = Math.hypot(dv[0], dv[1]) || 1;
        dv = [dv[0] / dl, dv[1] / dl];
        var angOffset = STATE_BIAS[m.to] + ((fanIdx - 1) - (totalForState - 1) / 2) * 18;
        var rdv = rot(dv, angOffset);
        var farLen = 52 + (fanIdx - 1) * 30;
        var near = [p[0] + rdv[0] * (RINGR + 4), p[1] + rdv[1] * (RINGR * K + 4)];
        var far = [p[0] + rdv[0] * farLen, p[1] + rdv[1] * farLen * K];
        el('path', { d: 'M' + near.join(' ') + ' L' + far.join(' '), class: restCls }, g);
        el('path', { d: ell(far[0], far[1], 3), class: restCls }, g);
        if (full) {
          var anchor = rdv[0] >= 0 ? 'start' : 'end';
          // label sits at the pin's outer end, nudged further out along the
          // pin's own direction (away from the plate); the rotation's own
          // y-spread is squashed by K, so a plain vertical nudge on top of
          // that keeps stacked messages at the same state from merging
          var textDy = ((fanIdx - 1) - (totalForState - 1) / 2) * 13;
          var lx = far[0] + rdv[0] * 12, ly = far[1] + rdv[1] * 12 * K + 3 + textDy;
          var lt = el('text', { x: lx, y: ly, 'text-anchor': anchor, class: C('sol-draft-dim-text') }, g);
          lt.textContent = m.label;
        }
      });

      // the one outgoing message: a pin pointing outward from S3, well clear
      // of S3's own incoming fan, ending in a small chevron instead of the
      // incoming pins' circle
      (function () {
        var p = pts[msgOut.from];
        var dv = [p[0] - center[0], p[1] - center[1]], dl = Math.hypot(dv[0], dv[1]) || 1;
        dv = [dv[0] / dl, dv[1] / dl];
        var rdv = rot(dv, -78);
        var near = [p[0] + rdv[0] * (RINGR + 4), p[1] + rdv[1] * (RINGR * K + 4)];
        var far = [p[0] + rdv[0] * 66, p[1] + rdv[1] * 66 * K];
        el('path', { d: 'M' + near.join(' ') + ' L' + far.join(' '), class: mainCls === C('sol-draft-visible') ? mainCls : restCls }, g);
        var back = [far[0] - rdv[0] * 9, far[1] - rdv[1] * 9 * K];
        var perp2 = [-rdv[1], rdv[0]];
        var t1 = [back[0] + perp2[0] * 5, back[1] + perp2[1] * 5];
        var t2 = [back[0] - perp2[0] * 5, back[1] - perp2[1] * 5];
        el('path', { d: 'M' + t1.join(' ') + ' L' + far.join(' ') + ' L' + t2.join(' '), class: mainCls === C('sol-draft-visible') ? mainCls : restCls, fill: 'none' }, g);
        if (full) {
          var anchor = rdv[0] >= 0 ? 'start' : 'end';
          var lt = el('text', { x: far[0] + rdv[0] * 12, y: far[1] + rdv[1] * 12 * K + 3, 'text-anchor': anchor, class: C('sol-draft-engrave') }, g);
          lt.textContent = msgOut.label;
        }
      })();

      // states last, so the rings sit over the arcs and pins
      stateDefs.forEach(function (s, i) {
        var p = pts[i];
        var active = full && i === 1;
        var cls = active ? C('sol-draft-visible') : restCls;
        el('path', { d: ell(p[0], p[1], RINGR), class: cls }, g);
        el('path', { d: ell(p[0], p[1], RINGR - 3), class: restCls }, g);
        el('path', { d: ell(p[0], p[1], RINGR - 6), class: restCls }, g);
        var na = -0.9, nx = p[0] + Math.cos(na) * RINGR, ny = p[1] + Math.sin(na) * RINGR * K;
        el('path', { d: 'M' + nx + ' ' + ny + ' l4 5', class: restCls }, g);
        if (full) {
          var lt = el('text', { x: p[0] + RINGR + 7, y: p[1] + 3, class: active ? C('sol-draft-engrave') : C('sol-draft-dim-text') }, g);
          lt.textContent = s.id;
        }
      });

      if (!full) outer.setAttribute('opacity', '0.55');
      return outer;
    }

    var plateTop = buildPlate(true);
    var plateMid = buildPlate(false);
    var plateBot = buildPlate(false);

    var restOpacity = 0.55;
    function apply(v) {
      var gap = GAP0 + (GAP1 - GAP0) * v;
      var fadeOp = Math.min(1, v / 0.6) * restOpacity;
      plateTop.setAttribute('transform', 'translate(0 ' + (-gap) + ')');
      plateMid.setAttribute('opacity', fadeOp);
      plateBot.setAttribute('transform', 'translate(0 ' + gap + ')');
      plateBot.setAttribute('opacity', fadeOp);
    }
    apply(0);
    return { explode: function (v) { apply(Number(v)); } };
  }

  root.Solaros = Object.assign(root.Solaros || {}, {
    rings: function (el, o) {
      o = o || {};
      return solRings(el, o.tilt == null ? 0.58 : o.tilt,
                      o.occlude !== false, o.step);
    },
    dispatcher: function (el, o) {
      o = o || {};
      return solDispatcher(el, o.tilt == null ? 0.58 : o.tilt);
    },
    vsm: function (el, o) {
      o = o || {};
      return solVsm(el, o.tilt == null ? 0.58 : o.tilt,
                    { gap0: o.gap0 == null ? 14 : o.gap0,
                      gap1: o.gap1 == null ? 90 : o.gap1,
                      palette: o.palette });
    }
  });
})(typeof globalThis !== "undefined" ? globalThis : window);
