import { Button, Stack } from "@mui/material";

const links = [
  "Features",
  "How It Works",
  "Resources",
  "About Us",
  "Help",
];

const DesktopMenu = () => {
  return (
    <Stack direction="row" spacing={1}>
      {links.map((link) => (
        <Button
          key={link}
          color="inherit"
          sx={{
            color: "#1F2937",
            fontWeight: 500,
          }}
        >
          {link}
        </Button>
      ))}
    </Stack>
  );
};

export default DesktopMenu;