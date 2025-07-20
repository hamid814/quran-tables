import moment from 'moment-jalaali';
import hezbTexts from './hezbTexts.js';

moment.loadPersian({
  dialect: 'persian-modern',
});

const startDate = '1404/04/22';
let startHezb = 1;

function createTableData(text, clName, isHead) {
  let td;
  if (isHead) {
    td = document.createElement('th');
  } else {
    td = document.createElement('td');
  }
  if (clName) {
    td.className = clName;
  }
  td.innerHTML = text;

  return td;
}

function createTableHead() {
  const head = document.createElement('tr');
  head.appendChild(createTableData('جزء', 'joz', true));
  head.appendChild(createTableData('حزب', 'hezb', true));
  head.appendChild(createTableData('تاریخ', 'date', true));
  head.appendChild(createTableData('سوره و آیات', 'text', true));

  return head;
}

function createHezbTableRow(hezb, startHezb) {
  const tr = document.createElement('tr');

  if (hezb.number === startHezb) {
    tr.classList.add('start-hezb');
  }

  if (String(hezb.number / 4).split('.')[1] == '25') {
    const jozElem = createTableData(hezb.joz);
    jozElem.rowSpan = 4;
    jozElem.classList = 'joz';
    tr.appendChild(jozElem);
  }

  const numberElem = createTableData(hezb.number);
  numberElem.classList = 'number';
  const dateElem = createTableData(hezb.date);
  dateElem.classList = 'small date';
  const textElem = createTableData(hezb.text);
  textElem.classList = 'small text';

  tr.appendChild(numberElem);
  tr.appendChild(dateElem);
  tr.appendChild(textElem);

  return tr;
}

function createOnePart(dayOne, startHezb) {
  /*
  dayOne: string
  startHezb: number
  */
  dayOne = moment(dayOne, 'jYYYY/jM/jD');

  const hezbs = [];
  const dates = [];

  for (var i = 1; i <= 120; i++) {
    dates.push(dayOne.add(1, 'day').format('dddd - jMM/jDD'));
  }

  for (var i = 1; i <= 120; i++) {
    let dateShift;
    const d = 120 - startHezb + 1; // day diffrance from start hezb
    if (i < startHezb) {
      dateShift = i + d;
    } else {
      dateShift = i - (120 - d);
    }

    const hezbMock = {
      joz: Math.ceil(i / 4),
      number: i,
      text: hezbTexts[i - 1],
      date: dates[dateShift - 1],
    };

    hezbs.push(hezbMock);
  }

  const table1 = document.createElement('table');
  const table2 = document.createElement('table');
  const table3 = document.createElement('table');
  const table4 = document.createElement('table');
  table4.classList.add('last-table');

  // create table head
  table1.appendChild(createTableHead());
  table2.appendChild(createTableHead());
  table3.appendChild(createTableHead());
  table4.appendChild(createTableHead());

  for (let i = 0; i <= 31; i++) {
    const hezb = createHezbTableRow(hezbs[i], startHezb);

    table1.appendChild(hezb);
  }

  for (let i = 32; i <= 63; i++) {
    const hezb = createHezbTableRow(hezbs[i], startHezb);

    table2.appendChild(hezb);
  }

  for (let i = 64; i <= 95; i++) {
    const hezb = createHezbTableRow(hezbs[i], startHezb);

    table3.appendChild(hezb);
  }

  for (let i = 96; i <= 119; i++) {
    const hezb = createHezbTableRow(hezbs[i], startHezb);

    table4.appendChild(hezb);
  }

  const infoElem = document.createElement('span');
  infoElem.className = 'info';
  infoElem.innerHTML = 'متن';

  const part = document.createElement('div');
  part.className = 'part';

  part.appendChild(table1);
  part.appendChild(table2);
  part.appendChild(table3);
  part.appendChild(table4);
  part.appendChild(infoElem);

  return part;
}

for (let i = 1; i <= 120; i++) {
  const part = createOnePart(startDate, startHezb);

  startHezb += 1;

  document.body.appendChild(part);
}
