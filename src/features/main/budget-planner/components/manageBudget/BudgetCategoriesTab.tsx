import { useEffect, useMemo, useState } from "react";
import type { DragEvent } from "react";

import {
  AddRounded,
  DragIndicatorRounded,
  AccountBalanceWalletRounded,
  CategoryRounded,
  SavingsRounded,
  PaymentsRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { getAppIcon } from "../../../../../utils/appIcons";

import {
  CHART_COLOURS,
  DEFAULT_CHART_COLOUR,
} from "../../../../../utils/chartColours";

import type {
  BudgetCategory,
  BudgetHeader,
  BudgetOverview,
  SaveBudgetCategoryRequest,
  SaveBudgetRequest,
} from "../../../../../types/features/budget";

import NumberInputField from "../../../../../components/form/NumberInputField";

interface BudgetCategoriesTabProps {
  header: BudgetHeader;
  overview: BudgetOverview;
  onSave: (request: SaveBudgetRequest) => Promise<void>;
  onCancel: () => void;
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    height: 46,
    borderRadius: "13px",
    backgroundColor: "#FFFFFF",

    "& fieldset": {
      borderColor: "#C9D7D0",
    },

    "&:hover fieldset": {
      borderColor: "#AFC3B8",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#16A34A",
      borderWidth: 1.5,
    },
  },

  "& .MuiOutlinedInput-input": {
    py: 0,
    fontSize: 15,
    fontWeight: 600,
  },

  "& input[type=number]": {
    MozAppearance: "textfield",
  },

  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },

  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};

const BudgetCategoriesTab = ({
  header,
  overview,
  onSave,
  onCancel,
}: BudgetCategoriesTabProps) => {
  const [totalBudget, setTotalBudget] = useState(
    header.totalBudget,
  );

  const [categories, setCategories] = useState<
    SaveBudgetCategoryRequest[]
  >([]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(
    null,
  );

  const [error, setError] = useState("");

  const [nameBeforeEdit, setNameBeforeEdit] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    setTotalBudget(header.totalBudget);

    setCategories(
      overview.categories.map(
        (category: BudgetCategory, index: number) => ({
          userBudgetCategoryId:
            category.userBudgetCategoryId,
          name: category.name,
          icon: category.icon,
          allocatedAmount: category.budget,
          displayOrder:
            category.displayOrder ?? index + 1,
        }),
      ),
    );
  }, [header, overview]);

  const totalAllocated = useMemo(
    () =>
      categories.reduce(
        (sum, category) =>
          sum +
          Number(category.allocatedAmount || 0),
        0,
      ),
    [categories],
  );

  const remaining = totalBudget - totalAllocated;

  const allocationPercentage =
    totalBudget > 0
      ? Math.min(
          (totalAllocated / totalBudget) * 100,
          100,
        )
      : 0;

  useEffect(() => {
    if (
      error &&
      totalAllocated <= totalBudget
    ) {
      setError("");
    }
  }, [error, totalAllocated, totalBudget]);

  const handleCategoryNameFocus = (
    index: number,
    currentName: string,
  ) => {
    setNameBeforeEdit((previous) => ({
      ...previous,
      [index]: currentName,
    }));
  };

  const handleCategoryNameChange = (
    index: number,
    value: string,
  ) => {
    setCategories((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              name: value,
            }
          : item,
      ),
    );
  };

  const handleCategoryNameBlur = (
    index: number,
  ) => {
    setCategories((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              name:
                item.name.trim() ||
                nameBeforeEdit[index] ||
                item.name,
            }
          : item,
      ),
    );
  };

  const handleCategoryAmountChange = (
    index: number,
    value: number,
  ) => {
    setCategories((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              allocatedAmount: value,
            }
          : item,
      ),
    );
  };

  const handleAddCategory = () => {
    setCategories((previous) => {
      const lastDisplayOrder =
        previous.length > 0
          ? Math.max(
              ...previous.map(
                (item) =>
                  item.displayOrder ?? 0,
              ),
            )
          : 0;

      return [
        ...previous,
        {
          name: "New Category",
          icon: "customCategory",
          allocatedAmount: 0,
          displayOrder:
            lastDisplayOrder + 1,
        },
      ];
    });
  };

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    setDraggedIndex(index);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    event.preventDefault();

    if (
      draggedIndex === null ||
      draggedIndex === dropIndex
    ) {
      setDraggedIndex(null);
      return;
    }

    setCategories((previous) => {
      const updated = [...previous];

      const [movedItem] =
        updated.splice(
          draggedIndex,
          1,
        );

      updated.splice(
        dropIndex,
        0,
        movedItem,
      );

      return updated.map(
        (item, index) => ({
          ...item,
          displayOrder: index + 1,
        }),
      );
    });

    setDraggedIndex(null);
  };

  const handleSave = async () => {
    if (totalAllocated > totalBudget) {
      setError(
        "The total allocated budget cannot be greater than your monthly budget.",
      );

      return;
    }

    setError("");

    await onSave({
      totalBudget,
      savingsGoal: Math.max(remaining, 0),
      categories: categories.map(
        (category, index) => ({
          ...category,
          displayOrder: index + 1,
        }),
      ),
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        background:
          "linear-gradient(145deg, #F7FBF8 0%, #F8FBFF 52%, #F3FAF6 100%)",
        borderRadius: "20px",
        p: {
          xs: 0.75,
          sm: 1.5,
        },
      }}
    >
      <Stack
        spacing={{
          xs: 1.75,
          sm: 2.5,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: {
              xs: "16px",
              sm: "18px",
            },
            border: "1px solid #E1ECE5",
            background:
              "linear-gradient(135deg, #F1FAF4 0%, #FFFFFF 55%, #F5FAFF 100%)",
            px: {
              xs: 1.75,
              sm: 2.75,
            },
            py: {
              xs: 1.75,
              sm: 2.25,
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: "#E3F3E8",
              opacity: 0.65,
              right: -70,
              top: -80,
            }}
          />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: {
                xs: 1.5,
                sm: 3,
              },
              flexWrap: {
                xs: "wrap",
                sm: "nowrap",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {
                  xs: 1.15,
                  sm: 1.5,
                },
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: 40,
                    sm: 44,
                  },
                  height: {
                    xs: 40,
                    sm: 44,
                  },
                  flexShrink: 0,
                  borderRadius: {
                    xs: "11px",
                    sm: "13px",
                  },
                  display: "grid",
                  placeItems: "center",
                  background:
                    "linear-gradient(135deg, #DCFCE7, #ECFDF5)",
                  color: "#15803D",
                  border: "1px solid #D3F0DC",
                }}
              >
                <AccountBalanceWalletRounded
                  sx={{
                    fontSize: {
                      xs: 21,
                      sm: 23,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 15.5,
                      sm: 17,
                    },
                    fontWeight: 800,
                    color: "#172033",
                    lineHeight: 1.25,
                  }}
                >
                  Total Monthly Budget
                </Typography>

                <Typography
                  sx={{
                    mt: 0.35,
                    fontSize: {
                      xs: 11.5,
                      sm: 12.5,
                    },
                    color: "#64748B",
                    lineHeight: 1.45,
                  }}
                >
                  Set the maximum amount you want to spend each month.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                position: "relative",
                width: {
                  xs: "100%",
                  sm: 230,
                },
                flexShrink: 0,
              }}
            >
              <NumberInputField
                fullWidth
                value={totalBudget}
                onValueChange={setTotalBudget}
                emptyValue={0}
                sx={inputSx}
                startAdornment={
                  <Box
                    sx={{
                      color: "#15803D",
                      mr: 1,
                      fontSize: 17,
                      fontWeight: 800,
                    }}
                  >
                    £
                  </Box>
                }
              />
            </Box>
          </Box>
        </Paper>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
              mb: {
                xs: 1,
                sm: 1.25,
              },
            }}
          >
            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: 16.5,
                    sm: 18,
                  },
                  color: "#172033",
                }}
              >
                Category Budgets
              </Typography>

              <Typography
                sx={{
                  mt: 0.35,
                  fontSize: {
                    xs: 11.5,
                    sm: 12.5,
                  },
                  color: "#64748B",
                  lineHeight: 1.5,
                }}
              >
                Organise your monthly budget across spending categories.
              </Typography>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
                alignItems: "center",
                gap: 0.7,
                px: 1.2,
                py: 0.65,
                borderRadius: "999px",
                backgroundColor: "#ECFDF3",
                color: "#15803D",
                flexShrink: 0,
              }}
            >
              <CategoryRounded
                sx={{
                  fontSize: 15,
                }}
              />

              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                }}
              >
                {categories.length} categories
              </Typography>
            </Box>
          </Box>

          <Paper
            elevation={0}
            sx={{
              borderRadius: {
                xs: "15px",
                sm: "18px",
              },
              border: "1px solid #E1E9E4",
              backgroundColor:
                "rgba(255,255,255,0.78)",
              p: {
                xs: 0.7,
                sm: 1.25,
              },
              backdropFilter: "blur(8px)",
            }}
          >
            <Stack
              spacing={{
                xs: 0.65,
                sm: 0.8,
              }}
            >
              {categories.map(
                (category, index) => {
                  const colour =
                    CHART_COLOURS[index] ??
                    DEFAULT_CHART_COLOUR;

                  const isDragging =
                    draggedIndex === index;

                  return (
                    <Box
                      key={
                        category.userBudgetCategoryId ??
                        index
                      }
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(
                          event,
                          index,
                        )
                      }
                      onDragOver={
                        handleDragOver
                      }
                      onDrop={(event) =>
                        handleDrop(
                          event,
                          index,
                        )
                      }
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "20px 36px minmax(0,1fr) 88px",
                          sm: "26px 40px minmax(0,1fr) 145px",
                        },
                        alignItems: "center",
                        columnGap: {
                          xs: 0.65,
                          sm: 1.5,
                        },
                        p: {
                          xs: 0.75,
                          sm: 1.15,
                        },
                        borderRadius: {
                          xs: "12px",
                          sm: "14px",
                        },
                        border: "1px solid",
                        borderColor:
                          isDragging
                            ? "#86EFAC"
                            : "#EDF2EF",
                        backgroundColor:
                          isDragging
                            ? "#F0FDF4"
                            : "#FFFFFF",
                        cursor: "grab",
                        transition:
                          "all 0.18s ease",
                        opacity: isDragging
                          ? 0.6
                          : 1,

                        "&:hover": {
                          borderColor:
                            "#CFE5D5",
                          backgroundColor:
                            "#FBFEFC",
                          boxShadow:
                            "0 4px 14px rgba(15,23,42,0.04)",
                        },

                        "&:active": {
                          cursor:
                            "grabbing",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: {
                            xs: 20,
                            sm: 26,
                          },
                          height: {
                            xs: 30,
                            sm: 32,
                          },
                          display: "grid",
                          placeItems: "center",
                          borderRadius: "8px",
                          color: "#94A3B8",

                          "&:hover": {
                            color: "#16A34A",
                            backgroundColor:
                              "#ECFDF3",
                          },
                        }}
                      >
                        <DragIndicatorRounded
                          sx={{
                            fontSize: {
                              xs: 17,
                              sm: 19,
                            },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          width: {
                            xs: 36,
                            sm: 40,
                          },
                          height: {
                            xs: 36,
                            sm: 40,
                          },
                          borderRadius: {
                            xs: "10px",
                            sm: "12px",
                          },
                          display: "grid",
                          placeItems: "center",
                          color: colour,
                          backgroundColor:
                            `${colour}12`,
                          border: `1px solid ${colour}20`,
                          flexShrink: 0,

                          "& svg": {
                            fontSize: {
                              xs: 19,
                              sm: 21,
                            },
                          },
                        }}
                      >
                        {getAppIcon(
                          category.icon,
                        )}
                      </Box>

                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={
                          category.name
                        }
                        onFocus={() =>
                          handleCategoryNameFocus(
                            index,
                            category.name,
                          )
                        }
                        onChange={(
                          event,
                        ) =>
                          handleCategoryNameChange(
                            index,
                            event.target.value,
                          )
                        }
                        onBlur={() =>
                          handleCategoryNameBlur(
                            index,
                          )
                        }
                        sx={{
                          minWidth: 0,

                          "& .MuiOutlinedInput-root":
                            {
                              height: {
                                xs: 36,
                                sm: 40,
                              },
                              borderRadius:
                                "10px",
                              backgroundColor:
                                "#FFFFFF",

                              "& fieldset":
                                {
                                  borderColor:
                                    "#C9D7D0",
                                },

                              "&:hover fieldset":
                                {
                                  borderColor:
                                    "#AFC3B8",
                                },

                              "&.Mui-focused fieldset":
                                {
                                  borderColor:
                                    "#16A34A",
                                  borderWidth:
                                    1.5,
                                },
                            },

                          "& .MuiOutlinedInput-input":
                            {
                              px: {
                                xs: 1,
                                sm: 1.4,
                              },
                              py: 1,
                              fontSize: {
                                xs: 12.5,
                                sm: 13.5,
                              },
                              fontWeight: 600,
                              color:
                                "#172033",
                              textOverflow:
                                "ellipsis",
                            },
                        }}
                      />

                      <Box
                        sx={{
                          width: "100%",
                          minWidth: 0,
                        }}
                      >
                        <NumberInputField
                          fullWidth
                          value={
                            category.allocatedAmount
                          }
                          onValueChange={(
                            value,
                          ) =>
                            handleCategoryAmountChange(
                              index,
                              value,
                            )
                          }
                          emptyValue={0}
                          sx={{
                            ...inputSx,

                            "& .MuiOutlinedInput-root":
                              {
                                height: {
                                  xs: 36,
                                  sm: 46,
                                },
                                borderRadius:
                                  {
                                    xs: "10px",
                                    sm: "13px",
                                  },
                              },

                            "& .MuiOutlinedInput-input":
                              {
                                fontSize: {
                                  xs: 12.5,
                                  sm: 15,
                                },
                              },
                          }}
                          startAdornment={
                            <Box
                              sx={{
                                color: colour,
                                mr: {
                                  xs: 0.35,
                                  sm: 0.5,
                                },
                                fontSize: {
                                  xs: 12,
                                  sm: 14,
                                },
                                fontWeight: 800,
                              }}
                            >
                              £
                            </Box>
                          }
                        />
                      </Box>
                    </Box>
                  );
                },
              )}
            </Stack>

            <Button
              fullWidth
              startIcon={
                <AddRounded />
              }
              onClick={
                handleAddCategory
              }
              sx={{
                mt: {
                  xs: 0.75,
                  sm: 1,
                },
                height: {
                  xs: 40,
                  sm: 42,
                },
                border:
                  "1px dashed #B9DCC3",
                borderRadius: "12px",
                color: "#15803D",
                textTransform: "none",
                fontWeight: 700,
                fontSize: {
                  xs: 12.5,
                  sm: 13,
                },
                backgroundColor:
                  "#FAFEFB",
                transition:
                  "all 0.18s ease",

                "&:hover": {
                  backgroundColor:
                    "#F0FDF4",
                  borderColor:
                    "#16A34A",
                },
              }}
            >
              Add New Category
            </Button>
          </Paper>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: {
              xs: "16px",
              sm: "18px",
            },
            border: "1px solid #E1E9E4",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #FFFFFF 0%, #F8FCF9 100%)",
          }}
        >
          <Box
            sx={{
              px: {
                xs: 1.75,
                sm: 2.5,
              },
              pt: {
                xs: 1.75,
                sm: 2,
              },
              pb: 1.25,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                mb: 0.8,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#64748B",
                }}
              >
                Budget allocation
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  color:
                    totalAllocated >
                    totalBudget
                      ? "#DC2626"
                      : "#15803D",
                }}
              >
                {Math.round(
                  allocationPercentage,
                )}
                %
              </Typography>
            </Box>

            <Box
              sx={{
                height: 7,
                borderRadius: "999px",
                backgroundColor:
                  "#E8F0EA",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${allocationPercentage}%`,
                  height: "100%",
                  borderRadius:
                    "999px",
                  background:
                    totalAllocated >
                    totalBudget
                      ? "#EF4444"
                      : "linear-gradient(90deg, #22C55E, #16A34A)",
                  transition:
                    "width 0.25s ease",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(3, 1fr)",
                sm: "repeat(3, 1fr)",
              },
            }}
          >
            <Box
              sx={{
                px: {
                  xs: 1,
                  sm: 2.5,
                },
                py: {
                  xs: 1.5,
                  sm: 1.75,
                },
                borderTop:
                  "1px solid #E8EFEB",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: {
                    xs: 0.5,
                    sm: 1,
                  },
                  mb: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 27,
                      sm: 30,
                    },
                    height: {
                      xs: 27,
                      sm: 30,
                    },
                    borderRadius: "9px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor:
                      "#EFF6FF",
                    color: "#2563EB",
                    flexShrink: 0,
                  }}
                >
                  <AccountBalanceWalletRounded
                    sx={{
                      fontSize: {
                        xs: 14,
                        sm: 16,
                      },
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 9.5,
                      sm: 11.5,
                    },
                    color: "#64748B",
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  Total Budget
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 22,
                  },
                  fontWeight: 800,
                  color: "#172033",
                  whiteSpace: "nowrap",
                }}
              >
                £
                {totalBudget.toLocaleString()}
              </Typography>
            </Box>

            <Box
              sx={{
                px: {
                  xs: 1,
                  sm: 2.5,
                },
                py: {
                  xs: 1.5,
                  sm: 1.75,
                },
                borderTop:
                  "1px solid #E8EFEB",
                borderLeft:
                  "1px solid #E8EFEB",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: {
                    xs: 0.5,
                    sm: 1,
                  },
                  mb: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 27,
                      sm: 30,
                    },
                    height: {
                      xs: 27,
                      sm: 30,
                    },
                    borderRadius: "9px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor:
                      "#F4EBF8",
                    color: "#B82BEC",
                    flexShrink: 0,
                  }}
                >
                  <PaymentsRounded
                    sx={{
                      fontSize: {
                        xs: 14,
                        sm: 16,
                      },
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 9.5,
                      sm: 11.5,
                    },
                    color: "#64748B",
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  Allocated
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 22,
                  },
                  fontWeight: 800,
                  color: "#172033",
                  whiteSpace: "nowrap",
                }}
              >
                £
                {totalAllocated.toLocaleString()}
              </Typography>
            </Box>

            <Box
              sx={{
                px: {
                  xs: 1,
                  sm: 2.5,
                },
                py: {
                  xs: 1.5,
                  sm: 1.75,
                },
                borderTop:
                  "1px solid #E8EFEB",
                borderLeft:
                  "1px solid #E8EFEB",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: {
                    xs: 0.5,
                    sm: 1,
                  },
                  mb: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 27,
                      sm: 30,
                    },
                    height: {
                      xs: 27,
                      sm: 30,
                    },
                    borderRadius: "9px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor:
                      remaining < 0
                        ? "#FEF2F2"
                        : "#F0FDF4",
                    color:
                      remaining < 0
                        ? "#DC2626"
                        : "#16A34A",
                    flexShrink: 0,
                  }}
                >
                  <SavingsRounded
                    sx={{
                      fontSize: {
                        xs: 14,
                        sm: 16,
                      },
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 9.5,
                      sm: 11.5,
                    },
                    color: "#64748B",
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  Saving
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 22,
                  },
                  fontWeight: 800,
                  color:
                    remaining < 0
                      ? "#DC2626"
                      : "#15803D",
                  whiteSpace: "nowrap",
                }}
              >
                £
                {remaining.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {error && (
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: "13px",
              border: "1px solid #FECACA",
              background:
                "linear-gradient(135deg, #FEF2F2, #FFF7F7)",
            }}
          >
            <Typography
              sx={{
                color: "#B91C1C",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "stretch",
              sm: "flex-end",
            },
            gap: 1.25,
            pt: 0.5,
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              minWidth: {
                xs: "100%",
                sm: 120,
              },
              height: 44,
              borderRadius: "11px",
              borderColor: "#D8E1DC",
              color: "#475569",
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: "#FFFFFF",

              "&:hover": {
                borderColor: "#B8C8BE",
                backgroundColor: "#F8FAF9",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              minWidth: {
                xs: "100%",
                sm: 155,
              },
              height: 44,
              borderRadius: "11px",
              textTransform: "none",
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #16A34A, #15803D)",
              boxShadow:
                "0 5px 14px rgba(22,163,74,0.18)",

              "&:hover": {
                background:
                  "linear-gradient(135deg, #15803D, #166534)",
                boxShadow:
                  "0 7px 18px rgba(22,163,74,0.24)",
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default BudgetCategoriesTab;