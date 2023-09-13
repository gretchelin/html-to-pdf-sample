const fs = require("fs");
const http = require("http");
const pdf = require("html-pdf");

const host = "localhost";
const [n, f, ...args] = process.argv;
const argTag = args.reduce((a, curr, idx) => {
    const argitem = curr.split("=");
    a.set(argitem[0], argitem[1]);
    return a;
}, new Map());
const port = argTag.get("port") || 8080;

const tmpl = fs.readFileSync(require.resolve('./email.html'), 'utf8')

const server = http.createServer(function(req, res) {
    const params = req.url.split('?')?.at(-1)?.split('&')?.reduce((acc, curr) => {
        const [key, val] = curr?.split('=');
        acc.set(key, val);
        return acc;
    }, new Map());

    if (req.url.indexOf("/pdf") === 0) {
        const html = fs.readFileSync(require.resolve('./email.html'), 'utf8')
        const pdfRes = pdf.create(tmpl, {
            width: '210mm',
            height: '297mm',
            zoom: 0.6,
            // this setting is required to fix error due to SSL
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: '/dev/null',
                },
            }
        });

        if (params.get('toFile')) {
            // write to file
            pdfRes.toFile('html-pdf.pdf', function(error, response) {
                if (error) {
                    return error;
                } else {
                    return response;
                }
            });
        } else {

            // stream content
            pdfRes.toStream((err, stream) => {
                if (err) return res.end(err.stack)
                res.setHeader('Content-type', 'application/pdf')
                return stream.pipe(res)
            })
        }
    } else if (req.url == "/") {
        fs.readFile("./index.html", function(err, html) {
            if (err) {
                res.send(500, {
                    error: err
                });
            }
            res.writeHeader(200, {
                "Content-Type": "text/html"
            });
            res.write(html);
            res.end();
        });
    } else if (req.url.indexOf(".html") > 0) {
        const file = req.url.split("/").at(-1);
        fs.readFile("./" + file, function(err, html) {
            if (err) {
                res.send(500, {
                    error: err
                });
            }
            res.writeHeader(200, {
                "Content-Type": "text/html"
            });
            res.write(html);
            res.end();
        });
    }
});

server.listen(port, host, function() {
    console.log("Listening on http://localhost:%s", server.address().port);
});