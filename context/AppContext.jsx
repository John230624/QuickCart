'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Création du contexte global de l'application
export const AppContext = createContext();

// Hook personnalisé pour utiliser facilement le contexte
export const useAppContext = () => {
    return useContext(AppContext)
}

// Fournisseur du contexte, enveloppe les composants qui ont besoin d'accéder aux données globales
export const AppContextProvider = (props) => {

    // Devise provenant des variables d'environnement
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();

    // États locaux
    const [products, setProducts] = useState([]); // Liste des produits
    const [userData, setUserData] = useState(false); // Données utilisateur
    const [isSeller, setIsSeller] = useState(true); // Statut vendeur (true/false)
    const [cartItems, setCartItems] = useState({}); // Panier (objet avec itemId : quantité)

    // Charger les produits (simulé ici avec les données fictives)
    const fetchProductData = async () => {
        setProducts(productsDummyData);
    };

    // Charger les données utilisateur (simulé ici)
    const fetchUserData = async () => {
        setUserData(userDummyData);
    };

    // Ajouter un produit au panier
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
    };

    // Mettre à jour la quantité d'un produit dans le panier
    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
    };

    // Obtenir le nombre total d'articles dans le panier
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalCount += cartItems[item];
            }
        }
        return totalCount;
    };

    // Obtenir le montant total du panier
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemInfo = products.find((product) => product._id === item);
            if (cartItems[item] > 0 && itemInfo) {
                totalAmount += itemInfo.offerPrice * cartItems[item];
            }
        }
        // Arrondi à 2 décimales
        return Math.floor(totalAmount * 100) / 100;
    };

    // Charger les produits au montage
    useEffect(() => {
        fetchProductData();
    }, []);

    // Charger les données utilisateur au montage
    useEffect(() => {
        fetchUserData();
    }, []);

    // Valeurs partagées via le contexte
    const value = {
        currency,
        router,
        isSeller,
        setIsSeller,
        userData,
        fetchUserData,
        products,
        fetchProductData,
        cartItems,
        setCartItems,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};