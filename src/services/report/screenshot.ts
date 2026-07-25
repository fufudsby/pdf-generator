import puppeteer from 'puppeteer'
import axios, { AxiosError } from 'axios'

interface data {
  report_id: string
}

export default async (data: data) => {
  // Create a browser instance
  // launch without chrome UI (headless)
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
  })

  const { report_id } = data

  // Create a new page
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  const website_url = `${process.env.WEB_URL}?id=${report_id}`

  // Open URL in current page
  await page.goto(website_url, { waitUntil: 'networkidle0', timeout: parseInt(process.env.TIMEOUT || '300000') })

  //PDF
  const pdf = await page.pdf({
    path: 'screenshot.pdf',
    width: '1280px',
    scale: 0.85,
    format: 'LETTER',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 50, bottom: 50 },
  })

  const blob = new Blob([new Uint8Array(pdf)], { type: 'application/pdf' })
  console.log('pdf data for formdata', blob)

  await browser.close()
}
