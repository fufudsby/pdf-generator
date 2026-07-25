import amqp, { Message } from 'amqplib'
import screenshot from './screenshot'

export default async (amqp_url: string, queue_name: string) => {
  try {
    const connection = await amqp.connect(amqp_url)
    const channel = await connection.createChannel()

    process.once('SIGINT', async () => {
      await channel.close()
      await connection.close()
    })

    // total queue process before next message
    channel.prefetch(process.env.TOTAL_PREFETCH ? parseInt(process.env.TOTAL_PREFETCH) : 1)
    await channel.assertQueue(queue_name, { durable: false })
    await channel.consume(
      queue_name,
      async (message: Message | null) => {
        if (message) {
          console.log(" [x] Received - Report '%s'", JSON.parse(message.content.toString()))
          const data = JSON.parse(message.content.toString())
          await screenshot({
            report_id: data?.report_id?.toString() || '',
          })

          // to next queue
          channel.ack(message)
        }
      },
      { noAck: false },
    )

    console.log(' [*] Waiting for messages. To exit press CTRL+C')
  } catch (err) {
    console.log('Error =>', err)
  }
}
