// Vercel supplies the ISO country code at its edge. Never cache it across visitors.
module.exports = function country(request, response) {
  const code = request.headers['x-vercel-ip-country'];
  response.setHeader('Cache-Control', 'private, no-store');
  response.status(200).json({ country: typeof code === 'string' && /^[A-Z]{2}$/.test(code) ? code : null });
};
