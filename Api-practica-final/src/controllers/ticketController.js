const Movie = require('../models/Movie');
const { generateTicketPDF } = require('../utils/pdfGenerator');

exports.createTicket = async (req, res) => {
  try {
    const { movieId, userName } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });

    const ticketData = {
      userName: userName || 'Invitado',
      movieTitle: movie.title,
    };

    // generateTicketPDF streams the PDF into res
    return generateTicketPDF(ticketData, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generando ticket' });
  }
};
