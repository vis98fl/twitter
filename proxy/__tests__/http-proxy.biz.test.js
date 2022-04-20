const HttpProxy = require('../http-proxy');
const API_SUIT = require('../../constants/api-suit.json');

test('Positive test for HttpProxy.prepare_options()', async () => {
    let data = {
        name : "Shane Belgal",
        originator_loan_code : "TEST",
        action  : 'SEND_OFFERS_TEST_REPORT'
    };
    const API = API_SUIT.CO_DOCUMENT_SEND_REPORT;
    await expect(new HttpProxy(API,data,data).prepare_options()).toBeDefined();
});
test('Positive test for HttpProxy.prepare_options()', async () => {
    let data = {
        name : "Shane Belgal",
        originator_loan_code : "TEST",
        action  : 'SEND_OFFERS_TEST_REPORT'
    };
    //application/x-www-form-urlencoded
    let API = JSON.parse(JSON.stringify(API_SUIT.CO_DOCUMENT_SEND_REPORT));
    API.service = "cocommunication-test";
    await expect(new HttpProxy(API,data,data).prepare_options()).toBeDefined();
});


test('Positive test for HttpProxy.set_headers()', async () => {
    let data = {
        name : "Shane Belgal",
        originator_loan_code : "TEST",
        action  : 'SEND_OFFERS_TEST_REPORT'
    };
    let header = {
        "x-api-key" : "TESTCASE"
    }
    //application/x-www-form-urlencoded
    let API = JSON.parse(JSON.stringify(API_SUIT.CO_DOCUMENT_SEND_REPORT));
    API.service = "cocommunication-test";
    await expect(new HttpProxy(API,data,data).set_headers(header)).toBeTruthy();
});
