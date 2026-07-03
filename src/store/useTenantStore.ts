import { create } from "zustand";

/**
 * Tenant store — the business/workspace data shown across the dashboard.
 *
 * This exact object used to be copy-pasted into ProfilePage and DocumentsPage,
 * so an edit in one place never showed up in the other. Holding it here means
 * every page reads the same values, and saving the business profile in Profile
 * is instantly reflected wherever else it's displayed (Documents, headers…).
 */

interface BusinessProfile {
  operatingHours: string;
  location: string;
  deliveryOptions: string;
}

interface TenantState {
  id: string;
  businessName: string;
  businessType: string;
  botPersona: string;
  botLanguage: string;
  planTier: "free" | "pro" | "enterprise";
  createdAt: string;
  businessProfile: BusinessProfile;

  setBusinessName: (name: string) => void;
  setBusinessType: (type: string) => void;
  setBotPersona: (persona: string) => void;
  setBusinessProfile: (profile: Partial<BusinessProfile>) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  businessName: "Artisan Brews Co.",
  businessType: "retail",
  botPersona: "professional",
  botLanguage: "en",
  planTier: "free",
  createdAt: "2025-01-15T08:00:00Z",
  businessProfile: {
    operatingHours: "Mon–Fri: 9:00 AM – 6:00 PM, Sat: 10:00 AM – 4:00 PM",
    location: "42 Brew Street, Old Town, Lahore",
    deliveryOptions: "Free local delivery on orders over $50. Standard $5 flat rate otherwise.",
  },

  setBusinessName: (businessName) => set({ businessName }),
  setBusinessType: (businessType) => set({ businessType }),
  setBotPersona: (botPersona) => set({ botPersona }),
  setBusinessProfile: (profile) =>
    set((state) => ({ businessProfile: { ...state.businessProfile, ...profile } })),
}));
