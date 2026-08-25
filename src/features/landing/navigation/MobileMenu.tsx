import { useState } from "react";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

const links = [
  "Features",
  "How It Works",
  "Resources",
  "About Us",
  "Help",
];

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            width: 260,
            mt: 4,
          }}
        >
          <List>
            {links.map((link) => (
              <ListItemButton key={link}>
                <ListItemText primary={link} />
              </ListItemButton>
            ))}

            <ListItemButton>
              <ListItemText primary="Log In" />
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary="Register" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;