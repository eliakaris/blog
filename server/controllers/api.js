exports.blogList = function (req, res) {
  res.json(global.entries);
};

function getBlogEntry(slug, res) {
  var entry = global.blogData[slug];
  if (entry) {
    res.json(entry);
  }
  else {
    res.sendStatus(404);
  }
}

exports.blogEntry = function (req, res) {
  return getBlogEntry(req.params.slug, res);
}

exports.latestBlogEntry = function (req, res) {
  return getBlogEntry(global.entries[0].slug, res);
}