import Reveal from "./Reveal";

const tools = [
  { name: "React + TypeScript", use: "Component architecture, typed props and typed API data", where: "Everything here" },
  { name: "Tailwind CSS", use: "Design tokens, dark mode and responsive layouts", where: "Everything here" },
  { name: "TanStack Query", use: "Server state, caching and background refetching", where: "Best Teach, GasUp" },
  { name: "React Router", use: "Nested layouts and role-based route guards", where: "Best Teach, GasUp" },
  { name: "React Hook Form", use: "Sign-up, booking and onboarding forms, with Zod validation", where: "Best Teach, GasUp" },
  { name: "Leaflet", use: "Maps, live GPS position and distance", where: "GasUp" },
  { name: "Python", use: "Computer vision scripts and data work", where: "Hand tracking, object detection" },
  { name: "OpenCV, MediaPipe, YOLOv8", use: "Real-time hand tracking and object detection from a webcam", where: "The lab" },
  { name: "Next.js", use: "Marketing sites with fast first loads", where: "Ornama Studios" },
  { name: "Framer Motion", use: "Scroll reveals and page transitions", where: "ARXYN, this site" },
  { name: "Supabase, Paystack", use: "Data and payments wired into the frontend", where: "Best Teach" },
  { name: "Node.js, Express, MongoDB", use: "Enough backend to build and debug the APIs I call", where: "When needed" },
];

const Skills = () => {
  return (
    <section id="skills" className="border-t border-line py-24">
      <div className="container-page grid gap-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="section-title">Toolkit</h2>
          <p className="mt-4 leading-relaxed text-muted">
            What I reach for, what I use it for, and where you can see it.
          </p>
        </Reveal>

        <Reveal>
          <table className="w-full text-left">
            <thead className="label">
              <tr className="border-b border-line">
                <th className="pb-3 font-normal">Tool</th>
                <th className="hidden pb-3 font-normal sm:table-cell">Used for</th>
                <th className="pb-3 text-right font-normal">Where</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.name} className="group border-b border-line transition hover:bg-ink/[0.03]">
                  <td className="py-3.5 pr-4 align-top font-medium">
                    {tool.name}
                    <span className="mt-1 block text-sm font-normal text-muted sm:hidden">{tool.use}</span>
                  </td>
                  <td className="hidden py-3.5 pr-4 align-top text-muted sm:table-cell">{tool.use}</td>
                  <td className="py-3.5 text-right align-top font-mono text-xs leading-6 text-muted group-hover:text-accent">
                    {tool.where}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
