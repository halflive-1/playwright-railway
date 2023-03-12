import express from 'express'
import playwright from 'playwright'

const app = express()
const port = process.env.PORT || 3000

async function main() {
  const browser = await playwright.chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://fmiras.com')
  await page.screenshot({ path: 'fmiras.png' })
  await browser.close()
}

app.get('/', (_req, res) => {
  main().then(() => {
    res.send('Hello World!')
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
