import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

 export const shopDataContext = createContext()
function ShopContext({children}) {

    let [products,setProducts] = useState([])
    let [search,setSearch] = useState('')
    let {userData} = useContext(userDataContext)
    let [showSearch,setShowSearch] = useState(false)
    let {serverUrl} = useContext(authDataContext)
    let [cartItem, setCartItem] = useState(() => {
      const saved = localStorage.getItem('onecart_cart');
      return saved ? JSON.parse(saved) : {};
    });
    let [wishlist, setWishlist] = useState([]);
    let [loading,setLoading] = useState(false)
    let currency = '₹';

    let [productsLoading, setProductsLoading] = useState(true)

    const getProducts = async () => {
        try {
            setProductsLoading(true)
            let result = await axios.get(serverUrl + "/api/product/list")
            setProducts(result.data)
        } catch (error) {
        } finally {
            setProductsLoading(false)
        }
    }


    const addtoCart = async (itemId , size) => {
       if (!size) {
      toast.error("Select Product Size!")
      return;
    }

    let cartData = structuredClone(cartItem); // Clone the product

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
  
    setCartItem(cartData);
  

    if (userData) {
      setLoading(true)
      try {
      let result = await axios.post(serverUrl + "/api/cart/add" , {itemId,size} , {withCredentials: true})
      toast.success("Product Added")
      setLoading(false)

      }
      catch (error) {
        setLoading(false)
        toast.error("Add Cart Error")
       
      }
     
    } else {
      toast.success("Product Added")
    }

    if (wishlist.includes(itemId)) {
        setWishlist(prev => prev.filter(id => id !== itemId));
        if (userData) {
            try { await axios.post(serverUrl + "/api/wishlist/remove", { itemId }, { withCredentials: true }) } catch (error) {}
        }
    }

    }


    const getUserCart = async () => {
      try {
        const result = await axios.post(serverUrl + '/api/cart/get',{},{ withCredentials: true })

      setCartItem(result.data)
    } catch (error) {
     


    }
      
    }

    const toggleWishlist = async (itemId) => {
        let updatedWishlist = [...wishlist];
        if (updatedWishlist.includes(itemId)) {
            updatedWishlist = updatedWishlist.filter(id => id !== itemId);
            setWishlist(updatedWishlist);
            toast.success("Removed from wishlist");
            if (userData) {
                try { await axios.post(serverUrl + "/api/wishlist/remove", { itemId }, { withCredentials: true }) } catch (error) {}
            }
        } else {
            updatedWishlist.push(itemId);
            setWishlist(updatedWishlist);
            toast.success("Added to wishlist");
            if (userData) {
                try { await axios.post(serverUrl + "/api/wishlist/add", { itemId }, { withCredentials: true }) } catch (error) {}
            }
        }
    }

    const getUserWishlist = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/wishlist/get', {}, { withCredentials: true })
            if (result.data.success) {
                setWishlist(result.data.wishlistData)
            }
        } catch (error) {}
    }
    const updateQuantity = async (itemId , size , quantity) => {
      let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
      } catch (error) {
        
      }
    }
      
    }
     const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item]
          }
        } catch (error) {

        }
      }
    }
    return totalCount
  }

  const getCartAmount = () => {
  let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {

        }
      }
    }
    return totalAmount
    
  }

    useEffect(()=>{
     getProducts()
    },[])

    useEffect(() => {
    if (userData) {
      getUserCart()
      getUserWishlist()
    }
  }, [userData])

  useEffect(() => {
    localStorage.setItem('onecart_cart', JSON.stringify(cartItem))
  }, [cartItem])






    const cartTotal = getCartAmount();
    const delivery_fee = cartTotal === 0 ? 0 : (cartTotal >= 1500 ? 0 : 50);

    let value = {
      products, currency , delivery_fee,getProducts,search,setSearch,showSearch,setShowSearch,cartItem, addtoCart, getCartCount, setCartItem ,updateQuantity,getCartAmount,loading, wishlist, setWishlist, toggleWishlist, productsLoading
    }
  return (
    <div>
    <shopDataContext.Provider value={value}>
      {children}
      </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext

