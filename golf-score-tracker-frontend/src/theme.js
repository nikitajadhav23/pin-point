// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',  // Golf green
    },
    secondary: {
      main: '#a5d6a7',  // Light green accent
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#f9fbe7', // Very light green-tinted background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
    },
  },
});

export default theme;
