import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    _initializeAccessControlWithSecret(adminToken: string): Promise<void>;
    createSubscriptionCheckout(planId: string, successUrl: string, cancelUrl: string): Promise<string>;
    verifyCheckoutSession(sessionId: string): Promise<boolean>;
    setStripeKey(key: string): Promise<void>;
}
