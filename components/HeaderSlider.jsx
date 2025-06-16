"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Puissant, rapide et conçu pour répondre à vos besoins professionnels et de divertissement !",
      offer: "Offre limitée ",
      buttonText2: "Acheter maintenant",
      imgSrc: assets.header_ordi_hp_probook_image,
    },
    {
      id: 2,
      title: "Plongez dans une expérience visuelle immersive avec une image ultra haute définition!",
      offer: "Dépêchez-vous, nous sommes en promotion !",
      buttonText2: "Voir les offres",
      imgSrc: assets.header_tv_image,
    },
    {
      id: 3,
      title: "Profitez d’un son clair et riche, idéal pour la musique et les appels !",
      offer: "Offre exclusive : 40 % de réduction",
      buttonText2: "En savoir plus",
      imgSrc: assets.header_casque_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000); // Change toutes les 5 secondes
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  // Variantes pour l'animation d'entrée des éléments du contenu
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3, // Décalage après le texte
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.5, // Décalage après l'image
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="overflow-hidden relative w-full">
      {/* Conteneur pour le glissement horizontal des slides */}
      <motion.div
        className="flex"
        // Nous animons le translateX ici pour le mouvement global du slider
        animate={{ x: `-${currentSlide * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // Un ressort pour un mouvement plus naturel
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-zinc-100 py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            {/* AnimatePresence pour animer le contenu de chaque slide individuellement */}
            <AnimatePresence mode="wait">
              {/* Le key ici est essentiel pour AnimatePresence afin de détecter le changement */}
              {/* Le contenu du texte et le bouton */}
              <motion.div
                key={currentSlide + '-text'} // Clé unique pour chaque slide de texte
                className="md:pl-8 mt-10 md:mt-0 flex flex-col items-center md:items-start text-center md:text-left z-10" // z-index pour le texte
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.p
                  variants={textVariants} // Utilise les variantes de texte
                  className="md:text-base text-blue-600 pb-1"
                >
                  {slide.offer}
                </motion.p>

                <motion.h1
                  variants={textVariants} // Utilise les variantes de texte
                  transition={{ ...textVariants.visible.transition, delay: 0.1 }} // Léger délai pour le titre
                  className="max-w-lg text-zinc-950 md:text-[40px] md:leading-[48px] text-2xl font-semibold"
                >
                  {slide.title}
                </motion.h1>

                <motion.div
                  variants={buttonVariants} // Utilise les variantes de bouton
                  className="flex items-center mt-4 md:mt-6"
                >
                  <a href="/all-products">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-2 md:px-10 px-7 md:py-2.5 py-2 bg-blue-600 hover:bg-blue-800 hover:text-zinc-50 rounded-full text-zinc-50 font-medium"
                    >
                      {slide.buttonText2}
                      <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="icône flèche" />
                    </motion.button>
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* L'image du produit */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide + '-image'} // Clé unique pour l'image
                className="flex items-center flex-1 justify-center md:justify-end"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={imageVariants} // Utilise les variantes d'image
              >
                <Image
                  className="md:w-72 w-48"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* Points de navigation */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer`}
            // Animation pour les points de navigation
            whileHover={{ scale: 1.2 }}
            animate={{
              backgroundColor: currentSlide === index ? "#2563EB" : "#E5E7EB", // Tailwind's blue-600 and zinc-200
              scale: currentSlide === index ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;