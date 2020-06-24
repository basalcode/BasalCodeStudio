module.exports = {
    write: function (req, res) {
        (async () => {
            DBOperator.init(
                req,
                DBOperator.InputType.CREATE,
                DBOperator.ContentType.POST
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
                DBOperator.ContentType.POST
            );
    
            res.send({
                result: await DBOperator.run()
            })
        })();
    },
    update: function (req, res) {
        (async () => {
            DBOperator.init(
                req,
                DBOperator.InputType.UPDATE,
                DBOperator.ContentType.POST
            );
    
            res.send({
                result: await DBOperator.run()
            })
        })();
    },
    delete: function (req, res) {
        (async () => {
            DBOperator.init(
                req,
                DBOperator.InputType.DELETE,
                DBOperator.ContentType.POST
            );
    
            res.send({
                result: await DBOperator.run()
            })
        })();
    }
}
