import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/33687045134";
const TEL_URL = "tel:+33687045134";

const FloatingContactWidgets = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous contacter sur WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full text-primary-foreground shadow-lg shadow-primary/30 hover:scale-110 transition-transform bg-blue-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
      <motion.a
        href={TEL_URL}
        aria-label="Nous appeler"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Phone className="w-6 h-6" />
      </motion.a>
    </div>
  );
};

export default FloatingContactWidgets;
