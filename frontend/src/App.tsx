import { Container, Typography, Box } from "@mui/material";
import { Outlet } from "react-router";

export default function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          ReleaseCheck
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Your all-in-one release checklist tool
        </Typography>
      </Box>

      <Outlet />
    </Container>
  );
}
