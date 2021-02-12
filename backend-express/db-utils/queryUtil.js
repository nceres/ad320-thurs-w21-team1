exports.sendQuery = (query, connection) => {
    return new Promise(function (resolve, reject)
    {
        if (!connection) {
            console.log("connection to db failed");
            return reject("error");
        }

        results = connection.query(
            query,
            function (err, results) {
                if (err) {
                    return err;
                }
                resolve(results);
            })
    })
}
