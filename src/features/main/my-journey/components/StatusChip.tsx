import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

import { Chip } from "@mui/material";

interface Props {
  status: string;
}

const config: Record<
  string,
  {
    label: string;
    icon: React.ReactElement;
    bg: string;
    color: string;
  }
> = {
  Completed: {
    label: "Completed",
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />,
    bg: "#E8F7EE",
    color: "#2E7D32",
  },

  "In Progress": {
    label: "In Progress",
    icon: <AutorenewRoundedIcon sx={{ fontSize: 15 }} />,
    bg: "#EAF3FF",
    color: "#1565C0",
  },

  Pending: {
    label: "Pending",
    icon: <HourglassEmptyRoundedIcon sx={{ fontSize: 15 }} />,
    bg: "#FFF4E5",
    color: "#EF6C00",
  },
};

const defaultStatus = {
  label: "Unknown",
  icon: <HourglassEmptyRoundedIcon sx={{ fontSize: 15 }} />,
  bg: "#F5F5F5",
  color: "#616161",
};

export default function StatusChip({
  status,
}: Props) {
  const item = config[status] ?? defaultStatus;

  return (
    <Chip
      icon={item.icon}
      label={item.label}
      size="small"
      sx={{
        height: 30,
        px: 0.8,
        borderRadius: 10,
        backgroundColor: item.bg,
        color: item.color,
        fontWeight: 700,
        fontSize: 13,

        "& .MuiChip-icon": {
          color: item.color,
          ml: 0.8,
        },

        "& .MuiChip-label": {
          px: 1,
        },
      }}
    />
  );
}