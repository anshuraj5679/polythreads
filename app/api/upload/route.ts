import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  console.log("📸 Upload API called");
  
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    console.log("📁 File received:", file ? file.name : "NO FILE");

    if (!file) {
      console.error("❌ No file in request");
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Get JWT from environment (server-side)
    const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
    
    console.log("🔑 Pinata JWT:", PINATA_JWT ? "Found ✅" : "Not found ❌");
    
    if (!PINATA_JWT) {
      console.error("❌ Pinata JWT not found in environment");
      return NextResponse.json(
        { error: "Pinata not configured - JWT missing" },
        { status: 500 }
      );
    }

    // Convert File to Buffer for Pinata
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create form data for Pinata
    const FormData = require('form-data');
    const pinataFormData = new FormData();
    pinataFormData.append('file', buffer, {
      filename: file.name,
      contentType: file.type,
    });
    
    const metadata = JSON.stringify({
      name: file.name,
    });
    pinataFormData.append("pinataMetadata", metadata);

    console.log("🚀 Uploading to Pinata...", file.name, file.type, `(${(buffer.length / 1024).toFixed(2)} KB)`);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      pinataFormData,
      {
        maxBodyLength: Infinity,
        headers: {
          ...pinataFormData.getHeaders(),
          Authorization: `Bearer ${PINATA_JWT}`,
        },
      }
    );

    console.log("✅ Upload successful!", response.data.IpfsHash);

    return NextResponse.json({
      success: true,
      ipfsHash: response.data.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    });
  } catch (error: any) {
    console.error("❌ Upload error:");
    console.error("Error message:", error.message);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    
    return NextResponse.json(
      { 
        error: error.response?.data?.error || error.message || "Failed to upload file",
        details: error.response?.data
      },
      { status: 500 }
    );
  }
}
