import React, { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { HiHome, HiOutlineLocationMarker } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import useIsMobile from "../../hooks/useIsMobile";
import useNightVideoSchedule from "../../hooks/useNightVideoSchedule";
import { resolveVideoUrl } from "../../utils/videoSchedule";
import {
  extractSlugFromView3dUrl,
  fetchAmenities,
  fetchInteriors,
  fetchPropertyHome,
  fetchVideoProperties,
  submitInquiry,
} from "../../service/videoPropApi";
import VideoPlayer from "./VideoPlayer";
import styles from "./LaunchExperienceViewer.module.css";

const AmenitiesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
  </svg>
);

const InteriorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 3v18" />
  </svg>
);

const InquiryDialog = ({
  open,
  onClose,
  propertyId,
  propertyName,
}) => {
  const [formData, setFormData] = useState({ name: "", mobile: "", query: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!open) {
      setStatus(null);
      setFormData({ name: "", mobile: "", query: "" });
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.query.trim()) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await submitInquiry({
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        query: formData.query.trim(),
        propertyId,
        propertyName,
      });
      setStatus("success");
      setTimeout(onClose, 1500);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.inquiryOverlay} onClick={onClose}>
      <div className={styles.inquiryDialog} onClick={(e) => e.stopPropagation()}>
        <h3>Inquire now</h3>
        <p>{propertyName ? `About ${propertyName}` : "Share your details and we will get back to you."}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inquiryField}>
            <label htmlFor="inquiry-name">Name</label>
            <input
              id="inquiry-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className={styles.inquiryField}>
            <label htmlFor="inquiry-mobile">Mobile</label>
            <input
              id="inquiry-mobile"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>
          <div className={styles.inquiryField}>
            <label htmlFor="inquiry-query">Query</label>
            <textarea
              id="inquiry-query"
              rows={4}
              value={formData.query}
              onChange={(e) => setFormData({ ...formData, query: e.target.value })}
            />
          </div>
          <div className={styles.inquiryActions}>
            <button type="button" className={styles.inquiryCancel} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.inquirySubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          {status === "success" && (
            <div className={`${styles.inquiryStatus} ${styles.inquiryStatusSuccess}`}>
              Inquiry submitted successfully.
            </div>
          )}
          {status === "error" && (
            <div className={`${styles.inquiryStatus} ${styles.inquiryStatusError}`}>
              Please fill all fields and try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const InfoCard = ({ imageSrc, title, ownerName, rating, reviewCount, description, features, onInquire, expanded, onExpand, onCollapse }) => (
  <div
    className={`${styles.infoCard} ${expanded ? styles.infoCardExpanded : ""}`}
    onMouseEnter={onExpand}
    onMouseLeave={onCollapse}
  >
    <div className={styles.infoCardBody}>
      {imageSrc && <img src={imageSrc} alt={title} className={styles.infoCardImage} />}
      <div className={styles.infoCardContent}>
        <div className={styles.infoCardTitle}>{title}</div>
        <div className={styles.infoCardMeta}>
          {ownerName && <span>By {ownerName}</span>}
          {rating != null && (
            <span className={styles.ratingBadge}>
              <FaStar size={10} />
              {rating} ({reviewCount || 0})
            </span>
          )}
        </div>
        {description && <p className={styles.infoCardDescription}>{description}</p>}
        {features?.length > 0 && (
          <div>
            <div className={styles.featuresTitle}>Features:</div>
            <ul className={styles.featuresList}>
              {features.map((feature) => (
                <li key={feature}>
                  <span className={styles.featureDot} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    <div className={styles.infoCardFooter}>
      <button type="button" className={styles.inquireButton} onClick={onInquire}>
        Inquire now
      </button>
    </div>
  </div>
);

const HomeSection = ({ selectedSlug, onInquireClick }) => {
  const isMobile = useIsMobile();
  const isNight = useNightVideoSchedule();
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setExpanded(true);
    const timer = setTimeout(() => setExpanded(false), 5000);
    return () => clearTimeout(timer);
  }, [selectedSlug]);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchPropertyHome(selectedSlug);
        if (!cancelled) {
          setPropertyData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || "Failed to load property data");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [selectedSlug]);

  if (loading) return <div className={styles.centerState}>Loading...</div>;
  if (error || !propertyData) {
    return <div className={`${styles.centerState} ${styles.centerStateError}`}>Error: {error || "No property data"}</div>;
  }

  const videoSrc = resolveVideoUrl(
    {
      videoUrl: propertyData.videoUrlDay || propertyData.property?.videoUrl,
      videoUrlMobile:
        propertyData.videoUrlMobileDay || propertyData.videoUrlMobile,
      videoUrlNight: propertyData.videoUrlNight,
      videoUrlMobileNight: propertyData.videoUrlMobileNight,
    },
    isMobile
  );
  const imageSrc =
    isMobile && propertyData.property.imageUrlMobile
      ? propertyData.property.imageUrlMobile
      : propertyData.property.imageUrl;

  return (
    <div className={styles.sectionLayer}>
      <VideoPlayer key={`${videoSrc}-${isNight}`} src={videoSrc} />
      <InfoCard
        imageSrc={imageSrc}
        title={propertyData.property.name}
        ownerName={propertyData.property.ownerName}
        rating={propertyData.property.rating}
        reviewCount={propertyData.property.reviewCount}
        description={propertyData.property.description}
        features={propertyData.property.features}
        onInquire={onInquireClick}
        expanded={expanded}
        onExpand={() => setExpanded(true)}
        onCollapse={() => setExpanded(false)}
      />
      <div className={styles.mobileInquire}>
        <button type="button" className={styles.inquireButton} onClick={onInquireClick}>
          Inquire Now
        </button>
      </div>
    </div>
  );
};

const AmenitiesSection = ({ propertyId, onInquireClick }) => {
  const isMobile = useIsMobile();
  const isNight = useNightVideoSchedule();
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      if (!propertyId) {
        setError("No property selected");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchAmenities(propertyId);
        if (cancelled) return;
        setAmenities(data.amenities || []);
        const defaultAmenity =
          data.amenities?.find((item) => item.id === data.defaultSelectedId) ||
          data.amenities?.[0] ||
          null;
        setSelectedAmenity(defaultAmenity);
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load amenities");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  useEffect(() => {
    setExpanded(true);
    const timer = setTimeout(() => setExpanded(false), 5000);
    return () => clearTimeout(timer);
  }, [selectedAmenity]);

  if (!propertyId) return <div className={styles.centerState}>Select a property to view amenities.</div>;
  if (loading) return <div className={styles.centerState}>Loading amenities...</div>;
  if (error || !selectedAmenity) {
    return <div className={`${styles.centerState} ${styles.centerStateError}`}>Error: {error || "No amenities available"}</div>;
  }

  const videoSrc = resolveVideoUrl(selectedAmenity, isMobile);
  const thumbnails =
    isMobile && selectedAmenity.thumbnailImagesMobile?.length === 2
      ? selectedAmenity.thumbnailImagesMobile
      : selectedAmenity.thumbnailImages;

  return (
    <div className={styles.sectionLayer}>
      <VideoPlayer key={`${selectedAmenity.id}-${videoSrc}-${isNight}`} src={videoSrc} />
      <div className={styles.listPanel}>
        {amenities.map((amenity) => (
          <button
            key={amenity.id}
            type="button"
            className={`${styles.listButton} ${
              selectedAmenity.id === amenity.id ? styles.listButtonActive : ""
            }`}
            onClick={() => setSelectedAmenity(amenity)}
          >
            {amenity.name}
          </button>
        ))}
      </div>
      <div
        className={`${styles.infoCard} ${expanded ? styles.infoCardExpanded : ""}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className={styles.infoCardBody}>
          <div className={styles.thumbnailRow}>
            {thumbnails?.length >= 2 ? (
              thumbnails.slice(0, 2).map((thumb) => (
                <img key={thumb} src={thumb} alt={selectedAmenity.name} className={styles.thumbnail} />
              ))
            ) : (
              thumbnails?.[0] && (
                <img src={thumbnails[0]} alt={selectedAmenity.name} className={styles.thumbnailSingle} />
              )
            )}
          </div>
          <div className={styles.infoCardContent}>
            <div className={styles.infoCardTitle}>{selectedAmenity.name}</div>
            <p className={styles.infoCardDescription}>{selectedAmenity.description}</p>
          </div>
        </div>
        <div className={styles.infoCardFooter}>
          <button type="button" className={styles.inquireButton} onClick={onInquireClick}>
            Inquire now
          </button>
        </div>
      </div>
      <div className={styles.mobileInquire}>
        <button type="button" className={styles.inquireButton} onClick={onInquireClick}>
          Inquire Now
        </button>
      </div>
    </div>
  );
};

const SurroundingsSection = ({ propertyName, onInquireClick }) => {
  const query = propertyName ? encodeURIComponent(propertyName) : "Bengaluru";
  const embedUrl = `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={styles.sectionLayer}>
      <div className={styles.mapLabel}>Surroundings</div>
      <iframe title="Surroundings map" src={embedUrl} className={styles.mapFrame} loading="lazy" />
      <div className={styles.mobileInquire}>
        <button type="button" className={styles.inquireButton} onClick={onInquireClick}>
          Inquire Now
        </button>
      </div>
    </div>
  );
};

const InteriorSection = ({ propertyId, onInquireClick }) => {
  const isMobile = useIsMobile();
  const isNight = useNightVideoSchedule();
  const [interiors, setInteriors] = useState([]);
  const [selectedInterior, setSelectedInterior] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      if (!propertyId) {
        setError("No property selected");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchInteriors(propertyId);
        if (cancelled) return;
        setInteriors(data.interiors || []);
        const defaultInterior =
          data.interiors?.find((item) => item.id === data.defaultSelectedId) ||
          data.interiors?.[0] ||
          null;
        setSelectedInterior(defaultInterior);
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load interiors");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  useEffect(() => {
    setExpanded(true);
    const timer = setTimeout(() => setExpanded(false), 5000);
    return () => clearTimeout(timer);
  }, [selectedInterior]);

  if (!propertyId) return <div className={styles.centerState}>Select a property to view interiors.</div>;
  if (loading) return <div className={styles.centerState}>Loading interiors...</div>;
  if (error || !selectedInterior) {
    return <div className={`${styles.centerState} ${styles.centerStateError}`}>Error: {error || "No interiors available"}</div>;
  }

  const videoSrc = resolveVideoUrl(selectedInterior, isMobile);
  const thumbnails =
    isMobile && selectedInterior.thumbnailImagesMobile?.length === 2
      ? selectedInterior.thumbnailImagesMobile
      : selectedInterior.thumbnailImages;

  return (
    <div className={styles.sectionLayer}>
      <VideoPlayer key={`${selectedInterior.id}-${videoSrc}-${isNight}`} src={videoSrc} />
      <div className={styles.listPanel}>
        {interiors.map((interior) => (
          <button
            key={interior.id}
            type="button"
            className={`${styles.listButton} ${
              selectedInterior.id === interior.id ? styles.listButtonActive : ""
            }`}
            onClick={() => setSelectedInterior(interior)}
          >
            {interior.name}
          </button>
        ))}
      </div>
      <div
        className={`${styles.infoCard} ${expanded ? styles.infoCardExpanded : ""}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className={styles.infoCardBody}>
          <div className={styles.thumbnailRow}>
            {thumbnails?.length >= 2 ? (
              thumbnails.slice(0, 2).map((thumb) => (
                <img key={thumb} src={thumb} alt={selectedInterior.name} className={styles.thumbnail} />
              ))
            ) : (
              thumbnails?.[0] && (
                <img src={thumbnails[0]} alt={selectedInterior.name} className={styles.thumbnailSingle} />
              )
            )}
          </div>
          <div className={styles.infoCardContent}>
            <div className={styles.infoCardTitle}>{selectedInterior.name}</div>
            <p className={styles.infoCardDescription}>{selectedInterior.description}</p>
          </div>
        </div>
        <div className={styles.infoCardFooter}>
          <button type="button" className={styles.inquireButton} onClick={onInquireClick}>
            Inquire now
          </button>
        </div>
      </div>
      <div className={styles.mobileInquire}>
        <button type="button" className={styles.inquireButton} onClick={onInquireClick}>
          Inquire Now
        </button>
      </div>
    </div>
  );
};

const LaunchExperienceViewer = ({ view3durl, propertySlug, onExit }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(undefined);
  const [selectedPropertySlug, setSelectedPropertySlug] = useState(undefined);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const initialSlug = useMemo(
    () => propertySlug || extractSlugFromView3dUrl(view3durl),
    [propertySlug, view3durl]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadProperties() {
      try {
        const list = await fetchVideoProperties();
        if (cancelled) return;

        setProperties(list);
        if (list.length === 0) return;

        const matched = initialSlug
          ? list.find((item) => item.slug === initialSlug)
          : list[0];

        if (matched) {
          setSelectedPropertyId(matched._id);
          setSelectedPropertySlug(matched.slug);
        }
      } catch (error) {
        console.error("Error loading launch experience properties:", error);
      }
    }

    loadProperties();
    return () => {
      cancelled = true;
    };
  }, [initialSlug]);

  const currentPropertyName =
    properties.find((item) => item._id === selectedPropertyId)?.name || "Property";

  const tabs = [
    { id: "home", label: "Home", icon: HiHome },
    { id: "amenities", label: "Amenities", icon: AmenitiesIcon },
    { id: "surroundings", label: "Surroundings", icon: HiOutlineLocationMarker },
    { id: "interior", label: "Interior", icon: InteriorIcon },
  ];

  return (
    <div className={styles.launchExperienceRoot}>
      {activeTab === "home" && (
        <HomeSection
          selectedSlug={selectedPropertySlug || initialSlug}
          onInquireClick={() => setIsInquiryOpen(true)}
        />
      )}
      {activeTab === "amenities" && (
        <AmenitiesSection
          propertyId={selectedPropertyId}
          onInquireClick={() => setIsInquiryOpen(true)}
        />
      )}
      {activeTab === "surroundings" && (
        <SurroundingsSection
          propertyName={currentPropertyName !== "Property" ? currentPropertyName : undefined}
          onInquireClick={() => setIsInquiryOpen(true)}
        />
      )}
      {activeTab === "interior" && (
        <InteriorSection
          propertyId={selectedPropertyId}
          onInquireClick={() => setIsInquiryOpen(true)}
        />
      )}

      <div className={styles.navigationBar}>
        <div className={styles.navigationInner}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`${styles.navButton} ${isActive ? styles.navButtonActive : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon />
                <span className={styles.navButtonLabel}>{tab.label}</span>
              </button>
            );
          })}
          <button type="button" className={styles.navButton} onClick={onExit}>
            <IoClose />
            <span className={styles.navButtonLabel}>Exit</span>
          </button>
        </div>
      </div>

      <InquiryDialog
        open={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        propertyId={selectedPropertyId}
        propertyName={currentPropertyName !== "Property" ? currentPropertyName : undefined}
      />
    </div>
  );
};

export default LaunchExperienceViewer;
