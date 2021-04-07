# eliftech-ita-test-task

## How to start the project

Use the package manager [npm](https://www.npmjs.com/)

in bash enter next commands (in dir: eliftech-ita-test-task/ ):
```bash
npm run heroku-postbuild #command for build project (also uses on heroku)
```
and
```bash
npm run start #to start the project
```
now you can open this project by [this URL](http://localhost:5000/) (http://localhost:5000/)

## Checks
### create/edit bank

* Name
  * at least 1 symb
* Interest rate %
  * min: 1, max: 100
* Maximum loan
  * min: 1
* Minimum down payment %
  * min: 1, max: 100
* Loan term (month count)
  * min: 1

### calculate mortgage
* Initial loan
  * min: 1
* Down payment
  * min: Initial loan * (bank interest rate / 100)

# completed mvp + all bonus tasks:
- [x] mortgage table
- [x] mortgages history
- [x] Some animations
- [x] Auth
