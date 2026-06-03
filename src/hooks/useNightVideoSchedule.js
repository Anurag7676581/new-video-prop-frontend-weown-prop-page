import { useEffect, useState } from "react";
import { isNightTime } from "../utils/videoSchedule";

export default function useNightVideoSchedule() {
  const [isNight, setIsNight] = useState(() => isNightTime());

  useEffect(() => {
    const update = () => setIsNight(isNightTime());
    update();
    const intervalId = window.setInterval(update, 60000);
    return () => window.clearInterval(intervalId);
  }, []);

  return isNight;
}
