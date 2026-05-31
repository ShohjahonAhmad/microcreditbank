"use client";

import { useMemo, useState } from "react";

import {
  convertCurrency,
  getExchangeRate,
  supportedCurrencies,
  type CurrencyCode,
  type ExchangeRates,
} from "@/lib/services/exchange-rates";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

type CurrencyConverterContent = Dictionary["currencyConverter"];

type CurrencyConverterProps = {
  locale: Locale;
  rates: ExchangeRates;
  content: CurrencyConverterContent;
};

const DEFAULT_AMOUNT = 1_000_000;

export function CurrencyConverter({
  locale,
  rates,
  content,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("UZS");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("USD");

  const convertedAmount = useMemo(
    () => convertCurrency(amount, fromCurrency, toCurrency, rates),
    [amount, fromCurrency, rates, toCurrency],
  );

  const exchangeRate = useMemo(
    () => getExchangeRate(fromCurrency, toCurrency, rates),
    [fromCurrency, rates, toCurrency],
  );

  const baseRates = supportedCurrencies.map((currency) => ({
    currency,
    value: currency === "UZS" ? 1 : 1 / rates[currency],
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {content.converter.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {content.converter.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {content.converter.subtitle}
            </p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
            {content.converter.note}
          </span>
        </div>

        <div className="mt-8 grid gap-5">
          <NumberField
            label={content.converter.inputs.amount}
            value={amount}
            onChange={setAmount}
            min={0}
            step={1000}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label={content.converter.inputs.from}
              value={fromCurrency}
              onChange={setFromCurrency}
              options={supportedCurrencies.map((currency) => ({
                value: currency,
                label: `${currency} — ${content.converter.currencyNames[currency]}`,
              }))}
            />

            <SelectField
              label={content.converter.inputs.to}
              value={toCurrency}
              onChange={setToCurrency}
              options={supportedCurrencies.map((currency) => ({
                value: currency,
                label: `${currency} — ${content.converter.currencyNames[currency]}`,
              }))}
            />
          </div>
        </div>

        <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          {content.converter.helper}
        </p>
      </form>

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          {content.results.eyebrow}
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          {content.results.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          {content.results.subtitle}
        </p>

        <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {content.results.convertedAmount}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {formatMoney(locale, convertedAmount, toCurrency)}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {content.results.exchangeRate}: 1 {fromCurrency} ={" "}
            {formatRate(locale, exchangeRate)} {toCurrency}
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {baseRates.map((item) => (
            <div
              key={item.currency}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {content.results.referenceRate}
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-950">
                1 {item.currency} = {formatRate(locale, item.value)} UZS
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: CurrencyCode;
  options: Array<{ value: CurrencyCode; label: string }>;
  onChange: (value: CurrencyCode) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as CurrencyCode)}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function formatMoney(locale: Locale, value: number, currency: CurrencyCode) {
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)} ${currency}`;
}

function formatRate(locale: Locale, value: number) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 4,
    minimumFractionDigits: 4,
  }).format(value);
}
