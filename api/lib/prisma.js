// Prisma client import now uses default package output (generator output removed in schema)
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma