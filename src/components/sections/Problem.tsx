"use client";

import { motion } from "framer-motion";
import { Heart, ShieldAlert, Brain, Sparkles } from "lucide-react";

const stats = [
  {
    icon: ShieldAlert,
    number: "Jedes 5.",
    label: "Kind leidet an psychischen Auffälligkeiten",
    color: "text-rose-dark",
    bg: "bg-rose/10",
  },
  {
    icon: Brain,
    number: "70%",
    label: "der Erwachsenen wünschen sich besseren Umgang mit Gefühlen in der Kindheit",
    color: "text-lavender-dark",
    bg: "bg-lavender/10",
  },
  {
    icon: Heart,
    number: "Früh",
    label: "geförderte emotionale Kompetenz stärkt Resilienz ein Leben lang",
    color: "text-sage-dark",
    bg: "bg-sage/10",
  },
];

export function Problem() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
            Warum Gefühlsförderung?
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">
            Gefühle verstehen lernen &mdash; von Anfang an
          </h2>
          <p className="mt-6 text-charcoal text-lg leading-relaxed">
            Vor allem in der Kindheit fehlt es häufig noch an dem Verständnis
            der eigenen Gefühle. Das kann zu Unsicherheit, Rückzug und
            langfristig zu psychischen Belastungen führen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-lavender/10 hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-5`}
              >
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <p className={`font-heading text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </p>
              <p className="text-charcoal-light text-sm leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-6 py-3 rounded-full border border-gold/20">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">
              Gefühlsförderung ist die beste Prävention
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
