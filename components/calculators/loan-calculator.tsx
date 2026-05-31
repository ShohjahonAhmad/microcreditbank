"use client";

import { useMemo, useState } from "react";

import { calculateLoanRepayment } from "@/lib/calculators/loan";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

type LoanCalculatorContent = Dictionary["loanCalculator"];

type LoanCalculatorProps = {
  locale: Locale;
  content: LoanCalculatorContent;
};

const DEFAULT_AMOUNT = 25_000_000;
const DEFAULT_TERM_MONTHS = 36;
const DEFAULT_INTEREST_RATE = 26;

export function LoanCalculator({ locale, content }: LoanCalculatorProps) {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [termMonths, setTermMonths] = useState(DEFAULT_TERM_MONTHS);
  const [annualInterestRate, setAnnualInterestRate] = useState(
    DEFAULT_INTEREST_RATE,
  );

  const result = useMemo(
    () =>
      calculateLoanRepayment({
        amount,
        termMonths,
        annualInterestRate,
      }),
    [amount, annualInterestRate, termMonths],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {content.calculator.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {content.calculator.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {content.calculator.subtitle}
            </p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
            {content.calculator.currency}
          </span>
        </div>

        <div className="mt-8 grid gap-5">
          <NumberField
            label={content.calculator.inputs.amount}
            value={amount}
            onChange={setAmount}
            min={0}
            step={100_000}
          />
          <NumberField
            label={content.calculator.inputs.term}
            value={termMonths}
            onChange={setTermMonths}
            min={1}
            step={1}
          />
          <NumberField
            label={content.calculator.inputs.rate}
            value={annualInterestRate}
            onChange={setAnnualInterestRate}
            min={0}
            step={0.1}
          />
        </div>

        <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          {content.calculator.note}
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

        <div className="mt-8 grid gap-4">
          <ResultCard
            label={content.results.monthlyPayment}
            value={formatMoney(locale, result.monthlyPayment, content.calculator.currency)}
          />
          <ResultCard
            label={content.results.totalPayment}
            value={formatMoney(locale, result.totalPayment, content.calculator.currency)}
          />
          <ResultCard
            label={content.results.totalInterest}
            value={formatMoney(locale, result.totalInterest, content.calculator.currency)}
          />
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

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}

function formatMoney(locale: Locale, value: number, currency: string) {
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)} ${currency}`;
}
