import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Users, Briefcase, Send, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const steps = ["Trajet", "Date & Heure", "Détails", "Confirmation"];

const Reserver = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    passengers: "1",
    luggage: "0",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 0) return form.pickup.trim() && form.destination.trim();
    if (step === 1) return form.date && form.time;
    if (step === 2) return form.name.trim() && (form.email.trim() || form.phone.trim());
    return true;
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    setSending(true);
    try {
      // Build mailto link with form data for now
      const subject = encodeURIComponent(`Demande de réservation - ${form.name}`);
      const body = encodeURIComponent(
        `Nouvelle demande de réservation:\n\nDépart: ${form.pickup}\nDestination: ${form.destination}\nDate: ${form.date}\nHeure: ${form.time}\nPassagers: ${form.passengers}\nBagages: ${form.luggage}\nNom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone}\nNotes: ${form.notes}`
      );
      window.open(`mailto:covasbonenfant@gmail.com?subject=${subject}&body=${body}`, '_blank');
      toast.success("Demande envoyée ! Nous vous recontacterons rapidement avec un devis.");
      setStep(0);
      setForm({ pickup: "", destination: "", date: "", time: "", passengers: "1", luggage: "0", name: "", email: "", phone: "", notes: "" });
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="sr-only">Réserver un taxi à Mougins - Les Chauffeurs de Mougins</h1>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Réservation</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">Demandez votre devis</h2>
            <p className="text-muted-foreground mt-3">Remplissez le formulaire et recevez une réponse rapide.</p>
          </motion.div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i <= step ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="hidden sm:inline text-xs text-muted-foreground">{s}</span>
                {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass neon-border rounded-2xl p-8"
          >
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Lieu de prise en charge
                  </label>
                  <input className={inputClass} placeholder="Ex: Mougins centre" value={form.pickup} onChange={(e) => update("pickup", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Destination
                  </label>
                  <input className={inputClass} placeholder="Ex: Aéroport Nice Côte d'Azur" value={form.destination} onChange={(e) => update("destination", e.target.value)} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Date
                  </label>
                  <input type="date" className={inputClass} value={form.date} onChange={(e) => update("date", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Heure
                  </label>
                  <input type="time" className={inputClass} value={form.time} onChange={(e) => update("time", e.target.value)} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" /> Passagers
                    </label>
                    <select className={inputClass} value={form.passengers} onChange={(e) => update("passengers", e.target.value)}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" /> Bagages
                    </label>
                    <select className={inputClass} value={form.luggage} onChange={(e) => update("luggage", e.target.value)}>
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Nom complet</label>
                  <input className={inputClass} placeholder="Votre nom" value={form.name} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <input type="email" className={inputClass} placeholder="votre@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Téléphone</label>
                  <input type="tel" className={inputClass} placeholder="06 00 00 00 00" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Notes (optionnel)</label>
                  <textarea className={inputClass} rows={3} placeholder="Informations complémentaires..." value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">Récapitulatif</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <span className="text-muted-foreground">Départ</span><span className="text-foreground">{form.pickup}</span>
                  <span className="text-muted-foreground">Destination</span><span className="text-foreground">{form.destination}</span>
                  <span className="text-muted-foreground">Date</span><span className="text-foreground">{form.date}</span>
                  <span className="text-muted-foreground">Heure</span><span className="text-foreground">{form.time}</span>
                  <span className="text-muted-foreground">Passagers</span><span className="text-foreground">{form.passengers}</span>
                  <span className="text-muted-foreground">Bagages</span><span className="text-foreground">{form.luggage}</span>
                  <span className="text-muted-foreground">Nom</span><span className="text-foreground">{form.name}</span>
                  <span className="text-muted-foreground">Email</span><span className="text-foreground">{form.email}</span>
                  <span className="text-muted-foreground">Téléphone</span><span className="text-foreground">{form.phone}</span>
                </div>
                {form.notes && (
                  <div>
                    <span className="text-muted-foreground text-sm">Notes :</span>
                    <p className="text-foreground text-sm mt-1">{form.notes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  step === 0 ? "invisible" : "glass text-foreground hover:bg-card/80"
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-[0_0_20px_hsl(199_89%_48%/0.4)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Suivant <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-[0_0_30px_hsl(199_89%_48%/0.4)] disabled:opacity-60"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {sending ? "Envoi en cours..." : "Envoyer la demande"}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="sr-only" aria-hidden="true">
        Réserver un taxi Mougins en ligne. Taxi Mougins réservation rapide, devis gratuit taxi Mougins. Transport Mougins Cannes, navette aéroport Nice Côte d'Azur. Taxi Mougins tarif fixe et compétitif. VTC Mougins réservation.
      </div>

      <Footer />
    </div>
  );
};

export default Reserver;
