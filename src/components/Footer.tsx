const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 py-10 dark:border-zinc-900">
      <div className="container-page flex flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Enoch Hodo</p>
        <a href="#" className="transition hover:text-zinc-900 dark:hover:text-white">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
