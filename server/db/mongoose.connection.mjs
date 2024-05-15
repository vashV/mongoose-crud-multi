import mongoose from 'mongoose'
import log from '@ajar/marker'


export async function connect_db( uri ) {
    await mongoose.connect(uri);
    log.magenta(' ✨  Connected to Mongo DB ✨ ')
}