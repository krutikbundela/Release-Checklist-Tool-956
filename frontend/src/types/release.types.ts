export interface Release {
  id: string;
  name: string;
  release_date: string;
  status: string;
  steps: boolean[];
  additional_info: string | null;
  created_at: string;
}

export interface ReleaseState {
  releases: Release[];
  currentRelease: Release | null;
  loading: boolean;
  error: string | null;
}

export interface CreateReleasePayload {
  name: string;
  release_date: string;
  additional_info?: string;
}

export interface UpdateReleasePayload {
  id: string;
  name: string;
  release_date: string;
  steps: boolean[];
  additional_info: string;
}
