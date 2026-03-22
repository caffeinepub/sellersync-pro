import { useCallback, useEffect, useState } from "react";

const TRIAL_KEY = "sellersync_trial_start";
const PLAN_KEY = "sellersync_plan";
const SUBSCRIBED_AT_KEY = "sellersync_subscribed_at";
const TRIAL_DURATION = 600; // 10 minutes

export function useTrialTimer() {
  const [secondsLeft, setSecondsLeft] = useState<number>(TRIAL_DURATION);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(
    () => !!localStorage.getItem(PLAN_KEY),
  );

  useEffect(() => {
    if (!localStorage.getItem(TRIAL_KEY)) {
      localStorage.setItem(TRIAL_KEY, Date.now().toString());
    }
  }, []);

  useEffect(() => {
    if (isSubscribed) return;

    const tick = () => {
      const start = Number(localStorage.getItem(TRIAL_KEY) ?? Date.now());
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const left = Math.max(0, TRIAL_DURATION - elapsed);
      setSecondsLeft(left);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isSubscribed]);

  const subscribe = useCallback((plan: string) => {
    localStorage.setItem(PLAN_KEY, plan);
    localStorage.setItem(SUBSCRIBED_AT_KEY, Date.now().toString());
    setIsSubscribed(true);
  }, []);

  const subscribeFromStripe = useCallback((plan: string) => {
    localStorage.setItem(PLAN_KEY, plan);
    localStorage.setItem(SUBSCRIBED_AT_KEY, Date.now().toString());
    setIsSubscribed(true);
  }, []);

  const trialExpired = secondsLeft === 0 && !isSubscribed;
  const currentPlan = localStorage.getItem(PLAN_KEY);

  return {
    secondsLeft,
    trialExpired,
    isSubscribed,
    subscribe,
    subscribeFromStripe,
    currentPlan,
  };
}
