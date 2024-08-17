import path from 'path'
import { fileURLToPath } from 'url'
import { jsPDF } from 'jspdf'
import fs from 'fs'

const doc = new jsPDF()

function generatePDF(name){
    console.log(`Name is ${name}`)
}

export default generatePDF