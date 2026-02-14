const PDFDocument = require('pdfkit');

exports.generateTicketPDF = (ticketData, res) => {
    const doc = new PDFDocument();
    
    // Configurar cabecera de la respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ticket.pdf');

    doc.pipe(res);
    doc.fontSize(20).text('🎬 TICKET DE CINE 🎬', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Usuario: ${ticketData.userName}`);
    doc.text(`Película: ${ticketData.movieTitle}`);
    doc.text(`Fecha: ${new Date().toLocaleString()}`);
    // Añadir un pequeño código QR o SVG si se desea (placeholder)
    // pdfkit puede agregar imagenes en base64 si se provee.
    doc.end();
};