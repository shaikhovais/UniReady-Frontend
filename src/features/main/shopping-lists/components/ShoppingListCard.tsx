import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import groceriesFoodImage from "../../../../assets/images/features/shopping-lists/list-image/groceries-food.png";
import householdCleaningImage from "../../../../assets/images/features/shopping-lists/list-image/household-cleaning.png";
import clothingAccessoriesImage from "../../../../assets/images/features/shopping-lists/list-image/clothing-accessories.png";
import personalCareImage from "../../../../assets/images/features/shopping-lists/list-image/personal-care.png";
import generalOthersImage from "../../../../assets/images/features/shopping-lists/list-image/general-other.png";
import customListImage from "../../../../assets/images/features/shopping-lists/list-image/custom-list.png";

import type { ShoppingList } from "../../../../types/features/shoppingLists";
import { getAppIcon } from "../../../../utils/appIcons";

const shoppingListImages: Record<string, string> = {
  "groceries-food": groceriesFoodImage,
  "household-cleaning": householdCleaningImage,
  "clothing-accessories": clothingAccessoriesImage,
  "personal-care": personalCareImage,
  "general-others": generalOthersImage,
  "custom-list": customListImage,
};

type ShoppingListCardProps = {
  list: ShoppingList;
  isSelected: boolean;
  canDelete: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

const ShoppingListCard = ({
  list,
  isSelected,
  canDelete,
  onSelect,
  onDelete,
}: ShoppingListCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const color = list.color || "#39924E";
  const bgColor = list.bgColor || "#E8F4EA";

  return (
    <>
      <Card
        elevation={0}
        onClick={onSelect}
        sx={{
          width: "100%",
          minWidth: 0,
          flexShrink: 0,
          borderRadius: 1.5,
          cursor: "pointer",
          overflow: "hidden",
          border: "1px solid",
          borderColor: isSelected ? color : "rgba(15, 23, 42, 0.08)",
          background: `linear-gradient(
      180deg,
      ${bgColor}55 0%,
      #FFFFFF 38%,
      #FFFFFF 100%
    )`,
          boxShadow: isSelected
            ? `0 10px 28px ${color}20`
            : "0 4px 16px rgba(15, 23, 42, 0.035)",
          transform: "translateY(0) scale(1)",
          transition:
            "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

          "&:hover": {
            transform: "translateY(-2px) scale(1.01)",
            boxShadow: `0 10px 24px ${color}20`,
            borderColor: color,
          },

          "&:active": {
            transform: "translateY(0) scale(0.995)",
          },
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",

            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: 112,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: `radial-gradient(
                  circle,
                  ${color}18 0%,
                  ${color}08 45%,
                  transparent 72%
                )`,
              }}
            />

            <Box
              sx={{
                position: "relative",
                width: 105,
                height: 105,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {list.imagePath ? (
                <Box
                  component="img"
                  src={shoppingListImages[list.imagePath] ?? list.imagePath}
                  alt={list.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    color,
                    fontSize: 38,

                    "& svg": {
                      fontSize: 38,
                    },
                  }}
                >
                  {getAppIcon(list.iconKey ?? "shoppingbag")}
                </Box>
              )}
            </Box>

            {canDelete && (
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  setAnchorEl(event.currentTarget);
                }}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 28,
                  height: 28,
                  color: "#64748b",
                  backgroundColor: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(15,23,42,0.06)",

                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#0f172a",
                  },
                }}
              >
                <MoreVertRoundedIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Typography
            sx={{
              fontSize: 15,
              lineHeight: 1.25,
              fontWeight: 800,
              color: "#0f172a",
              mb: 0.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {list.name}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              lineHeight: 1.5,
              color: "#64748b",
              height: 36,
              mb: 1.25,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {list.description ||
              "Your personalised list for anything else you need to buy."}
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: 36,
              px: 1.25,
              display: "flex",
              alignItems: "center",
              borderRadius: 0.75,
              background: `linear-gradient(
                90deg,
                ${bgColor} 0%,
                ${bgColor}80 100%
              )`,
              border: `1px solid ${color}12`,
              color,
              mb: 1,
            }}
          >
            <ShoppingBasketRoundedIcon
              sx={{
                fontSize: 17,
                mr: 0.75,
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 800,
                color,
              }}
            >
              {list.totalItems} {list.totalItems === 1 ? "item" : "items"}
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                height: 44,
                display: "flex",
                alignItems: "center",
                px: 1,
                borderRadius: 0.75,
                background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF3 100%)",
                border: "1px solid #DCFCE7",
              }}
            >
              <CheckCircleRoundedIcon
                sx={{
                  fontSize: 17,
                  color: "#16A34A",
                  mr: 0.6,
                  flexShrink: 0,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    lineHeight: 1.1,
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  {list.completedItems}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 10,
                    lineHeight: 1.2,
                    color: "#64748b",
                    mt: 0.25,
                    whiteSpace: "nowrap",
                  }}
                >
                  Have it
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                height: 44,
                display: "flex",
                alignItems: "center",
                px: 1,
                borderRadius: 0.75,
                background: "linear-gradient(135deg, #FFFBEB 0%, #FFF7E8 100%)",
                border: "1px solid #FEF3C7",
              }}
            >
              <ShoppingCartRoundedIcon
                sx={{
                  fontSize: 17,
                  color: "#F59E0B",
                  mr: 0.6,
                  flexShrink: 0,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    lineHeight: 1.1,
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  {list.pendingItems}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 10,
                    lineHeight: 1.2,
                    color: "#64748b",
                    mt: 0.25,
                    whiteSpace: "nowrap",
                  }}
                >
                  Need to Buy
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1,
              mt: 0.5,
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onDelete();
          }}
          sx={{
            color: "#dc2626",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Delete List
        </MenuItem>
      </Menu>
    </>
  );
};

export default ShoppingListCard;
