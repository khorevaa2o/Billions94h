import PdfPrinter from "pdfmake";
import btoa from "btoa";
import fetch from "node-fetch";
import { extname } from "path";


const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

const printer = new PdfPrinter(fonts);

const fetchIamgeBuffer = async (image) => {
  let result = await fetch(image, {
    responseType: "arraybuffer",
  });
  return result.arrayBuffer();
};

export const getPDFReadableStream = async (data) => {
  let imagePath = {};
  if (data.image) {
    let imageBufferArray = await fetchIamgeBuffer(data.image);
    console.log(imageBufferArray);

    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(imageBufferArray))
    );
    console.log(base64String);

    const imageUrlPath = data.image.split("/");
    const fileName = imageUrlPath[imageUrlPath.length - 1];
    const extension = extname(fileName);
    const base64Pdf = `data:image/${extension};base64,${base64String}`;

    imagePath = { image: base64Pdf, width: 500, margin: [0, 0, 0, 40] };
  }

  const docDefinition = {
    content: [
      imagePath,
      { text: data.name, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
      { text: data.surname, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
      { text: data.email, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
      { text: data.userName, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
      { text: data.job, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
      { text: data.bio, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
      { text: data.area, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
    ],
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const options = {};

  const pdfReadableStream = printer.createPdfKitDocument(
    docDefinition,
    options
  );

  pdfReadableStream.end();
  return pdfReadableStream;
};