import { OAuthApp } from "@octokit/oauth-app";

const app = new OAuthApp({
  clientType: "oauth-app",
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
});

// Vercel handler
export default async function handler(req, res) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const code = searchParams.get('code');

  if (pathname.includes("callback")) {
    // Handle GitHub OAuth callback
    try {
      const token = await app.createToken({ code });
      return res.status(200).json({ token: token.authentication.token });
    } catch (err) {
      return res.status(400).json({ error: "OAuth callback failed", details: err.message });
    }
  }

  // Start OAuth login
  const url = app.getAuthorizationUrl({
    scopes: ["repo", "public_repo", "user"]
  });

  return res.redirect(url);
}
