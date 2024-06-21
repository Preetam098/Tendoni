import { Grid, FormControl, Select, InputLabel, MenuItem, } from "@mui/material";


const FilterView = () => {

    return (
        <Grid
            item
            xs={12}
            sx={{ display: "flex", flexDirection: "row", gap: 3 }}
        >
            <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                    labelId="status"
                    id="status"
                    value={"status"}
                    label="Status"
                    fullWidth
                    size="small"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="Category">Category</InputLabel>
                <Select
                    labelId="Category"
                    id="Category"
                    value={"Category"}
                    label="Category"
                    fullWidth
                    size="small"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="Stock">Stock</InputLabel>
                <Select
                    labelId="Stock"
                    id="Stock"
                    value={"Stock"}
                    label="Stock"
                    fullWidth
                    size="small"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    );
}

export default FilterView;