// Seleciona os elementos do DOM
const csvInput = document.getElementById('csvInput');
const jsonInput = document.getElementById('jsonInput');
const csvError = document.getElementById('csvError');
const jsonError = document.getElementById('jsonError');
const convertToJSON = document.getElementById('convertToJSON');
const convertToCSV = document.getElementById('convertToCSV');
const clearButton = document.getElementById('clear');

// Função para converter CSV para JSON
function csvToJson(csv) {
  const rows = csv.split('\n');
  const headers = rows[0].split(',');

  const jsonArray = rows.slice(1).map(row => {
    const values = row.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index]?.trim();
      return obj;
    }, {});
  });

  return JSON.stringify(jsonArray, null, 2);
}

// Função para converter JSON para CSV
function jsonToCsv(json) {
  const array = JSON.parse(json);
  const headers = Object.keys(array[0]).join(',');
  const rows = array.map(obj => Object.values(obj).join(','));
  return [headers, ...rows].join('\n');
}

// Função para limpar mensagens de erro
function clearErrors() {
  csvError.textContent = '';
  jsonError.textContent = '';
}

// Botão: Converter CSV para JSON
convertToJSON.addEventListener('click', () => {
  clearErrors();
  const csv = csvInput.value.trim();
  if (!csv) {
    csvError.textContent = 'CSV input cannot be empty!';
    return;
  }

  try {
    const json = csvToJson(csv);
    jsonInput.value = json;
  } catch (error) {
    csvError.textContent = 'Invalid CSV format!';
  }
});

// Botão: Converter JSON para CSV
convertToCSV.addEventListener('click', () => {
  clearErrors();
  const json = jsonInput.value.trim();
  if (!json) {
    jsonError.textContent = 'JSON input cannot be empty!';
    return;
  }

  try {
    const csv = jsonToCsv(json);
    csvInput.value = csv;
  } catch (error) {
    jsonError.textContent = 'Invalid JSON format!';
  }
});

// Botão: Limpar ambos os campos
clearButton.addEventListener('click', () => {
  csvInput.value = '';
  jsonInput.value = '';
  clearErrors();
});
