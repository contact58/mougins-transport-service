import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/reserver", label: "Réserver" },
  { to: "/blog", label: "Blog" },
  { to: "/avis", label: "Avis Clients" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-foreground">Les Chauffeurs</span>
            <span className="block text-xs text-muted-foreground -mt-1">de Mougins</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "neon-text" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/reserver"
            className="px-5 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-[0_0_20px_hsl(199_89%_48%/0.4)]"
          >
            Réserver maintenant
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === link.to ? "neon-text" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/reserver"
                onClick={() => setOpen(false)}
                className="mt-2 px-5 py-3 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold text-center"
              >
                Réserver maintenant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
