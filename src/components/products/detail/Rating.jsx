import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating() {
  const [value, setValue] = React.useState(2);

  return (
    <Box sx={{ "& > legend": { mt: 0 } }}>
      <Typography component="legend"></Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          fontSize: "35px",
          "& .MuiRating-iconFilled": {
            color: "#31714f", // filled star color
          },
          "& .MuiRating-iconEmpty": {
            color: "#31714f", // empty star color
          },
          "& .MuiRating-iconHover": {
            color: "#31714f", // hover color
          },
        }}
      />
    </Box>
  );
}
