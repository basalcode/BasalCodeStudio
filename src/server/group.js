module.exports = {
    create: function (req, res) {
        (async () => {
            DBOperator.init(
                req,
                DBOperator.InputType.CREATE,
                DBOperator.ContentType.GROUP
            );

            res.send({
                result: await DBOperator.run()
            });
        })();
    },
    read: function (req, res) {
        (async () => {
            DBOperator.init(
                req,
                DBOperator.InputType.READ,
                DBOperator.ContentType.GROUP
            );

            res.send({
                result: await DBOperator.run()
            });
        })();
    },
    update: function (req, res) {
        (async () => {
            DBOperator.init(
                req,
                DBOperator.InputType.UPDATE,
                DBOperator.ContentType.GROUP
            );

            res.send({
                result: await DBOperator.run()
            });
        })();
    },
    delete: function (req, res) {
        (async () => {
            DBOperator.init(
                req,
                DBOperator.InputType.DELETE,
                DBOperator.ContentType.GROUP
            );

            res.send({
                result: await DBOperator.run()
            });
        })();
    }
}
