import path from 'path'
import { fileURLToPath } from 'url'
import { jsPDF } from 'jspdf'
import fs from 'fs'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px'
})

//fonts
//font for headline
const fontForHeadline = fs.readFileSync(path.join(__dirname, 'fonts', 'EduVICWANTBeginner-VariableFont_wght.ttf'))
//base64 font for headline
const base64FontForHeadline = fontForHeadline.toString('base64')

doc.addFileToVFS("EduVICWANTBeginner-VariableFont_wght.ttf", base64FontForHeadline);
doc.addFont("EduVICWANTBeginner-VariableFont_wght.ttf", "Edu", "normal", "bold");

const margin = 15

//finding width and hight of the page
const pageHeight = doc.internal.pageSize.getHeight()
const pageWidth = doc.internal.pageSize.getWidth()

//fetures for headline
const username = 'Amarjeet'
const headline = `I, ${username}, hereby solemnly pledge to uphold and embody the following principles, which reflect the true spirit of being an Indian:`
//headline is too long soo increse the line count
//headline width
const headlineWidth = doc.getTextWidth(headline)
//headline center
const headlineWidthCenter = headlineWidth / 2


//finding center of the page
const verticalCenter = pageHeight / 2
const horizontalCenter = pageWidth / 2


//image to put on pdf center as water mark
const image = fs.readFileSync(path.join(__dirname, 'satyameva jyate opcity10.png'))
//base64 file of the image
const base64Image = image.toString('base64')


const imageHeight = 3396 / 8 //in px
const imageWidth = 2000 / 8 // in px

const coordinateXforimage = horizontalCenter - (imageWidth / 2)
const coordinateYforimage = verticalCenter - (imageHeight / 2)


function generatePDF(name){
    doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
    doc.setFontSize(20)
    doc.setFont("Edu", "bold")
    const multilineHeadline = doc.splitTextToSize(headline, pageWidth - margin * 3.5)
    doc.text(multilineHeadline, margin * 2, margin * 3, doc.fint)
    doc.addImage(base64Image, 'PNG', coordinateXforimage, coordinateYforimage, imageWidth,imageHeight, )
    doc.save('example.pdf')
}

export default generatePDF