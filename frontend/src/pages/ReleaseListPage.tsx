import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchReleases, createRelease, deleteRelease } from "../redux/releaseSlice";
import { statusColorMap } from "../constants/statuses";
import { formatDate } from "../utils/formatDate";

export default function ReleaseListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { releases, loading } = useAppSelector((s) => s.releases);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchReleases());
  }, [dispatch]);

  const handleCreate = async () => {
    if (!name || !date) return;
    setCreating(true);
    await dispatch(createRelease({ name, release_date: date }));
    setCreating(false);
    setName("");
    setDate("");
    setOpen(false);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteRelease(id));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header row */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#7c3aed",
            fontWeight: 500,
            backgroundColor: "#ede9fe",
            px: 2,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          All releases
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: "#7c3aed",
            "&:hover": { bgcolor: "#6d28d9" },
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
          }}
        >
          New release
        </Button>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 2, border: "1px solid #e5e7eb" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fafafa" }}>
              <TableCell sx={{ fontWeight: 700, borderRight: "1px solid #e5e7eb" }}>Release</TableCell>
              <TableCell sx={{ fontWeight: 700, borderRight: "1px solid #e5e7eb" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, borderRight: "1px solid #e5e7eb" }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, borderRight: "1px solid #e5e7eb" }}>View</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {releases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No releases yet. Create one to get started!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              releases.map((r) => (
                <TableRow
                  key={r.id}
                  hover
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell sx={{ borderRight: "1px solid #e5e7eb" }}>{r.name}</TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e5e7eb" }}>{formatDate(r.release_date)}</TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e5e7eb" }}>
                    <Chip
                      label={r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      color={statusColorMap[r.status] || "default"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ borderRight: "1px solid #e5e7eb" }}>
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon fontSize="small" />}
                      onClick={() => navigate(`/release/${r.id}`)}
                      sx={{ color: "#7c3aed", textTransform: "none", fontWeight: 600 }}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<DeleteOutlineIcon fontSize="small" />}
                      onClick={() => handleDelete(r.id)}
                      sx={{ color: "#7c3aed", textTransform: "none", fontWeight: 600 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create New Release Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>New Release</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "8px !important" }}>
          <TextField
            label="Release name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
            placeholder="e.g. Version 1.0.0"
          />
          <TextField
            label="Release date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ textTransform: "none", color: "#666" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!name || !date || creating}
            startIcon={creating ? <CircularProgress size={18} color="inherit" /> : undefined}
            sx={{
              bgcolor: "#7c3aed",
              "&:hover": { bgcolor: "#6d28d9" },
              "&.Mui-disabled": { bgcolor: "#7c3aed", color: "#fff" },
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {creating ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}