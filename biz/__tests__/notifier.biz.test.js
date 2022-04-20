const NotifierBiz = require('../task.registry/notifier.biz');
const TEMPLATE = require('../../constants/template');
const CONFIGURATIONS = require('../../constants/configurations');
const uuid = require('uuid/v1');
const httpContext = require('express-http-context');



test('Positive test for NotifierBiz.notify()', async () => {
    let event = Object.keys(TEMPLATE.NOTIFY)[0];
    await expect(new NotifierBiz().notify({event})).resolves.toBeTruthy();
});

test('Negative test for test for NotifierBiz.notify()', async () => {
    let event = 'ERROR_TEMPLATE';
    await expect(new NotifierBiz().notify({event})).rejects.toThrow('No config found.');
});

test('Positive test for NotifierBiz.fetch_report_data()', async () => {
    let event = Object.keys(CONFIGURATIONS.HANDLER)[0];
    await expect(new NotifierBiz().fetch_report_data({event})).resolves.toBeTruthy();
});

test('Negative test for test for NotifierBiz.fetch_report_data()', async () => {
    let event = 'ERROR_TEMPLATE';
    await expect(new NotifierBiz().fetch_report_data({event})).resolves.toMatchObject({});
});

// test('Positive test for NotifierBiz.send_report()', async () => {
//     let event = 'NOTIFIER_SAMPLE';
//     httpContext.set('uuid', 'TEST_CASE');
//     httpContext.set('event', event);
//     let content = TEMPLATE.NOTIFY[event];
//     await expect(new NotifierBiz().send_report(event,content)).resolves.toBe();
//     httpContext.remove('uuid');
// });