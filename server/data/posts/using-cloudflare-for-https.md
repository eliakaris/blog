If you havent heard of it yet, [CloudFlare](https://www.cloudflare.com) is a nice service which provides  enrichments to your web application.  

Some services it provides are:
- dns masking
- caching
- ssl termination
- other redirect rules

You setup an account and configure your dns to point to CloudFlare's dns servers.

I like to use their free tier for enabling ssl on my sites without having to pay for or manage an ssl certificate.  Services like [Lets Encrypt](https://letsencrypt.org/) can get you an ssl certificate for free but it is still annoying to manage and you have to install it on your servers.

CloudFlare instead has its own ssl certificates it uses and sets one up for your domain.  When a request to your domain goes to cloudflare, it is encrypted.  It then forwards the reques to your actual service on http.

I wont go through setting up CloudFlare to talk to Azure, that will require some dns magic, but there are many articles on the web.  Instead, this entry will go through forcing https for our site without making any code changes.

## Enable Https redirect

*NOTE: This all assumes you have a CloudFlare account already setup and configured to point to your azure instance.*

We will use CloudFlare's page rules to redirect http traffic to https.  There is a built in rule for this already.

First, log in to CloudFlare main:
![CloudFlare main](/img/using-cloudflare-for-https/Cloudflare_main.png)

Next, click Page Rules tab at the top to go to the Page Rules page:
![Page rules](/img/using-cloudflare-for-https/PageRules.png)

Finally, add a couple http => https rules:
![Https redirect rule](/img/using-cloudflare-for-https/HttpPageRule.png)

You can see we have a rule for the root domain and one for subdomains:
- http://eliakaris.com/
- http://*eliakaris.com/*


Thanks, that's it for today!
