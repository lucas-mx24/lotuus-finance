export interface CompoundInterestResult {
    totalInvested: number
    totalInterest: number
    finalAmount: number
    projection: Array<{
        month: number
        year: number
        invested: number
        interest: number
        total: number
    }>
}

/**
 * Calculates compound interest considering initial principal and regular monthly contributions.
 * 
 * @param principal Initial amount invested
 * @param monthlyContribution Amount added at the end of each month
 * @param annualInterestRate Annual interest rate in percentage (e.g., 10 for 10%)
 * @param years Number of years the money is invested
 * @returns Object containing totals and a projection array
 */
export function calculateCompoundInterest(
    principal: number,
    monthlyContribution: number,
    annualInterestRate: number,
    years: number
): CompoundInterestResult {
    const months = years * 12;
    // Handle 0% interest rate explicitly to avoid division by zero or unexpected outputs later
    const monthlyRate = annualInterestRate === 0 ? 0 : Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1;

    let currentPrincipal = principal;
    let accumulatedInterest = 0;
    const projection = [];

    // Push year 0 (now)
    projection.push({
        month: 0,
        year: 0,
        invested: principal,
        interest: 0,
        total: principal
    });

    for (let m = 1; m <= months; m++) {
        // Interest applies to the current balance before the new contribution
        const interestForMonth = (currentPrincipal + accumulatedInterest) * monthlyRate;
        accumulatedInterest += interestForMonth;

        currentPrincipal += monthlyContribution;

        // Save data points yearly or at the very last month
        if (m % 12 === 0 || m === months) {
            projection.push({
                month: m,
                year: m / 12, // Can be fractional for the last month if years wasn't an integer, but normally it is
                invested: currentPrincipal,
                interest: accumulatedInterest,
                total: currentPrincipal + accumulatedInterest
            });
        }
    }

    const finalAmount = currentPrincipal + accumulatedInterest;

    return {
        totalInvested: currentPrincipal,
        totalInterest: accumulatedInterest,
        finalAmount: finalAmount,
        projection
    };
}
