import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Shield, MapPin } from "lucide-react";
import Scene3D from "@/components/home/Scene3D";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const services = [
  {
    icon: MapPin,
    title: "Mougins ↔ Aéroport Nice",
    description: "Navette fiable et ponctuelle entre Mougins et l'aéroport Nice Côte d'Azur, disponible 7j/7."
  },
  {
    icon: Clock,
    title: "Disponible 24h/24",
    description: "Un chauffeur à votre disposition à toute heure, pour tous vos déplacements sur la Côte d'Azur."
  },
  {
    icon: Shield,
    title: "Transport sécurisé",
    description: "Véhicules modernes et entretenus, conduite responsable garantie."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 }
  })
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Scene3D />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="sr-only">Taxi Mougins - Les Chauffeurs de Mougins, service de transport fiable à Mougins et sur la Côte d'Azur</h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-widest uppercase text-primary mb-6"
          >
            RÉSERVATION URGENTE ? 06 87 04 51 34
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold gradient-text leading-tight mb-6"
          >
            Le meilleur chauffeur,
            <br />
            <span className="neon-text">au meilleur prix</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Service de transport fiable, efficace et disponible à Mougins et sur toute la Côte d'Azur. Réservez votre trajet en quelques clics.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/reserver"
              className="px-8 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_30px_hsl(199_89%_48%/0.4)]"
            >
              Réserver un trajet <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/avis"
              className="px-8 py-4 rounded-xl glass neon-border text-foreground font-semibold text-base text-center transition-all hover:bg-card/80"
            >
              Voir les avis
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Services */}
      <section className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Nos services
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-display font-bold gradient-text">
            Un service de transport moderne
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="glass neon-border p-8 rounded-2xl group hover:bg-card/80 transition-all"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass neon-border rounded-3xl p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Besoin d'un transport&nbsp;?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Remplissez notre formulaire de réservation et recevez un devis personnalisé en quelques minutes.
          </p>
          <Link
            to="/reserver"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold transition-all hover:shadow-[0_0_30px_hsl(199_89%_48%/0.4)]"
          >
            Demander un devis <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <div className="sr-only" aria-hidden="true">
        Taxi Mougins pas cher. Réservez votre taxi Mougins pour Cannes, Nice, l'aéroport Nice Côte d'Azur ou tout trajet dans les Alpes-Maritimes. Taxi Mougins disponible 24h/24 et 7j/7. Les Chauffeurs de Mougins, votre taxi Mougins de confiance. Transport taxi Mougins centre-ville, taxi Mougins Cannes, taxi Mougins aéroport Nice. Meilleur taxi Mougins au meilleur prix. VTC Mougins, chauffeur privé Mougins, navette aéroport Mougins.
      </div>

      <Footer />
    </div>
  );
};

export default Index;
