import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const testimonials = [
  {
    name: "Marie D.",
    location: "Mougins",
    rating: 5,
    text: "Service très fiable ! Mon chauffeur était ponctuel, le véhicule impeccable. Je recommande vivement pour les trajets vers l'aéroport de Nice.",
  },
  {
    name: "Thomas L.",
    location: "Cannes",
    rating: 5,
    text: "J'ai réservé un transport pour un événement professionnel à Mougins. Tout était parfait, de la réservation à l'arrivée. Vraiment efficace.",
  },
  {
    name: "Sophie M.",
    location: "Antibes",
    rating: 5,
    text: "Excellente expérience. Le chauffeur connaissait parfaitement la région et m'a proposé le trajet le plus rapide. Un service moderne et disponible.",
  },
  {
    name: "Jean-Pierre R.",
    location: "Mougins",
    rating: 4,
    text: "Très satisfait du service. Véhicule confortable, chauffeur professionnel. Le prix était tout à fait raisonnable pour un trajet Mougins-Nice.",
  },
  {
    name: "Camille B.",
    location: "Grasse",
    rating: 5,
    text: "Service fiable et ponctuel. J'utilise régulièrement Les Chauffeurs de Mougins pour mes déplacements professionnels. Toujours au rendez-vous !",
  },
  {
    name: "Lucas V.",
    location: "Mougins",
    rating: 5,
    text: "Impressionné par le professionnalisme. Réservation simple et rapide, chauffeur très agréable. Mon service de transport de référence à Mougins.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Avis = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="sr-only">Avis clients taxi Mougins - témoignages Les Chauffeurs de Mougins</h1>
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Témoignages</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">Ce que disent nos clients</h2>
          <p className="text-muted-foreground mt-3">La satisfaction de nos clients est notre priorité.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="glass neon-border rounded-2xl p-7 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-sm text-foreground/90 leading-relaxed flex-1 mb-5">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="sr-only" aria-hidden="true">
          Avis taxi Mougins. Témoignages clients taxi Mougins, meilleur taxi Mougins recommandé. Les Chauffeurs de Mougins avis positifs, taxi Mougins fiable et ponctuel. VTC Mougins avis.
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Avis;
