import { motion } from "framer-motion";
import { Calendar, ArrowRight, TrendingUp, PartyPopper, Route } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const articles = [
  {
    slug: "transport-mougins-aeroport-nice-2026",
    title: "Se déplacer entre Mougins et l'aéroport de Nice : tout ce qu'il faut savoir",
    excerpt:
      "Le flux de voyageurs entre Mougins et l'aéroport Nice Côte d'Azur ne cesse de croître. Pour les professionnels comme pour les particuliers, trouver un chauffeur disponible et compétitif est devenu essentiel.",
    content:
      "Chez Les Chauffeurs de Mougins, nous analysons ces flux en temps réel pour garantir une disponibilité constante. La clé ? La réactivité et la maîtrise des prix fixes, loin des tarifs variables des plateformes impersonnelles.",
    date: "15 février 2026",
    readTime: "5 min",
    icon: TrendingUp,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    slug: "evenements-mougins-cote-azur-2026",
    title: "Mougins et la Côte d'Azur : les grands événements de la saison",
    excerpt:
      "Du vieux village aux événements gastronomiques internationaux, Mougins vibre au rythme de ses festivals et de son dynamisme culturel.",
    content:
      "Que ce soit pour vous rendre au Festival International de la Gastronomie ou pour un déplacement vers Cannes, la circulation peut s'avérer complexe. Faire appel à un chauffeur local, c'est l'assurance de contourner les bouchons grâce à une connaissance parfaite des routes de la Côte d'Azur.",
    date: "8 février 2026",
    readTime: "4 min",
    icon: PartyPopper,
    gradient: "from-violet-500/20 to-fuchsia-500/20",
  },
  {
    slug: "chauffeur-local-mougins-nice-cannes",
    title: "Pourquoi choisir un chauffeur local pour vos trajets Mougins / Nice / Cannes",
    excerpt:
      "Réserver un trajet pour un départ matinal ou une arrivée tardive demande une confiance absolue.",
    content:
      "En choisissant un acteur localisé à Mougins, vous bénéficiez d'une proximité géographique qui réduit les risques de retard. Notre flotte de berlines modernes assure vos transferts vers Nice et Cannes dans des conditions de sécurité et de confort optimales.",
    date: "1 février 2026",
    readTime: "6 min",
    icon: Route,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Blog = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="sr-only">Blog taxi Mougins - actualités transport à Mougins, Cannes et Nice</h1>
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Blog</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">Actualités & Conseils</h2>
          <p className="text-muted-foreground mt-3">Restez informé sur le transport et la vie locale à Mougins et sur la Côte d'Azur.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="glass neon-border rounded-2xl overflow-hidden group hover:bg-card/80 transition-all flex flex-col"
            >
              <div className={`bg-gradient-to-br ${article.gradient} p-8 flex items-center justify-center`}>
                <article.icon className="w-12 h-12 text-primary" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime} de lecture</span>
                </div>
                <h3 className="font-display font-semibold text-base text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{article.excerpt}</p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed flex-1">{article.content}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-5">
                  Lire la suite <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="sr-only" aria-hidden="true">
          Actualités taxi Mougins. Informations transport Mougins Nice Cannes. Taxi Mougins blog, conseils déplacement Mougins et Alpes-Maritimes. Taxi Mougins événements, taxi Mougins aéroport Nice.
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Blog;
