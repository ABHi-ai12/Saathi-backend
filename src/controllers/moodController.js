export const trackMood = async (req, res) => {
  try {
    const { mood, notes } = req.body;
    
    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }

    res.status(201).json({ 
      message: 'Mood tracked successfully', 
      data: { mood, notes, date: new Date() } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to track mood.' });
  }
};

export const getMoodHistory = async (req, res) => {
  try {
    res.status(200).json({
      history: [
        { mood: 'happy', notes: 'Had a great day!', date: new Date() }
      ]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch mood history.' });
  }
};
