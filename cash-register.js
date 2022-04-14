/*
Cash Register

Design a cash register drawer function checkCashRegister()
that accepts purchase price as the first argument (price),
payment as the second argument (cash), and cash-in-drawer (cid)
as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object
with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer
is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer
as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with
the change due in coins and bills, sorted in highest to lowest
order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)

See below for an example of a cash-in-drawer array:

[
["PENNY", 1.01],
["NICKEL", 2.05],
["DIME", 3.1],
["QUARTER", 4.25],
["ONE", 90],
["FIVE", 55],
["TEN", 20],
["TWENTY", 60],
["ONE HUNDRED", 100]
]

Assertions:

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

*/

function checkCashRegister(price, cash, cid) {
  let returnObject = { status: undefined, change: [] }
  let totalCid = []

  const round = (n, d = 2) => Number(Math.round(n + "e" + d) + "e-" + d)

  const prepareChangeArray = (changeArray) => {
    var finalArray = []
    changeArray.forEach(changeItem => {
      let currValue = changeItem[0]
      let currName = changeItem[1]
      var searchDuplIndex = finalArray.findIndex(curr => curr[0] === currName)
      searchDuplIndex === -1
        ? finalArray.push([currName, currValue])
        : finalArray[searchDuplIndex][1] += currValue
    })
    return finalArray
  }

  let currencyValues = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100,
  }

  cid.forEach(curr => {
    let value = curr[1]
    totalCid.push(value)
  })

  // original change value
  var change = parseFloat(cash - price)
  var changeArray = []
  
  while (round(change) !== 0) {
    // total cid
    var total_cid = round(totalCid.reduce((sum, val) => sum + val))

    if (total_cid - round(change) > 0) {
      returnObject.status = 'OPEN'
      let memo = cid.map((cut, index) => {
        return [currencyValues[cut[0].toUpperCase()], cut[0].toUpperCase(), round(cut[1] / currencyValues[cut[0]]), index]
      })

      // filter all currencies where items !== 0
      let availableCidItems = memo.map(currency => {
        let countItems = currency[2]
        return countItems !== 0 ? currency : false
      }).filter(item => item !== false)

      // from availableCidItems start obtaining firstChangeCurrency
      let firstChangeCurrency = availableCidItems.find((currency, index, self) => {
        return self[currency[3] + 1] !== undefined 
          ? round(change) < self[currency[3] + 1][0] ? true : false
          : true
      })
      
      let currencyValue = firstChangeCurrency[0]
      let currencyText = firstChangeCurrency[1]
      let availableItems = firstChangeCurrency[2]
      let currencyIndex = firstChangeCurrency[3]

      if (availableItems) {
        availableItems--
        firstChangeCurrency[2] = availableItems
        cid[currencyIndex] = [currencyText, round(availableItems * currencyValue)]
        change = round(change) - currencyValue
        if (change < 0) {
          returnObject.status = 'INSUFFICIENT_FUNDS'
          returnObject.change = []
          return returnObject
        }
        totalCid.push(-currencyValue)
        changeArray.push(firstChangeCurrency)
      } 

    } else if (total_cid - change < 0) {
      returnObject.status = 'INSUFFICIENT_FUNDS'
      returnObject.change = []
      return returnObject
    } else if (total_cid - change === 0) {
      returnObject.status = 'CLOSED'
      returnObject.change = cid
      return returnObject
    }
  }

  returnObject.change = prepareChangeArray(changeArray)
  return returnObject
}

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))