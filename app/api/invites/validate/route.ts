import { NextRequest, NextResponse } from "next/server";
import { getInvite } from "@/lib/invites";

export async function GET(request: NextRequest) {
  const passcode = request.nextUrl.searchParams.get("passcode");

  if (!passcode) {
    return NextResponse.json(
      { valid: false, error: "Passcode is required" },
      { status: 400 }
    );
  }

  const invite = await getInvite(passcode);

  if (!invite) {
    return NextResponse.json(
      { valid: false, error: "Invalid invite link" },
      { status: 404 }
    );
  }

  if (invite.used) {
    return NextResponse.json(
      { valid: false, error: "This invite has already been used" },
      { status: 410 }
    );
  }

  return NextResponse.json({
    valid: true,
    clientName: invite.clientName,
    clientEmail: invite.clientEmail,
  });
}
