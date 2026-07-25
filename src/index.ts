import express, { Express } from 'express'
import dotenv from 'dotenv'
import createReportMQConsumer from './services/report/consumer'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000
const amqp_url = process.env.AMQP_URL || ''
const queue_report_name = process.env.QUEUE_REPORT_NAME || ''

createReportMQConsumer(amqp_url, queue_report_name)

app.listen(port, () => {
  console.log(`[server]: Server is running at port ${port}`)
})
