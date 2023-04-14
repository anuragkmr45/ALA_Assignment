function augmentedToEchelon(augMatrix) {
    const numRows = augMatrix.length;
    const numCols = augMatrix[0].length;

    // Pivot row starts at the first row
    let pivotRow = 0;

    // Perform Gaussian elimination to reduce the matrix to echelon form
    for (let j = 0; j < numCols - 1; j++) {
        // Find the pivot row for this column
        let pivotFound = false;
        for (let i = pivotRow; i < numRows; i++) {
            if (augMatrix[i][j] !== 0) {
                // Swap the pivot row with the current row if necessary
                if (i !== pivotRow) {
                    [augMatrix[i], augMatrix[pivotRow]] = [augMatrix[pivotRow], augMatrix[i]];
                }
                pivotFound = true;
                break;
            }
        }

        // If a pivot is found for this column, eliminate below it
        if (pivotFound) {
            const pivotVal = augMatrix[pivotRow][j];
            for (let i = pivotRow + 1; i < numRows; i++) {
                const rowFactor = augMatrix[i][j] / pivotVal;
                for (let k = j; k < numCols; k++) {
                    augMatrix[i][k] -= rowFactor * augMatrix[pivotRow][k];
                }
            }
            pivotRow++;
        }
    }

    return augMatrix;
}

function predictSolution(echelonMatrix) {
    const numRows = echelonMatrix.length;
    const numCols = echelonMatrix[0].length;
    const solution = new Array(numCols - 1).fill(0);

    // Solve for each variable starting from the last row
    for (let i = numRows - 1; i >= 0; i--) {
        // Find the first non-zero coefficient in the row
        let j = 0;
        while (j < numCols - 1 && echelonMatrix[i][j] === 0) {
            j++;
        }

        // If there is no non-zero coefficient, skip this row
        if (j === numCols - 1) {
            continue;
        }

        // Calculate the solution for this variable
        let x = echelonMatrix[i][numCols - 1];
        for (let k = j + 1; k < numCols - 1; k++) {
            x -= echelonMatrix[i][k] * solution[k];
        }
        x /= echelonMatrix[i][j];

        // Store the solution for this variable
        solution[j] = x;
    }

    return solution;
}

// Example usage
const augMatrix = [
    [2, 3, 4, 5],
    [4, 5, 6, 7],
    [1, 2, 3, 4]
];

console.log("The augmented matrix is:");
console.log(augMatrix);

const echelonMatrix = augmentedToEchelon(augMatrix);

console.log("The echelon form of the augmented matrix is:");
console.log(echelonMatrix);

const solution = predictSolution(echelonMatrix);

console.log("It's solution :");
console.log(solution);
