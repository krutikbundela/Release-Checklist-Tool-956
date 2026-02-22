import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RELEASES_API_URL } from "../config/api";
import type {
  Release,
  ReleaseState,
  CreateReleasePayload,
  UpdateReleasePayload,
} from "../types/release.types";

const initialState: ReleaseState = {
  releases: [],
  currentRelease: null,
  loading: false,
  error: null,
};

export const fetchReleases = createAsyncThunk(
  "releases/fetchAll",
  async () => {
    const res = await fetch(RELEASES_API_URL);
    return (await res.json()) as Release[];
  },
);

export const createRelease = createAsyncThunk(
  "releases/create",
  async (data: CreateReleasePayload) => {
    const res = await fetch(RELEASES_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (await res.json()) as Release;
  },
);

export const updateRelease = createAsyncThunk(
  "releases/update",
  async ({ id, name, release_date, steps, additional_info }: UpdateReleasePayload) => {
    const res = await fetch(`${RELEASES_API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, release_date, steps, additional_info }),
    });
    return (await res.json()) as Release;
  },
);

export const deleteRelease = createAsyncThunk(
  "releases/delete",
  async (id: string) => {
    await fetch(`${RELEASES_API_URL}/${id}`, { method: "DELETE" });
    return id;
  },
);

const releaseSlice = createSlice({
  name: "releases",
  initialState,
  reducers: {
    setCurrentRelease(state, action) {
      state.currentRelease = action.payload;
    },
    clearCurrentRelease(state) {
      state.currentRelease = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchReleases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReleases.fulfilled, (state, action) => {
        state.loading = false;
        state.releases = action.payload;
      })
      .addCase(fetchReleases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch releases";
      })
      // create
      .addCase(createRelease.fulfilled, (state, action) => {
        state.releases.unshift(action.payload);
      })
      // update
      .addCase(updateRelease.fulfilled, (state, action) => {
        const idx = state.releases.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.releases[idx] = action.payload;
        if (state.currentRelease?.id === action.payload.id) {
          state.currentRelease = action.payload;
        }
      })
      // delete
      .addCase(deleteRelease.fulfilled, (state, action) => {
        state.releases = state.releases.filter((r) => r.id !== action.payload);
        if (state.currentRelease?.id === action.payload) {
          state.currentRelease = null;
        }
      });
  },
});

export const { setCurrentRelease, clearCurrentRelease } = releaseSlice.actions;
export default releaseSlice.reducer;
