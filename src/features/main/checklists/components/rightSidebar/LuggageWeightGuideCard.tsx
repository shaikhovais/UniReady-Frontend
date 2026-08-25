import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";

import { Box, Paper, Stack, Typography } from "@mui/material";

import CheckedLuggageImage from "../../../../../assets/images/checklist/checked-luggage.png";
import CabinLuggageImage from "../../../../../assets/images/checklist/cabin-luggage.png";

const LuggageWeightGuideCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1.5,
          sm: 2,
        },
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(135deg, #ffffff 0%, #f7fcf8 100%)",
        minWidth: 0,
      }}
    >
      <Stack
        sx={{
          gap: {
            xs: 2,
            sm: 2.5,
          },
          minWidth: 0,
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: {
              xs: 1,
              sm: 1.5,
            },
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: {
                xs: 38,
                sm: 44,
              },
              height: {
                xs: 38,
                sm: 44,
              },
              borderRadius: 1.25,
              bgcolor: "#eaf8ef",
              color: "#15803d",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <ScaleOutlinedIcon
              sx={{
                fontSize: {
                  xs: 20,
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
                fontWeight: 800,
                fontSize: {
                  xs: 16,
                  sm: 18,
                },
                color: "#0f172a",
                lineHeight: 1.25,
              }}
            >
              Luggage Weight Guide
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: {
                  xs: 12,
                  sm: 13,
                },
                color: "#64748b",
                lineHeight: 1.4,
              }}
            >
              A quick guide for your flight luggage.
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: {
              xs: 1,
              sm: 3,
            },
            minWidth: 0,
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: {
                xs: 0.75,
                sm: 2,
              },
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={CheckedLuggageImage}
              alt="Checked luggage"
              sx={{
                width: {
                  xs: 42,
                  sm: 60,
                },
                height: {
                  xs: 50,
                  sm: 60,
                },
                objectFit: "contain",
                flexShrink: 0,
              }}
            />

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  color: "success.main",
                  fontWeight: 600,
                  fontSize: {
                    xs: 13,
                    sm: 16,
                  },
                  lineHeight: 1.1,
                }}
              >
                Checked
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: 14,
                    sm: 18,
                  },
                  lineHeight: 1.2,
                  mb: 0.25,
                }}
              >
                Luggage
              </Typography>

              <Typography
                sx={{
                  color: "success.main",
                  fontWeight: 800,
                  fontSize: {
                    xs: 29,
                    sm: 40,
                  },
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                23
                <Typography
                  component="span"
                  sx={{
                    ml: 0.25,
                    fontSize: {
                      xs: 16,
                      sm: 22,
                    },
                    fontWeight: 700,
                    color: "success.main",
                  }}
                >
                  kg
                </Typography>
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 11,
                    sm: 13,
                  },
                  color: "text.secondary",
                }}
              >
                maximum
              </Typography>
            </Box>
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: {
                xs: 0.75,
                sm: 2,
              },
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={CabinLuggageImage}
              alt="Cabin luggage"
              sx={{
                width: {
                  xs: 42,
                  sm: 60,
                },
                height: {
                  xs: 50,
                  sm: 60,
                },
                objectFit: "contain",
                flexShrink: 0,
              }}
            />

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  color: "success.main",
                  fontWeight: 600,
                  fontSize: {
                    xs: 13,
                    sm: 16,
                  },
                  lineHeight: 1.1,
                }}
              >
                Cabin
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: 14,
                    sm: 18,
                  },
                  lineHeight: 1.2,
                  mb: 0.25,
                }}
              >
                Luggage
              </Typography>

              <Typography
                sx={{
                  color: "success.main",
                  fontWeight: 800,
                  fontSize: {
                    xs: 29,
                    sm: 40,
                  },
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                7
                <Typography
                  component="span"
                  sx={{
                    ml: 0.25,
                    fontSize: {
                      xs: 16,
                      sm: 22,
                    },
                    fontWeight: 700,
                    color: "success.main",
                  }}
                >
                  kg
                </Typography>
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 11,
                    sm: 13,
                  },
                  color: "text.secondary",
                }}
              >
                maximum
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 0.75,
              sm: 1.25,
            },
            px: {
              xs: 1,
              sm: 2,
            },
            py: {
              xs: 1,
              sm: 1.5,
            },
            borderRadius: 1,
            bgcolor: "#eaf8ef",
            border: "1px solid",
            borderColor: "#dcfce7",
            color: "#15803d",
            minWidth: 0,
          }}
        >
          <InfoOutlinedIcon
            sx={{
              fontSize: {
                xs: 18,
                sm: 20,
              },
              flexShrink: 0,
            }}
          />

          <Typography
            sx={{
              fontSize: {
                xs: 11.5,
                sm: 14,
              },
              fontWeight: 500,
              lineHeight: 1.5,
              color: "#166534",
            }}
          >
            Weight limits vary by airline and ticket type. Always check your
            airline before travelling.
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default LuggageWeightGuideCard;