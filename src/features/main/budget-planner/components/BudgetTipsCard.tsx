import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { LightbulbRounded } from "@mui/icons-material";
import type { Tip } from "../../../../types/core/common/Tip";

interface BudgetTipsCardProps {
  tips: Tip[];
}

const BudgetTipsCard = ({
  tips,
}: BudgetTipsCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1.25,
          sm: 2,
        },
        border: "1px solid #E1E9E4",
        borderRadius: {
          xs: "14px",
          sm: "18px",
        },
        background:
          "linear-gradient(145deg, #FFFFFF 0%, #F8FCF9 100%)",
      }}
    >
      <Box
        sx={{
          mb: {
            xs: 1.25,
            sm: 2,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 15,
              sm: 18,
            },
            fontWeight: 800,
            color: "#172033",
            lineHeight: 1.25,
          }}
        >
          Budget Tips
        </Typography>

        <Typography
          sx={{
            mt: {
              xs: 0.3,
              sm: 0.4,
            },
            fontSize: {
              xs: 10.5,
              sm: 12.5,
            },
            color: "#64748B",
            lineHeight: 1.4,
          }}
        >
          Simple ways to make your budget work better.
        </Typography>
      </Box>

      <Stack
        sx={{
          gap: {
            xs: 0.75,
            sm: 1.25,
          },
        }}
      >
        {tips.map((tip, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: {
                xs: 0.9,
                sm: 1.5,
              },
              p: {
                xs: 1,
                sm: 1.5,
              },
              borderRadius: {
                xs: "11px",
                sm: "14px",
              },
              backgroundColor: "#F4FBF6",
              border: "1px solid #E2F0E5",
              transition: "all 0.18s ease",
              "&:hover": {
                backgroundColor: "#EFF9F2",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 30,
                  sm: 38,
                },
                height: {
                  xs: 30,
                  sm: 38,
                },
                borderRadius: {
                  xs: "9px",
                  sm: "11px",
                },
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                backgroundColor: "#DCFCE7",
                color: "#16A34A",
              }}
            >
              <LightbulbRounded
                sx={{
                  fontSize: {
                    xs: 17,
                    sm: 21,
                  },
                }}
              />
            </Box>

            <Typography
              sx={{
                flex: 1,
                fontSize: {
                  xs: 11.5,
                  sm: 13,
                },
                lineHeight: {
                  xs: 1.45,
                  sm: 1.6,
                },
                color: "#475569",
                fontWeight: 500,
                pt: {
                  xs: 0.05,
                  sm: 0.15,
                },
              }}
            >
              {tip.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default BudgetTipsCard;