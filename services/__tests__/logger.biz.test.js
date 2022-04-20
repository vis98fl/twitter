const Logger = require('../logger');
const logger = require('../winstonLogging');
global.logger = logger();

test('Positive test for Logger.error() status 400', async () => {
    let data = {
        code : 400,
        request : "TEST_REQUEST",
        originator_loan_code : "TEST"
    };
    await expect(new Logger().error(data,400,"TESTCASE")).resolves.toBeTruthy();
});
test('Positive test for Logger.error() status 200', async () => {
    let data = {
        code : 200,
        request : "TEST_REQUEST",
        originator_loan_code : "TEST"
    };
    await expect(new Logger().error(data,200,"TESTCASE")).resolves.toBeTruthy();
});

test('Positive test for Logger.request()', async () => {
    let data = {
        uuid : 'TEST',
        event : 'TEST',
        originator_loan_code : 'TEST',
        request: { data : 'TEST'},
        response: { success : true},
        action: 'TESTCASE',
        config : { data : 'TEST_CONFIG'},
        cron_tab : 'TESTCASE'
    };
    await expect(new Logger().request(data)).resolves.toBeTruthy();
});

test('Positive test for Logger.service_calls()', async () => {
    let data = {
        uuid : 'TEST',
        event : 'TEST',
        originator_loan_code : 'TEST',
        request: { data : 'TEST'},
        response: { success : true},
        action: 'TESTCASE',
        config : { data : 'TEST_CONFIG'},
        cron_tab : 'TESTCASE'
    };
    await expect(new Logger().service_calls(data)).resolves.toBeTruthy();
});

