export interface FireResult {
    fireNumber: number;
    yearsToFire: number;
    monthsToFire: number;
    totalInvested: number;
    projection: Array<{
        year: number;
        value: number;
        isFire: boolean;
    }>;
}

export function calculateFIRE(
    monthlySpend: number,
    currentAssets: number,
    monthlyContribution: number,
    safeWithdrawalRate: number = 4, // %
    annualROIEstimate: number = 8, // % (Nominal ROI - Inflation)
): FireResult {
    const fireNumber = (monthlySpend * 12) / (safeWithdrawalRate / 100);
    const monthlyROI = Math.pow(1 + annualROIEstimate / 100, 1 / 12) - 1;

    let currentBalance = currentAssets;
    let months = 0;
    const projection: Array<{ year: number; value: number; isFire: boolean }> = [];

    // Projection for the next 40 years maximum
    for (let year = 1; year <= 40; year++) {
        for (let month = 1; month <= 12; month++) {
            if (currentBalance < fireNumber) {
                currentBalance = currentBalance * (1 + monthlyROI) + monthlyContribution;
                months++;
            }
        }

        projection.push({
            year,
            value: currentBalance,
            isFire: currentBalance >= fireNumber
        });

        if (currentBalance >= fireNumber && projection.length >= 10) {
            // We found FIRE, but we want at least 10 entries for the chart
            if (year >= 15) break;
        }
    }

    return {
        fireNumber,
        yearsToFire: Math.floor(months / 12),
        monthsToFire: months % 12,
        totalInvested: currentBalance,
        projection
    };
}
