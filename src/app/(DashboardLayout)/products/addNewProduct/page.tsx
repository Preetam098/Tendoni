"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CloseIcon from "@mui/icons-material/Close";
import RichTextEditor from "../../components/editor/RichTextEditor";
import {
  getAllActiveCategories,
  getAllActiveVariants,
  getProductById,
  postProduct,
  putProductUpdate,
} from "@/utils/apis/Product";
import { getAllProductVariant } from "@/utils/apis/Product variant";
import VariantOptions from "./variantsOption";
import Snackers from "@/utils/models/Snackers";
import { useRouter } from "next/navigation";

interface ProductVariant {
  variantId: string;
  valueId: string;
  amount: string;
  saleAmount: string;
  stock: string;
}
interface Variant {
  variantId: string;
  variantName: string;
}
interface Category {
  categoryId: string;
  categoryName: string;
  categoryImage: string;
}
interface AddProductPageProps {
  productIds?: any;
  onClose?: () => any;
  isVariantIdVisible?: boolean;
}

const AddProductPage: React.FC<AddProductPageProps> = ({
  productIds,
  onClose,
  isVariantIdVisible,
}) => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<String>("0");
  const [selectedSubCategory, setSelectedSubCategory] = useState<String>("0");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [productId, setProductId] = useState<any>();
  const [message, setMessage] = useState("");
  const [productInfo, setProductInfo] = useState({
    title: "",
    sku: "",
    productImage: "",
  });

  const [preview, setPreview] = useState({
    productFrontImage: "/images/profile/upload-img.jpg",
    productBackImage: "/images/profile/upload-img.jpg",
  });

  useEffect(() => {
    getAllActiveCategories().then?.((categories: any) => {
      if (categories.length > 0) {
        setCategories(categories);
      }
    });

    getAllProductVariant().then?.((variants: any) => {
      if (variants.length > 0) {
        setVariants(variants);
      }
    });
  }, []);

  const selectCategory = async (category: string) => {
    setSelectedCategory(category);
    var data = await getCategories(category);
    setSubCategories(data);
  };

  const selectSubCategory = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  const getCategories = async (category: string) => {
    var newcan = await getAllActiveCategories();

    const filteredSubCategories = await newcan?.filter(
      (subcategory: any) => subcategory?.categoryId === category
    );
    if (category === "0") {
      return [];
    }

    return filteredSubCategories.length > 0 ? filteredSubCategories[0] : null;
  };

  const handleAddOption = () => {
    setProductVariants([
      ...productVariants,
      {
        variantId: "",
        valueId: "",
        amount: "",
        saleAmount: "",
        stock: "",
      },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    if (productVariants.length > 1) {
      const updatedProductVariants = [...productVariants];
      updatedProductVariants.splice(index, 1);
      setProductVariants(updatedProductVariants);
    }
  };

  const handleChange = (value: any, index: any, field: any) => {
    const updatedProductVariants: any = [...productVariants];
    updatedProductVariants[index][field] = value;
    setProductVariants(updatedProductVariants);
  };

  const [richTextValue, setRichTextValue] = useState<string>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    if (type === "file") {
      const files = e.target.files;
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreview((prev) => ({ ...prev, [name]: filePreviews[0] }));
      setProductInfo({ ...productInfo, [name]: files[0] });
    } else {
      const { value } = e.target;
      setProductInfo({ ...productInfo, [name]: value });
    }
  };

  const productVariantsdata = JSON.stringify(productVariants);
  const router = useRouter();
  var allProductData = {
    productName: productInfo?.title,
    subCategoryId: selectedSubCategory,
    productSUKCode: productInfo?.sku,
    productImages: productInfo?.productImage, //files
    description: richTextValue,
    productVariants: productVariantsdata,
  };

  const addProduct = () => {
    // Validate fields
    if (!productInfo?.title) {
      setSnackbarOpen(true);
      setMessage("Product Name are required.");
      return; // Prevent API call
    }
    if (!selectedSubCategory) {
      setSnackbarOpen(true);
      setMessage("Sub-Category are required.");
      return; // Prevent API call
    }
    if (!productInfo?.sku) {
      setSnackbarOpen(true);
      setMessage("sku are required.");
      return; // Prevent API call
    }
    if (!productInfo.productImage) {
      setSnackbarOpen(true);
      setMessage("At least one images is required");
      return; // Prevent API call
    }
    if (!richTextValue) {
      setSnackbarOpen(true);
      setMessage("Description are required");
      return; // Prevent API call
    }
    if (!productVariants.length) {
      setSnackbarOpen(true);
      setMessage("productVariants are required");
      return; // Prevent API call
    }
    if (!isVariantIdVisible) {
      postProduct(allProductData)
        .then((response) => {
          setSnackbarOpen(true);
          setMessage(response.message);
          setProductInfo({
            title: "",
            sku: "",
            productImage: "",
          });
          setSelectedSubCategory("0");
          setSelectedCategory("0");
          setRichTextValue("");
          setProductVariants([]);
          router.push("/products/productDetails");
        })
        .catch((error) => {
          setSnackbarOpen(true);
          setMessage(error);
        });
    } else {
      putProductUpdate(allProductData, productId)
        .then((response) => {
          setSnackbarOpen(true);
          onClose();
          setMessage(response.message);
          setProductInfo({
            title: "",
            sku: "",
            productImage: "",
          });
          setSelectedSubCategory("0");
          setSelectedCategory("0");
          setRichTextValue("");
          setProductVariants([]);
        })
        .catch((error) => {
          setSnackbarOpen(true);
          setMessage(error);
        });
    }
  };
  const closeSnacker = () => {
    setSnackbarOpen(false);
  };

  let apiCalled = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isVariantIdVisible && !apiCalled) {
          const products = await getProductById(productIds);
          var product = products.data;
          setProductId(product.productId);
          apiCalled = true;

          setProductInfo({
            title: product.productName,
            sku: product.productSUKCode,
            productImage: product.productImages,
          });
          setSelectedCategory(product.productCategoryId);

          setSelectedSubCategory(product.productSubCategoryId);
          setRichTextValue(product.description);
          setProductVariants(product.variants);
          selectCategory(product.productCategoryId);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        apiCalled = false;
      }
    };

    fetchData();
  }, [isVariantIdVisible]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        />

        <div>
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h3" sx={{ fontSize: "1.250rem" }}>
                {isVariantIdVisible ? "Update a Product" : "Add a New Product"}
              </Typography>
            </div>
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                color: "#697a8d !important",
                marginTop: "0.3rem",
              }}
            >
              Aug 17, 2023, 5:48 (ET)
            </Typography>
          </>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Button variant="contained" onClick={addProduct}>
            {isVariantIdVisible ? "Update" : "Save"}
          </Button>
        </div>
      </div>
      <PageContainer title="Add New Product" description="Add New Product">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Grid item xs={12} lg={12}>
                    {isVariantIdVisible ? (
                      <CloseIcon
                        onClick={onClose}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "61px",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <DashboardCard title="Product Information">
                      <Grid container xs={12} spacing={4}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            NAME
                          </Typography>
                          <TextField
                            label="Product Title"
                            fullWidth
                            size="small"
                            name="title"
                            value={productInfo.title}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ pb: "50px" }}>
                            <RichTextEditor
                              value={richTextValue as string}
                              onChange={setRichTextValue}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </DashboardCard>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Grid item xs={12} lg={12}>
                    {isVariantIdVisible ? (
                      <CloseIcon
                        onClick={onClose}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "61px",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <DashboardCard title="General Information">
                      <Grid container xs={12} spacing={4}>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            SKU
                          </Typography>
                          <TextField
                            name="sku"
                            value={productInfo.sku}
                            onChange={handleInputChange}
                            label="SKU"
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Category
                          </Typography>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Category"> Category</InputLabel>
                            <Select
                              labelId="Category"
                              id="Category"
                              value={selectedCategory}
                              label="Category"
                              defaultValue="Select Category"
                              placeholder="Select Category"
                              fullWidth
                              size="small"
                              onChange={(event: any) => {
                                selectCategory(event.target.value);
                              }}
                            >
                              <MenuItem value="0">Select category</MenuItem>
                              {categories &&
                                categories.map((category, index) => (
                                  <MenuItem
                                    key={index}
                                    value={category?.categoryId}
                                  >
                                    {category?.categoryName}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Sub Category
                          </Typography>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Sub"> Sub Category</InputLabel>
                            <Select
                              labelId="Sub Category"
                              id="SubCategory"
                              value={selectedSubCategory}
                              label="Sub Category"
                              defaultValue="Select Sub Category"
                              placeholder="Select Sub Category"
                              fullWidth
                              size="small"
                              onChange={(event: any) => {
                                selectSubCategory(event.target.value);
                              }}
                            >
                              <MenuItem value="0">Select Sub category</MenuItem>
                              {subCategories &&
                                subCategories?.subcategories?.map(
                                  (subCategory: any, index: any) => (
                                    <MenuItem
                                      key={index}
                                      value={subCategory?.subCategoryId}
                                    >
                                      {subCategory?.subCategoryName}
                                    </MenuItem>
                                  )
                                )}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Brand
                          </Typography>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Brand"> Brand</InputLabel>
                            <Select
                              labelId="Brand"
                              id="Brand"
                              label="Brand"
                              defaultValue="Select Brand"
                              placeholder="Select Brand"
                              fullWidth
                              size="small"
                            >
                              <MenuItem value="Select Brand">
                                Select Brand
                              </MenuItem>
                              <MenuItem value="1">Tendoni</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </DashboardCard>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Grid item xs={12} lg={12}>
                    {isVariantIdVisible ? (
                      <CloseIcon
                        onClick={onClose}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "61px",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <DashboardCard title="Pricing & Others">
                      <Grid container xs={12} spacing={4}>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Unit Price
                          </Typography>
                          <TextField
                            name="Unit Price"
                            value="Unit Price"
                            label="Unit Price"
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Minimum Order Qty
                          </Typography>
                          <TextField
                            name="Minimum Order Qty"
                            value="Minimum Order Qty"
                            label="Minimum Order Qty"
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Current Stock Qty
                          </Typography>
                          <TextField
                            name="Current Stock Qty"
                            value="Current Stock Qty"
                            label="Current Stock Qty"
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Discount Type
                          </Typography>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Discount Type">
                              {" "}
                              Discount Type
                            </InputLabel>
                            <Select
                              labelId="Discount Type"
                              id="Discount Type"
                              label="Discount Type"
                              defaultValue="Select Discount Type"
                              placeholder="Select Discount Type"
                              fullWidth
                              size="small"
                            >
                              <MenuItem value="Select Discount Type">
                                Select Discount Type
                              </MenuItem>
                              <MenuItem value="1">Flat</MenuItem>
                              <MenuItem value="2">Percentage</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Discount Amount
                          </Typography>
                          <TextField
                            name="Discount Amount"
                            value="Discount Amount"
                            label="Discount Amount"
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Tax Amount(%)
                          </Typography>
                          <TextField
                            name="Tax Amount"
                            value="Tax Amount"
                            label="Tax Amount"
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Tax Calculation
                          </Typography>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="TaxCalculation">
                              Tax Calculation
                            </InputLabel>
                            <Select
                              labelId="Tax Calculation"
                              id="Tax Calculation"
                              label="Tax Calculation"
                              defaultValue="Select Tax Calculation"
                              placeholder="Select Tax Calculation"
                              fullWidth
                              size="small"
                            >
                              <MenuItem value="Select Tax Calculation">
                                Select Tax Calculation
                              </MenuItem>
                              <MenuItem value="1">
                                Include with products
                              </MenuItem>
                              <MenuItem value="2">
                                Exclude with products
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Shipping Cost
                          </Typography>
                          <TextField
                            name="Shipping Cost"
                            value="Shipping Cost"
                            label="Shipping Cost"
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                          <>
                            {productVariants?.map((variant, index) => (
                              <VariantOptions
                                variant={variant}
                                index={index}
                                productVariants={productVariants}
                                handleChange={handleChange}
                                variants={variants}
                                handleRemoveOption={handleRemoveOption}
                              />
                            ))}
                            <Button
                              variant="contained"
                              onClick={handleAddOption}
                            >
                              Add Variant
                            </Button>
                          </>
                        </Grid>
                      </Grid>
                    </DashboardCard>
                  </Grid>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <DashboardCard title="Product Front Image">
                    <div
                      style={{
                        border: "1px solid lightgray",
                        padding: "10px",
                        borderRadius: "5px",
                        width: "80%",
                      }}
                    >
                      <input
                        type="file"
                        name="productFrontImage"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <img
                        width={200}
                        height={200}
                        className="w-20 h-20 rounded-lg border-2 border-black"
                        src={preview?.productFrontImage}
                        style={{
                          border: "1px solid #DBAA00",
                          borderRadius: "5px",
                        }}
                      ></img>
                    </div>
                  </DashboardCard>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <DashboardCard title="Product Back Image">
                    <div
                      style={{
                        border: "1px solid lightgray",
                        padding: "10px",
                        borderRadius: "5px",
                        width: "80%",
                      }}
                    >
                      <input
                        type="file"
                        name="productBackImage"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <img
                        width={200}
                        height={200}
                        className="w-20 h-20 rounded-lg border-2 border-black"
                        src={preview?.productBackImage}
                        style={{
                          border: "1px solid #DBAA00",
                          borderRadius: "5px",
                        }}
                      ></img>
                    </div>
                  </DashboardCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={8}>
              {/* <ProductPerformance /> */}
            </Grid>
            <Grid item xs={12}>
              {/* <Blog /> */}
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default AddProductPage;
