"use client";

import { useEffect, useRef, useCallback } from "react";

// ── tunables ──────────────────────────────────────────────────────────────
const COL_W      = 20;      // column width (px)
const ROW_H      = 18;      // row height (px)
const BASE_SPD   = 0.8;     // base fall speed (px/frame)
const SPD_VAR    = 0.7;     // random extra speed per drop
const MIN_LEN    = 10;      // min stream length (characters)
const MAX_LEN    = 28;      // max stream length
const SPAWN_P    = 0.007;   // probability per column per frame to spawn
const CHAR_P     = 0.07;    // probability per cell per frame to mutate char
const FADE       = 0.18;    // destination-out per frame (trail persistence)

// matrix green palette — reduced alpha so content stays readable
const HEAD_C = "160,230,180";  // leading char — softer green-white
const BODY_C = "0,180,50";     // stream body
const TAIL_C = "0,80,25";      // fading tail

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=><|/\\~^_-:.{}[]ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ".split("");
const rc = () => CHARS[Math.floor(Math.random() * CHARS.length)];

// pure vertical — no lean, no phase cycling
const LEAN  = 0;
const SMULT = 1.0;

// ── drop ──────────────────────────────────────────────────────────────────
interface Drop {
  x: number;       // current head x
  y: number;       // current head y
  speed: number;   // base px/frame for this drop
  len: number;     // character count
  chars: string[]; // chars[0]=head … chars[len-1]=tail
}

function spawnDrop(colX: number, startY: number): Drop {
  const len = MIN_LEN + Math.floor(Math.random() * (MAX_LEN - MIN_LEN));
  return {
    x: colX + COL_W / 2,
    y: startY,
    speed: BASE_SPD + Math.random() * SPD_VAR,
    len,
    chars: Array.from({ length: len }, rc),
  };
}

// ── component ─────────────────────────────────────────────────────────────
export default function AsciiBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const drops      = useRef<Drop[]>([]);
  const raf        = useRef<number>(0);

  const resize = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    cv.width  = window.innerWidth;
    cv.height = window.innerHeight;
    // seed initial drops spread across screen so it doesn't start empty
    const cols = Math.ceil(cv.width / COL_W);
    drops.current = [];
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.55) {
        drops.current.push(spawnDrop(c * COL_W, Math.random() * cv.height));
      }
    }
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      raf.current = requestAnimationFrame(draw);

      const { width, height } = cv;

      const lean  = LEAN;
      const sMult = SMULT;

      // ── trail ────────────────────────────────────────────────────────
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${FADE})`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      ctx.font         = "13px ui-monospace,'JetBrains Mono','Courier New',monospace";
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";

      // ── spawn ────────────────────────────────────────────────────────
      const cols = Math.ceil(width / COL_W);
      for (let c = 0; c < cols; c++) {
        if (Math.random() < SPAWN_P) {
          drops.current.push(spawnDrop(c * COL_W, -ROW_H));
        }
      }

      // ── update + draw + cull ─────────────────────────────────────────
      drops.current = drops.current.filter((d) => {
        // advance head
        const dy = d.speed * sMult;
        d.y += dy;
        d.x += lean * dy;

        // cull when tail is fully off screen or x drifted far out
        const tailY = d.y - d.len * ROW_H;
        if (tailY > height || d.x < -width * 0.5 || d.x > width * 1.5) return false;

        // mutate characters
        for (let i = 0; i < d.len; i++) {
          if (Math.random() < CHAR_P) d.chars[i] = rc();
        }

        // draw stream: head (i=0) down to tail (i=len-1)
        for (let i = 0; i < d.len; i++) {
          const cy = d.y - i * ROW_H;
          if (cy < -ROW_H || cy > height + ROW_H) continue;

          // lean: each row up from head shifts horizontally
          const cx = d.x - i * lean * ROW_H;

          // colour + alpha by position in stream
          const frac = i / (d.len - 1);
          let color: string;
          let alpha: number;

          if (i === 0) {
            // leading character — softened head
            color = HEAD_C;
            alpha = 0.55;
          } else if (frac < 0.12) {
            // neck — fade from head colour to body
            color = HEAD_C;
            alpha = 0.40 - frac * 2.5;
          } else if (frac < 0.55) {
            // body — solid green fading
            color = BODY_C;
            alpha = 0.30 - (frac - 0.12) * 0.65;
          } else {
            // tail — dim green to nothing
            color = TAIL_C;
            alpha = Math.max(0, 0.14 - (frac - 0.55) * 0.35);
          }

          ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`;
          ctx.fillText(d.chars[i], cx, cy);
        }

        return true;
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
