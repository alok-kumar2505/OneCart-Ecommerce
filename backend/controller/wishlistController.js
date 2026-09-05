import User from "../model/userModel.js";

// Add item to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        const userData = await User.findById(userId);
        let wishlistData = userData.wishlistData || [];

        if (!wishlistData.includes(itemId)) {
            wishlistData.push(itemId);
            await User.findByIdAndUpdate(userId, { wishlistData });
            res.status(200).json({ success: true, message: "Added to wishlist" });
        } else {
            res.status(200).json({ success: true, message: "Already in wishlist" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        const userData = await User.findById(userId);
        let wishlistData = userData.wishlistData || [];

        if (wishlistData.includes(itemId)) {
            wishlistData = wishlistData.filter(id => id !== itemId);
            await User.findByIdAndUpdate(userId, { wishlistData });
        }
        
        res.status(200).json({ success: true, message: "Removed from wishlist" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user wishlist
export const getUserWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await User.findById(userId);
        const wishlistData = userData.wishlistData || [];
        
        res.status(200).json({ success: true, wishlistData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
