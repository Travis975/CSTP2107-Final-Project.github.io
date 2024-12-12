import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Avatar, Button, Box } from "@mui/material";

const ProfilePictureChanger = ({ currentImage, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(currentImage);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        onChange(e.target.result); // Pass the new image to the parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setOpen(false); // Close the dialog
  };

  return (
    <>
      <Avatar
        src={selectedImage || ""}
        sx={{
          width: 80,
          height: 80,
          backgroundColor: "#ffffff",
          fontSize: "2rem",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        {!selectedImage && "P"} {/* Default letter if no image */}
      </Avatar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar
              src={selectedImage || ""}
              sx={{ width: 100, height: 100 }}
            />
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePictureChanger;
