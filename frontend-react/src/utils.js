
export const logHelper = (logLine) => {
    console.log(JSON.stringify(logLine))
    fetch("/logging", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(logLine)
    }).catch(err => console.log("done threw!")).then(result => console.log("done!"))
}




export default logHelper;
