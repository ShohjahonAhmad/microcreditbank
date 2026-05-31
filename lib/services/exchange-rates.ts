export const supportedCurrencies = ["UZS", "USD", "RUB"] as const;

export type CurrencyCode = (typeof supportedCurrencies)[number];

export type ExchangeRates = Record<CurrencyCode, number>;

export type ExchangeRateProvider = {
  getRates(): ExchangeRates;
};

export const mockExchangeRates: ExchangeRates = {
  UZS: 1,
  USD: 1 / 12_550,
  RUB: 1 / 135,
};

export const mockExchangeRateProvider: ExchangeRateProvider = {
  getRates() {
    return mockExchangeRates;
  },
};

export function getExchangeRate(
  from: CurrencyCode,
  to: CurrencyCode,
  rates: ExchangeRates,
) {
  return rates[to] / rates[from];
}

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rates: ExchangeRates,
) {
  return amount * getExchangeRate(from, to, rates);
}
