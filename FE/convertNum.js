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

  return result.trim().charAt(0).toLowerCase() + result.trim().slice(1);
}

function numberToWordsFr(n) {
  const ones = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
                'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt'];
  const scales = ['', 'mille', 'million', 'milliard'];

  function convertGroup(n) {
    let result = '';
    if (n >= 100) {
      const hundreds = Math.floor(n / 100);
      result += (hundreds > 1 ? ones[hundreds] + ' ' : '') + 'cent ';
      n %= 100;
    }
    if (n >= 20) {
      const remainder = n % 10;
      if (n >= 70 && n < 80) result += 'soixante-' + ones[10 + remainder];
      else if (n >= 90) result += 'quatre-vingt-' + ones[10 + remainder];
      else result += tens[Math.floor(n / 10)] + (remainder ? '-' + ones[remainder] : '');
    } else result += ones[n];
    return result.trim();
  }

  return processGroups(n, convertGroup, scales);
}

function numberToWordsEs(n) {
  const ones = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
                'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const scales = ['', 'mil', 'millón', 'mil millones'];

  function convertGroup(n) {
    let result = '';
    if (n >= 100) {
      const hundreds = Math.floor(n / 100);
      result += hundreds === 1 ? 'cien' : ones[hundreds] + 'cientos';
      n %= 100;
    }
    if (n >= 20) {
      result += tens[Math.floor(n / 10)];
      if (n % 10 > 0) result += ' y ' + ones[n % 10];
    } else result += ones[n];
    return result.trim();
  }

  return processGroups(n, convertGroup, scales);
}

function numberToWordsZh(n) {
  const ones = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const tens = ['', '十', '百', '千'];
  const scales = ['', '万', '亿'];

  function convertGroup(n) {
    const strNum = n.toString();
    let result = '';
    for (let i = 0; i < strNum.length; i++) {
      const digit = parseInt(strNum[i]);
      if (digit !== 0) {
        result += ones[digit] + (tens[strNum.length - i - 1] || '');
      } else if (!result.endsWith('零')) {
        result += '零';
      }
    }
    return result.replace(/零+$/, '');
  }

  return processGroups(n, convertGroup, scales);
}

// Grouping Logic Embedded in Each Function
function processGroups(n, convertGroup, scales) {
  n = n.toString().padStart(Math.ceil(n.toString().length / 3) * 3, '0');
  const groups = n.match(/\d{3}/g);
  let result = '';
  for (let i = 0; i < groups.length; i++) {
    const groupNum = parseInt(groups[i]);
    if (groupNum !== 0) {
      if (result) result += ' ';
      result += convertGroup(groupNum) + ' ' + scales[groups.length - i - 1];
    }
  }
  return result.trim();
}