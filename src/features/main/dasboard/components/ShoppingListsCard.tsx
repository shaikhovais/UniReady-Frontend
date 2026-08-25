import { useState } from "react";

import {
  AddRounded,
  EditRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
  ShoppingBagRounded,
} from "@mui/icons-material";

import { Box, Button, Typography } from "@mui/material";

import type { ShoppingListsSummary } from "../../../../types/features/dashboard";
import { getAppIcon } from "../../../../utils/appIcons";

interface ShoppingListsCardProps {
  shoppingLists: ShoppingListsSummary;
  onAddItem: () => void;
  onEditLists: () => void;
}

const PINK_THEME = {
  color: "#DB2777",
  background: "rgba(219, 39, 119, 0.08)",
  border: "rgba(219, 39, 119, 0.14)",
  solid: "#DB2777",
  solidHover: "#BE185D",
};

const ShoppingListsCard = ({
  shoppingLists,
  onAddItem,
  onEditLists,
}: ShoppingListsCardProps) => {
  const [showAll, setShowAll] = useState(false);

  const hasMoreLists = shoppingLists.lists.length > 3;

  const visibleLists = showAll
    ? shoppingLists.lists
    : shoppingLists.lists.slice(0, 3);

  const remainingLists = Math.max(shoppingLists.lists.length - 3, 0);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        backgroundColor: "background.paper",
        boxShadow: "0 4px 18px rgba(20, 45, 35, 0.05)",
        overflow: "hidden",
        position: "relative",
        isolation: "isolate",
        "&::before": {
          content: '""',
          position: "absolute",
          width: {
            xs: 170,
            sm: 220,
            md: 240,
          },
          height: {
            xs: 170,
            sm: 220,
            md: 240,
          },
          borderRadius: "50%",
          top: {
            xs: -115,
            sm: -125,
            md: -135,
          },
          right: {
            xs: -100,
            sm: -105,
            md: -110,
          },
          background:
            "linear-gradient(135deg, rgba(219, 39, 119, 0.14), rgba(219, 39, 119, 0.02))",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: {
            xs: 1.5,
            sm: 2,
            md: 2.25,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "column",
              lg: "row",
            },
            alignItems: {
              xs: "stretch",
              sm: "stretch",
              md: "stretch",
              lg: "center",
            },
            justifyContent: "space-between",
            gap: {
              xs: 1.25,
              sm: 1.5,
              md: 1.5,
              lg: 2,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 0.85,
                sm: 1,
              },
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 40,
                  sm: 42,
                  md: 42,
                },
                height: {
                  xs: 40,
                  sm: 42,
                  md: 42,
                },
                flexShrink: 0,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: PINK_THEME.background,
                color: PINK_THEME.color,
              }}
            >
              <ShoppingBagRounded
                sx={{
                  fontSize: {
                    xs: 21,
                    sm: 22,
                    md: 22,
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.88rem",
                    sm: "0.92rem",
                    md: "0.94rem",
                    lg: "0.82rem",
                  },
                  fontWeight: 800,
                  color: "text.primary",
                  lineHeight: 1.25,
                }}
              >
                Shopping Lists
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: {
                    xs: "0.67rem",
                    sm: "0.7rem",
                    md: "0.7rem",
                    lg: "0.66rem",
                  },
                  color: "text.secondary",
                  lineHeight: 1.35,
                }}
              >
                Keep track of the things you need
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              flexShrink: 0,
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "auto",
              },
            }}
          >
            <Button
              onClick={onEditLists}
              startIcon={
                <EditRounded
                  sx={{
                    fontSize: {
                      xs: 16,
                      sm: 16,
                      md: 17,
                    },
                  }}
                />
              }
              sx={{
                minWidth: 0,
                flex: {
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: "initial",
                },
                px: {
                  xs: 1,
                  sm: 1.25,
                  md: 1.35,
                  lg: 1.5,
                },
                py: {
                  xs: 0.75,
                  sm: 0.8,
                  md: 0.85,
                  lg: 0.9,
                },
                minHeight: {
                  xs: 38,
                  sm: 39,
                  md: 40,
                  lg: 40,
                },
                borderRadius: 1,
                textTransform: "none",
                fontSize: {
                  xs: "0.65rem",
                  sm: "0.67rem",
                  md: "0.68rem",
                  lg: "0.68rem",
                },
                fontWeight: 800,
                color: PINK_THEME.color,
                backgroundColor: PINK_THEME.background,
                border: "1px solid",
                borderColor: PINK_THEME.border,
                whiteSpace: "nowrap",
                "& .MuiButton-startIcon": {
                  marginRight: 0.45,
                  marginLeft: 0,
                },
                transition:
                  "background-color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(219, 39, 119, 0.15)",
                },
              }}
            >
              Edit lists
            </Button>

            <Button
              onClick={onAddItem}
              startIcon={
                <AddRounded
                  sx={{
                    fontSize: {
                      xs: 18,
                      sm: 18,
                      md: 19,
                    },
                  }}
                />
              }
              sx={{
                minWidth: 0,
                flex: {
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: "initial",
                },
                px: {
                  xs: 1,
                  sm: 1.35,
                  md: 1.45,
                  lg: 1.6,
                },
                py: {
                  xs: 0.75,
                  sm: 0.8,
                  md: 0.85,
                  lg: 0.9,
                },
                minHeight: {
                  xs: 38,
                  sm: 39,
                  md: 40,
                  lg: 40,
                },
                borderRadius: 1,
                textTransform: "none",
                fontSize: {
                  xs: "0.65rem",
                  sm: "0.67rem",
                  md: "0.68rem",
                  lg: "0.68rem",
                },
                fontWeight: 800,
                color: "#FFFFFF",
                backgroundColor: PINK_THEME.solid,
                border: "1px solid",
                borderColor: PINK_THEME.solid,
                whiteSpace: "nowrap",
                boxShadow: "none",
                "& .MuiButton-startIcon": {
                  marginRight: 0.45,
                  marginLeft: 0,
                },
                transition:
                  "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  backgroundColor: PINK_THEME.solidHover,
                  boxShadow: "0 5px 14px rgba(221, 63, 134, 0.18)",
                },
              }}
            >
              Add item
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            mt: {
              xs: 1.5,
              sm: 1.75,
              md: 1.75,
              lg: 2,
            },
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: {
              xs: 0.75,
              sm: 0.85,
              md: 0.9,
              lg: 1,
            },
          }}
        >
          <SummaryItem
            label="Lists"
            value={shoppingLists.totalLists}
            backgroundColor="rgba(219, 39, 119, 0.055)"
            color={PINK_THEME.color}
          />

          <SummaryItem
            label="Total items"
            value={shoppingLists.totalItems}
            backgroundColor="rgba(3, 118, 237, 0.055)"
            color="#0376ED"
          />

          <SummaryItem
            label="Bought"
            value={shoppingLists.checkedItems}
            backgroundColor="rgba(22, 128, 75, 0.06)"
            color="success.dark"
          />

          <SummaryItem
            label="To buy"
            value={shoppingLists.pendingItems}
            backgroundColor="rgba(242, 161, 22, 0.08)"
            color="#D88A00"
          />
        </Box>

        {shoppingLists.lists.length === 0 ? (
          <Box
            sx={{
              mt: 1.75,
              minHeight: {
                xs: 130,
                sm: 135,
                md: 140,
                lg: 150,
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "1px dashed",
              borderColor: "rgba(20, 45, 35, 0.12)",
              borderRadius: 1.5,
              backgroundColor: "rgba(250, 251, 250, 0.7)",
              px: 1.5,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: PINK_THEME.background,
                color: PINK_THEME.color,
              }}
            >
              <ShoppingBagRounded
                sx={{
                  fontSize: 21,
                }}
              />
            </Box>

            <Typography
              sx={{
                mt: 1.1,
                fontSize: {
                  xs: "0.72rem",
                  sm: "0.74rem",
                  md: "0.76rem",
                },
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              No shopping lists yet
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                maxWidth: 280,
                fontSize: {
                  xs: "0.61rem",
                  sm: "0.63rem",
                  md: "0.64rem",
                },
                lineHeight: 1.5,
                color: "text.secondary",
              }}
            >
              Your shopping lists will appear here once you have something to
              organise.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              mt: {
                xs: 1.5,
                sm: 1.75,
                md: 1.75,
                lg: 2,
              },
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: 0.75,
                sm: 0.8,
                md: 0.85,
                lg: 1,
              },
            }}
          >
            {visibleLists.map((list) => {
              const listColor = list.color || PINK_THEME.color;
              const iconBackground = getLightColor(listColor);

              const completionPercentage = Math.min(
                Math.max(list.completionPercentage, 0),
                100,
              );

              const listIcon = getAppIcon(list.iconKey);

              return (
                <Box
                  key={list.id}
                  sx={{
                    p: {
                      xs: 1,
                      sm: 1.1,
                      md: 1.15,
                      lg: 1.25,
                    },
                    minWidth: 0,
                    border: "1px solid",
                    borderColor: "rgba(20, 45, 35, 0.07)",
                    borderRadius: 1.5,
                    backgroundColor: "rgba(250, 251, 250, 0.72)",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      borderColor: "rgba(20, 45, 35, 0.11)",
                      boxShadow: "0 5px 14px rgba(20, 45, 35, 0.05)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: 0.75,
                        sm: 0.8,
                        md: 0.85,
                        lg: 1,
                      },
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: 34,
                          sm: 36,
                          md: 37,
                          lg: 40,
                        },
                        height: {
                          xs: 34,
                          sm: 36,
                          md: 37,
                          lg: 40,
                        },
                        flexShrink: 0,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: iconBackground,
                        color: listColor,
                        "& svg": {
                          color: `${listColor} !important`,
                          fontSize: {
                            xs: 17,
                            sm: 18,
                            md: 19,
                            lg: 20,
                          },
                        },
                      }}
                    >
                      {listIcon || (
                        <ShoppingBagRounded
                          sx={{
                            fontSize: {
                              xs: 17,
                              sm: 18,
                              md: 19,
                              lg: 20,
                            },
                          }}
                        />
                      )}
                    </Box>

                    <Box
                      sx={{
                        minWidth: 0,
                        flex: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.68rem",
                            sm: "0.7rem",
                            md: "0.71rem",
                            lg: "0.74rem",
                          },
                          fontWeight: 800,
                          color: "text.primary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          lineHeight: 1.25,
                        }}
                      >
                        {list.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.2,
                          fontSize: {
                            xs: "0.56rem",
                            sm: "0.57rem",
                            md: "0.58rem",
                            lg: "0.61rem",
                          },
                          color: "text.secondary",
                          lineHeight: 1.3,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {list.checkedItems} of {list.totalItems} items
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        flexShrink: 0,
                        minWidth: {
                          xs: 48,
                          sm: 50,
                          md: 52,
                          lg: "auto",
                        },
                        textAlign: "right",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.68rem",
                            sm: "0.69rem",
                            md: "0.7rem",
                            lg: "0.73rem",
                          },
                          fontWeight: 800,
                          color:
                            completionPercentage === 100
                              ? "success.dark"
                              : listColor,
                          lineHeight: 1.2,
                        }}
                      >
                        {completionPercentage}%
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.15,
                          fontSize: {
                            xs: "0.51rem",
                            sm: "0.52rem",
                            md: "0.54rem",
                            lg: "0.57rem",
                          },
                          color: "text.secondary",
                          whiteSpace: "nowrap",
                          lineHeight: 1.2,
                        }}
                      >
                        {list.pendingItems} pending
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: {
                        xs: 0.75,
                        sm: 0.8,
                        md: 0.85,
                        lg: 1,
                      },
                      width: "100%",
                      height: {
                        xs: 4,
                        sm: 4,
                        md: 4,
                        lg: 5,
                      },
                      borderRadius: 999,
                      backgroundColor: "rgba(20, 45, 35, 0.07)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${completionPercentage}%`,
                        height: "100%",
                        borderRadius: 999,
                        backgroundColor:
                          completionPercentage === 100
                            ? "success.main"
                            : listColor,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        {hasMoreLists && (
          <Box
            sx={{
              mt: {
                xs: 1.25,
                sm: 1.4,
                md: 1.5,
                lg: 1.75,
              },
              pt: {
                xs: 1,
                sm: 1.1,
                md: 1.15,
                lg: 1.35,
              },
              borderTop: "1px solid",
              borderColor: "rgba(20, 45, 35, 0.07)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => setShowAll((previous) => !previous)}
              endIcon={
                showAll ? (
                  <ExpandLessRounded
                    sx={{
                      fontSize: {
                        xs: 16,
                        sm: 17,
                        md: 17,
                      },
                    }}
                  />
                ) : (
                  <ExpandMoreRounded
                    sx={{
                      fontSize: {
                        xs: 16,
                        sm: 17,
                        md: 17,
                      },
                    }}
                  />
                )
              }
              sx={{
                minWidth: 0,
                px: {
                  xs: 1.5,
                  sm: 1.7,
                  md: 1.8,
                  lg: 2,
                },
                py: {
                  xs: 0.5,
                  sm: 0.55,
                  md: 0.6,
                  lg: 0.65,
                },
                borderRadius: 1,
                textTransform: "none",
                fontSize: {
                  xs: "0.61rem",
                  sm: "0.63rem",
                  md: "0.65rem",
                  lg: "0.68rem",
                },
                fontWeight: 800,
                color: PINK_THEME.color,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: PINK_THEME.background,
                },
              }}
            >
              {showAll
                ? "Show less"
                : `Show ${remainingLists} more ${
                    remainingLists === 1 ? "list" : "lists"
                  }`}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

interface SummaryItemProps {
  label: string;
  value: number;
  backgroundColor: string;
  color: string;
}

const SummaryItem = ({
  label,
  value,
  backgroundColor,
  color,
}: SummaryItemProps) => {
  return (
    <Box
      sx={{
        p: {
          xs: 0.9,
          sm: 1,
          md: 1.05,
          lg: 1.25,
        },
        minWidth: 0,
        borderRadius: 1,
        backgroundColor,
        border: "1px solid",
        borderColor: "rgba(20, 45, 35, 0.045)",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "0.54rem",
            sm: "0.56rem",
            md: "0.57rem",
            lg: "0.59rem",
          },
          color: "text.secondary",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          mt: 0.25,
          fontSize: {
            xs: "0.9rem",
            sm: "0.93rem",
            md: "0.95rem",
            lg: "1rem",
          },
          lineHeight: 1.1,
          fontWeight: 850,
          color,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const getLightColor = (color: string) => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");

    const normalized =
      hex.length === 3
        ? hex
            .split("")
            .map((character) => character + character)
            .join("")
        : hex;

    if (normalized.length === 6) {
      const red = parseInt(normalized.substring(0, 2), 16);
      const green = parseInt(normalized.substring(2, 4), 16);
      const blue = parseInt(normalized.substring(4, 6), 16);

      return `rgba(${red}, ${green}, ${blue}, 0.10)`;
    }
  }

  return "rgba(219, 39, 119, 0.08)";
};

export default ShoppingListsCard;