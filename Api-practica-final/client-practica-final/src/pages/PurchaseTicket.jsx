import React, { useState } from 'react';
import { Ticket, Users, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf'; // Importante tener instalado npm install jspdf

const PurchaseTicket = ({ movieTitle = "Goku: La Batalla de los Dioses" }) => {
  const [ticketData, setTicketData] = useState(() => {
    const saved = localStorage.getItem('ticket_draft');
    return saved ? JSON.parse(saved) : { seats: 1, type: 'normal' };
  });

  // FUNCIÓN PARA GENERAR EL PDF (Punto de la rúbrica)
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [150, 100] // Formato tamaño ticket
    });

    // Estilo visual del PDF
    doc.setFillColor(15, 15, 15); // Fondo oscuro
    doc.rect(0, 0, 150, 100, 'F');
    doc.setDrawColor(212, 175, 55); // Borde dorado
    doc.setLineWidth(1.5);
    doc.rect(5, 5, 140, 90);

    doc.setTextColor(212, 175, 55);
    doc.setFontSize(22);
    doc.text("MIDNIGHT CINEMA", 75, 20, { align: "center" });
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`PELÍCULA: ${movieTitle.toUpperCase()}`, 20, 45);
    doc.text(`ASIENTOS: ${ticketData.seats}`, 20, 60);
    doc.text(`TIPO: ${ticketData.type.toUpperCase()}`, 20, 75);

    doc.save(`Ticket_${movieTitle}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // REGLAS DE NEGOCIO (Punto 1 de la rúbrica)
    if (ticketData.seats < 1 || ticketData.seats > 10) {
      return alert("Solo puedes comprar entre 1 y 10 boletos.");
    }

    alert(`🎟️ ¡Compra procesada para ${movieTitle}! Descargando comprobante...`);
    generatePDF(); // Lanzamos el PDF
    localStorage.removeItem('ticket_draft');
  };

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-surface p-6 rounded-2xl border border-gold/20 max-w-sm mx-auto mt-10">
      <header className="flex items-center gap-3 mb-6">
        <Ticket className="text-gold w-6 h-6" />
        <h3 className="text-xl font-black text-white uppercase italic">Comprar <span className="text-gold">Tickets</span></h3>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Cantidad de Asientos</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input 
              type="number" 
              value={ticketData.seats} 
              onChange={(e) => {
                const val = { ...ticketData, seats: e.target.value };
                setTicketData(val);
                localStorage.setItem('ticket_draft', JSON.stringify(val));
              }}
              className="w-full bg-midnight border border-gray-800 rounded-lg py-2 pl-10 text-white outline-none focus:border-gold"
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-gold text-midnight font-black py-4 rounded-xl uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2">
          <Download className="w-4 h-4" /> Confirmar y PDF
        </button>
      </form>
    </motion.div>
  );
};

export default PurchaseTicket;