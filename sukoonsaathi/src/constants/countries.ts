// ============================================================
//  SukoonSaathi — Countries Constant
//  Organized country list with flags & structured groups
// ============================================================

export interface CountryOption {
  value: string;
  label: string;
}

export interface CountryGroup {
  groupName: string;
  options: CountryOption[];
}

export const POPULAR_COUNTRIES: CountryOption[] = [
  { value: 'India', label: '🇮🇳 India' },
  { value: 'USA', label: '🇺🇸 United States (USA)' },
  { value: 'UK', label: '🇬🇧 United Kingdom (UK)' },
  { value: 'Canada', label: '🇨🇦 Canada' },
  { value: 'Australia', label: '🇦🇺 Australia' },
  { value: 'Germany', label: '🇩🇪 Germany' },
  { value: 'France', label: '🇫🇷 France' },
  { value: 'Brazil', label: '🇧🇷 Brazil' },
  { value: 'United Arab Emirates', label: '🇦🇪 United Arab Emirates' },
  { value: 'Singapore', label: '🇸🇬 Singapore' },
];

export const ALL_OTHER_COUNTRIES: CountryOption[] = [
  { value: 'Argentina', label: '🇦🇷 Argentina' },
  { value: 'Bangladesh', label: '🇧🇩 Bangladesh' },
  { value: 'Chile', label: '🇨🇱 Chile' },
  { value: 'China', label: '🇨🇳 China' },
  { value: 'Colombia', label: '🇨🇴 Colombia' },
  { value: 'Denmark', label: '🇩🇰 Denmark' },
  { value: 'Egypt', label: '🇪🇬 Egypt' },
  { value: 'Finland', label: '🇫🇮 Finland' },
  { value: 'Indonesia', label: '🇮🇩 Indonesia' },
  { value: 'Ireland', label: '🇮🇪 Ireland' },
  { value: 'Italy', label: '🇮🇹 Italy' },
  { value: 'Japan', label: '🇯🇵 Japan' },
  { value: 'Kenya', label: '🇰🇪 Kenya' },
  { value: 'Malaysia', label: '🇲🇾 Malaysia' },
  { value: 'Mexico', label: '🇲🇽 Mexico' },
  { value: 'Nepal', label: '🇳🇵 Nepal' },
  { value: 'Netherlands', label: '🇳🇱 Netherlands' },
  { value: 'New Zealand', label: '🇳🇿 New Zealand' },
  { value: 'Nigeria', label: '🇳🇬 Nigeria' },
  { value: 'Norway', label: '🇳🇴 Norway' },
  { value: 'Pakistan', label: '🇵🇰 Pakistan' },
  { value: 'Philippines', label: '🇵🇭 Philippines' },
  { value: 'Poland', label: '🇵🇱 Poland' },
  { value: 'Russia', label: '🇷🇺 Russia' },
  { value: 'Saudi Arabia', label: '🇸🇦 Saudi Arabia' },
  { value: 'South Africa', label: '🇿🇦 South Africa' },
  { value: 'South Korea', label: '🇰🇷 South Korea' },
  { value: 'Spain', label: '🇪🇸 Spain' },
  { value: 'Sri Lanka', label: '🇱🇰 Sri Lanka' },
  { value: 'Sweden', label: '🇸🇪 Sweden' },
  { value: 'Switzerland', label: '🇨🇭 Switzerland' },
  { value: 'Thailand', label: '🇹🇭 Thailand' },
  { value: 'Turkey', label: '🇹🇷 Turkey' },
  { value: 'Vietnam', label: '🇻🇳 Vietnam' },
  { value: 'Other', label: '🌍 Other / International' },
];

export const COUNTRY_GROUPS: CountryGroup[] = [
  { groupName: '⭐ Popular Regions', options: POPULAR_COUNTRIES },
  { groupName: '🌐 All Other Countries', options: ALL_OTHER_COUNTRIES },
];

export const COUNTRY_OPTIONS: CountryOption[] = [
  ...POPULAR_COUNTRIES,
  ...ALL_OTHER_COUNTRIES,
];

export const VALID_COUNTRY_VALUES = new Set(COUNTRY_OPTIONS.map(c => c.value));
