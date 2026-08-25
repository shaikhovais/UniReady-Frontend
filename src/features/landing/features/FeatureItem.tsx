import { Box, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface FeatureItemProps {
  title: string;
  description: string;
  icon: SvgIconComponent;
  color: string;
  bgColor: string;
  showDivider?: boolean;
}

const FeatureItem = ({
  title,
  description,
  icon: Icon,
  color,
  bgColor,
  showDivider = true,
}: FeatureItemProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        px: 1,
        py: 0,
        textAlign: "center",
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-2px)",
        },

        "&:hover .feature-icon": {
          transform: "scale(1.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        },
      }}
    >
      {showDivider && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: "20%",
            height: "60%",
            width: "1px",
            bgcolor: "#ECE8E1",
          }}
        />
      )}

      <Box
        className="feature-icon"
        sx={{
          width: {
            xs: 20,
            md: 30,
          },
          height: {
            xs: 20,
            md: 30,
          },
          borderRadius: "50%",
          bgcolor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 1,
          transition: ".25s",
        }}
      >
        <Icon
          sx={{
            fontSize: {
              xs: 15,
              md: 25,
            },
            color: color,
          }}
        />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          // mb: 1,
          fontSize: "0.7rem",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          lineHeight: 1.8,
          maxWidth: 190,
          mx: "auto",
          fontSize: "0.7rem"
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureItem;