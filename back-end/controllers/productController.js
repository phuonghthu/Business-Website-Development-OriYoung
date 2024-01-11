const multer = require("multer");
const Guid = require("guid");

const Utils = require("../common/utils");
const Product = require("../models/Product");
const Category = require("../models/Category");
//setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const basePath = "./public/images/products/";
    // const categoryName = req.body.categoryName;
    // const path = basePath + categoryName;
    // //Create a folder named with categoryName, if it doesn't already exist?
    // if (!fs.existsSync(path)) {
    //   fs.mkdirSync(path);
    // }

    cb(null, basePath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + Guid.raw() + ".jpg");
  },
});
const upload = multer({ storage: storage });

//get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    const products = categories.products.filter(
        (product) => product.isDeleted === false
      );
    const data = categories.map((category) => {
      return {
        id: category._id,
        name: category.name,
        totalProducts: products.length,
      };
    });

    return res.json(Utils.createSuccessResponseModel(data.length, data));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

const addCategory = async (req, res) => {
  try {
    //check category exist
    const categoryExist = await Category.findOne({
      categoryName: req.body.name,
    });
    if (categoryExist) {
      return res
        .status(400)
        .json(Utils.createErrorResponseModel("Danh mục đã tồn tại"));
    }
    const category = new Category({
      name: req.body.name,
    });
    await category.save();
    return res.json(
      Utils.createSuccessResponseModel("Thêm danh mục thành công", category)
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!category || category === null) {
      return res
        .status(404)
        .json(Utils.createErrorResponseModel("Danh mục không tồn tại"));
    }
    category.isDeleted = true;
    await category.save();
    return res.json(Utils.createSuccessResponseModel(0, true));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

const updateNameCategory = async (req, res) => {
  try {
    const { name, id } = req.body;
    const categoryExist = await Category.exists({
      _id: { $ne: id },
      name: name,
    });
    if (categoryExist) {
      return res
        .status(400)
        .json(Utils.createErrorResponseModel("Danh mục đã tồn tại"));
    }
    const category = await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { name },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json(Utils.createErrorResponseModel("Danh mục không tồn tại"));
    }
    return res.json(Utils.createSuccessResponseModel(0, true));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//get all products by pageSize and pageIndex
const getAllProducts = async (req, res) => {
  try {
    const { pageSize, pageIndex } = req.query;
    const categories = await Category.find();
    //In category there is an array of products, take all of those products and add each product to the corresponding categoryName
    let products = categories.flatMap((category) => {
      return category.products.map((product) => {
        return {
          ...product._doc,
          categoryName: category.name,
        };
      });
    });
    //pagination
    const totalProducts = products.length;
    products = products
      .filter((product) => product.isDeleted === false)
      .slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

    return res.json(Utils.createSuccessResponseModel(totalProducts, products));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//Get best sale products by category, 5 products per category
const getBestSeller = async (req, res) => {
  try {
    const bestSellerProducts = await Category.aggregate([
      {
        $project: {
          name: 1,
          products: {
            $slice: [
              {
                $map: {
                  input: {
                    $slice: [
                      {
                        $filter: {
                          input: "$products",
                          as: "product",
                          cond: { $ne: ["$$product.isDeleted", true] },
                        },
                      },
                      4, // get 5 best seller products
                    ],
                  },
                  as: "product",
                  in: {
                    productCode: "$$product.productCode",
                    name: "$$product.name",
                    description: "$$product.description",
                    capacitiesAndPrices: "$$product.capacitiesAndPrices",
                    image: "$$product.image",
                  },
                },
              },
              5, // get 5 best seller categories
            ],
          },
        },
      },
    ]);

    return res.json(
      Utils.createSuccessResponseModel(
        bestSellerProducts.length,
        bestSellerProducts
      )
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//search product by name
const searchProduct = async (req, res) => {
  try {
    const { keyword, pageIndex = 1, pageSize = 9 } = req.query;
    const products = await Product.find({
      name: { $regex: keyword, $options: "i" },
      isDeleted: false,
    })
      .skip((pageIndex - 1) * pageSize)
      .limit(parseInt(pageSize));
    return res.json(
      Utils.createSuccessResponseModel(products.length, products)
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

const addProducts = async (req, res) => {
  try {
    let category = await Category.findOne({ name: req.body.categoryName });
    if (!category || category === null) {
      category = new Category({
        name: req.body.categoryName,
      });
    }

    const newProduct = new Product({
      ...req.body.product,
    });
    category.products.push(newProduct);
    await newProduct.save();
    await category.save();

    return res.json(
      Utils.createSuccessResponseModel("Thêm sản phẩm thành công", newProduct)
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const {
      productCode,
      productId,
      categoryName,
      name,
      capacity,
      price,
      description,
      quantity,
      image,
    } = req.body;

    const product = await Product.findById(productId);
    if (image !== undefined || image !== null || image !== "") {
      product.productCode = productCode;
      product.name = name;
      product.description = description;
      product.image = image;
      product.capacity = capacity;
      product.price = price;
      product.quantity = quantity;
    } else {
      product.productCode = productCode;
      product.name = name;
      product.description = description;
      product.capacity = capacity;
      product.price = price;
      product.quantity = quantity;
    }
    //update product

    await product.save();

    //update quantity for each product in category
    const categories = await Category.find();
    categories.forEach(async (category) => {
      //find product in category
      const index = category.products.findIndex(
        (p) => p._id.toString() === productId
      );
      //if categoryName is changed, delete product in old category and add product to new category
      if (index !== -1) {
        category.products.splice(index, 1);
        await category.save();
        //add product to new category
        const newCategory = await Category.findOne({ name: categoryName });
        if (!newCategory || newCategory === null) {
          const newCategory = new Category({
            name: categoryName,
          });
          newCategory.products.push(product);
          await newCategory.save();
        } else {
          category.products.splice(index, 1);
          newCategory.products.push(product);
          await newCategory.save();
        }
      }
    });
    return res.json(Utils.createSuccessResponseModel(0, true));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productCode);
    if (!product || product === null) {
      return res
        .status(404)
        .json(Utils.createErrorResponseModel("Sản phẩm không tồn tại"));
    }
    product.isDeleted = true;
    await product.save();
    //find product in all category and delete it. If category has no product, delete category
    const categories = await Category.find();
    categories.forEach(async (category) => {
      const index = category.products.findIndex(
        (p) =>
          p._id.toString() === req.params.productCode && p.isDeleted === false
      );
      if (index !== -1) {
        //change isDelete of product to true
        category.products[index].isDeleted = true;
        // count number of product isDeleted == false in category
        const numberOfProduct = category.products.filter(
          (p) => p.isDeleted === false
        ).length;
        if (numberOfProduct === 0) {
          category.isDeleted = true;
        }
        await category.save();
      }
    });

    return res.json(Utils.createSuccessResponseModel(0, true));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//get product by category
const getProductByCategory = async (req, res) => {
  try {
    let totalRecord = 0;
    let products;

    const {
      categoryName,
      minPrice,
      maxPrice,
      pageSize = 9,
      pageIndex = 1,
    } = req.query;
    if (categoryName === "all") {
      products = await Product.find({
        isDeleted: false,
      });
      if (minPrice === undefined) {
        products = products.filter((product) => product.price <= maxPrice);
      } else if (maxPrice === undefined) {
        products = products.filter((product) => product.price >= minPrice);
      } else {
        products = products.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
      }
      totalRecord = products.length;
    } else {
      const category = await Category.findOne({ name: categoryName });
      if (!category || category === null) {
        return res.json(
          Utils.createErrorResponseModel("Danh mục không tồn tại")
        );
      }
      totalRecord = category.products.length;
      if (minPrice === undefined) {
        products = category.products.filter(
          (product) => product.price <= maxPrice
        );
      } else if (maxPrice === undefined) {
        products = category.products.filter(
          (product) => product.price >= minPrice
        );
      } else {
        products = category.products.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
      }
    }

    //pagination
    products = products
      .filter((product) => product.isDeleted === false)
      .slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

    return res.json(Utils.createSuccessResponseModel(products.length, products));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//get detail product
const getDetailProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });

    if (!product || product === null) {
      return res
        .status(404)
        .json(Utils.createErrorResponseModel("Sản phẩm không tồn tại"));
    }
    //If a product exists, I will find which category that product exists in and return the categoryName?
    const categories = await Category.find();
    const categoryName = categories.find((category) =>
      category.products.some((p) => p._id.toString() === req.params.id)
    )?.name;

    return res.json(
      Utils.createSuccessResponseModel(1, {
        ...product.toObject(),
        categoryName,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//Get 5 products of the same category, not counting the current product
const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });
    if (!product || product === null) {
      return res
        .status(404)
        .json(Utils.createErrorResponseModel("Sản phẩm không tồn tại"));
    }

    //Find products in the category, if any category contains that product, select 5 products, excluding the current product
    const categories = await Category.find();
    const relatedProducts = categories
      .flatMap((category) => {
        // If there is a product that is identical to a product in a category, select 5 products of the same category, and ignore other categories
        if (category.products.find((p) => p._id.toString() === req.params.id)) {
          const categoryProducts = category.products
            .filter((p) => p._id.toString() !== req.params.id)
            .slice(0, 4);
          if (categoryProducts.length > 0) {
            return {
              category: category.name, // Assuming category has a name property
              products: categoryProducts,
            };
          }
        }
        return []; // Return an empty array if no products match
      })
      .filter(Boolean); // Remove null elements from the array
    console.log(relatedProducts);
    return res.json(
      Utils.createSuccessResponseModel(
        relatedProducts[0].products.length,
        relatedProducts
      )
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

const uploadImage = async (req, res) => {
  try {
    const path = process.env.BASE_URL + req.file.path.match(/public(.*)/)?.[1];
    return res.json(Utils.createSuccessResponseModel(0, path));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};
module.exports = {
  upload: upload,
  getAllCategories: getAllCategories,
  addCategory: addCategory,
  updateNameCategory: updateNameCategory,
  deleteCategory: deleteCategory,
  getAllProducts: getAllProducts,
  getBestSeller: getBestSeller,
  addProduct: addProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getProductByCategory: getProductByCategory,
  getProductDetail: getDetailProduct,
  searchProduct: searchProduct,
  getRelatedProducts: getRelatedProducts,
  uploadImage: uploadImage,
};
