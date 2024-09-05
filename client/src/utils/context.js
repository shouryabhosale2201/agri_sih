import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const Context = createContext();

const AppContext = ({ children }) => {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [farmer, setFarmer] = useState({});
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    useEffect(() => {
        let count = 0;
        cartItems.map(item => count += item.attributes.quantity)
        setCartCount(count);
        let subTotal = 0;
        cartItems.map(item => subTotal += item.attributes.price * item.attributes.quantity)
        setCartSubTotal(subTotal);
    }, [cartItems]);

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems];
        let index = items.findIndex((p) => p.id === product.id);
        if (index !== -1) {
            items[index].attributes.quantity += quantity;
        } else {
            product.attributes.quantity = quantity
            items = [...items, product];
        }
        setCartItems(items);
    };
    const handleRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items.filter((p) => p.id !== product.id);
        setCartItems(items);
    };
    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems];
        let index = items.findIndex((p) => p.id === product.id);
        if (type === "inc") {
            items[index].attributes.quantity += 1;
        }
        else if (type === "dec") {
            if (items[index].attributes.quantity === 1) return;
            items[index].attributes.quantity -= 1;
        }
        setCartItems(items);
    };

    const handleLogin = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5001/api/farmer/login", { email, password });
            if (res.data.token) {
                setIsLoggedIn(true);
                setFarmer(res.data); // Use res.data directly
            }
        } catch (err) {
            console.error(err);
        }
    };
    

    const handleLogout = () => {
        axios.post("http://localhost:5001/api/farmer/logout")
            .then(() => setIsLoggedIn(false))
            .catch(err => console.error(err));
    };

    return (
        <Context.Provider
            value={{
                categories,
                setCategories,
                products,
                setProducts,
                cartItems,
                setCartItems,
                cartCount,
                setCartCount,
                cartSubTotal,
                setCartSubTotal,
                handleAddToCart,
                handleRemoveFromCart,
                handleCartProductQuantity,
                isLoggedIn,
                handleLogin,
                handleLogout,
                farmer,
                setFarmer
            }}>
            {children}
        </Context.Provider>
    );
};
export default AppContext;
