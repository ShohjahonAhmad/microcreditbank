export type LoanCalculationInput = {
  amount: number;
  termMonths: number;
  annualInterestRate: number;
};

export type LoanCalculationResult = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
};

const MONTHS_PER_YEAR = 12;

function roundToCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculateLoanRepayment({
  amount,
  termMonths,
  annualInterestRate,
}: LoanCalculationInput): LoanCalculationResult {
  if (
    !Number.isFinite(amount) ||
    !Number.isFinite(termMonths) ||
    !Number.isFinite(annualInterestRate) ||
    amount <= 0 ||
    termMonths <= 0 ||
    annualInterestRate < 0
  ) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
    };
  }

  const monthlyRate = annualInterestRate / 100 / MONTHS_PER_YEAR;

  if (monthlyRate === 0) {
    const monthlyPayment = roundToCurrency(amount / termMonths);
    const totalPayment = roundToCurrency(monthlyPayment * termMonths);

    return {
      monthlyPayment,
      totalPayment,
      totalInterest: roundToCurrency(totalPayment - amount),
    };
  }

  const growthFactor = (1 + monthlyRate) ** termMonths;
  const monthlyPayment = roundToCurrency(
    (amount * monthlyRate * growthFactor) / (growthFactor - 1),
  );
  const totalPayment = roundToCurrency(monthlyPayment * termMonths);

  return {
    monthlyPayment,
    totalPayment,
    totalInterest: roundToCurrency(totalPayment - amount),
  };
}
