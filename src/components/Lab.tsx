import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, CameraOff, Github, Loader2 } from "lucide-react";
import type { HandLandmarker, ObjectDetector } from "@mediapipe/tasks-vision";
import Reveal from "./Reveal";

type Mode = "hands" | "objects";
type Status = "idle" | "loading" | "live" | "error";

// keep in sync with the installed @mediapipe/tasks-vision version
const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";
const HAND_MODEL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const OBJECT_MODEL =
  "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite";

// MediaPipe's HAND_CONNECTIONS: which of the 21 landmarks are joined by a bone
const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

// an open right hand, in a 100×100 box, for the idle preview
const HAND = [
  [50, 92], [36, 84], [26, 72], [19, 61], [12, 52], [37, 55], [34, 39], [32, 28], [31, 18], [48, 52],
  [48, 34], [48, 22], [48, 11], [58, 54], [61, 38], [63, 27], [64, 17], [67, 59], [72, 47], [75, 39], [78, 31],
];

const MAGENTA = "#ff00ff";

const projects = [
  {
    mode: "hands" as const,
    title: "Hand tracking",
    repo: "https://github.com/enochmakafui/HandTracking_OpenCV",
    summary:
      "Reads webcam frames with OpenCV and finds up to two hands with MediaPipe. A reusable HandDetector class returns the pixel position of all 21 landmarks, so other scripts can react to a fingertip.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    code: `class HandDetector:
    def find_position(self, img, hand_no=0):
        lm_list = []
        if self.results.multi_hand_landmarks:
            hand = self.results.multi_hand_landmarks[hand_no]
            for id, lm in enumerate(hand.landmark):
                h, w, c = img.shape
                # landmarks are 0–1, so scale to pixels
                cx, cy = int(lm.x * w), int(lm.y * h)
                lm_list.append([id, cx, cy])
        return lm_list`,
  },
  {
    mode: "objects" as const,
    title: "Object detection",
    repo: "https://github.com/enochmakafui/Yolo_Object_Detection_Python",
    summary:
      "Real-time detection from a webcam, built two ways: with Ultralytics YOLOv8 and with MediaPipe's EfficientDet. Each detection becomes a labelled box with its confidence, with a live FPS counter.",
    stack: ["Python", "OpenCV", "YOLOv8", "MediaPipe"],
    code: `from ultralytics import YOLO

model = YOLO("yolov8n.pt")

while True:
    success, img = cap.read()
    results = model(img, conf=0.5, verbose=False)
    img = results[0].plot()  # boxes + labels
    cv2.imshow("Image", img)`,
  },
];

// tiny Python highlighter: comments, strings and keywords
const highlight = (code: string) =>
  code.split(/(#.*$|"[^"]*"|\b(?:class|def|for|in|if|while|return|from|import|True|False)\b)/gm).map((part, i) =>
    part.startsWith("#") ? (
      <span key={i} className="text-paper/40">{part}</span>
    ) : part.startsWith('"') ? (
      <span key={i} className="text-emerald-400">{part}</span>
    ) : /^(class|def|for|in|if|while|return|from|import|True|False)$/.test(part) ? (
      <span key={i} className="text-accent">{part}</span>
    ) : (
      part
    )
  );

const IdleHand = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
    <motion.g
      animate={{ rotate: [-4, 4, -4], y: [0, -2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: "50%", originY: "90%" }}
    >
      {CONNECTIONS.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={HAND[a][0]} y1={HAND[a][1]} x2={HAND[b][0]} y2={HAND[b][1]}
          stroke="#e0e0e0" strokeWidth={0.9} strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        />
      ))}
      {HAND.map(([x, y], i) => (
        <motion.circle
          key={i} cx={x} cy={y} r={1.6} fill="#ff2a2a" stroke="#fff" strokeWidth={0.4}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.04 }}
        />
      ))}
    </motion.g>
  </svg>
);

const IdleObjects = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
    <rect x="14" y="44" width="22" height="30" rx="3" fill="#3a3a3a" />
    <rect x="34" y="52" width="7" height="12" rx="3" fill="none" stroke="#3a3a3a" strokeWidth="2.5" />
    <rect x="56" y="30" width="24" height="44" rx="4" fill="#2a2a2a" />
    <rect x="58.5" y="34" width="19" height="34" rx="1.5" fill="#444" />
    {[
      { x: 11, y: 41, w: 33, h: 36, label: "cup 87%" },
      { x: 53, y: 27, w: 30, h: 50, label: "cell phone 74%" },
    ].map((box, i) => (
      <motion.g
        key={box.label}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 1, 0.6, 1] }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + i * 0.4, duration: 1.2 }}
      >
        <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="none" stroke={MAGENTA} strokeWidth="0.8" />
        <text x={box.x} y={box.y - 2} fill={MAGENTA} fontSize="4" fontFamily="monospace">
          {box.label}
        </text>
      </motion.g>
    ))}
  </svg>
);

const Viewer = ({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const streamRef = useRef<MediaStream | null>(null);
  const models = useRef<{ hands?: HandLandmarker; objects?: ObjectDetector }>({});
  const modeRef = useRef(mode);
  const [status, setStatus] = useState<Status>("idle");
  const [fps, setFps] = useState(0);

  modeRef.current = mode;

  const stop = () => {
    cancelAnimationFrame(frame.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStatus("idle");
  };

  useEffect(() => () => {
    cancelAnimationFrame(frame.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  const loadModels = async () => {
    if (models.current.hands) return;
    // loaded on demand so visitors who never press the button don't download it
    const { FilesetResolver, HandLandmarker, ObjectDetector } = await import("@mediapipe/tasks-vision");
    const fileset = await FilesetResolver.forVisionTasks(WASM_URL);
    const create = async (delegate: "GPU" | "CPU") => {
      models.current.hands = await HandLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: HAND_MODEL, delegate },
        runningMode: "VIDEO",
        numHands: 2,
      });
      models.current.objects = await ObjectDetector.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: OBJECT_MODEL, delegate },
        runningMode: "VIDEO",
        scoreThreshold: 0.5,
        maxResults: 5,
      });
    };
    try {
      await create("GPU");
    } catch {
      await create("CPU");
    }
  };

  const draw = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!video || !canvas || !ctx) return;

    let last = performance.now();
    let smoothed = 0;
    let lastVideoTime = -1;

    const loop = () => {
      frame.current = requestAnimationFrame(loop);
      if (video.currentTime === lastVideoTime || video.readyState < 2) return;
      lastVideoTime = video.currentTime;

      const w = (canvas.width = video.videoWidth);
      const h = (canvas.height = video.videoHeight);
      const now = performance.now();

      // mirror the frame so it behaves like a mirror, as webcams usually do
      ctx.save();
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, w, h);
      ctx.restore();
      const mx = (x: number) => w - x;

      if (modeRef.current === "hands" && models.current.hands) {
        const result = models.current.hands.detectForVideo(video, now);
        for (const hand of result.landmarks) {
          ctx.strokeStyle = "#e0e0e0";
          ctx.lineWidth = Math.max(2, w / 320);
          for (const [a, b] of CONNECTIONS) {
            ctx.beginPath();
            ctx.moveTo(mx(hand[a].x * w), hand[a].y * h);
            ctx.lineTo(mx(hand[b].x * w), hand[b].y * h);
            ctx.stroke();
          }
          for (const lm of hand) {
            ctx.beginPath();
            ctx.arc(mx(lm.x * w), lm.y * h, Math.max(4, w / 160), 0, Math.PI * 2);
            ctx.fillStyle = "#ff2a2a";
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.stroke();
          }
        }
      } else if (models.current.objects) {
        const result = models.current.objects.detectForVideo(video, now);
        ctx.font = `${Math.max(16, w / 32)}px monospace`;
        for (const d of result.detections) {
          const box = d.boundingBox;
          const top = d.categories[0];
          if (!box || !top) continue;
          const x = w - box.originX - box.width;
          ctx.strokeStyle = MAGENTA;
          ctx.lineWidth = Math.max(2, w / 320);
          ctx.strokeRect(x, box.originY, box.width, box.height);
          ctx.fillStyle = MAGENTA;
          ctx.fillText(`${top.categoryName} ${Math.round(top.score * 100)}%`, x, Math.max(box.originY - 8, 20));
        }
      }

      smoothed = smoothed * 0.9 + (1000 / (now - last)) * 0.1;
      last = now;
      setFps(Math.round(smoothed));
    };
    loop();
  };

  const start = async () => {
    setStatus("loading");
    try {
      const [stream] = await Promise.all([
        navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: "user" } }),
        loadModels(),
      ]);
      streamRef.current = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();
      setStatus("live");
      draw();
    } catch {
      stop();
      setStatus("error");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[#1e1e1e] shadow-2xl shadow-black/20">
      {/* title bar, like the window cv2.imshow("Image", img) opens */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#2b2b2b] px-3 py-2 text-xs text-white/70">
        <span className="font-mono">Image</span>
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="relative aspect-[4/3] bg-[#141414]">
        <video ref={videoRef} playsInline muted className="hidden" />
        <canvas ref={canvasRef} className={`h-full w-full object-cover ${status === "live" ? "" : "hidden"}`} />

        {status !== "live" && (
          <div className="absolute inset-0 p-8 sm:p-12">{mode === "hands" ? <IdleHand /> : <IdleObjects />}</div>
        )}

        <span className="absolute left-3 top-2 font-mono text-2xl font-bold" style={{ color: MAGENTA }}>
          {status === "live" ? fps : 30}
        </span>

        {status !== "live" && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12 text-center">
            <button
              type="button"
              onClick={start}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-accent hover:text-white disabled:opacity-70"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              {status === "loading" ? "Loading model…" : "Try it with your camera"}
            </button>
            <p className="text-xs text-white/60">
              {status === "error"
                ? "Couldn't start the camera. Check the browser permission and try again."
                : "Runs entirely in your browser. No video leaves your device."}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#2b2b2b] p-2">
        <div className="flex rounded-md bg-black/30 p-0.5 text-xs" role="group" aria-label="Model">
          {(["hands", "objects"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`rounded px-3 py-1.5 transition ${mode === m ? "bg-white text-neutral-900" : "text-white/70 hover:text-white"}`}
            >
              {m === "hands" ? "Hand tracking" : "Object detection"}
            </button>
          ))}
        </div>
        {status === "live" && (
          <button type="button" onClick={stop} className="inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-xs text-white/70 hover:text-white">
            <CameraOff className="h-3.5 w-3.5" /> Stop
          </button>
        )}
      </div>
    </div>
  );
};

const Lab = () => {
  const [mode, setMode] = useState<Mode>("hands");
  const active = projects.find((p) => p.mode === mode)!;

  return (
    <section id="lab" className="border-t border-line py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="label">Python · computer vision</p>
          <h2 className="section-title mt-3">The lab</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Away from the browser I write Python. These are two computer vision
            projects — and the same models running live below, so you can try them.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Reveal className="min-w-0">
            <Viewer mode={mode} setMode={setMode} />
          </Reveal>

          <div className="min-w-0 space-y-4">
            {projects.map((project) => {
              const selected = project.mode === mode;
              return (
                <Reveal key={project.mode}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setMode(project.mode)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setMode(project.mode)}
                    className={`cursor-pointer rounded-2xl border p-5 transition sm:p-6 ${
                      selected ? "border-accent bg-surface" : "border-line hover:border-ink/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex shrink-0 items-center gap-1 text-sm text-muted transition hover:text-accent"
                      >
                        <Github className="h-4 w-4" /> Code <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                    <p className="label mt-3">{project.stack.join(" / ")}</p>
                  </div>
                </Reveal>
              );
            })}

            <Reveal>
              <motion.pre
                key={active.mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto rounded-2xl bg-ink p-5 font-mono text-xs leading-relaxed text-paper"
              >
                <code>{highlight(active.code)}</code>
              </motion.pre>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lab;
