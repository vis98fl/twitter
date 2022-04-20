const SqlBiz = require('../sql.biz');
const QUERY = require('../../constants/queryRepo');


test('Positive test for SqlBiz.get()', async () => {
    await expect(new SqlBiz().get({},QUERY.sql.NOTIFIER_SAMPLE)).resolves.toBeDefined();
});

test('Negative test for SqlBiz.get()', async () => {
    let query = 'SELECT * FROM loan_productstes';
    await expect(new SqlBiz().get({},query)).rejects.toThrow();
});

test('Positive test for SqlBiz.select()', async () => {
    await expect(new SqlBiz().select({},QUERY.sql.NOTIFIER_SAMPLE)).resolves.toBeDefined();
});

test('Negative test for SqlBiz.select()', async () => {
    let query = 'SELECT * FROM loan_productstes';
    await expect(new SqlBiz().select({},query)).rejects.toThrow();
});


test('Positive test for SqlBiz.get_one()', async () => {
    await expect(new SqlBiz().get_one({},QUERY.sql.SAMPLE_REPORT)).resolves.toBeDefined();
});


test('Negative test for SqlBiz.get_one()', async () => {
    let query = 'SELECT * FROM loan_productstes';
    await expect(new SqlBiz().get_one({},query)).rejects.toThrow();
});

test('Positive test for SqlBiz.insert()', async () => {
    let query = `INSERT INTO users_bck (name, email, password, colender_id,is_active)VALUES('TEST_USER','${new Date().getTime()}@FLEXILOANS.COM','TEST','1','1')`;
    let data = {
        email : `${new Date().getTime()}@FLEXILOANS.COM`
    }
    await expect(new SqlBiz().insert(query,data)).resolves.toBeDefined();
});

test('Negative test for SqlBiz.insert()', async () => {
    let query = `INSERT INTO users_bck (name, email, password, colender_id,is_active)VALUES('TEST_USER','TEST@FLEXILOANS.COM','TEST','1','1')`;
    let data = {

    }
    await expect(new SqlBiz().insert(query,data)).rejects.toThrow();
});

test('Positive test for SqlBiz.update()', async () => {
    let query = `UPDATE users_bck SET is_active=0 WHERE email='TEST@FLEXILOANS.COM'`;
    let data = {

    }
    await expect(new SqlBiz().update(query,data)).resolves.toBeDefined();
});


test('Negative test for SqlBiz.update()', async () => {
    let query = `UPDATE users_bcktest SET is_active=0 WHERE email='TEST@FLEXILOANS.COM'`;
    let data = {

    }
    await expect(new SqlBiz().update(query,data)).rejects.toThrow();
});


