import { NextRequest, NextResponse } from "next/server";
import { getInvite, markInviteUsed } from "@/lib/invites";
import { createSiteFromForm } from "@/lib/sites";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      passcode,
      businessName,
      description,
      industry,
      email,
      phone,
      address,
      logo,
      template,
    } = body;

    // Validate passcode
    if (!passcode) {
      return NextResponse.json(
        { error: "Passcode is required" },
        { status: 400 }
      );
    }

    const invite = await getInvite(passcode);
    if (!invite) {
      return NextResponse.json(
        { error: "Invalid invite link" },
        { status: 404 }
      );
    }

    if (invite.used) {
      return NextResponse.json(
        { error: "This invite has already been used" },
        { status: 410 }
      );
    }

    // Validate required fields
    if (!businessName) {
      return NextResponse.json(
        { error: "Business name is required" },
        { status: 400 }
      );
    }

    // Create the site
    const site = await createSiteFromForm({
      businessName,
      description,
      industry,
      email,
      phone,
      address,
      logo,
      template,
    });

    // Mark invite as used
    await markInviteUsed(passcode, site.slug);

    return NextResponse.json(
      {
        success: true,
        slug: site.slug,
        message: `Your website for "${site.businessName}" has been submitted successfully!`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
