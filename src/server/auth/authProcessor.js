const ilog = require('../module/improvedConsoleLog');

module.exports = function (request, response) {
    if (!request) {
        throw new Error('[Error] authProcessor.js: There is no \'request\' parameter.');
    }

    if (!response) {
        throw new Error('[Error] authProcessor.js: There is no \'response\' parameter.');
    }
    const InputType = {
        CREATE: 'create',
        READ: 'read',
        UPDATE: 'update',
        DELETE: 'delete'
    }

    const sessionName = request.params.session;
    const inputType = request.params.inputType;

    ilog.all({ sessionName: sessionName });
    ilog.all({ inputType: inputType });

    const verifyInput = () => {
        let permission = false;
        Object.values(InputType).forEach(element => {
            if (element === inputType) {
                permission = true;
            }
        })
        return permission;
    }
    if (!verifyInput(inputType)) {
        throw new Error('[Error] authProcessor.js: Invalid inputType.');
    }

    let sessionResult = {
        validity: null,
        value: null
    };

    const sessionOperator = {
        [InputType.READ]() {
            let session = request.session[sessionName];
            
            if (session) {
                sessionResult.validity = true;
                sessionResult.value = session;
            } else {
                const NO_SESSION_VALUE = 'Sesssion value is not exist.'
                sessionResult.validity = false;
                sessionResult.value = NO_SESSION_VALUE;
            }

            return sessionResult;
        },
        [InputType.UPDATE]() {
            const queryString = request.query;
            const sessionUpdate = queryString.session;
            console.log('sessionUpdate', sessionUpdate);

            request.session[sessionName] = sessionUpdate;

            console.log('session', request.session[sessionName]);

            const session = request.session[sessionName];

            if (session) {
                sessionResult.validity = true;
                sessionResult.value = session;
            } else {
                const UPDATE_FAILD = 'Faild to update session.';
                sessionResult.validity = false;
                sessionResult.value = UPDATE_FAILD;
            }

            return sessionResult;
        },
        [InputType.DELETE]() {
            request.session.destroy();

            const DESTROY_SUCCESS = 'Session has been destroyed.'
            sessionResult.validity = true;
            sessionResult.value = DESTROY_SUCCESS;

            return sessionResult;
        }
    }

    const validity = sessionResult.validity;
    const value = sessionResult.value;

    ilog.middle(' Session Start ');
    ilog.all({ validity: validity });
    ilog.all({ value: value });
    ilog.middle(' Session Finish ');

    const resultObject = sessionOperator[inputType]();

    response.send(resultObject);
}