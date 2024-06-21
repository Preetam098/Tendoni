import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getVariant } from "@/utils/apis/current_variant";

interface VariantOptionsProps {
  variant: any;
  index: number;
  productVariants: any[];
  handleChange: (value: string, index: number, field: string) => void;
  variants: any[];
  handleRemoveOption: (variantIndex: number) => void;
}
const VariantOptions: React.FC<VariantOptionsProps> = ({
  variant,
  index,
  productVariants,
  handleChange,
  variants,
  handleRemoveOption,
}) => {
  const [currentVariantValue, setCurrentVariantsValue] = useState<any[]>([]);

  const handleCurrentId = (Id: string) => {
    getVariant(Id).then?.((categories: any) => {
      if (categories.length > 0) {
        setCurrentVariantsValue(categories);
      }
    });
  };

  useEffect(() => {
    if (productVariants[index].variantId) {
      getVariant(productVariants[index].variantId).then?.((categories: any) => {
        if (categories.length > 0) {
          setCurrentVariantsValue(categories);
        }
      });
    }
  }, [1]);

  useEffect(() => {
    const { Actualamount, saleAmount } = productVariants[index];
    if (Actualamount && saleAmount) {
      const discount = ((Actualamount - saleAmount) / Actualamount) * 100;
      handleChange(discount.toFixed(2), index, "Discount");
    }
  }, [productVariants[index].Actualamount, productVariants[index].saleAmount]);
  return (
    <>
      <Grid container spacing={4} key={index}>
        <Grid item xs={6} lg={2}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: "0.75rem",
            }}
          >
            Variant
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id={`variant-label-${index}`}>Variant</InputLabel>
            <Select
              labelId={`variant-label-${index}`}
              label="Variant"
              size="small"
              value={productVariants[index].variantId}
              defaultValue="Select Variant"
              onChange={(e) => {
                handleChange(e.target.value as string, index, "variantId");
                handleCurrentId(e.target.value);
              }}
            >
              <MenuItem value="0">Select Variant</MenuItem>
              {variants &&
                variants.map((variant) => (
                  <MenuItem value={variant.variantId}>
                    {variant.variantName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: "0.75rem",
            }}
          >
            Value
          </Typography>
          <FormControl fullWidth>
            <InputLabel
              id={`value-label-${index}`}
              style={{ textAlign: "center" }}
            >
              Value
            </InputLabel>
            <Select
              labelId={`value-label-${index}`}
              label="Value"
              value={productVariants[index].valueId}
              defaultValue="Select Value"
              onChange={(e) => {
                handleChange(e.target.value as string, index, "valueId");
              }}
              size="small"
            >
              <MenuItem value="0"> Value</MenuItem>
              {currentVariantValue &&
                currentVariantValue?.map((variant) => (
                  <MenuItem value={variant?.valueId}>
                    {variant?.valueName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: "0.75rem",
            }}
          >
            Actual Amount
          </Typography>
          <TextField
            label="Actual Amount"
            fullWidth
            value={productVariants[index].Actualamount}
            onChange={(e) => {
              handleChange(e.target.value as string, index, "Actualamount");
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: "0.75rem",
            }}
          >
            Sale Amount
          </Typography>
          <TextField
            label="Sale Amount"
            fullWidth
            value={productVariants[index].saleAmount}
            onChange={(e) => {
              handleChange(e.target.value as string, index, "saleAmount");
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: "0.75rem",
            }}
          >
            Discount (%)
          </Typography>
          <TextField
            label="Discount"
            fullWidth
            value={productVariants[index].Discount}
            onChange={(e) => {
              handleChange(e.target.value as string, index, "Discount");
            }}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: "0.75rem",
            }}
          >
            Minimum Stock
          </Typography>
          <TextField
            label="Minimum Stock"
            size="small"
            fullWidth
            value={productVariants[index].MinimumStock}
            onChange={(e) => {
              handleChange(e.target.value as string, index, "MinimumStock");
            }}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: "0.75rem",
            }}
          >
            Actual Amount
          </Typography>
          <TextField
            sx={{ marginBottom: "20px" }}
            label="Actual Stock"
            size="small"
            fullWidth
            value={productVariants[index].ActualStock}
            onChange={(e) => {
              handleChange(e.target.value as string, index, "ActualStock");
            }}
          />
        </Grid>
        <Grid item xs={6} lg={1}>
          <IconButton
            sx={{ marginTop: "40px" }}
            color="error"
            onClick={() => handleRemoveOption(index)}
            disabled={productVariants.length === 1}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default VariantOptions;
