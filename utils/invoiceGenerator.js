const { PDFDocument, rgb } = require('pdf-lib');

exports.generateInvoice = async (booking, package) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { drawText } = page;

  // Add invoice content
  drawText(`Invoice`, {
    x: 50,
    y: 800,
    size: 24
  });

  drawText(`Booking Details:`, {
    x: 50,
    y: 750,
    size: 14
  });

  drawText(`Customer: ${booking.customerName}`, {
    x: 50,
    y: 720,
    size: 12
  });

  drawText(`Package: ${package.title}`, {
    x: 50,
    y: 700,
    size: 12
  });

  drawText(`Total Amount: $${booking.totalPrice}`, {
    x: 50,
    y: 680,
    size: 12
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
