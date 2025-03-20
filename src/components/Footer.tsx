import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="flex items-center justify-center md:justify-start">
              Made with <Heart className="w-4 h-4 mx-2 text-red-500" /> by Enoch
              Hodo
            </p>
            <p className="text-sm text-gray-400 mt-2">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#about" className="hover:text-blue-400 transition-colors">
              About
            </a>
            <a
              href="#portfolio"
              className="hover:text-blue-400 transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
