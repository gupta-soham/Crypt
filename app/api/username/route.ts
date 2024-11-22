import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { UsernameValidator } from '@/lib/validators/username'
import { z } from 'zod'

export async function PATCH(req: Request) {
    try {
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { name } = UsernameValidator.parse(body)

        if (name === session.user.username) {
            return new Response('Same Username', { status: 406 })
        }

        // Check if username is taken
        const username = await db.user.findFirst({
            where: {
                username: name,
            },
        })

        if (username) {
            return new Response('Username is taken', { status: 409 })
        }

        // Update username
        await db.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                username: name,
            },
        })

        return new Response('OK')
    } catch (error) {
        (error)

        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }

        return new Response(
            'Could not update username at this time. Please try later',
            { status: 500 }
        )
    }
}