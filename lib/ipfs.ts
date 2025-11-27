import axios from "axios";

const PINATA_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

export async function uploadToIPFS(file: File): Promise<string> {
  // Get JWT at runtime
  const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
  
  console.log("Checking Pinata JWT:", PINATA_JWT ? "Found" : "Not found");
  
  if (!PINATA_JWT || PINATA_JWT === 'your_pinata_jwt_token_here') {
    console.error("Pinata JWT not configured");
    throw new Error("Pinata not configured. Please restart your dev server.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    console.log("Uploading to Pinata...");
    const response = await axios.post(PINATA_API_URL, formData, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });

    console.log("Upload successful! IPFS Hash:", response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Failed to upload to IPFS");
  }
}

export function getIPFSUrl(hash: string): string {
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
}

export async function uploadJSONToIPFS(data: any): Promise<string> {
  // Get JWT at runtime
  const jwt = process.env.NEXT_PUBLIC_PINATA_JWT;
  
  if (!jwt || jwt === 'your_pinata_jwt_token_here') {
    console.error("Pinata JWT not configured for JSON upload");
    throw new Error("Pinata not configured. Please restart your dev server.");
  }

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error);
    throw new Error("Failed to upload JSON to IPFS");
  }
}
