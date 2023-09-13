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


------------------------
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


------------------------
## Using `html-pdf` under WSL2

I've run this lib on Windows ecosystem before and it was fine there out-of-the-box, but `html-pdf` have known issue when run under WSL. 

First off, the `zoom` factor in UNIX system seems to be broken, causing generated PDF looks enlarged and not fit. Thus, generating PDF with this library requires playing with the `zoom` value until the desired output is reached. 

Second, there is issue with SSL. The issue list in their github have different entries related to this issue and various workaround. Some requires actually changing system env value, others by changing prop value being passed to underlying library used by the lib.

> INFO: `html-pdf` has been deprecated. And their github actually suggested its user to use `puppeteer` instead.


## Installing puppeteer in WSL2 (Windows 11)

Same with `html-pdf` above, instaling `puppeteer` in Windows does not requires additional step to get it working. However, this lib also requires additional step when run from WSL2.

With puppeteer, I first need to install chrome headless package using the one included in the library under `node_modules/` folder to get the correct version required by the lib to function correctly.

Then I need to install additional lib as below to get it working: (reference to [[Cypress doc ](https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites))

```
apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

There are also multiple entries about these issues in their github, so, do take a look there if you have issues with this lib. I might've missed a step or two here since I didn't document everything I did to make this lib work in my system.
