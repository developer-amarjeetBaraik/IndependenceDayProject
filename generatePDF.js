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

const margin = 15

//FONTS
//font for headline
const fontForHeadline = fs.readFileSync(path.join(__dirname, 'fonts', 'EduVICWANTBeginner-VariableFont_wght.ttf'))
//base64 font for headline
const base64FontForHeadline = fontForHeadline.toString('base64')

doc.addFileToVFS("EduVICWANTBeginner-VariableFont_wght.ttf", base64FontForHeadline);
doc.addFont("EduVICWANTBeginner-VariableFont_wght.ttf", "Edu", "normal", "bold");



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

//fetures for points
const points = ['I love my India and uphold its dignity at all times.', 'I respect women and am committed to ensuring their safety and dignity.', 'I respect and embrace diversity in religion, gender, caste, and region.', 'I uphold and respect the principles of the Indian Constitution.', 'I actively engage in questioning the government and value political literacy.', 'I take responsibility for the well-being of society and contribute to social upliftment.', 'I prioritize environmental stewardship for a sustainable future.', 'I focus on continuous education and personal growth.']


//maping points
function point(){
    points.forEach((e, index) => {
    return e
})
}

//font for points
const fontForPoints = fs.readFileSync(path.join(__dirname, 'fonts', 'Caveat-VariableFont_wght.ttf'))
//base64 font for points
const base64FontForPoints = fontForPoints.toString('base64')

doc.addFileToVFS("Caveat-VariableFont_wght.ttf", base64FontForPoints);
doc.addFont("Caveat-VariableFont_wght.ttf", "Caveat", "normal", "bold");

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


function generatePDF(name) {
    //adding reactangle
    doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
    //adding image
    doc.addImage(base64Image, 'PNG', coordinateXforimage, coordinateYforimage, imageWidth, imageHeight,)
    //adding headline
    doc.setFontSize(20)
    doc.setFont("Edu", "bold")
    const multilineHeadline = doc.splitTextToSize(headline, pageWidth - margin * 3.5)
    doc.text(multilineHeadline, margin * 2, margin * 3)
    //adding points
    doc.setFontSize(20)
    doc.setFont("Caveat", "bold")
    let pushPoint = 0
    points.forEach((e, index)=>{
    const point = `${index + 1} ${e}`
    const multilinePoint = doc.splitTextToSize(point, pageWidth - margin * 6)
    const linecount = multilinePoint.length
    // if(linecount < pushPoint){
    //     pushPoint = linecount
    // }
    doc.text(multilinePoint, margin * 3, margin * (9+index+2) + pushPoint*6)
    if(linecount != 1){
        // pushPoint = 0
        pushPoint = linecount
    }
    // else if (linecount < pushPoint) {
    //     pushPoint = 0
    // }
    console.log(linecount, pushPoint)
    })

    doc.save('example.pdf')
}

export default generatePDF