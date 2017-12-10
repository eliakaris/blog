exports.blogList = function (req, res) {
  res.json(global.entries);
};

exports.blogEntry = function (req, res) {
  var slug = req.params.slug;
  var entry = global.blogData[slug];
  if (entry) {
    res.json(entry);
  }
  else {
    res.res.sendStatus(404);
  }
}
