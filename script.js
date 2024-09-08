const fs = require('fs');
const prompt = require('prompt-sync')();

let open = prompt("Digite um número que seja 1, 2 ou 3: ");
let num = parseInt(open);

if (!isNaN(num) && [1, 2, 3].includes(num)) {
    fs.readFile('matriz.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('error: ', err);
            return;
        }

        let lines = data.trim().split('\n');
        let length = parseInt(lines[0]);
        let matrix = [];
        let i = 1;

        while (i < lines.length) {
            let line = lines[i].trim().split(' ').map(Number);
            matrix.push(line);
            i++;
        }
        console.table(matrix);

        if (num == 1) {
      
            if (matrix.length >= 2) {
                [matrix[0], matrix[1]] = [matrix[1], matrix[0]];
            }

            for (let x = 0; x < length; x++) {
                console.log(matrix[x].join(' '));
            }
        }

        if (num == 2) {
            let value = null;
            for (let x = 0; x < matrix.length; x++) {
                for (let y = 0; y < matrix[x].length; y++) {
                    if (!Number.isInteger(matrix[x][y])) {
                        value = matrix[x][y];
                        break;
                    }
                }
                if (value !== null) break;
            }

            if (value !== null) {
                for (let i = 0; i < matrix[0].length; i++) {
                    matrix[0][i] *= value;
                }
            }

            for (let x = 0; x < length; x++) {
                console.log(matrix[x].join(' '));
            }
        }

        if (num == 3) {
            let value = null;
            for (let x = 0; x < matrix.length; x++) {
                for (let y = 0; y < matrix[x].length; y++) {
                    if (!Number.isInteger(matrix[x][y])) {
                        value = matrix[x][y];
                        break;
                    }
                }
                if (value !== null) break;
            }

            if (matrix.length >= 2) {
                for (let x = 0; x < matrix[matrix.length - 1].length; x++) {
                    matrix[matrix.length - 1][x] = (matrix[matrix.length - 2][x] * value) + matrix[matrix.length - 1][x];
                }
            }

            for (let x = 0; x < length; x++) {
                console.log(matrix[x].join(' '));
            }
        }
    });
} else {
    console.log("Por favor, digite um número válido (1, 2 ou 3).");
}