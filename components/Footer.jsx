import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import {
  FaHome,
  FaTags,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className=" bg-gray-800 text-blue-100">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-14 lg:px-8">
        {/* Changed grid layout to distribute space more widely */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 justify-between">
          {/* Logo and Description */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="flex flex-col items-start">
              <Image
                className="w-28 md:w-32 bg-zinc-300 rounded-md"
                src={assets.logo}
                alt="Company Logo"
                width={128}
                height={128}
              />
              <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                Lorem Ipsum est simplement un faux texte utilisé dans la composition
                et la mise en page avant impression. Il est le texte standard de
                l'industrie depuis les années 1500, quand un imprimeur anonyme
                assembla une galerie de caractères pour réaliser un livre spécimen
                de polices.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold text-white mb-4">Entreprise</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  <FaHome className="mr-3 text-blue-400" />
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  <FaTags className="mr-3 text-blue-400" />
                  Offres
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  <FaPhone className="mr-3 text-blue-400" />
                  Contactez-nous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  <AiFillFileText className="mr-3 text-blue-400" />
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold text-white mb-4">Nous contacter</h2>
            <address className="not-italic space-y-3 text-gray-300">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-400 flex-shrink-0" />
                <span>Abomey Calavi en face du Collège Bakhita , Benin</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                  +(229)0197747178-0197918000-0148232681
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-400" />
                <a href="mailto:contact@example.com" className="hover:text-blue-400 transition-colors">
                  plawimaddgroup1beninbranch@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-3 text-blue-400" />
                <span>Lundi-Samedi: 09h-21h</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>Copyright &copy; {new Date().getFullYear()}  Tiburce & Jean . Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;