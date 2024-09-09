const fs = require('fs');

class MatrixOperations {
    constructor() {
        this.matrix = [];
        this.n = 0;
        this.operation = null;
        this.entries = [];
    }

    // Classe de exceção personalizada
    static NonStandardEntries() {
        return new Error("NON-STANDARD ENTRIES");
    }

    // Inicializar a operação
    initOperation(items) {
        try {
            this.entries = items.slice(1);
            this.operation = parseInt(items[0]);

            if ((this.operation === 1 || this.operation === 2) && this.entries.length === 2) return;
            if (this.operation === 3 && this.entries.length === 3) return;

            throw MatrixOperations.NonStandardEntries();
        } catch (e) {
            if (e.message === "NON-STANDARD ENTRIES") {
                console.error(`ERROR: ${e.message}`);
            }
        }
    }

    printOperation() {
        console.log(`operação: ${this.operation}`);
        console.log(`entradas: ${this.entries}`);
    }

    // Criar a matriz com tamanho n x n
    createMatrix(n) {
        this.n = n;
        this.matrix = Array.from({ length: n }, () => Array(n).fill(0));
    }

    defineColumn(i, column) {
        this.matrix[i] = column;
    }

    executeOperation() {
        if (this.operation === 1) {
            this.changeLine(parseInt(this.entries[0]), parseInt(this.entries[1]));
        } else if (this.operation === 2) {
            this.multiplication(parseInt(this.entries[0]), this.entries[1]);
        } else if (this.operation === 3) {
            this.sumMultiplication(parseInt(this.entries[0]), parseInt(this.entries[1]), this.entries[2]);
        }
    }

    changeLine(i, j) {
        const temp = this.matrix[i];
        this.matrix[i] = this.matrix[j];
        this.matrix[j] = temp;
    }

    multiplication(i, k) {
        this.matrix[i] = this.matrix[i].map(item => parseFloat((item * k).toFixed(2)));
    }

    sumMultiplication(i, j, k) {
        const column = this.matrix[i].map(item => parseFloat((item * k).toFixed(2)));
        for (let idx = 0; idx < column.length; idx++) {
            this.matrix[j][idx] += column[idx];
        }
    }

    printMatrix() {
        console.log("Matriz:");
        this.matrix.forEach((column, i) => {
            console.log(`${i}: ${column}`);
        });
    }

  s
    static readFile(file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const lines = data.trim().split('\n');
            const matrixOps = new MatrixOperations();
            for (let i = 0; i < lines.length; i++) {
                if (i === 0) {
                    matrixOps.createMatrix(parseInt(lines[i]));
                } else if (i <= matrixOps.n && i !== 0) {
                    const column = lines[i].split(" ").map(parseFloat);
                    matrixOps.defineColumn(i - 1, column);
                } else if (i > matrixOps.n) {
                    console.log("antes da operação");
                    matrixOps.printMatrix();
                    const items = lines[i].split(" ").map(parseFloat);
                    matrixOps.initOperation(items);
                    matrixOps.printOperation();
                    matrixOps.executeOperation();
                    console.log("após a operação");
                    matrixOps.printMatrix();
                }
            }
        });
    }
}

MatrixOperations.readFile('matriz.txt');
