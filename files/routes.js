const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Product = require("./models/Product");
const SubProduct = require("./models/SubProducts");
const Brands = require("./models/Brands");
const Prices = require("./models/Prices");
const Models = require("./models/Models");
const Users = require("./models/Users");

//! Products
router.post("/products", async (req, res) => {
  const { name, url } = req.body;

  try {
    const id = uuidv4();
    const product = new Product({ id, name, url });
    await product.save();
    res.status(201).json({ message: "Product saved successfully!", product });
  } catch (error) {
    console.error("Error saving product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the product." });
  }
});
router.get("/products", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    res.status(200).json(products); // Return the products as JSON
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the products." });
  }
});
router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, url } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { name, url },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully!", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the product." });
  }
});
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully!", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product." });
  }
});

//! Sub Products
router.post("/sub-products", async (req, res) => {
  const { productId, name, url } = req.body;

  try {
    const id = uuidv4();
    const data = new SubProduct({ id, productId, name, url });
    await data.save();
    res.status(201).json({ message: "Saved successfully!", data });
  } catch (error) {
    console.error("Error saving data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the data." });
  }
});
router.get("/sub-products", async (req, res) => {
  try {
    const data = await SubProduct.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching dara:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the data." });
  }
});
router.put("/sub-products/:id", async (req, res) => {
  const { id } = req.params;
  const { productId, name, url } = req.body;

  try {
    const updatedSubProduct = await SubProduct.findOneAndUpdate(
      { id },
      { productId, name, url },
      { new: true }
    );

    if (!updatedSubProduct) {
      return res.status(404).json({ message: "Sub-product not found." });
    }

    res.status(200).json({
      message: "Sub-product updated successfully!",
      updatedSubProduct,
    });
  } catch (error) {
    console.error("Error updating sub-product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the sub-product." });
  }
});
router.delete("/sub-products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubProduct = await SubProduct.findOneAndDelete({ id });

    if (!deletedSubProduct) {
      return res.status(404).json({ message: "Sub-product not found." });
    }

    res.status(200).json({
      message: "Sub-product deleted successfully!",
      deletedSubProduct,
    });
  } catch (error) {
    console.error("Error deleting sub-product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the sub-product." });
  }
});

//! Brands
router.post("/brands", async (req, res) => {
  const { name, url } = req.body;

  try {
    const id = uuidv4();
    const data = new Brands({ id, name, url });
    await data.save();
    res.status(201).json({ message: "Saved successfully!", data });
  } catch (error) {
    console.error("Error saving data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the data." });
  }
});
router.get("/brands", async (req, res) => {
  try {
    const data = await Brands.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching dara:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the data." });
  }
});
router.get("/brands/search", async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required." });
  }

  try {
    const brands = await Brands.find({
      name: { $regex: keyword, $options: "i" }, // 'i' makes it case-insensitive
    });

    if (brands.length === 0) {
      return res
        .status(404)
        .json({ message: "No brands found matching the keyword." });
    }

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the brands." });
  }
});
router.put("/brands/:id", async (req, res) => {
  const { id } = req.params;
  const { name, url } = req.body;

  try {
    const updatedBrand = await Brands.findOneAndUpdate(
      { id },
      { name, url },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found." });
    }

    res
      .status(200)
      .json({ message: "Brand updated successfully!", updatedBrand });
  } catch (error) {
    console.error("Error updating brand:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the brand." });
  }
});
router.delete("/brands/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBrand = await Brands.findOneAndDelete({ id });

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found." });
    }

    res
      .status(200)
      .json({ message: "Brand deleted successfully!", deletedBrand });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the brand." });
  }
});

//! Models
router.post("/models", async (req, res) => {
  const { brandId, name } = req.body;

  try {
    const id = uuidv4();
    const data = new Models({ id, brandId, name });
    await data.save();
    res.status(201).json({ message: "Saved successfully!", data });
  } catch (error) {
    console.error("Error saving data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the data." });
  }
});
router.get("/models", async (req, res) => {
  try {
    const data = await Models.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching dara:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the data." });
  }
});
router.get("/models/search", async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required." });
  }

  try {
    const data = await Models.find({
      name: { $regex: keyword, $options: "i" }, // 'i' makes it case-insensitive
    });

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found matching the keyword." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the data." });
  }
});
router.put("/models/:id", async (req, res) => {
  const { id } = req.params;
  const { brandId, name } = req.body;

  try {
    const updatedModel = await Models.findOneAndUpdate(
      { id },
      { brandId, name },
      { new: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found." });
    }

    res
      .status(200)
      .json({ message: "Model updated successfully!", updatedModel });
  } catch (error) {
    console.error("Error updating model:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the model." });
  }
});
router.delete("/models/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedModel = await Models.findOneAndDelete({ id });

    if (!deletedModel) {
      return res.status(404).json({ message: "Model not found." });
    }

    res
      .status(200)
      .json({ message: "Model deleted successfully!", deletedModel });
  } catch (error) {
    console.error("Error deleting model:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the model." });
  }
});

//! Prices
router.post("/prices", async (req, res) => {
  const {
    average,
    good,
    best,
    hasWarranty,
    warrantyTenure,
    brandId,
    productId,
    subProductId,
    modelId,
    isActive,
  } = req.body;

  try {
    const id = uuidv4();
    const data = new Prices({
      id,
      average,
      good,
      best,
      hasWarranty,
      warrantyTenure,
      brandId,
      productId,
      subProductId,
      modelId,
      isActive,
    });
    await data.save();
    res.status(201).json({ message: "Saved successfully!", data });
  } catch (error) {
    console.error("Error saving data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the data." });
  }
});
router.get("/prices", async (req, res) => {
  try {
    const data = await Prices.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching dara:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the data." });
  }
});
router.get("/prices/search", async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required." });
  }

  try {
    // Step 1: Find Models that match the keyword
    const matchedModels = await Models.find({
      name: { $regex: keyword, $options: "i" }, // 'i' makes it case-insensitive
    });

    // Step 2: If no Models are found, return a 404 response
    if (matchedModels.length === 0) {
      return res
        .status(404)
        .json({ message: "No models found matching the keyword." });
    }

    // Step 3: Extract model IDs from the matched Models
    const modelIds = matchedModels.map((model) => model.id);

    // Step 4: Find Prices that match the model IDs
    const prices = await Prices.find({
      modelId: { $in: modelIds },
    });

    // Return the matching Prices documents
    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the prices." });
  }
});
router.put("/prices/:id", async (req, res) => {
  const { id } = req.params;
  const {
    average,
    good,
    best,
    hasWarranty,
    warrantyTenure,
    brandId,
    productId,
    subProductId,
    modelId,
    isActive,
  } = req.body;

  try {
    const updatedPrice = await Prices.findOneAndUpdate(
      { id },
      {
        average,
        good,
        best,
        hasWarranty,
        warrantyTenure,
        brandId,
        productId,
        subProductId,
        modelId,
        isActive,
      },
      { new: true }
    );

    if (!updatedPrice) {
      return res.status(404).json({ message: "Price entry not found." });
    }

    res
      .status(200)
      .json({ message: "Price entry updated successfully!", updatedPrice });
  } catch (error) {
    console.error("Error updating price entry:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the price entry." });
  }
});
router.delete("/prices/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPrice = await Prices.findOneAndDelete({ id });

    if (!deletedPrice) {
      return res.status(404).json({ message: "Price entry not found." });
    }

    res
      .status(200)
      .json({ message: "Price entry deleted successfully!", deletedPrice });
  } catch (error) {
    console.error("Error deleting price entry:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the price entry." });
  }
});

//! Users
router.post("/users", async (req, res) => {
  try {
    const data = new Users(req.body);
    await data.save();
    res.status(201).json({ message: "Saved successfully!", data });
  } catch (error) {
    console.error("Error saving data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the data." });
  }
});
router.get("/users", async (req, res) => {
  try {
    const data = await Users.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching dara:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the data." });
  }
});
router.get("/users/search", async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required." });
  }

  try {
    const data = await Users.find({
      userId: { $regex: keyword, $options: "i" }, // 'i' makes it case-insensitive
    });

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found matching the keyword." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the data." });
  }
});
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await Users.findOneAndUpdate({ id }, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User updated successfully!", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
});
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Users.findOneAndDelete({ id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully!", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
});

module.exports = router;
