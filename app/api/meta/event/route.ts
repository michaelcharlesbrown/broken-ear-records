import { NextRequest, NextResponse } from "next/server";

interface EventRequestBody {
  event_name: string;
  event_id: string;
  custom_data: {
    artist: string;
    platform: string;
    destination: string;
  };
  fbp?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Read credentials from environment variables
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      return NextResponse.json(
        { error: "Meta Pixel credentials not configured" },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body: EventRequestBody = await request.json();

    if (!body.event_name || !body.event_id || !body.custom_data) {
      return NextResponse.json(
        { error: "Missing required fields: event_name, event_id, custom_data" },
        { status: 400 }
      );
    }

    if (
      !body.custom_data.artist ||
      !body.custom_data.platform ||
      !body.custom_data.destination
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required custom_data fields: artist, platform, destination",
        },
        { status: 400 }
      );
    }

    // Prepare event for Meta Graph API
    const eventTime = Math.floor(Date.now() / 1000);

    const metaEvent: {
      event_name: string;
      event_id: string;
      event_time: number;
      action_source: string;
      custom_data: {
        artist: string;
        platform: string;
        destination: string;
      };
      user_data?: {
        fbp?: string;
      };
    } = {
      event_name: body.event_name,
      event_id: body.event_id,
      event_time: eventTime,
      action_source: "website",
      custom_data: {
        artist: body.custom_data.artist,
        platform: body.custom_data.platform,
        destination: body.custom_data.destination,
      },
    };

    // Include fbp cookie if available for better matching
    if (body.fbp) {
      metaEvent.user_data = {
        fbp: body.fbp,
      };
    }

    // Forward to Meta Graph API
    const graphApiUrl = `https://graph.facebook.com/v21.0/${pixelId}/events`;

    const response = await fetch(graphApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [metaEvent],
        access_token: accessToken,
      }),
    });

    if (!response.ok) {
      // Don't expose full error details that might contain sensitive info
      return NextResponse.json(
        { error: "Meta API request failed" },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json(
      { success: true, event_id: body.event_id },
      { status: 200 }
    );
  } catch (error) {
    // Don't expose internal errors or secrets
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
