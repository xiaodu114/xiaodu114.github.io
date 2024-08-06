class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class CellByPoint {
    constructor(left_bottom, left_top, right_top, right_bottom) {
        this.left_bottom = left_bottom;
        this.left_top = left_top;
        this.right_top = right_top;
        this.right_bottom = right_bottom;
    }
}

class CellByIndex {
    constructor(row_start, row_end, col_start, col_end) {
        this.row_start = row_start;
        this.row_end = row_end;
        this.col_start = col_start;
        this.col_end = col_end;
        this.value = undefined;
    }
}

function is_same_row(row_cells, cell) {
    if (!(Array.isArray(row_cells) && row_cells.length)) return false;
    return Math.abs(row_cells[0].left_top.y - cell.left_top.y) < 1;
}

function is_same_col(col_cells, cell) {
    if (!(Array.isArray(col_cells) && col_cells.length)) return false;
    return Math.abs(col_cells[0].left_top.x - cell.left_top.x) < 1;
}

//  获取拥有最多列的数据行或者拥有最多行的数据列
function getMaxRowOrColumn(items) {
    let maxIndex = 0;
    items.forEach((item, index) => {
        if (item.length > items[maxIndex].length) {
            maxIndex = index;
        }
    });
    return items[maxIndex];
}

function findStartOrEndIndex(items, fn) {
    let index = -1,
        distance = 1;
    do {
        let callback = fn(distance);
        index = items.findIndex(callback);
        distance++;
    } while (index === -1);
    return index;
}

function convertPolygons2Cells(polygons) {
    //  polygons = polygons.sort((a, b) => a[1] - b[1]);
    let cells = [],
        ret_cells = [],
        rows = [],
        columns = [];
    polygons.forEach((p) => {
        let cell = new CellByPoint(new Point(p[0], p[1]), new Point(p[2], p[3]), new Point(p[4], p[5]), new Point(p[6], p[7]));
        let current_row = rows.filter((row) => is_same_row(row, cell))[0];
        if (current_row) {
            current_row.push(cell);
        } else {
            rows.push([cell]);
        }
        let current_col = columns.filter((col) => is_same_col(col, cell))[0];
        if (current_col) {
            current_col.push(cell);
        } else {
            columns.push([cell]);
        }
        cells.push(cell);
    });
    let maxColumnsRow = getMaxRowOrColumn(rows).sort((a, b) => a.left_top.x - b.left_top.x);
    let maxRowsColumn = getMaxRowOrColumn(columns).sort((a, b) => a.left_top.y - b.left_top.y);

    cells.forEach((cell) => {
        let ret_cell = new CellByIndex();

        ret_cell.col_start = findStartOrEndIndex(maxColumnsRow, (distance) => {
            return (x) => Math.abs(x.left_top.x - cell.left_top.x) < distance;
        });
        ret_cell.col_end =
            findStartOrEndIndex(maxColumnsRow, (distance) => {
                return (x) => Math.abs(x.right_top.x - cell.right_top.x) < distance;
            }) + 1;

        ret_cell.row_start = findStartOrEndIndex(maxRowsColumn, (distance) => {
            return (x) => Math.abs(x.left_bottom.y - cell.left_bottom.y) < distance;
        });
        ret_cell.row_end =
            findStartOrEndIndex(maxRowsColumn, (distance) => {
                return (x) => Math.abs(x.left_top.y - cell.left_top.y) < distance;
            }) + 1;
        ret_cell.value = cell;
        ret_cells.push(ret_cell);
    });

    return ret_cells;
}

let cells = convertPolygons2Cells([
    [8.9934406e2, 2.2367218e1, 8.9907465e2, 6.6049179e1, 9.6210693e2, 6.6438789e1, 9.620481e2, 2.2414009e1],
    [2.2531709e-2, 6.6498352e1, 4.3287415e-2, 1.5411264e2, 1.2647951e2, 1.5399678e2, 1.2642674e2, 6.649942e1],
    [9.620481e2, 2.2414009e1, 9.6210693e2, 6.6438789e1, 1.0461195e3, 6.6400604e1, 1.0460298e3, 2.2337753e1],
    [2.7820746e2, 2.2402374e1, 2.7806985e2, 6.6353775e1, 3.4130109e2, 6.6575035e1, 3.4091721e2, 2.2461657e1],
    [1.2563289e2, 2.2353481e1, 1.2642674e2, 6.649942e1, 2.7806985e2, 6.6353775e1, 2.7820746e2, 2.2402374e1],
    [2.7806985e2, 6.6353775e1, 2.7806e2, 1.5401778e2, 3.4138425e2, 1.539644e2, 3.4130109e2, 6.6575035e1],
    [7.2493091e2, 1.5385052e2, 7.2501343e2, 1.7545e2, 8.3710095e2, 1.7539763e2, 8.3702771e2, 1.539039e2],
    [7.2499408e2, 8.8192162e1, 7.2491266e2, 1.0985639e2, 8.3696423e2, 1.0985707e2, 8.3707532e2, 8.8168243e1],
    [9.4345376e-2, 2.2816322e1, 2.2531709e-2, 6.6498352e1, 1.2642674e2, 6.649942e1, 1.2563289e2, 2.2353481e1],
    [9.6210693e2, 6.6438789e1, 9.6200659e2, 1.5402325e2, 1.0459965e3, 1.5398048e2, 1.0461195e3, 6.6400604e1],
    [1.0460298e3, 2.2337753e1, 1.0461195e3, 6.6400604e1, 1.1090449e3, 6.6356834e1, 1.1091862e3, 2.2225557e1],
    [9.6200659e2, 1.5402325e2, 9.6188068e2, 2.2038879e2, 1.0457874e3, 2.2039897e2, 1.0459965e3, 1.5398048e2],
    [2.7806e2, 1.5401778e2, 2.780575e2, 2.2025378e2, 3.4115341e2, 2.2001488e2, 3.4138425e2, 1.539644e2],
    [3.4130109e2, 6.6575035e1, 3.4138425e2, 1.539644e2, 4.3784271e2, 1.5400987e2, 4.3791501e2, 6.638427e1],
    [3.4091721e2, 2.2461657e1, 3.4130109e2, 6.6575035e1, 4.3791501e2, 6.638427e1, 4.3777545e2, 2.2936596e1],
    [7.2491266e2, 1.0985639e2, 7.2491217e2, 1.3182747e2, 8.3701874e2, 1.3188063e2, 8.3696423e2, 1.0985707e2],
    [8.9913434e2, 1.5384967e2, 8.9911133e2, 2.2051633e2, 9.6188068e2, 2.2038879e2, 9.6200659e2, 1.5402325e2],
    [7.2501343e2, 1.7545e2, 7.2488806e2, 1.9790143e2, 8.3697571e2, 1.9783879e2, 8.3710095e2, 1.7539763e2],
    [8.9907465e2, 6.6049179e1, 8.9913434e2, 1.5384967e2, 9.6200659e2, 1.5402325e2, 9.6210693e2, 6.6438789e1],
    [4.3791501e2, 6.638427e1, 4.3784271e2, 1.5400987e2, 5.1090558e2, 1.5405165e2, 5.1076944e2, 6.6464195e1],
    [1.2647951e2, 1.5399678e2, 1.2578421e2, 2.2032602e2, 2.780575e2, 2.2025378e2, 2.7806e2, 1.5401778e2],
    [1.2642674e2, 6.649942e1, 1.2647951e2, 1.5399678e2, 2.7806e2, 1.5401778e2, 2.7806985e2, 6.6353775e1],
    [5.1094864e2, 2.2973497e1, 5.1076944e2, 6.6464195e1, 5.5801013e2, 6.6278305e1, 5.5780096e2, 2.2676514e1],
    [8.3702771e2, 1.539039e2, 8.3710095e2, 1.7539763e2, 8.9932117e2, 1.7616638e2, 8.9913434e2, 1.5384967e2],
    [1.0459965e3, 1.5398048e2, 1.0457874e3, 2.2039897e2, 1.1091151e3, 2.2040274e2, 1.1090804e3, 1.5392326e2],
    [5.5792554e2, 1.5390945e2, 5.5788629e2, 1.7668199e2, 6.3677777e2, 1.7531635e2, 6.367793e2, 1.5389081e2],
    [1.1091862e3, 2.2225557e1, 1.1090449e3, 6.6356834e1, 1.1893606e3, 6.693988e1, 1.1893119e3, 2.3008049e1],
    [8.3707532e2, 8.8168243e1, 8.3696423e2, 1.0985707e2, 8.9932953e2, 1.0978722e2, 8.9935114e2, 8.8055267e1],
    [7.2488806e2, 1.9790143e2, 7.2469897e2, 2.2030595e2, 8.3670563e2, 2.2032359e2, 8.3697571e2, 1.9783879e2],
    [1.0461195e3, 6.6400604e1, 1.0459965e3, 1.5398048e2, 1.1090804e3, 1.5392326e2, 1.1090449e3, 6.6356834e1],
    [4.3287415e-2, 1.5411264e2, -1.4131163e-2, 2.2024901e2, 1.2578421e2, 2.2032602e2, 1.2647951e2, 1.5399678e2],
    [8.3696423e2, 1.0985707e2, 8.3701874e2, 1.3188063e2, 8.9918994e2, 1.3187828e2, 8.9932953e2, 1.0978722e2],
    [5.5788629e2, 1.7668199e2, 5.5804816e2, 1.9784157e2, 6.3677631e2, 1.9790683e2, 6.3677777e2, 1.7531635e2],
    [5.5789661e2, 8.8846939e1, 5.5792529e2, 1.0998275e2, 6.3665063e2, 1.0971676e2, 6.3677454e2, 8.8145149e1],
    [5.1076944e2, 6.6464195e1, 5.1090558e2, 1.5405165e2, 5.5792554e2, 1.5390945e2, 5.5801013e2, 6.6278305e1],
    [4.3784271e2, 1.5400987e2, 4.3780463e2, 2.2014832e2, 5.1087457e2, 2.2026054e2, 5.1090558e2, 1.5405165e2],
    [8.3710095e2, 1.7539763e2, 8.3697571e2, 1.9783879e2, 8.9926733e2, 1.9795366e2, 8.9932117e2, 1.7616638e2],
    [3.4138425e2, 1.539644e2, 3.4115341e2, 2.2001488e2, 4.3780463e2, 2.2014832e2, 4.3784271e2, 1.5400987e2],
    [5.5792529e2, 1.0998275e2, 5.5823602e2, 1.3186952e2, 6.3685742e2, 1.3196881e2, 6.3665063e2, 1.0971676e2],
    [7.2497412e2, 6.6090416e1, 7.2499408e2, 8.8192162e1, 8.3707532e2, 8.8168243e1, 8.3702808e2, 6.5991211e1],
    [7.2491217e2, 1.3182747e2, 7.2493091e2, 1.5385052e2, 8.3702771e2, 1.539039e2, 8.3701874e2, 1.3188063e2],
    [5.5804816e2, 1.9784157e2, 5.581087e2, 2.2019763e2, 6.3697327e2, 2.2038416e2, 6.3677631e2, 1.9790683e2],
    [8.3702808e2, 6.5991211e1, 8.3707532e2, 8.8168243e1, 8.9935114e2, 8.8055267e1, 8.9907465e2, 6.6049179e1],
    [5.1090558e2, 1.5405165e2, 5.1087457e2, 2.2026054e2, 5.581087e2, 2.2019763e2, 5.5792554e2, 1.5390945e2],
    [6.3677777e2, 1.7531635e2, 6.3677631e2, 1.9790683e2, 7.2488806e2, 1.9790143e2, 7.2501343e2, 1.7545e2],
    [5.5780096e2, 2.2676514e1, 5.5799994e2, 4.406451e1, 7.252511e2, 4.4159481e1, 7.2515106e2, 2.2736971e1],
    [5.5801013e2, 6.6278305e1, 5.5789661e2, 8.8846939e1, 6.3677454e2, 8.8145149e1, 6.367179e2, 6.5991386e1],
    [6.3677631e2, 1.9790683e2, 6.3697327e2, 2.2038416e2, 7.2469897e2, 2.2030595e2, 7.2488806e2, 1.9790143e2],
    [6.3677454e2, 8.8145149e1, 6.3665063e2, 1.0971676e2, 7.2491266e2, 1.0985639e2, 7.2499408e2, 8.8192162e1],
    [1.1090449e3, 6.6356834e1, 1.1090804e3, 1.5392326e2, 1.1893518e3, 1.5390163e2, 1.1893606e3, 6.693988e1],
    [8.3701874e2, 1.3188063e2, 8.3702771e2, 1.539039e2, 8.9913434e2, 1.5384967e2, 8.9918994e2, 1.3187828e2],
    [4.3777545e2, 2.2936596e1, 4.3791501e2, 6.638427e1, 5.1076944e2, 6.6464195e1, 5.1094864e2, 2.2973497e1],
    [6.3665063e2, 1.0971676e2, 6.3685742e2, 1.3196881e2, 7.2491217e2, 1.3182747e2, 7.2491266e2, 1.0985639e2],
    [5.5799994e2, 4.406451e1, 5.5801013e2, 6.6278305e1, 6.367179e2, 6.5991386e1, 6.3710919e2, 4.4115429e1],
    [7.2515106e2, 2.2736971e1, 7.252511e2, 4.4159481e1, 8.9902637e2, 4.4048851e1, 8.9934406e2, 2.2367218e1],
    [6.367793e2, 1.5389081e2, 6.3677777e2, 1.7531635e2, 7.2501343e2, 1.7545e2, 7.2493091e2, 1.5385052e2],
    [5.5823602e2, 1.3186952e2, 5.5792554e2, 1.5390945e2, 6.367793e2, 1.5389081e2, 6.3685742e2, 1.3196881e2],
    [8.3697571e2, 1.9783879e2, 8.3670563e2, 2.2032359e2, 8.9911133e2, 2.2051633e2, 8.9926733e2, 1.9795366e2],
    [1.1090804e3, 1.5392326e2, 1.1091151e3, 2.2040274e2, 1.1893966e3, 2.2087473e2, 1.1893518e3, 1.5390163e2],
    [8.370354e2, 4.370689e1, 8.3702808e2, 6.5991211e1, 8.9907465e2, 6.6049179e1, 8.9902637e2, 4.4048851e1],
    [6.3710919e2, 4.4115429e1, 6.367179e2, 6.5991386e1, 7.2497412e2, 6.6090416e1, 7.252511e2, 4.4159481e1],
    [6.367179e2, 6.5991386e1, 6.3677454e2, 8.8145149e1, 7.2499408e2, 8.8192162e1, 7.2497412e2, 6.6090416e1],
    [6.3685742e2, 1.3196881e2, 6.367793e2, 1.5389081e2, 7.2493091e2, 1.5385052e2, 7.2491217e2, 1.3182747e2],
    [7.252511e2, 4.4159481e1, 7.2497412e2, 6.6090416e1, 8.3702808e2, 6.5991211e1, 8.370354e2, 4.370689e1]
]);

const div = document.createElement("div");
div.style.overflow = "auto";
div.insertAdjacentHTML("afterbegin", `<h1>起始行:结束行:起始列:结束列</h1>`);
const canvas = document.createElement("canvas");
canvas.width = 1200;
canvas.height = 300;

function draw(cell) {
    if (!canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeRect(cell.value.left_top.x, cell.value.left_top.y, cell.value.right_top.x - cell.value.left_top.x, cell.value.left_bottom.y - cell.value.left_top.y);
    ctx.fillText(`${cell.row_start}:${cell.row_end}:${cell.col_start}:${cell.col_end}`, cell.value.left_top.x, cell.value.left_top.y);
}
cells.forEach((cell) => {
    draw(cell);
});

div.appendChild(canvas);
document.body.appendChild(div);
