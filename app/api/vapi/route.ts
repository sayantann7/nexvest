export async function POST(request: Request) {
    const { fullname, phoneNumber, query } = await request.json();

    try {
        console.log(fullname, phoneNumber, query);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ success: false, error: error }, { status: 500 });
    }
}