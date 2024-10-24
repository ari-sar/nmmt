const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Product = require("./models/Product");
const SubProduct = require("./models/SubProducts");
const Brands = require("./models/Brands");
const Prices = require("./models/Prices");
const Models = require("./models/Models");
const Users = require("./models/Users");
const Sells = require("./models/Sell");

//! Products
router.post("/products", async (req, res) => {
  const { name, url, color } = req.body;

  try {
    const id = uuidv4();
    const product = new Product({ id, name, url, color });
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
router.post("/products/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, url, color } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { name, url, color },
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
router.get("/products/:id", async (req, res) => {
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
  const { productId, name, url, color } = req.body;

  try {
    const id = uuidv4();
    const data = new SubProduct({ id, productId, name, url, color });
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
router.get("/sub-products/:productId", async (req, res) => {
  const { productId } = req.params; // Extract productId from request parameters

  try {
    // Fetch sub-products that match the given productId
    const subProducts = await SubProduct.find({ productId });

    if (subProducts.length > 0) {
      res.status(200).json(subProducts);
    } else {
      res
        .status(404)
        .json({ message: "No sub-products found for this productId." });
    }
  } catch (error) {
    console.error("Error fetching sub-products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the sub-products." });
  }
});

router.post("/sub-products/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { productId, name, url, color } = req.body;

  try {
    const updatedSubProduct = await SubProduct.findOneAndUpdate(
      { id },
      { productId, name, url, color },
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
router.get("/sub-products-delete/:id", async (req, res) => {
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
  const { name, url, color } = req.body;

  try {
    const id = uuidv4();
    const data = new Brands({ id, name, url, color });
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

    // if (brands.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No brands found matching the keyword." });
    // }

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the brands." });
  }
});
router.post("/brands/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, url, color } = req.body;

  try {
    const updatedBrand = await Brands.findOneAndUpdate(
      { id },
      { name, url, color },
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
router.get("/brands/:id", async (req, res) => {
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
// Route to get sub-products by brandId
router.get("/models/:brandId", async (req, res) => {
  const { brandId } = req.params; // Extract brandId from request parameters

  try {
    // Fetch sub-products that match the given brandId
    const models = await Models.find({ brandId });

    if (models.length > 0) {
      res.status(200).json(models);
    } else {
      res
        .status(404)
        .json({ message: "No sub-products found for this brandId." });
    }
  } catch (error) {
    console.error("Error fetching sub-products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the sub-products." });
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
router.post("/models/:id", async (req, res) => {
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
router.get("/models/delete/:id", async (req, res) => {
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
    amoled,
    wholeSellerPrice,
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
      amoled,
      wholeSellerPrice,
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
router.get("/prices-all", async (req, res) => {
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
// Route to get prices based on brandId, productId, and subProductId
router.get("/prices", async (req, res) => {
  const { brandId, productId, subProductId } = req.query; // Extract query parameters

  try {
    // Build query dynamically based on provided parameters
    let query = {};

    if (brandId) {
      query.brandId = brandId;
    }

    if (productId) {
      query.productId = productId;
    }

    if (subProductId) {
      query.subProductId = subProductId;
    }

    // Fetch prices based on query parameters and populate modelName from Models collection
    const prices = await Prices.find(query).populate({
      path: "modelId", // The field in Prices schema that references Models
      select: "name", // Only fetch modelName from the Models collection
    });

    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the prices." });
  }
});

router.get("/prices/search", async (req, res) => {
  const { keyword, brandId, productId, subProductId } = req.query;

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
      return res.status(201).json([]);
    }

    // Step 3: Extract model IDs from the matched Models
    const modelIds = matchedModels.map((model) => model._id); // Use _id for ObjectId reference

    // Step 4: Find Prices that match the model IDs and other criteria
    const prices = await Prices.find({
      modelId: { $in: modelIds },
      ...(brandId && { brandId }),
      ...(productId && { productId }),
      ...(subProductId && { subProductId }),
    }).populate("modelId", "name"); // Populate modelId to get model name

    // Return the matching Prices documents with populated model names
    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the prices." });
  }
});

router.post("/prices/edit/:id", async (req, res) => {
  const { id } = req.params;
  const {
    average,
    good,
    best,
    amoled,
    wholeSellerPrice,
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
        amoled,
        wholeSellerPrice,
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
router.get("/prices/:id", async (req, res) => {
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

    // Check for duplicate key error
    if (error.code === 11000) {
      res.status(409).json({ message: "Duplicate user, User already exists" }); // 409 Conflict
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while saving the data." });
    }
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
router.get("/users/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Users.findOne({ userId: id }); // Fetch the user by ID from the database
    if (data) {
      res.status(200).json([data]); // If the user is found, return the data with a 200 status
    } else {
      res.status(201).json([]); // If no user is found, return 404
    }
  } catch (error) {
    console.error("Error fetching data:", error);
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
router.post("/users/edit/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await Users.findOneAndUpdate({ userId }, req.body, {
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
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Users.findOneAndDelete({ userId: id });

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

//! Sell
router.post("/sells", async (req, res) => {
  const {
    price,
    modelName,
    modelId,
    productId,
    subProductId,
    brandId,
    qty,
    date,
  } = req.body;
  const id = uuidv4();
  //const formattedDate = new Date(date);
  try {
    // Create a new sell record
    const newSell = new Sells({
      id,
      price,
      modelName,
      modelId,
      productId,
      subProductId,
      brandId,
      qty,
      date,
    });

    // Save the new sell record to the database
    const savedSell = await newSell.save();
    res.status(201).json(savedSell);
  } catch (error) {
    console.error("Error creating sell:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the sell." });
  }
});
// GET request to fetch sells by date
router.get("/sells/everyday", async (req, res) => {
  const { date } = req.query;

  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Valid date is required." });
  }

  try {
    // Create a Date object from the date string, with the assumption it is in UTC
    const queryDate = new Date(date + "T00:00:00Z"); // Force to UTC start of the date

    // Using Date.UTC to create start and end of day
    const startOfDay = new Date(
      Date.UTC(
        queryDate.getUTCFullYear(),
        queryDate.getUTCMonth(),
        queryDate.getUTCDate(),
        0,
        0,
        0
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        queryDate.getUTCFullYear(),
        queryDate.getUTCMonth(),
        queryDate.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    const sells = await Sells.find({
      date: {
        $gte: startOfDay, // Should be 2024-10-15T00:00:00.000Z
        $lt: endOfDay, // Should be 2024-10-16T00:00:00.000Z
      },
    });

    console.log("Sells Found:", sells);

    res.status(200).json(sells);
  } catch (error) {
    console.error("Error fetching sells by date:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching sells." });
  }
});

router.get("/sells/today-total", async (req, res) => {
  const { date } = req.query;

  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Valid date is required." });
  }

  try {
    // Create a Date object from the date string, with the assumption it is in UTC
    const queryDate = new Date(date + "T00:00:00Z");

    // Using Date.UTC to create start and end of day
    const startOfDay = new Date(
      Date.UTC(
        queryDate.getUTCFullYear(),
        queryDate.getUTCMonth(),
        queryDate.getUTCDate(),
        0,
        0,
        0
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        queryDate.getUTCFullYear(),
        queryDate.getUTCMonth(),
        queryDate.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    // Aggregation pipeline to sum prices
    const result = await Sells.aggregate([
      {
        $match: {
          date: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null, // Grouping by null to get total sum
          totalAmount: { $sum: "$price" }, // Summing the price field
        },
      },
    ]);

    // Extract the total amount
    const totalSellAmount = result.length > 0 ? result[0].totalAmount : 0;

    res.status(200).json({ totalSellAmount });
  } catch (error) {
    console.error("Error fetching total sell amount:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching total sell amount." });
  }
});

router.get("/sells/total-price", async (req, res) => {
  try {
    // Calculate the total price of all sells
    const totalPrice = await Sells.aggregate([
      {
        $group: {
          _id: null, // Group all records together
          total: { $sum: "$price" }, // Calculate the total price
        },
      },
    ]);

    // Check if totalPrice is empty
    if (totalPrice.length === 0 || totalPrice[0].total === 0) {
      return res.status(404).json({ message: "No sells found." });
    }

    res.status(200).json({ totalPrice: totalPrice[0].total });
  } catch (error) {
    console.error("Error calculating total price:", error);
    res.status(500).json({
      message: "An error occurred while calculating the total price.",
    });
  }
});

module.exports = router;
