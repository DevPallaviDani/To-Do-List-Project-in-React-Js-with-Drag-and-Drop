import "./App.css";
import { HomePage } from "./HomePage";
import { Typography, Box } from "@mui/material";

function App() {
  return (
    <div>
      <header>
        <Box className="form-box">
          <div>
            <Typography textAlign="center" variant="h6">
              Task Management
            </Typography>
          </div>
        </Box>
      </header>
      <body>
        <HomePage />
      </body>
    </div>
  );
}

export default App;
