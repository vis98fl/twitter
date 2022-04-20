const Helper = require('../helper.utility');

test('Positive test for dateFormatter()', async () => {
    await expect(Helper.dateFormatter('2020/11/23','YYYY/MM/DD','YYYY-MM-DD')).toBe('2020-11-23');
});

test('Negative test for dateFormatter()', async () => {
    await expect(Helper.dateFormatter(null,'YYYY/MM/DD','YYYY-MM-DD')).toBeDefined();
});

test('Positive test for dateFormatter()', async () => {
    await expect(Helper.dateFormatter('CURRENT_TIMESTAMP','YYYY/MM/DD','YYYY-MM-DD')).toBeDefined();
});

test('Positive test for timeStamp()', async () => {
    await expect(Helper.timeStamp()).toBeDefined();
});

test('Positive test for now()', async () => {
    await expect(Helper.now()).toBeDefined();
});

test('Positive test for timeStampToDateTime()', async () => {
    await expect(Helper.timeStampToDateTime(Helper.now())).toBeTruthy();
});

test('Positive test for timeStampToDateTime()', async () => {
    await expect(Helper.timeStampToDateTime(null)).toBeTruthy();
});

test('Positive test for map()', async () => {
    let characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred',   'age': 40 }
    ];
    let key = 'name';
    await expect(Helper.map(characters,key)).toContain('barney');
});


test('Positive test for length()', async () => {
    let characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred',   'age': 40 }
    ];
    await expect(Helper.length(characters)).toBe(2);
});

test('Negative test for length()', async () => {
    await expect(Helper.length(null)).toBe(1);
});

test('Positive test for intersection()', async () => {
    let a = [1, 2, 3];
    let b = [5, 2, 1, 4];
    await expect(Helper.intersection(a,b)).toContain(2);
});

test('Positive test for difference()', async () => {
    let a = [1, 2, 3];
    let b = [5, 2, 1, 4];
    await expect(Helper.difference(a,b)).toContain(3);
});

test('Positive test for dateToNumberFormatter()', async () => {
    await expect(Helper.dateToNumberFormatter('years','1992/11/23','YYYY/MM/DD')).toBe(28);
});

test('Negative test for dateToNumberFormatter()', async () => {
    await expect(Helper.dateToNumberFormatter('years',null,'YYYY/MM/DD')).toBe(null);
});

test('Positive test for timestamp()', async () => {
    await expect(Helper.timestamp()).toBeDefined();
});

test('Positive test for splitName()', async () => {
    let name = {
        "firstName":"shane",
        "middleName":"anthony",
        "lastName":"belgal"
    }
    await expect(Helper.splitName('shane anthony belgal')).toBeDefined();
});

test('Negative test for splitName()', async () => {
    await expect(Helper.splitName(null)).toBeDefined();
});

test('Positive test for _splitName()', async () => {
    let name = {
        name : 'shane anthony belgal'
    }
    await expect(Helper._splitName('name',name)).toBeDefined();
});

test('Negative test for _splitName()', async () => {
    let name = {
        name : 'shane anthony belgal'
    }
    await expect(Helper._splitName(null,name)).toBeDefined();
});

test('Negative test for _splitName()', async () => {
    let name = {
        name : 'shane anthony belgal'
    }
    await expect(Helper._splitName('name1',name)).toBeDefined();
});

test('Positive test for split()', async () => {
    await expect(Helper.split('shane,anthony,belgal')).toContain('shane');
});

test('Negative test for split()', async () => {
    await expect(Helper.split(null)).toBeDefined();
});


test('Positive test for json_parse()', async () => {
    let num = "{\"num\" : 1}";
    await expect(Helper.json_parse(num)).toBeDefined();
});

test('Positive test for json_stringify()', async () => {
    let name = {
        name : 'shane anthony belgal'
    }
    await expect(Helper.json_stringify(name)).toBeDefined();
});


test('Negative test for json_stringify()', async () => {
    await expect(Helper.json_stringify(null)).toBe(null);
});

test('Positive test for to_string()', async () => {
    await expect(Helper.to_string('Shane')).toBe('Shane');
});


test('Negative test for to_string()', async () => {
    await expect(Helper.to_string(null)).toBe(null);
});


test('Positive test for clean()', async () => {
    let name = {
        "firstName":"shane",
        "middleName":"anthony",
        "lastName":"belgal"
    }
    await expect(Helper.clean(name,'firstName')).toBe('shane');
});

test('Negative test for clean()', async () => {
    let name = {
        "firstName":"shane",
        "middleName":"anthony",
        "lastName":"belgal"
    }
    await expect(Helper.clean(name,'firstName1')).toBe(null);
});

test('Positive test for split_address()', async () => {
    let address = "sinquerim, bardez north goa";
    await expect(Helper.split_address(address,null,2)).toBeDefined();
});

test('Negative test for split_address()', async () => {
    await expect(Helper.split_address(null)).toBeDefined();
});


test('Positive test for substring()', async () => {
    let name = "shaneanthonybelgal";
    await expect(Helper.substring(name,0,5)).toBe('shane');
});

test('Negative test for substring()', async () => {
    await expect(Helper.substring(null)).toBe(null);
});


test('Positive test for clip()', async () => {
    let num = "123.1234";
    await expect(Helper.clip(num,2)).toBe(123.12);
});

test('Negative test for clip()', async () => {
    await expect(Helper.clip(null,'2')).toBe(null);
});


test('Positive test for string_func()', async () => {
    let name = "shane";
    await expect(Helper.string_func(name,'toUpperCase')).toBe('SHANE');
});

test('Negative test for string_func()', async () => {
    let name = "shane";
    await expect(Helper.string_func(name,'toUpperCase1')).toBe(null);
});


test('Positive test for string_concat()', async () => {
    let name = "shane";
    await expect(Helper.string_concat(name,'toUpperCase')).toBe('shane toUpperCase');
});
