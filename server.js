const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Function to save data to Excel using ExcelJS
const saveToExcel = async (name, email, contact, message) => {
    const filePath = path.join(__dirname, 'customerDetails.xlsx');
    let workbook = new ExcelJS.Workbook();

    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the existing workbook
            await workbook.xlsx.readFile(filePath);
        } else {
            // Create a new workbook and add a worksheet
            const worksheet = workbook.addWorksheet('Customers');
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 30 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Contact', key: 'contact', width: 20 },
                { header: 'Message', key: 'message', width: 50 }
            ];
        }
    } catch (error) {
        console.error("Error reading the Excel file. Creating a new one.", error);
        workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Customers');
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Contact', key: 'contact', width: 20 },
            { header: 'Message', key: 'message', width: 50 }
        ];
    }

    const worksheet = workbook.getWorksheet('Customers');
    worksheet.addRow({ name, email, contact, message }); // Add the new row
    await workbook.xlsx.writeFile(filePath); // Save the workbook to file
};

// Route to handle form submission
app.post('/submit', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log incoming data
        const { name, email, contact, message } = req.body;

        if (!name || !email || !contact || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await saveToExcel(name, email, contact, message);
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (err) {
        console.error('Error saving to Excel:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
