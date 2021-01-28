import { AsyncParser } from "json2csv"



export async function parseCSV(data, fields) {
    const opts = { fields };
    console.log("here opts: ", opts.fields)
const asyncParser = new AsyncParser(opts.fields)

let csv = '';
asyncParser.processor
  .on('data', chunk => (csv += chunk.toString()))
  .on('end', () => console.log(csv))
  .on('error', err => console.error(err));
  
// You can also listen for events on the conversion and see how the header or the lines are coming out.
asyncParser.transform
  //.on('header', header => console.log(header))
 // .on('line', line => console.log(line))
  .on('error', err => console.log(err));

asyncParser.input.push(data); // This data might come from an HTTP request, etc.
asyncParser.input.push(null); // Sending `null` to a stream signal that no more data is expected and ends it.

return csv
}