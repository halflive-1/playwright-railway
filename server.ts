import express from 'express'
import playwright from 'playwright'

const app = express()
const port = process.env.PORT || 3000

async function main() {
  const browser = await playwright.chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ignoreDefaultArgs: ['--disable-extensions']
  })
  const page = await browser.newPage()
  await page.goto('https://fmiras.com')
  console.log(page)
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
