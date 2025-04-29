import { PrismaClient } from "@/lib/generated/prisma";

export async function POST(request: Request) {
    try {
        const { fullName, phoneNumber, query } = await request.json();
        const prisma = new PrismaClient();
        await prisma.query.create({
            data: {
                fullName: fullName,
                phoneNumber: phoneNumber,
                query: query
            }
        })
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ success: false, error: error }, { status: 500 });
    }
}