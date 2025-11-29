import { OAuthApp } from "@octokit/oauth-app";

const app = new OAuthApp({
  clientType: "oauth-app",
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
});

export default async function handler(req, res) {
  const url = app.getAuthorizationUrl({
    scopes: ["repo", "read:org", "user"]
  });

  return res.redirect(url);
}
