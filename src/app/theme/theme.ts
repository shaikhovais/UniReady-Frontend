import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E6F57",
      light: "#4D8A72",
      dark: "#245645",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#D9A441",
    },

    background: {
      default: "#F8F7F2",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
  },

  typography: {
    fontFamily: "'Inter', sans-serif",

    h1: {
      fontFamily: "'Kalam', cursive",
      fontWeight: 400,
      lineHeight: 1.1,
    },

    h2: {
      fontFamily: "'Kalam', cursive",
      fontWeight: 400,
      lineHeight: 1.1,
    },

    h3: {
      fontFamily: "'Kalam', cursive",
      fontWeight: 400,
      lineHeight: 1.2,
    },

    h4: {
      fontFamily: "'Kalam', cursive",
      fontWeight: 400,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },

    body1: {
      fontFamily: "'Inter', sans-serif",
      fontSize: "1rem",
      lineHeight: 1.8,
    },

    body2: {
      fontFamily: "'Inter', sans-serif",
      lineHeight: 1.6,
    },

    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 14,
          padding: "10px 24px",
          fontWeight: 600,

          "&:hover": {
            boxShadow: "none",
          },
        },

        contained: {
          boxShadow: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 24,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 56,
          borderRadius: 14,
          backgroundColor: "#FFFFFF",
          transition: "all .2s ease",

          "& fieldset": {
            borderColor: "#D9DEE3",
          },

          "&:hover fieldset": {
            borderColor: "#2E6F57",
          },

          "&.Mui-focused fieldset": {
            borderWidth: 2,
            borderColor: "#2E6F57",
          },
        },

        input: {
          padding: "16px",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          marginBottom: 6,
          color: "#1F2937",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 44,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#ECECEC",
        },
      },
    },
  },
});

export default theme;