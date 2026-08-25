import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import {
  Avatar,
  Box,
  Typography,
} from "@mui/material";

import StatusChip from "./StatusChip";
import { getAppIcon } from "../../../../utils/appIcons";
import type { JourneyTask } from "../../../../types/features/journey";

interface Props {
  task: JourneyTask;
  iconColor: string;
  iconBackground: string;
  onClick?: (task: JourneyTask) => void;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

const TaskRow = ({
  task,
  iconColor,
  iconBackground,
  onClick,
}: Props) => {
  const icon = getAppIcon(task.iconKey);

  return (
    <Box
      onClick={() => onClick?.(task)}
      sx={{
        borderTop: "1px solid",
        borderColor: "rgba(148, 163, 184, 0.12)",
        cursor: onClick ? "pointer" : "default",
        transition: "background-color 0.18s ease",

        "&:hover": {
          backgroundColor: {
            xs: "rgba(248, 250, 252, 0.8)",
            md: "rgba(248, 250, 252, 0.6)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "grid",
          },
          gridTemplateColumns:
            "2.3fr 1.2fr 1.2fr auto",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 1.75,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: iconBackground,
              color: iconColor,
              borderRadius: 1.25,
              flexShrink: 0,
            }}
          >
            {icon}
          </Avatar>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 650,
              color: "#0f172a",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {task.title}
          </Typography>
        </Box>

        <StatusChip status={task.status} />

        <Typography
          sx={{
            fontSize: 13.5,
            color: "#64748b",
            whiteSpace: "nowrap",
          }}
        >
          {formatDate(task.recommendedStartDate)} -{" "}
          {formatDate(task.recommendedEndDate)}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#94a3b8",
          }}
        >
          <ChevronRightRoundedIcon
            sx={{
              fontSize: 21,
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          p: {
            xs: 1.5,
            sm: 1.75,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <Avatar
            sx={{
              width: {
                xs: 38,
                sm: 42,
              },
              height: {
                xs: 38,
                sm: 42,
              },
              bgcolor: iconBackground,
              color: iconColor,
              borderRadius: 1.25,
              flexShrink: 0,
            }}
          >
            {icon}
          </Avatar>

          <Typography
            sx={{
              flex: 1,
              minWidth: 0,
              fontSize: {
                xs: 13.5,
                sm: 14.5,
              },
              fontWeight: 750,
              lineHeight: 1.35,
              color: "#0f172a",
            }}
          >
            {task.title}
          </Typography>

          <ChevronRightRoundedIcon
            sx={{
              fontSize: 22,
              color: "#94a3b8",
              flexShrink: 0,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: {
              xs: 1,
              sm: 1.5,
            },
            mt: 1.5,
            ml: {
              xs: 5.25,
              sm: 5.75,
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
                mb: 0.45,
                fontSize: 10.5,
                fontWeight: 750,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Status
            </Typography>

            <StatusChip status={task.status} />
          </Box>

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                mb: 0.45,
                fontSize: 10.5,
                fontWeight: 750,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Complete by
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  sm: 13,
                },
                fontWeight: 650,
                color: "#475569",
                lineHeight: 1.35,
              }}
            >
              {formatDate(task.recommendedStartDate)} -{" "}
              {formatDate(task.recommendedEndDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskRow;