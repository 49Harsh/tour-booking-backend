const Booking = require('../models/Booking');
const Package = require('../models/Package');
const { generateInvoice } = require('../utils/invoiceGenerator');

exports.createBooking = async (req, res) => {
  try {
    const package = await Package.findById(req.body.packageId);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const totalPrice = package.price * req.body.travelers;
    
    const booking = new Booking({
      package: package._id,
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      travelers: req.body.travelers,
      specialRequests: req.body.specialRequests,
      totalPrice
    });

    await booking.save();

    const invoice = await generateInvoice(booking, package);
    
    res.status(201).json({ 
      booking,
      invoice
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};