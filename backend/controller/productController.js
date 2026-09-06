import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;


    if (!price) {
      return res.status(400).json({ message: "Product price is required" });
    }

    

    if (!sizes) {
      return res.status(400).json({ message: "Please select at least one size" });
    }

    const parsedSizes = JSON.parse(sizes);

    if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
      return res.status(400).json({ message: "Please select at least one size" });
    }

    if (!req.files || !req.files.image1) {
      return res.status(400).json({ message: "Product images are required" });
    }

    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = req.files.image2
      ? await uploadOnCloudinary(req.files.image2[0].path)
      : null;
    const image3 = req.files.image3
      ? await uploadOnCloudinary(req.files.image3[0].path)
      : null;
    const image4 = req.files.image4
      ? await uploadOnCloudinary(req.files.image4[0].path)
      : null;

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);

    return res.status(201).json(product);

  } catch (error) {
    return res.status(500).json({ message: "Failed to add product" });
  }
};


export const listProduct = async (req,res) => {
     
    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
    return res.status(500).json({message:`ListProduct error ${error}`})
    }
}

export const removeProduct = async (req,res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
         return res.status(200).json(product)
    } catch (error) {
    return res.status(500).json({message:`RemoveProduct error ${error}`})
    }
    
}

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
        } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const parsedSizes = sizes ? JSON.parse(sizes) : product.sizes;

        let image1 = product.image1;
        let image2 = product.image2;
        let image3 = product.image3;
        let image4 = product.image4;

        if (req.files) {
            if (req.files.image1) image1 = await uploadOnCloudinary(req.files.image1[0].path);
            if (req.files.image2) image2 = await uploadOnCloudinary(req.files.image2[0].path);
            if (req.files.image3) image3 = await uploadOnCloudinary(req.files.image3[0].path);
            if (req.files.image4) image4 = await uploadOnCloudinary(req.files.image4[0].path);
        }

        const productData = {
            name: name || product.name,
            description: description || product.description,
            price: price ? Number(price) : product.price,
            category: category || product.category,
            subCategory: subCategory || product.subCategory,
            sizes: parsedSizes,
            bestseller: bestseller !== undefined ? bestseller === "true" : product.bestseller,
            image1,
            image2,
            image3,
            image4,
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to edit product" });
    }
}
