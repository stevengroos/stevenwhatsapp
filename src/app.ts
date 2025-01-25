import { createBot, createProvider, createFlow, MemoryDB, addKeyword } from "@bot-whatsapp/bot";
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('Hola').addAnswer('Buenas, Bienvenido')

/*
*
*
*/



const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body
        const message = body.message
        //const MediaUrl = body.MediaUrl
        const number = body.number

        console.log(body)
        
        await bot.sendMessage(number, message, {
            //media:MediaUrl
        })
        res.end('esto es del server de steven')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider 
    })
}

main()