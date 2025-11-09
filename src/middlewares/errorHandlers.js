function notFound(req, res, next) {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(404).render('404', { message: 'Page not found' });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  if (req.originalUrl.startsWith('/api')) {
    res.status(500).json({ error: 'Server error', message: err.message });
  } else {
    res.status(500).render('500', { error: err });
  }
}

module.exports = { notFound, errorHandler };
