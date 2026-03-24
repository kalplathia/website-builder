import { NextRequest, NextResponse } from "next/server";
import { createInvite, getAllInvites, deleteInvite } from "@/lib/invites";

export async function GET() {
  const invites = await getAllInvites();
  return NextResponse.json(invites);
}

export async function POST(request: NextRequest) {
  try {
    const { clientName, clientEmail } = await request.json();

    if (!clientName || !clientEmail) {
      return NextResponse.json(
        { error: "Client name and email are required" },
        { status: 400 }
      );
    }

    const invite = await createInvite(clientName, clientEmail);

    return NextResponse.json(invite, { status: 201 });
  } catch (error) {
    console.error("Create invite error:", error);
    return NextResponse.json(
      { error: "Failed to create invite" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const passcode = request.nextUrl.searchParams.get("passcode");
  if (!passcode) {
    return NextResponse.json(
      { error: "Passcode is required" },
      { status: 400 }
    );
  }

  const deleted = await deleteInvite(passcode);
  if (!deleted) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
