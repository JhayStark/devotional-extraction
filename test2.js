const fs = require("fs");
const pdfParse = require("pdf-parse");

let dataBuffer = fs.readFileSync("test2.pdf");

let devotions = [];
let dataArray;

const months = ["January", "Feburary"];
let date;
let title;
let bibleText;
let prayer;
let verse;
let devotionalMessage;

pdfParse(dataBuffer).then(function (data) {
  let text = data.text;

  let lines = text.split("\n").filter(Boolean);

  let indexOfPC = lines.indexOf("PRAYER & CONFESSION");
  devotionalMessage = lines.slice(2, indexOfPC).join("");

  let secondArray = lines.slice(indexOfPC + 1);
  console.log(secondArray);
  for (let i = 0; i < secondArray.length; i++) {
    if (months.some((month) => secondArray[i].includes(month))) {
      // There's at least one
      date = secondArray[i];
      dataArray = secondArray.filter((value) => value !== date);
    }
  }
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] === dataArray[i]?.toUpperCase()) {
      if (dataArray[i]) {
        title = dataArray[i];
        dataArray = dataArray.filter((value) => value != title);
      }
    }
  }

  dataArray.forEach((element) => {
    if (element.startsWith("(") && element.endsWith(")")) {
      verse = element;
      dataArray = dataArray.filter((value) => value !== verse);
    }
  });

  dataArray.forEach((element) => {
    if (element.startsWith("“") || element.startsWith(" “")) {
      bibleText = element;
      dataArray = dataArray.filter((value) => value !== bibleText);
    }
  });

  prayer = dataArray.join("");
  let devotionalObject = {
    date,
    title,
    devotionalMessage,
    prayer,
    bibleText,
    verse,
  };
  // devotions.push(devotionalObject);
  console.log(devotionalObject);
});
