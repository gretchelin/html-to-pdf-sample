# html-to-pdf-sample

This is a sample project to generate PDF from HTML in NodeJS using `puppeteer` and `html-pdf` for comparison

## Running the project

- Install all dependencies
  
```
npm i
```

- Running the server

```
node serve-http port=8080
```

The command will run the server at `http://localhost:8080`. To change the `port`, for example using port 9000, pass `port=9000` as argument.


## Generating PDF

There are 2 ways of PDF generation and each have the generated pdf included here as result sample using the included sample HTML file (`email.html`).

### Use `html-pdf` ([link](https://github.com/marcbachmann/node-html-pdf))

To generate PDF using `html-pdf`. You can navigate to `http://localhost:8080/pdf`. This will stream the PDF result. 
To save the result into file, you can user `http://localhost:8080/pdf?toTile=1` and it will generate the PDF file as `html-pdf.pdf` at the root of the project.


### Use `puppeteer` ([link](https://github.com/puppeteer/puppeteer))

To generate PDF using `puppeteer` you can run this command at the root of the project

```
node puppeteer port=8080 path=email.html
```

This will save the PDF as `email.html_2023-09-13_025934.460.pdf` (filename format: `<path>_<date>_<time>.pdf`)

> - `port` should be the same as the deployed server port. Defaults to 8080.
> - `path` is referring to actual file in the folder: `email.html`. This path is appended to the domain of deployed server, which by defaults is 'http://localhost:8080`.
