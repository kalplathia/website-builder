export const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Not Found</title>
  <meta name="robots" content="noindex" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"><\/script>
</head>
<body class="min-h-screen bg-white flex items-center justify-center antialiased" style="font-family: 'Inter', system-ui, sans-serif;">
  <div class="text-center px-6 max-w-md">
    <div class="text-[120px] font-extrabold leading-none text-gray-100 select-none" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">404</div>
    <h1 class="mt-4 text-2xl font-bold text-gray-900 tracking-tight" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">Page not found</h1>
    <p class="mt-3 text-gray-500 text-base leading-relaxed">The page you're looking for doesn't exist or has been moved.</p>
    <a href="./index.html" class="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors" style="text-decoration: none;">
      Go home
    </a>
  </div>
</body>
</html>`;

export function notFoundResponse(): Response {
  return new Response(notFoundHtml.replace('./index.html', '/'), {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
