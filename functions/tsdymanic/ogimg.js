import { ImageResponse } from "workers-og";

export default {
  async fetch(request, env, ctx) {
    const params = new URLSearchParams(new URL(request.url).search);
    const title = params.get("title") || "Lorem ipsum";

    const html = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; width: 100vw; font-family: sans-serif; background: #222222; color: #ffffff;">
      <div style="display: flex; width: 100vw; padding: 40px; color: white;">
        <h1 style="font-size: 60px; font-weight: 600; margin: 0; font-family: 'Bitter'; font-weight: 500">${title}</h1>
      </div>
    </div>
   `;

    return new ImageResponse(html, {
      width: 1200,
      height: 630,
    });
  },
};
