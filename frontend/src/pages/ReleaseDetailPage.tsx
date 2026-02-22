import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Breadcrumbs,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchReleases,
  updateRelease,
  deleteRelease,
} from "../redux/releaseSlice";
import { CHECKLIST_STEPS, DEFAULT_STEPS_COUNT } from "../constants/checklist";

export default function ReleaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { releases, loading } = useAppSelector((s) => s.releases);

  const release = releases.find((r) => r.id === id);

  const [steps, setSteps] = useState<boolean[]>([]);
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);

  // Load releases if navigated directly
  useEffect(() => {
    if (releases.length === 0) {
      dispatch(fetchReleases());
    }
  }, [dispatch, releases.length]);

  // Sync local state when release loads
  useEffect(() => {
    if (release) {
      setSteps(release.steps || new Array(DEFAULT_STEPS_COUNT).fill(false));
      setInfo(release.additional_info || "");
      setName(release.name || "");
      setDate(release.release_date ? release.release_date.split("T")[0] : "");
    }
  }, [release]);

  const handleStepToggle = (index: number) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleSave = async () => {
    if (!release) return;
    setSaving(true);
    await dispatch(updateRelease({
      id: release.id,
      name,
      release_date: date,
      steps,
      additional_info: info,
    }));
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!release) return;
    await dispatch(deleteRelease(release.id));
    navigate("/");
  };

  if (loading || (!release && releases.length === 0)) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!release) {
    return (
      <Box py={4}>
        <Typography color="error">Release not found.</Typography>
        <Button component={Link} to="/" sx={{ mt: 2 }}>
          ← Back to all releases
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Breadcrumb + Delete */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Breadcrumbs>
          <Typography
            component={Link}
            to="/"
            sx={{
              color: "#7c3aed",
              textDecoration: "none",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            All releases
          </Typography>
          <Typography
            sx={{
              color: "#7c3aed",
              fontWeight: 500,
            }}
          >
            {release.name}
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          startIcon={<DeleteOutlineIcon />}
          onClick={handleDelete}
          sx={{
            bgcolor: "#7c3aed",
            "&:hover": { bgcolor: "#6d28d9" },
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
          }}
        >
          Delete
        </Button>
      </Box>

      {/* Release info fields */}
      <Paper
        variant="outlined"
        sx={{ p: 3, borderRadius: 2, border: "1px solid #e5e7eb", mb: 3 }}
      >
        <Box display="flex" gap={3} mb={3}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Release
            </Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              variant="outlined"
              sx={{ display: "block", mt: 0.5 }}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Date
            </Typography>
            <TextField
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              size="small"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ display: "block", mt: 0.5 }}
            />
          </Box>
        </Box>

        {/* Checklist */}
        <Box display="flex" flexDirection="column" gap={0.5}>
          {CHECKLIST_STEPS.map((label, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={steps[i] || false}
                  onChange={() => handleStepToggle(i)}
                  sx={{
                    color: "#7c3aed",
                    "&.Mui-checked": { color: "#7c3aed" },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  {label}
                </Typography>
              }
            />
          ))}
        </Box>
      </Paper>

      {/* Additional info */}
      <Paper
        variant="outlined"
        sx={{ p: 3, borderRadius: 2, border: "1px solid #e5e7eb" }}
      >
        <Typography variant="subtitle2" fontWeight={700} mb={1}>
          Additional remarks / tasks
        </Typography>
        <TextField
          multiline
          minRows={4}
          maxRows={8}
          fullWidth
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          placeholder="Please enter any other important notes for this release"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <CheckIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{
              bgcolor: "#7c3aed",
              "&:hover": { bgcolor: "#6d28d9" },
              "&.Mui-disabled": { bgcolor: "#7c3aed", color: "#fff" },
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              px: 3,
            }}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}