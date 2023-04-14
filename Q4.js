function permute(arr, k, size, visited, matrix) {
    if (k === size) {
        matrix.push([...arr]);
    } else {
        for (let i = 0; i < size; i++) {
            if (!visited[i]) {
                visited[i] = true;
                arr.push(1 << i);
                permute(arr, k + 1, size, visited, matrix);
                arr.pop();
                visited[i] = false;
            }
        }
    }
}

function printPermMatrices(n) {
    const matrix = [];
    const visited = new Array(n).fill(false);
    permute([], 0, n, visited, matrix);

    for (let i = 0; i < matrix.length; i++) {
        const permMatrix = new Array(n).fill().map(() => new Array(n).fill(0));
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                if (matrix[i][j] & (1 << k)) {
                    permMatrix[j][k] = 1;
                }
            }
        }
        console.log(permMatrix);
    }
}

// Example usage
printPermMatrices(3);
