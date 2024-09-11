const express = require('express');
const axios = require('axios');
const path = require('path'); 
const app = express();
const port = 3000;

// Middleware to serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// API URL
const baseUrl = "https://eastus2.azure.data.mongodb-api.com/app/pac-application-sfnloyf/endpoint";

// Fetch Patient Data
app.get('/api/patient/:username', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/GetPatient`, {
            params: { username: req.params.username }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching patient data:', error);
        res.status(500).json({ error: 'Failed to fetch patient data' });
    }
});

// Fetch User Info
app.get('/api/user/:username', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/FetchUserInfo`, {
            params: { username: req.params.username }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
