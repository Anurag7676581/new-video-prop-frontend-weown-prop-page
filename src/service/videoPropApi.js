import axios from "axios";

const VIDEO_PROP_API_URL =
  process.env.REACT_APP_VIDEO_PROP_API_URL ||
  "https://email-backend.heybuddy.co.in/api/v1";

const api = axios.create({
  baseURL: VIDEO_PROP_API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export function extractSlugFromView3dUrl(view3durl) {
  if (!view3durl || typeof view3durl !== "string") return null;

  try {
    const url = new URL(view3durl);
    return url.searchParams.get("property");
  } catch {
    const match = view3durl.match(/[?&]property=([^&]+)/i);
    return match ? decodeURIComponent(match[1]) : null;
  }
}

export async function fetchPropertyHome(slug) {
  const url = slug
    ? `/property/home?slug=${encodeURIComponent(slug)}`
    : "/property/home";
  const response = await api.get(url);
  return response.data?.data;
}

export async function fetchVideoProperties() {
  const response = await api.get("/property");
  return response.data?.data || [];
}

export async function fetchAmenities(propertyId) {
  const response = await api.get(
    `/amenities?propertyId=${encodeURIComponent(propertyId)}`
  );
  return response.data?.data;
}

export async function fetchInteriors(propertyId) {
  const response = await api.get(
    `/interiors?propertyId=${encodeURIComponent(propertyId)}`
  );
  return response.data?.data;
}

export async function submitInquiry(payload) {
  const response = await api.post("/inquiries", payload);
  return response.data;
}
