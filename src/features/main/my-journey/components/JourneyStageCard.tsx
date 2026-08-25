import { useEffect, useState } from "react";

import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import TaskRow from "./TaskRow";
import TaskDetailsDialog from "./TaskDetailsDialog";

import type {
  JourneyStage,
  JourneyTask,
} from "../../../../types/features/journey";
import type { Lookup } from "../../../../types/core/common/Lookup";
import { getLookups } from "../../../../services/core/common/helperService";

interface Props {
  stage: JourneyStage;
  defaultExpanded?: boolean;
  onJourneyUpdated: () => Promise<void>;
}

const JourneyStageCard = ({
  stage,
  defaultExpanded = true,
  onJourneyUpdated,
}: Props) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const [selectedTask, setSelectedTask] =
    useState<JourneyTask | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [taskStatuses, setTaskStatuses] =
    useState<Lookup[]>([]);

  const isBeforeArrival =
    stage.journeyStageName === "Before Arrival";

  const title = isBeforeArrival
    ? "Before You Arrive"
    : "After You Arrive";

  const subtitle = isBeforeArrival
    ? "Complete these tasks before travelling to the UK."
    : "Things to complete once you reach the UK.";

  const icon = isBeforeArrival ? (
    <FlightTakeoffRoundedIcon />
  ) : (
    <HomeRoundedIcon />
  );

  const iconColor = isBeforeArrival
    ? "#15803d"
    : "#7c3aed";

  const iconBackground = isBeforeArrival
    ? "#eaf8ef"
    : "#f3e8ff";

  const headerBackground = isBeforeArrival
    ? "linear-gradient(135deg, #ffffff 0%, #f7fcf8 100%)"
    : "linear-gradient(135deg, #ffffff 0%, #faf7ff 100%)";

  const borderColor = isBeforeArrival
    ? "rgba(21, 128, 61, 0.16)"
    : "rgba(124, 58, 237, 0.16)";

  const openTask = (task: JourneyTask) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedTask(null);
  };

  const handleSaved = async () => {
    await onJourneyUpdated();
    closeDialog();
  };

  useEffect(() => {
    const loadTaskStatuses = async () => {
      const response =
        await getLookups(["JourneyTaskStatus"]);

      setTaskStatuses(response);
    };

    void loadTaskStatuses();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1.5,
        border: "1px solid",
        borderColor,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
          },
          py: {
            xs: 2,
            sm: 2.25,
          },
          background: headerBackground,
          borderBottom: expanded
            ? "1px solid"
            : "none",
          borderColor: "rgba(148, 163, 184, 0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.75,
            minWidth: 0,
          }}
        >
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: iconBackground,
              color: iconColor,
              borderRadius: 1.5,
              flexShrink: 0,
            }}
          >
            {icon}
          </Avatar>

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: 17,
                  sm: 18,
                },
                lineHeight: 1.25,
                color: "#0f172a",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                mt: 0.45,
                fontSize: 13.5,
                lineHeight: 1.45,
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              fontWeight: 700,
              fontSize: 13,
              color: iconColor,
              mr: 0.25,
            }}
          >
            {stage.tasks.length}{" "}
            {stage.tasks.length === 1
              ? "task"
              : "tasks"}
          </Typography>

          <IconButton
            size="small"
            onClick={() =>
              setExpanded((previous) => !previous)
            }
            sx={{
              width: 36,
              height: 36,
              color: iconColor,
              backgroundColor: iconBackground,
              borderRadius: 1,

              "&:hover": {
                backgroundColor: isBeforeArrival
                  ? "#dcfce7"
                  : "#ede9fe",
              },
            }}
          >
            {expanded ? (
              <ExpandLessRoundedIcon
                sx={{
                  fontSize: 21,
                }}
              />
            ) : (
              <ExpandMoreRoundedIcon
                sx={{
                  fontSize: 21,
                }}
              />
            )}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Box
          sx={{
            px: 3,
            pt: 1.5,
            pb: 1,
            display: {
              xs: "none",
              md: "grid",
            },
            gridTemplateColumns:
              "2.3fr 1.2fr 1.2fr auto",
            color: "#64748b",
            fontSize: 12.5,
            fontWeight: 700,
          }}
        >
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
            }}
          >
            Task
          </Typography>

          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
            }}
          >
            Status
          </Typography>

          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
            }}
          >
            Complete by
          </Typography>

          <Box />
        </Box>

        {stage.tasks.map((task) => (
          <TaskRow
            key={task.userJourneyTaskId}
            task={task}
            iconColor={iconColor}
            iconBackground={iconBackground}
            onClick={openTask}
          />
        ))}
      </Collapse>

      <TaskDetailsDialog
        open={dialogOpen}
        task={selectedTask}
        taskStatuses={taskStatuses}
        onClose={closeDialog}
        onSaved={handleSaved}
      />
    </Paper>
  );
};

export default JourneyStageCard;