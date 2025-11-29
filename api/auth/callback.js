import { OAuthApp } from "@octokit/oauth-app";

const app = new OAuthApp({
  clientType: "oauth-app",
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
});

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const code = searchParams.get("code");

  try {
    const token = await app.createToken({ code });
    return res.status(200).json({ token: token.authentication.token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
