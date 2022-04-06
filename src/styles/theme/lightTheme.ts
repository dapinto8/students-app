import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },
  typography: {
    h1: {
      fontSize: 24
    },
    h2: {
      fontSize: 20
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 700
    }
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          height: '72px'
        },
        content: {
          flexWrap: 'wrap'
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0px 8px'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto'
        }
      }
    }
  }
})

export default lightTheme
