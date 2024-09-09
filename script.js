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

    console.table(matrix);

    let k = 0;
    while (length + k < matrix.length && matrix[length + k][0] != 0) {
        let operation = matrix[length + k][0];
        let i = matrix[length + k][1];
        let j = matrix[length + k][2];

        if (operation == 1) { 
            if (i < matrix.length && j < matrix.length) {
                [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
            }
        } else if (operation == 2) { 
            let valor = matrix[length + k][2]; 
            if (i < matrix.length) {
                matrix[i] = matrix[i].map(value => value * valor);
            }
        } else if (operation == 3) { 
            let valor = matrix[length + k][3];
            if (i < matrix.length && j < matrix.length) {
                if (matrix[i].length == matrix[j].length) { 
                    matrix[j] = matrix[j].map((value, idx) => value + matrix[i][idx] * valor);
                }
            }
        }
        
        k++;
    }


    for(let x = 0; x < length; x++){
        console.log(matrix[x].join(" "))
    }
});
