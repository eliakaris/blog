Node.js, MacOS, git, open source, and even blogs are pretty new to me.  The starting purpose of this is to get me outside of my comfort zone and try new things in technology.

Here's what I've learned so far:
1. [GitHub](http://github.com) rocks!
2. After setting up a dev environment on Mac, it's fairly easy.
3. Bash is powerful but has a little bit of learning curve.  I keep typing dir and cls :(
4. Git is tricky at times.  Git add, git commit -m, git push...
5. Hosting a node.js based server on Azure is easy
6. The default editor, vim, is a fucking mind fuck!  I mean, really, ; is an activator key?? :)
7. There are some perm differences between running on hosted Azure and a Linux VM
8. There is a learning curve in MacOS.  Mainly the control vs command key combos.

After the initial setup, things are fairly easy.  NPM is a great package manager.  Getting the packages is easy, just add your dependencies and type npm init.

Hosting the blog
----------------

After getting the blog setup locally, I needed to find a place to host the blog.  Here is where I decided to not use open source but instead see how hard it is to host a node.js site on Windows Azure.

I did this for multiple reasons:
1. I dont have access to a Linux server.
2. I get hosting for free.
3. Might as well see what Azure hosting is like for non ms tech.

With that out of the way, let's dive in to what was required.

Creating a web site on Azure
----------------------------

The first thing to do is to go to www.windowsazure.com and sign into the portal.

After logging in, you'll need to create a new site.  I'm going to create a new blog site as part of this post.  

![Creating the site](/img/node-js-on-azure/AzureBlog1.png)

A wizard will pop up and require a few simple things like site name.  The important thing to note here is, check the "Publish from source control" box.

![Specify site name](/img/node-js-on-azure/AzureBlog2.png)

Next you'll need to select the source control provider.  GitHub is in there, so select that.  When you click next, you'll be asked to give your github credentials.

![Select the source code provider](/img/node-js-on-azure/AzureBlog3.png)

WindowsAzure will authenticate and enumerate your projects.  Select the project and branch and continue.

![Select the project](/img/node-js-on-azure/AzureBlog4.png)

After continuing, you are good to go!

Verifying the site
------------------

To verify your site is created click the "Web Sites" tab on the left.

![Verfiy the site is created](/img/node-js-on-azure/AzureBlog5.png)

Next check out the deployment of your newly created site.  This may take around 15 seconds.  Azure automatically determines that you are using node.js, sees packages.js, pulls down the npm packages, and starts your server.

After it is done, you are good to go!  Click the link and see your blog.

![Check out the deployment!](/img/node-js-on-azure/AzureBlog6.png)

There you go, my first blog post on something.

Stay tuned, later I'll probably write some on debugging, setting up custom domains, who knows..
