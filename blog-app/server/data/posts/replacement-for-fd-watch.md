When I initially setup the blog on Windows Azure, I found that the fd.watch method did not work.  This was due to some permissions issue with the file system on Azure.  Instead of investigating more, I just decided to comment out this feature.

The feature would put a file system watcher on the posts/ directory as well as the entries.json file.

After doing a little investigation today, I found that there were some [caveats](http://nodejs.org/api/fs.html#fs_caveats).

In order to get around them, I updated the code to use fd.watchFile.  This uses polling to look for file changes.  Also, the watch on the posts directory is not really needed.  Everything is driven off the entries.json.

So, updated the code with [this change](https://github.com/eliakaris/blog/commit/b325713a9e321a4df6e2d04925b90f4a9ee8508d), and there we go, updating without restarting the server!