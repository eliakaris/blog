In the previous [blog post](/blog/instrumentation-with-application-insights) we added
Azure Application Insights instrumentation to the blog.  Dashboards in the Azure portal were added
to see the performance of the application at a glance.

I like to also spend a good amount of time in the VSTS site while coding and not in the Azure portal.  VSTS allows creating nice dashboards for pull reqeusts, work items, and a multitude of other widgets.

VSTS also supports a widget to display Application Insights data through the [Azure Application Insights Widgets](https://marketplace.visualstudio.com/items?itemName=ms-appinsights.ApplicationInsightsWidgets).  This gives more exposure to not only the code and the deployment status, but also the live service and how it is running at a glance.

## Setting up API access to Application Insights

The Application Insights VSTS widgets use an API key from Azure Application Insights to pull the data. This is done in the Azure Portal by clicking on the Application Insights resource and creating a new API key with read access.  A key will be generated and it can be used to gather data from the Application Insights service.

![API Access](/img/application-insights-dashboards-in-vsts/azure-ai-api-access.png)

## Configuring Widgets in VSTS

I've decided to have two dashboards in VSTS, one for the overview of the system which shows build, release, test, and top line metrics, and one specifically for Application Insights metrics and charts.

### Overview Dashboard

![Overview](/img/application-insights-dashboards-in-vsts/overview-dashboard.png)

The overview dashboard has simple Application Insights metric tiles.  These show metric numbers such as response times and page views from the last x amount of time.

For example, here's the configuration for the Server Response time widget:

![Server response time](/img/application-insights-dashboards-in-vsts/configure-metric.png)

Notice we need the application id and API key from the previous step.  The drop down shows the list of available metrics and we can choose our time range and some UI treatments if the numbers meet a certain threshold.

### Application Insights Dashboard

![Application Insights Dashboard](/img/application-insights-dashboards-in-vsts/server-dashboard.png)

The Application Insights VSTS dashboard shows more detailed charts on the state of the application.  This can show line and area charts as seen above.

For example, here's the configuration for the Server Processort time widget:

![Server processor time](/img/application-insights-dashboards-in-vsts/configure-chart.png)

Again we need the application id and API key and have to choose a metric.  The widget takes care of rendering a line chart.

That's it for today.  Adding Application Insights widgets to VSTS is pretty simple and gives developers a good at a glance view of how the server is running.