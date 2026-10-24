import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { Check, GripVertical, Loader2, Menu } from "lucide-react";
import Reveal from "./Reveal";

const MIN_WIDTH = 240;

const tutors = [
  { course: "MAT 101", name: "Kwame A.", rate: 30 },
  { course: "CSC 201", name: "Ama O.", rate: 35 },
  { course: "ECO 105", name: "Yaw B.", rate: 25 },
];

const ResizeDemo = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; width: number } | null>(null);
  const [width, setWidth] = useState<number | null>(null); // null = fill the card
  const [measured, setMeasured] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(([entry]) => setMeasured(Math.round(entry.contentRect.width)));
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const clamp = (value: number) => Math.min(Math.max(value, MIN_WIDTH), wrapRef.current?.offsetWidth ?? value);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, width: frameRef.current?.offsetWidth ?? 0 };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current) setWidth(clamp(drag.current.width + e.clientX - drag.current.x));
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowLeft" ? -16 : e.key === "ArrowRight" ? 16 : 0;
    if (!step) return;
    e.preventDefault();
    setWidth(clamp((frameRef.current?.offsetWidth ?? 0) + step));
  };

  const breakpoint = measured < 360 ? "1 column" : measured < 520 ? "2 columns" : "3 columns";

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold">Layouts that bend, not break</h3>
        <span className="label tabular-nums">
          {measured}px · {breakpoint}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">Drag the handle. The card grid responds to its own width with container queries.</p>

      <div ref={wrapRef} className="mt-5">
        <div className="flex items-stretch" style={{ width: width ?? "100%", maxWidth: "100%" }}>
          <div ref={frameRef} className="cq min-w-0 flex-1 rounded-l-lg border border-line bg-paper p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">tutors</span>
              <span className="cq-narrow text-muted">
                <Menu className="h-4 w-4" />
              </span>
              <span className="cq-wide gap-3 text-xs text-muted">
                <span>Courses</span>
                <span>Past questions</span>
                <span>Sign in</span>
              </span>
            </div>
            <div className="cq-grid mt-3">
              {tutors.map((tutor) => (
                <div key={tutor.course} className="rounded-md border border-line bg-surface p-2.5">
                  <p className="font-mono text-[11px] text-accent">{tutor.course}</p>
                  <p className="mt-1 text-sm font-medium">{tutor.name}</p>
                  <p className="text-xs text-muted">GH₵{tutor.rate} / hr</p>
                </div>
              ))}
            </div>
          </div>
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize preview"
            aria-valuenow={measured}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => (drag.current = null)}
            onKeyDown={onKeyDown}
            className="flex w-5 shrink-0 cursor-ew-resize touch-none items-center justify-center rounded-r-lg border border-l-0 border-line bg-ink/5 text-muted transition hover:bg-accent hover:text-white"
          >
            <GripVertical className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

type Variant = "solid" | "outline";
type Status = "idle" | "loading" | "done";

const ButtonDemo = () => {
  const [variant, setVariant] = useState<Variant>("solid");
  const [radius, setRadius] = useState(10);
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    setStatus("loading");
    timers.current = [
      window.setTimeout(() => setStatus("done"), 1200),
      window.setTimeout(() => setStatus("idle"), 2600),
    ];
  };

  const props = [
    `variant="${variant}"`,
    `radius={${radius}}`,
    status === "loading" && "loading",
    disabled && "disabled",
  ].filter(Boolean);

  const look =
    variant === "solid"
      ? "bg-accent text-white hover:brightness-110"
      : "border-2 border-accent text-accent hover:bg-accent/10";

  return (
    <div className="flex w-full min-w-0 flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <h3 className="font-semibold">Every state, designed</h3>
      <p className="mt-1 text-sm text-muted">Press the button. Loading, success and disabled are part of the component, not an afterthought.</p>

      <div className="mt-5 flex min-h-[120px] flex-1 items-center justify-center rounded-lg border border-dashed border-line bg-paper p-6">
        <button
          type="button"
          onClick={run}
          disabled={disabled || status !== "idle"}
          aria-live="polite"
          style={{ borderRadius: radius }}
          className={`inline-flex min-w-[150px] items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed ${look} ${
            disabled ? "opacity-40" : ""
          }`}
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "done" && <Check className="h-4 w-4" />}
          {status === "idle" ? "Book session" : status === "loading" ? "Booking…" : "Booked"}
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:items-center">
        <div className="flex rounded-md border border-line p-0.5 text-xs" role="group" aria-label="Variant">
          {(["solid", "outline"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={variant === v}
              onClick={() => setVariant(v)}
              className={`flex-1 rounded px-2 py-1.5 transition ${variant === v ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
            >
              {v}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-muted">
          radius
          <input
            type="range"
            min={0}
            max={24}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-[rgb(var(--accent))]"
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            className="accent-[rgb(var(--accent))]"
          />
          disabled
        </label>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-lg bg-ink px-4 py-3 font-mono text-xs leading-relaxed text-paper">
        <code>
          <span className="text-accent">{"<Button"}</span> {props.join(" ")}
          <span className="text-accent">{">"}</span>Book session<span className="text-accent">{"</Button>"}</span>
        </code>
      </pre>
    </div>
  );
};

const Craft = () => {
  return (
    <section id="craft" className="border-t border-line py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 className="section-title">Frontend is in the details</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Two small things I care about on every project — both are live, so try them.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <ResizeDemo />
          </Reveal>
          <Reveal delay={0.08} className="flex min-w-0">
            <ButtonDemo />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Craft;
