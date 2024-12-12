import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

const ColorPickerDialog = ({ currentColor, onColorChange, open, onClose }) => {
  const [color, setColor] = useState(currentColor);

  const handleColorChange = (event) => {
    const { name, value } = event.target;
    const newColor = { ...color, [name]: Math.max(0, Math.min(255, parseInt(value) || 0)) };
    setColor(newColor);
  };

  const applyColor = () => {
    onColorChange(`rgb(${color.red}, ${color.green}, ${color.blue})`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Banner Color</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "50px",
              backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <Typography variant="body1">Selected Color: rgb({color.red}, {color.green}, {color.blue})</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
            }}
          >
            <TextField
              label="Red"
              name="red"
              type="number"
              value={color.red}
              onChange={handleColorChange}
              InputProps={{ inputProps: { min: 0, max: 255 } }}
              fullWidth
            />
            <TextField
              label="Green"
              name="green"
              type="number"
              value={color.green}
              onChange={handleColorChange}
              InputProps={{ inputProps: { min: 0, max: 255 } }}
              fullWidth
            />
            <TextField
              label="Blue"
              name="blue"
              type="number"
              value={color.blue}
              onChange={handleColorChange}
              InputProps={{ inputProps: { min: 0, max: 255 } }}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={applyColor} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorPickerDialog;
