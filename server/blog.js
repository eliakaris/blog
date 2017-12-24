var fs = require('fs'),
    moment = require('moment'),
    marked = require('marked'),
    hljs = require('highlight.js'),
    path = require('path'),
    S = require('string'),
    request = require('request');

var entriesFilename = path.resolve(__dirname, './data/entries.json');
var postsDirectory = path.resolve(__dirname, './data/posts');

var loadBlogEntries = function() {
  var entries_json = fs.readFileSync(entriesFilename);
  var entries = JSON.parse(entries_json);

  var blogData = {};
  for (var entry in entries) {
    var entry = entries[entry];
    entry.pub_date = new Date(entry.pub_date);

    var entryDetails = {};
    entryDetails.pretty_pub_date = entry.pretty_pub_date || moment(entry.pub_date).format("MMMM Do, YYYY");
    entryDetails.pub_date = entry.pub_date;

    var data = fs.readFileSync(path.resolve(postsDirectory, entry.slug + '.' + entry.format), 'utf8');
    entryDetails.html = entry.format == 'md' ? marked(data) : data;
    entryDetails.summary = S(entryDetails.html).stripTags().truncate(200).toString();
    entryDetails.slug = entry.slug;
    entryDetails.title = entry.title;
    blogData[entry.slug] = entryDetails;
  }

  global.blogData = blogData;
  global.entries = entries.sort(function (a, b) {
    if (a.pub_date > b.pub_date)
      return -1;
    if (a.pub_date < b.pub_date)
      return 1;
    return 0;
  });
};

exports.init = function() {
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlight(lang, code).value;
    }
  });

  fs.watchFile(entriesFilename, loadBlogEntries);
  loadBlogEntries();
};
