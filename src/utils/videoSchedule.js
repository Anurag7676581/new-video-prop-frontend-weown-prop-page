const NIGHT_START_HOUR =
  parseInt(process.env.REACT_APP_NIGHT_VIDEO_START_HOUR, 10) || 17;
const VIDEO_TIMEZONE =
  process.env.REACT_APP_VIDEO_TIMEZONE || "Asia/Kolkata";

export function getHourInTimezone(date = new Date(), timezone = VIDEO_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);

  const hourPart = parts.find((part) => part.type === "hour");
  return hourPart ? parseInt(hourPart.value, 10) : date.getHours();
}

export function isNightTime(date = new Date()) {
  return getHourInTimezone(date) >= NIGHT_START_HOUR;
}

export function resolveVideoUrl(source = {}, isMobile = false, date = new Date()) {
  const night = isNightTime(date);
  const dayDesktop = source?.videoUrl;
  const dayMobile = source?.videoUrlMobile || source?.videoUrl;
  const nightDesktop = source?.videoUrlNight;
  const nightMobile = source?.videoUrlMobileNight || source?.videoUrlNight;

  if (night) {
    const nightSrc = isMobile
      ? nightMobile || nightDesktop
      : nightDesktop || nightMobile;
    if (nightSrc) return nightSrc;
  }

  return isMobile ? dayMobile : dayDesktop;
}
