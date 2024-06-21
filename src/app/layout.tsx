"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorProvider } from "@/context/ErrorContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body style={{backgroundColor : "#F9F9F9"}}>
        <ThemeProvider theme={baselightTheme}>
          <ErrorProvider>
              <CssBaseline />
              {children}
          </ErrorProvider>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
