import express from 'express';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the contact request
    
    // For now, we'll just log and return success
    console.log('Contact form submission:', { name, email, message });
    
    return res.status(200).json({ 
      success: true,
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      error: 'Failed to process contact form submission' 
    });
  }
});

// GET /api/contact - For testing only
router.get('/', (req, res) => {
  res.json({ message: 'Contact API is working' });
});

module.exports = router;