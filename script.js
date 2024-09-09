const fs = require('fs');

var length = null;
var matrix = [];

fs.readFile('matriz.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('error: ', err);
        return;
    }

    let lines = data.trim().split('\n');
    
    length = parseInt(lines[0]);
    let a = 1;

    while (a < lines.length && lines[a].trim()) {
        let line = lines[a].trim().split(' ').map(Number);
        matrix.push(line);
        a++;
    }

    console.log('Matrix after reading from file:');
    console.table(matrix);

    let opIndex = 0;
    while (length + opIndex < matrix.length && matrix[length + opIndex][0] != 0) {
        let operation = matrix[length + opIndex][0];
        let i = matrix[length + opIndex][1];
        let j = matrix[length + opIndex][2];

        if (operation == 1) { 
            if (i < matrix.length && j < matrix.length) {
                [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
            }
        } else if (operation == 2) { 
            let factor = matrix[length + opIndex][2]; 
            if (i < matrix.length) {
                matrix[i] = matrix[i].map(value => value * factor);
            }
        } else if (operation == 3) { 
            let factor = matrix[length + opIndex][3];
            if (i < matrix.length && j < matrix.length) {
                if (matrix[i].length == matrix[j].length) { 
                    matrix[j] = matrix[j].map((value, idx) => value + matrix[i][idx] * factor);
                } else {
                    console.error('Rows have different lengths, cannot perform operation.');
                }
            }
        }
        
        opIndex++;
    }

    console.log('Matrix after applying operations:');
    console.table(matrix);
});
