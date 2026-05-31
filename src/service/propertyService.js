import axios from "axios";
import { withPropertyDefaults } from "../utils/propertyDisplay";

const WEOWN_API_URL =
  process.env.REACT_APP_WEOWN_API_URL || "https://api.weown.ai/";
const VIDEO_PROP_API_URL =
  process.env.REACT_APP_VIDEO_PROP_API_URL ||
  "https://email-backend.heybuddy.co.in/api/v1";

const weownApi = axios.create({
  baseURL: WEOWN_API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

const videoPropApi = axios.create({
  baseURL: VIDEO_PROP_API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;

export function isWeownPropertyId(value) {
  return OBJECT_ID_PATTERN.test(String(value || "").trim());
}

function normalizeVideoPropProperty(raw) {
  if (!raw) return null;

  return {
    _id: raw._id,
    name: raw.name,
    description: raw.description,
    type: raw.type || raw.property_type || "Residential",
    size: raw.size,
    price: raw.price || raw.listing_price,
    view3durl: raw.view3durl || raw.videoUrl,
    images: raw.images?.length ? raw.images : raw.imageUrl ? [raw.imageUrl] : [],
    floor_images: raw.floor_images || [],
    features: raw.features || [],
    builder: raw.builder || raw.builderName || raw.ownerName,
    iframe: raw.iframe,
    slug: raw.slug,
    amenities: raw.amenities || {
      bedrooms: raw.bedrooms,
      bathrooms: raw.bathrooms,
      parking: raw.parking,
      security: raw.security,
      swimmingpool: raw.swimmingpool ?? raw.pool,
      construction_stage: raw.construction_stage || raw.constructionStage,
      property_type: raw.property_type || raw.type,
    },
    location: raw.location || {
      city: raw.city,
      lat: raw.lat ?? raw.latitude,
      lng: raw.lng ?? raw.longitude,
      address: raw.address || raw.centerAddress,
    },
    pricing_details: raw.pricing_details || {
      listing_price: raw.price || raw.listing_price,
      additional_price: raw.pricing_details?.additional_price || {
        property_transfer_tax: raw.transferTax,
        legal_fees: raw.legalFees,
        home_inspection: raw.inspectionFee,
        property_insurance: raw.insuranceFee,
        mortgage_fees: raw.mortgageFee,
      },
    },
  };
}

export async function fetchPropertyById(id) {
  const response = await weownApi.get(`/property/${id}`);
  return withPropertyDefaults(response.data);
}

export async function fetchPropertyBySlug(slug) {
  const response = await videoPropApi.get(
    `/property/slug/${encodeURIComponent(slug)}`
  );
  return withPropertyDefaults(normalizeVideoPropProperty(response.data?.data));
}

export async function fetchPropertiesList() {
  const response = await videoPropApi.get("/property");
  return response.data?.data || [];
}

export async function resolveProperty(identifier) {
  const value = String(identifier || "").trim();
  if (!value) return null;

  if (isWeownPropertyId(value)) {
    return fetchPropertyById(value);
  }

  try {
    const normalized = await fetchPropertyBySlug(value);
    if (normalized) return normalized;
  } catch (error) {
    console.warn("Slug lookup failed, trying WeOwn id fallback", error);
  }

  return fetchPropertyById(value);
}
