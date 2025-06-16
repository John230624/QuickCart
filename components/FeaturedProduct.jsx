"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion"; // Importez motion

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Un son inégalé",
    description: "Profitez d'un son cristallin avec des casques haut de gamme.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Restez connecté",
    description: "Des écouteurs compacts et élégants pour toutes les occasions.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Puissance à chaque pixel",
    description: "Découvrez les derniers ordinateurs portables pour le travail, le jeu et plus encore.",
  },
];

const FeaturedProduct = () => {
  // Variantes pour l'animation d'apparition du titre
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Variantes pour l'animation d'apparition des cartes de produit
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        // Le délai pour l'apparition échelonnée sera ajouté au moment du map
      },
    },
  };

  // Variantes pour l'animation d'apparition du contenu texte dans la carte
  const textContentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: { y: -16 }, // Déplace le texte légèrement vers le haut au survol de la carte
  };

  return (
    <div className="mt-14">
      {/* Animation pour le titre et le séparateur */}
      <div className="flex flex-col items-center">
        <motion.p
          className="text-3xl font-medium"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Anime une seule fois quand 50% du texte est visible
          variants={headingVariants}
        >
          Produits vedettes
        </motion.p>
        <motion.div
          className="w-28 h-0.5 bg-blue-600 mt-2"
          initial={{ width: 0, opacity: 0 }} // Commence invisible et très étroit
          whileInView={{ width: 112, opacity: 1 }} // S'étire jusqu'à 28 (w-28 = 112px) et devient opaque
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }} // Délai après le titre
        ></motion.div>
      </div>

      {/* Animation pour les cartes de produit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }, index) => (
          <motion.div
            key={id}
            className="relative group overflow-hidden rounded-lg shadow-lg" // Ajout de shadow et rounded pour un look plus moderne
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Anime quand 30% de la carte est visible
            variants={cardVariants}
            transition={{ delay: index * 0.2 + 0.5 }} // Délai échelonné pour l'APPARITION de chaque carte
            whileHover={{ 
                scale: 1.03, // Léger agrandissement au survol de la carte
                transition: { type: "spring", stiffness: 400, damping: 10 } // TRANSITION SPÉCIFIQUE AU whileHover
            }}
          >
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8 pb-10">
              {/* Le contenu du texte sera animé */}
              <motion.div
                className="text-white space-y-2 w-full"
                initial="hidden" // Démarre en hidden
                whileInView="visible" // Anime pour apparaître à l'entrée dans le viewport
                // transition={{ delay: index * 0.2 + 0.8, duration: 0.6, ease: "easeOut" }} // Ce délai est maintenant dans la variante
                variants={textContentVariants} // Utilise la variante pour l'apparition du texte
                // On active la variante 'hover' pour le texte quand la carte est survolée
                whileHover="hover" 
                transition={{ duration: 0.3, ease: "easeOut" }} // Transition pour le whileHover du texte
              >
                <p className="font-medium text-xl lg:text-2xl">{title}</p>
                <p className="text-sm lg:text-base leading-5 max-w-60">
                  {description}
                </p>
                <motion.button
                  className="flex items-center gap-1.5 bg-blue-600 px-4 py-2 rounded"
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 255, 0.6)" }} // Léger grossissement et ombre au survol
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }} // Transition type ressort pour le bouton au survol/clic
                >
                  Acheter maintenant <Image className="h-3 w-3" src={assets.redirect_icon} alt="Icône de redirection" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;