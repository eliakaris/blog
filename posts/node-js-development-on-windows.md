Even though I want to primarily do this development on an OS I'm not familiar with, there is some merit to having the ability to work on this in any operating system.

Mainly, I'm more productive in Windows right now due to familiarity and the fact that my dev machine is much more powerful than my laptop.  Also, using dual monitors and a full size keyboard doesnt hurt.

So here we go, getting git and node.js setup on Windows.

Setting up Node.js
------------------

First thing to do is download git for windows: http://git-scm.com/download/win

When installing, I just wanted command line support:
![Setting up Git](/img/NodeOnWindows/GitSetup1.png)

Make sure to create a start menu folder so you can easily start it:
![Setting up Git](/img/NodeOnWindows/GitSetup2.png)

Just use plain old bash:
![Setting up Git](/img/NodeOnWindows/GitSetup3.png)
![Setting up Git](/img/NodeOnWindows/GitSetup4.png)

That's it!
![Setting up Git](/img/NodeOnWindows/GitSetup5.png)



Get your code
-------------

Start up git:
![Starting Git](/img/NodeOnWindows/StartingGit.png)

Now git your code!
![Clone the code](/img/NodeOnWindows/GitCode.png)


Getting node to work
--------------------
Git is only the source code.  To get your server up and running, we need to install node.

If not, you will get something like:
![NPM Error](/img/NodeOnWindows/NpmError.png)

First thing, let's download node for windows: http://nodejs.org/download/

Run the installer.  I chose the defaults:
![Node setup](/img/NodeOnWindows/NodeSetup1.png)
![Node setup](/img/NodeOnWindows/NodeSetup2.png)

Now since the PATH has been updated, you need to log out and log back in.  Yeah, lame.

But now it all works!
![Node setup](/img/NodeOnWindows/NpmInstall1.png)
![Node setup](/img/NodeOnWindows/NpmInstall2.png)
![Node setup](/img/NodeOnWindows/NodeStart.png)


That's it! In just a couple minutes, you can have your node.js website working in Windows and Mac OS.
