const Footer = () => {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col gap-2 label sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Enoch Hodo · Built with React, TypeScript and Tailwind</p>
        <a href="#" className="transition hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
