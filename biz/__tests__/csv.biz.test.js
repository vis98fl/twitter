const CsvBiz = require('../csv.biz');
const fs = require('fs');

test('Positive test for CsvBiz.create()', async () => {
    let sample_data = [{
        "row1" : "column1",
        "row2" : "column2",
        "row3" : "column3",
        "row4" : "column4",
    }];
    let result = await new CsvBiz().create(sample_data);
    fs.unlink(result.path,(err)=>{});
    expect(result).toBeTruthy();
});

test('Positive test for CsvBiz.buffer()', async () => {
    let sample_data = [{
        "row1" : "column1",
        "row2" : "column2",
        "row3" : "column3",
        "row4" : "column4",
    }];
    expect(await new CsvBiz().buffer(sample_data)).toBeTruthy();
});

test('Negative test for CsvBiz.create()', async () => {
    await expect(new CsvBiz().create([])).resolves.toBeFalsy();
});

test('Negative test for CsvBiz.buffer()', async () => {
    await expect(new CsvBiz().buffer([])).resolves.toBeFalsy();
});