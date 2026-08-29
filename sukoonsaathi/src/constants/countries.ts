// ============================================================
//  SukoonSaathi — Countries Constant
//  Curated country list with flags & standardized naming
// ============================================================

export interface CountryOption {
  value: string;
  label: string;
}

export const COUNTRY_OPTIONS: CountryOption[] = [
  { value: 'India', label: '🇮🇳 India' },
  { value: 'USA', label: '🇺🇸 United States (USA)' },
  { value: 'UK', label: '🇬🇧 United Kingdom (UK)' },
  { value: 'Canada', label: '🇨🇦 Canada' },
  { value: 'Australia', label: '🇦🇺 Australia' },
  { value: 'Germany', label: '🇩🇪 Germany' },
  { value: 'France', label: '🇫🇷 France' },
  { value: 'Brazil', label: '🇧🇷 Brazil' },
  { value: 'Mexico', label: '🇲🇽 Mexico' },
  { value: 'Turkey', label: '🇹🇷 Turkey' },
  { value: 'United Arab Emirates', label: '🇦🇪 United Arab Emirates' },
  { value: 'Singapore', label: '🇸🇬 Singapore' },
  { value: 'Japan', label: '🇯🇵 Japan' },
  { value: 'South Korea', label: '🇰🇷 South Korea' },
  { value: 'China', label: '🇨🇳 China' },
  { value: 'Russia', label: '🇷🇺 Russia' },
  { value: 'Italy', label: '🇮🇹 Italy' },
  { value: 'Spain', label: '🇪🇸 Spain' },
  { value: 'Netherlands', label: '🇳🇱 Netherlands' },
  { value: 'Sweden', label: '🇸🇪 Sweden' },
  { value: 'Switzerland', label: '🇨🇭 Switzerland' },
  { value: 'New Zealand', label: '🇳🇿 New Zealand' },
  { value: 'South Africa', label: '🇿🇦 South Africa' },
  { value: 'Nigeria', label: '🇳🇬 Nigeria' },
  { value: 'Kenya', label: '🇰🇪 Kenya' },
  { value: 'Egypt', label: '🇪🇬 Egypt' },
  { value: 'Saudi Arabia', label: '🇸🇦 Saudi Arabia' },
  { value: 'Indonesia', label: '🇮🇩 Indonesia' },
  { value: 'Malaysia', label: '🇲🇾 Malaysia' },
  { value: 'Philippines', label: '🇵🇭 Philippines' },
  { value: 'Vietnam', label: '🇻🇳 Vietnam' },
  { value: 'Thailand', label: '🇹🇭 Thailand' },
  { value: 'Pakistan', label: '🇵🇰 Pakistan' },
  { value: 'Bangladesh', label: '🇧🇩 Bangladesh' },
  { value: 'Nepal', label: '🇳🇵 Nepal' },
  { value: 'Sri Lanka', label: '🇱🇰 Sri Lanka' },
  { value: 'Argentina', label: '🇦🇷 Argentina' },
  { value: 'Colombia', label: '🇨🇴 Colombia' },
  { value: 'Chile', label: '🇨🇱 Chile' },
  { value: 'Ireland', label: '🇮🇪 Ireland' },
  { value: 'Poland', label: '🇵🇱 Poland' },
  { value: 'Norway', label: '🇳🇴 Norway' },
  { value: 'Denmark', label: '🇩🇰 Denmark' },
  { value: 'Finland', label: '🇫🇮 Finland' },
  { value: 'Other', label: '🌍 Other / International' },
];

export const VALID_COUNTRY_VALUES = new Set(COUNTRY_OPTIONS.map(c => c.value));
