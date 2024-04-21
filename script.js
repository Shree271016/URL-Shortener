async function shortenUrl() {
  const longUrl = document.getElementById("longUrlInput").value;
  const accessToken = "48e608b8da4fbe1024a086f115b90b91b3a91ebc";
  const apiUrl = "https://api-ssl.bitly.com/v4/shorten";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: longUrl,
      }),
    });

    const data = await response.json();
    console.log("Response Status:", response.status);
    console.log("Response Data:", data);

    if (response.ok) {
      document.getElementById(
        "shortUrl"
      ).innerHTML = `<p>Short URL: <a href="${data.link}" target="_blank">${data.link}</a></p>`;
      document.getElementById(
        "qrCode"
      ).innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        data.link
      )}" alt="QR Code">`;
    } else {
      document.getElementById(
        "shortUrl"
      ).innerHTML = `<p>Error: ${data.message}</p>`;
      document.getElementById("qrCode").innerHTML = "";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("shortUrl").innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    document.getElementById("qrCode").innerHTML = "";
  }
}
