function production_function(K, L, alpha, A){
    if (K == 0 | L == 0){
        return 0;
    }
    return A * K**alpha * L**(1-alpha);
}

function wage_function(K, L, alpha, A){
    if (K <= 0){
        return 0;
    }
    if (L <= 0){
        return Infinity;
    }
    return A * (1-alpha) * (K/L)**alpha;
}

function make_grid(N){
    /* make an adjacency graph for a grid
    grid[i][j] is adjacency list for (i,j)
    numbering goes from 0 to N-1 */
    let grid = Array();
    for (let i=0; i<N; i++){
        let row = Array();
        for (let j=0; j<N; j++){
            let entry = Array();
            if (i > 0){
                entry.push([i-1, j]);
            }
            if (i < N-1){
                entry.push([i+1, j]);
            }
            if (j > 0){
                entry.push([i, j-1]);
            }
            if (j < N-1){
                entry.push([i, j+1]);
            }
            row.push(entry);
        }
        grid.push(row);
    }
    return grid;
}

function check_if_connection_exists(str, [x1, y1], [x2, y2]){
    /* str is an adjacency structure */
    let rowlen = str[x1][y1].length;
    for (let i=0; i<rowlen; i++){
        if (str[x1][y1][i][0] == x2 & str[x1][y1][i][1] == y2){
            return true;
        }
    }
    return false;
}

function add_connection(str, [x1, y1], [x2, y2]){
    /* should check here whether there is already
    a connection between x and y, otherwise you 
    will get nonsense */
    if (!check_if_connection_exists(str, [x1,y1], [x2,y2])){
        (str[x1][y1]).push([x2, y2]);
        (str[x2][y2]).push([x1, y1]);
    }
    return str;
}

function zero_matrix(N){
    /* make NxN array of 0s*/
    let M = Array();
    for (let i=0; i<N; i++){
        let row = Array();
        for (let j=0; j<N; j++){
            row.push(0);
        }
        M.push(row);
    }
    return M;
}

function random_matrix(N){
    /* make NxN array of random numbers*/
    let M = Array();
    for (let i=0; i<N; i++){
        let row = Array();
        for (let j=0; j<N; j++){
            row.push(Math.random());
        }
        M.push(row);
    }
    return M;
}

function matrix_apply(f, M1, M2){
    /* apply function f entrywise to matrices
    M1 and M2 */
    let NN = M1[0].length;
    let M = zero_matrix(NN);
    for (let i=0; i<NN; i++){
        for (let j=0; j<NN; j++){
            M[i][j] = f(M1[i][j], M2[i][j]);
        }
    }
    return M;  
}

function update(model){
    let wage = function(K, L){
        return model.wage_function(K, L, model.alpha, model.A);
    }
    let production = function(K, L){
        return model.production_function(K, L, model.alpha, model.A);
    }
    let N = model.N;
    let w = matrix_apply(wage, model.K, model.L);
    let L_new = zero_matrix(N);
    let Y = matrix_apply(production, model.K, model.L);
    //console.log(model.K[2]);
    //console.log(model.L[2]);
    //console.log(Y[2]);
    //console.log(production(model.K[2][4], model.L[2][4]));
    //console.log(model.A * model.K[2][4]**model.alpha * model.L[2][4]**(1-alpha));
    let K_new = zero_matrix(N);

    for (let i=0; i<N; i++){
        for (let j=0; j<N; j++){
            // update K with depreciation, diffusion, and production
            K_new[i][j] = (1 - model.delta - model.e)*model.K[i][j] + Y[i][j];
            //if (i==1 & j==1) console.log(K_new[i][j]);

            let a = model.adjacency[i][j]; // a list of pairs
            let wages = Array();
            for (let k=0; k<a.length; k++){
                // add diffusion from neighbours
                let n_nbr = model.adjacency[a[k][0]][a[k][1]].length;
                K_new[i][j] = K_new[i][j] + (model.e/n_nbr)*model.K[a[k][0]][a[k][1]];
                //if (i==1 & j==1) console.log(K_new[i][j]);
                //K_new[i][j] = K_new[i][j] + (model.e/4)*model.K[a[k][0]][a[k][1]];
                // wages at neighbouring nodes
                wages.push(w[a[k][0]][a[k][1]]);
            }
            let where_wages_max = Array();
            let max_wage = w[i][j];
            let home_wage = w[i][j];
            //if (i==15 & j==15) console.log(wages);
            for (let k=0; k<a.length; k++){
                if (wages[k] > max_wage){
                    max_wage = wages[k];
                    where_wages_max = Array();
                    where_wages_max.push(k);
                }
                else if (wages[k] >= max_wage){
                    where_wages_max.push(k);
                }
            }
            /*if (i==15 & j==15){
                console.log(where_wages_max);
                console.log(max_wage);
                console.log(home_wage);
            }*/
            let ml = where_wages_max.length;
            // in this case, nobody moves
            if (max_wage == home_wage){
                ml = 0;
            }
            if (ml > 0){
                for (let k=0; k<ml; k++){
                    /*if (i==15 & j==15){
                        console.log(a[where_wages_max[k]]);
                        console.log("num_nbrs: " + ml);
                        console.log(model.L[15][15])
                    }*/
                    L_new[a[where_wages_max[k]][0]][a[where_wages_max[k]][1]] += model.L[i][j]/ml;
                    //if (i==15 & j==15) console.log(L_new[15][16])
                }
            } /*else {
                L_new[i][j] = model.L[i][j]; // nobody moves
            } 
            // I think we can delete this
            */
        //if (i==15 & j==15) console.log(L_new[15][16])
        }
    }
    //console.log(L_new[15][16]);
    let L = zero_matrix(N);
    for (i=0; i<N; i++){
        for (j=0; j<N; j++){
            if (L_new[i][j] != 0){
                L[i][j] = (model.m * L_new[i][j] + (1-model.m) * model.L[i][j]) * (1 + model.g);
            } else {
                L[i][j] = model.L[i][j]*(1 + model.g);
            }
        }
    }
    let model_updated = {
        'A' : model.A,
        'alpha' : model.alpha,
        'N' : model.N,
        'e' : model.e,
        'delta' : model.delta,
        'm' : model.m,
        'g': model.g,
        'K' : K_new,
        'L' : L,
        'adjacency' : model.adjacency,
        'production_function' : model.production_function,
        'wage_function' : model.wage_function
    };
    return model_updated;
}

/* different versions of the model in global scope*/

/* model with K only to show diffusion */
function make_model(
    N, K, e, m, delta, g, L, adjacency, A, alpha
){
    /*let N = 21;
    let K = zero_matrix(N);
    K[10][10] = 1;
    let e = 0.2;
    let m = 0;
    let delta = 0;
    let g = 0;
    let L = zero_matrix(N);
    let adjacency = make_grid(N);
    let A = 1;
    let alpha = 1/3;
    */

    let model = {
        'A' : A,
        'alpha' : alpha,
        'N' : N,
        'e' : e,
        'delta' : delta,
        'm' : m,
        'g' : g,
        'K' : K,
        'L' : L,
        'adjacency' : adjacency,
        'production_function' : production_function,
        'wage_function' : wage_function
    };
    return model;
}

let K0 = zero_matrix(21);
K0[10][10] = 1;

let K1 = random_matrix(31);
let L1 = random_matrix(31);

var model0 = make_model(
    21,
    K0,
    0.2,
    0,
    0,
    0,
    zero_matrix(21),
    make_grid(21),
    1,
    1/3
);

var model1 = make_model(
    31,
    K1,
    0.01,
    0.02,
    0,
    0,
    L1,
    make_grid(31),
    1,
    1/3
);

function make_grid_with_railway(N){
    let str = make_grid(N);
    for (let i=0; i<N-1; i++){
        for (let j=i+1; j<N; j++){
            str = add_connection(str, [i,i], [j,j]);
        }
    }
    return str;
}

var model2 = make_model(
    31,
    K1,
    0.01,
    0.01,
    0,
    0,
    L1,
    make_grid_with_railway(31),
    1,
    1/3
);

/*
N = 31;
K = zero_matrix(N);
K[5][5] = 1;
e = 0.01;
m = 0.01;
delta = 0;
g = 0.02;
L = zero_matrix(N);
L[15][15] = 1;
adjacency = make_grid(N);
A = 1;
alpha = 1/3;

K = random_matrix(N);
L = random_matrix(N);

model = {
    'A' : A,
    'alpha' : alpha,
    'N' : N,
    'e' : e,
    'delta' : delta,
    'm' : m,
    'g' : g,
    'K' : K,
    'L' : L,
    'adjacency' : adjacency,
    'production_function' : production_function,
    'wage_function' : wage_function
};

model1 = update(model);
model2 = update(model1);
model3 = update(model2);
*/