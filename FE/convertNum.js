function numberToWordsVn(n) {
  const ones = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const scales = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];

  function convertGroup(n, isFirst) {
      let result = '';
      let hundreds = Math.floor(n / 100);
      let tens = Math.floor((n % 100) / 10);
      let ones_digit = n % 10;

      if (hundreds > 0 || !isFirst) {
          result += ones[hundreds] + ' trăm ';
      }

      if (tens > 0) {
          if (tens === 1) {
              result += 'mười ';
          } else {
              result += ones[tens] + ' mươi ';
          }
      } else if (hundreds > 0 && ones_digit > 0) {
          result += 'lẻ ';
      }

      if (ones_digit > 0) {
          if ((tens > 1 && ones_digit === 1) || (tens === 1 && ones_digit === 5)) {
              result += 'mốt ';
          } else if (tens >= 1 && ones_digit === 5) {
              result += 'lăm ';
          } else {
              result += ones[ones_digit] + ' ';
          }
      }

      return result;
  }

  if (n === 0) return 'không';

  let numStr = n.toString();

  while (numStr.length % 3 !== 0) {
      numStr = '0' + numStr;
  }

  const groups = numStr.match(/\d{3}/g);
  
  let result = '';
  let hasValue = false;

  for (let i = 0; i < groups.length; i++) {
      const groupNum = parseInt(groups[i]);
      if (groupNum !== 0) {
          if (hasValue) result += ' ';
          result += convertGroup(groupNum, i === 0) + scales[groups.length - 1 - i];
          hasValue = true;
      } else if (hasValue && (groups.length - 1 - i) % 3 === 2) {
          result += scales[groups.length - 1 - i] + ' ';
      }
  }

  return result.trim();
}

function numberToWordsEng(n) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
               'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  const scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'];

  function convertGroup(n) {
      let result = '';

      if (n >= 100) {
          result += ones[Math.floor(n / 100)] + ' hundred ';
          n %= 100;
          if (n > 0) result += 'and ';
      }
      
      if (n >= 20) {
          result += tens[Math.floor(n / 10)] + ' ';
          if (n % 10 > 0) result += ones[n % 10];
      } else {
          result += ones[n];
      }
      
      return result.trim();
  }

  if (n === 0) return 'zero';
  
  n = n.toString();
  
  while (n.length % 3 !== 0) {
      n = '0' + n;
  }

  const groups = n.match(/\d{3}/g);
  
  let result = '';

  for (let i = 0; i < groups.length; i++) {
      const groupNum = parseInt(groups[i]);
      if (groupNum !== 0) {
          if (result !== '') result += ' ';
          result += convertGroup(groupNum) + ' ' + scales[groups.length - 1 - i];
      }
  }

  return result.trim().charAt(0).toUpperCase() + result.trim().slice(1);
}