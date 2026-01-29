import { PrismaClient } from '@prisma/client'

const prismadbGlobal = global as typeof global & {
    prisma?: PrismaClient
}

export const prisma = prismadbGlobal.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') prismadbGlobal.prisma = prisma
