const fs = require("fs");
const pdfParse = require("pdf-parse");

const months = ["January", "Feburary"];

let dataBuffer = fs.readFileSync("devo-messages_10-10.pdf");

pdfParse(dataBuffer).then(function (data) {
  let text = data.text;
  let lines = text.split("\n").filter(Boolean);
  // console.log(lines);

  let indexOfPC = lines.indexOf("PRAYER & CONFESSION");
  let devotionalMessage = lines.slice(2, indexOfPC).join("");
  let secondArray = lines.slice(indexOfPC + 1);

  let date = secondArray.find((element) =>
    months.some((month) => element.includes(month))
  );
  console.log(secondArray);

  let title = secondArray.find((element) => {
    console.log(element);
    console.log(element.toUpperCase());
    return element === element.toUpperCase();
  });

  let verse = secondArray.find(
    (element) => element.startsWith("(") && element.endsWith(")")
  );

  let bibleText = secondArray.find(
    (element) => element.startsWith("“") || element.startsWith(" “")
  );

  let prayer = secondArray
    .filter(
      (element) =>
        element !== date &&
        element !== title &&
        element !== verse &&
        element !== bibleText
    )
    .join("");

  let devotionalObject = {
    date,
    title,
    devotionalMessage,
    prayer,
    bibleText,
    verse,
  };
  // console.log(devotionalObject);
  // fs.writeFileSync("devotions.json", JSON.stringify(devotionalObject));
  process.exit(0);
});
