import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { jsPDF } from 'jspdf'
import fs from 'fs'

const app = express()
const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
})
// Define margins and padding
const margin = 10;  // 10mm margin
const padding = 10; // Additional 10mm padding for text
// Total offset for text (margin + padding)
const offset = margin + padding;

// Get page dimensions
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

// Calculate content area
const contentWidth = pageWidth - 2 * margin;
const contentHeight = pageHeight - 2 * margin;

const imgWidth = 100;  // Set the desired image width
const imgHeight = 100; // Set the desired image height

const headline = 'Tiranga ke upper Bharat Maa se kiya wada yaad rakhna aur hamesha palan krna bacche'

const centerX = (pageWidth - imgWidth) / 2;
const centerY = (pageHeight - imgHeight) / 2;

// Calculate the text width and center it
const textWidth = doc.getTextWidth(headline);
const textX = (pageWidth - textWidth) / 2;
const textY = margin + padding + 10; // 10mm from the top margin

const port = 3000;
app.use(express.static('public'))

const __filename = fileURLToPath(import.meta.url);

const file = fs.readFileSync(path.join(path.dirname(__filename), 'logo1.png'));
const base64Image = file.toString('base64');

const img = path.join(path.dirname(__filename), 'logo.png')

app.get('/', (req, res) => {
    res.sendFile(path.join(serveStaticFile(), 'public', 'index.html'))
})

console.log(path.join(path.dirname(__filename), 'logo.png'))
app.post('/generatePDF', (req, res) => {
    // Set font size and weight
    doc.setFontSize(17);
    doc.setFont("helvetica", "normal");
    // Add the text to the PDF
    doc.text(headline, textX, textY);
    doc.addImage(base64Image, 'PNG', margin, margin, contentWidth, contentHeight, '', 'NONE', 0.5)
    doc.save('example.pdf')
    res.send('get request')
})

app.listen(port, () => {
    console.log(`Independence Day app is listening on port: ${port}`)
})