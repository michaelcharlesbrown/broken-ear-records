import { NextRequest, NextResponse } from "next/server";

interface SubscribeRequestBody {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body: SubscribeRequestBody = await request.json();

    if (!body.email) {
      return NextResponse.json(
        { ok: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare form-encoded data for MailerLite
    const formData = new URLSearchParams();
    formData.append("fields[email]", body.email);
    formData.append("ml-submit", "1");
    formData.append("anticsrf", "true");

    // Forward to MailerLite
    const mailerLiteUrl =
      "https://assets.mailerlite.com/jsonp/1615644/forms/158040559820211571/subscribe";

    const response = await fetch(mailerLiteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    // Dev-only logging for MailerLite response
    if (process.env.NODE_ENV === "development") {
      const responseClone = response.clone();
      const bodyText = await responseClone.text();
      const bodyPreview = bodyText.substring(0, 200);
      console.log("MailerLite response:", {
        status: response.status,
        ok: response.ok,
        bodyPreview,
      });
    }

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Subscription failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // Don't expose internal errors or secrets
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
