const PLACEHOLDER = "—";

export function displayValue(value, fallback = PLACEHOLDER) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "number" && !Number.isNaN(value)) {
    return String(value);
  }

  const text = String(value).trim();
  if (!text || text === "undefined" || text === "null") {
    return fallback;
  }

  return text;
}

export function displayArea(size, fallback = "Contact for details") {
  if (size === null || size === undefined || size === "") {
    return fallback;
  }

  const numeric = Number(size);
  if (!Number.isNaN(numeric) && numeric > 0) {
    return `${numeric.toLocaleString()} Square Feet`;
  }

  return displayValue(size, fallback);
}

export function displaySwimmingPool(value, fallback = "Not specified") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (value === 0 || value === "0" || value === false) {
    return "None";
  }

  if (value === 1 || value === "1" || value === true) {
    return "Available";
  }

  return displayValue(value, fallback);
}

export function displayPrice(value, fallback = "On request") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const numeric = Number(value);
  if (!Number.isNaN(numeric) && numeric >= 0) {
    return `₹${numeric.toLocaleString("en-IN")}`;
  }

  return displayValue(value, fallback);
}

export const PROPERTY_FIELD_DEFAULTS = {
  bedrooms: PLACEHOLDER,
  bathrooms: PLACEHOLDER,
  area: "Contact for details",
  swimmingpool: "Not specified",
  city: "Prime location",
  type: "Residential",
  construction_stage: "On request",
  security: "24/7 Security",
  parking: "Available",
  description:
    "Experience refined modern living in a thoughtfully designed residential community that blends privacy, greenery, and contemporary architecture.",
};

export function withPropertyDefaults(data = {}) {
  const amenities = data.amenities || {};

  return {
    ...data,
    name: displayValue(data.name, "Property"),
    description: displayValue(data.description, PROPERTY_FIELD_DEFAULTS.description),
    type: displayValue(data.type || amenities.property_type, PROPERTY_FIELD_DEFAULTS.type),
    size: data.size,
    features:
      Array.isArray(data.features) && data.features.length > 0
        ? data.features
        : ["Premium finishes", "Modern amenities", "Prime location"],
    amenities: {
      bedrooms: amenities.bedrooms,
      bathrooms: amenities.bathrooms,
      parking: amenities.parking,
      security: amenities.security,
      swimmingpool: amenities.swimmingpool,
      construction_stage: amenities.construction_stage,
      property_type: amenities.property_type || data.type,
    },
    location: {
      ...(data.location || {}),
      city: displayValue(
        data.location?.city || data.city,
        PROPERTY_FIELD_DEFAULTS.city
      ),
    },
    pricing_details: {
      listing_price:
        data.pricing_details?.listing_price ||
        data.price ||
        data.listing_price ||
        null,
      additional_price: {
        property_transfer_tax:
          data.pricing_details?.additional_price?.property_transfer_tax ?? null,
        legal_fees: data.pricing_details?.additional_price?.legal_fees ?? null,
        home_inspection:
          data.pricing_details?.additional_price?.home_inspection ?? null,
        property_insurance:
          data.pricing_details?.additional_price?.property_insurance ?? null,
        mortgage_fees:
          data.pricing_details?.additional_price?.mortgage_fees ?? null,
      },
    },
  };
}
