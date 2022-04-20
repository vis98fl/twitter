const ExcelBiz = require('../excel.biz');
const fs = require('fs');

test('Positive test for ExcelBiz.create()', async () => {
    let sample_data = [{
        "row1" : "column1",
        "row2" : "column2",
        "row3" : "column3",
        "row4" : "column4",
    }];
    let result = await new ExcelBiz().create(sample_data);
    fs.unlink(result.path,(err)=>{});
    expect(result).toBeTruthy();
});

test('Positive test for ExcelBiz.buffer()', async () => {
    let sample_data = [{
        "row1" : "column1",
        "row2" : "column2",
        "row3" : "column3",
        "row4" : "column4",
    }];
    expect(await new ExcelBiz().buffer(sample_data)).toBeTruthy();
});

test('Negative test for ExcelBiz.create()', async () => {
    await expect(new ExcelBiz().create([])).resolves.toBeFalsy();
});

test('Negative test for ExcelBiz.buffer()', async () => {
    await expect(new ExcelBiz().buffer([])).resolves.toBeFalsy();
});