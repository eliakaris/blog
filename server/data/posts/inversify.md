Inversify is a dependency injection system for TypeScript.

Dependency injection provides the following powerful features:
- Inversion of control
- Easy abstraction of functionality behind interfaces
- Automatic object creation
- Constructor injection of dependencies
- Lifetime management of objects

## Abstraction of services

Interfaces are used throughout programming to describe functionality of an object
but not any details on the implementation.  For example, we could have an interface 
which describes how to get blog listings and content.

Here is an example of an IBlogProvider interface:
```typescript
export interface IBlogProvider {
  getBlogEntries(): BlogListEntry[];
  getLatestEntry(): BlogEntryData;
  getEntryFromSlug(slug: string): BlogEntryData;
}
```

In this interface, there is no mention of staten nor any constructor arguments.

We have an implementation of the interface in the BlogProvider class.  This describes
how to read blog entries from the file system, how to refresh when an update happens.

An added benefit of abstracting out an interface for functionality is it gives flexibility
in unit testing complex components which depend on the interface as a simple mock implementation 
can be written.

Antoher benefit is multiple implementations of the interface can be created dependening 
on product scenario or testing.  Simply make a new implementation and choose which one 
to use based on some context.

## Creating instances for the interface

The factory pattern is widely used in programming to abstract the creation of the concrete
for an interface.  It is the job of the factory to know how to construct an object.

A factory can be as simple as a function or as complex as an object with state.

Here's an example of a factory for our BlogProvider:

```typescript
function createBlogProvider(): IBlogProvider {
  return new BlogProvider(new Logger());
}
```

In the above, the method simply creates a BlogProvider instance passing in our hypothetical
Logger dependency.

Somewhere in our main code, we would call the factory to create the interface instance instead 
of the code itself.  This allows us to have a single place to update how the IBlogProvider 
is created.

### Improving with Inversify

This post is about Inversify.  Time to start talking about how it improves our lives.

One feature of Inversify is automatic creation of objects registered with it.  Basically, 
it automatically generates the factories for us.

It is all driven by creating an Inversify container.  The container will invert the control of
object creation.  Instead of having specific methods for creating each type, Inversify's
container has a single method to get an instance of any type the system knows about.

Here's an example of creating a BlogProvider with Inversify:

```typescript
// register our types
const container = new Container();
container.bind<ILogger>(types.ILogger).to(Logger).inSingletonScope();
container.bind<IBlogProvider>(types.IBlogProvider).to(BlogProvider).inSingletonScope();

// create an instance
const blogProvider = container.get<IBlogProvider>();
```

There is a little bit of magic that is going on here.
The bind methods register an interface to a concrete.  Note, it also specifies the scope, or
lifetime, of the object.  Right now, they are both singletons.

Also you'll notice that BlogProvider from above takes an ILogger.  We dont specify this 
dependency in the registration.  Inversify will determine how to create each object based 
on the dependencies each object requires.  All dependencies must be registered with the container
or Inversify will not know how to create it.

In order to specify that an object can be created through dependency injection and that 
dependencies for an object come through dependency injection, Inversify uses javascript 
decorators to mark up the objects.

There are two decorators we are using:
- @injectable() allows an object to be injected
- @inject() specifies that a constructor parameter should be injected

*NOTE: Other dependency injection frameworks in other languages do not require these types of decorators.*

## Using inversify-express-utils

In the above example, we have access to the container and retrieve objects from it directly. 
Though this is used in some coding practices, a better pattern is to not give access 
to the container at all.  This goes against the pattern of RAII, resource acquisition is
initialization.  With RAII, when an object is created, it is known to have all the dependencies 
it needs to operate.

At some point, an object has to be created though.  In a web application, especially one which
uses the Model View Controller pattern, a good point to drive creation of objects is at the 
controller level.  A controller is created to handle each request.  This is an easy place to 
abstract away the dependency injection system.

In our blog example, we have a BlogController which takes in the IBlogProvider.

```typescript
@controller('/api/v1/blog')
export class BlogController {
  constructor(@inject(types.IBlogProvider) private blogProvider: IBlogProvider) {
  }

  @httpGet('/')
  public index() {
    return this.blogProvider.getBlogEntries();
  }

  @httpGet('/latest')
  public latest() {
    return this.blogProvider.getLatestEntry();
  }

  @httpGet('/:slug')
  public getById(@requestParam('slug') slug: string) {
    return this.blogProvider.getEntryFromSlug(slug);
  }
}
```

You'll notice above the constructor of the BlogController takes an IBlogProvider dependency.
Our code never actually instantiates the BlogController.  The @controller decorator from 
inversify-express-utils adds functionality to map the path provided with the controller.

In the above, anything in /api/v1/blog will be handled by the BlogController.  A new 
BlogController will be created for each request.

Also in the above, you will notice an @httpGet decorator on each method.  This will map the 
sub path to a method to be called.

For a request to '/api/v1/blog/latest', a new BlogController is created through the inversify
container and the latest method is called.

### Setting up the controllers

Using the inversify-express-utils is very simple.  It is a wrapper around the initialization
of express's server intialization.

Here's the full intiailization of the blog server:

```typescript
const server = new InversifyExpressServer(container);
server.setConfig(a => {
  routes.init(a);
});

const app = server.build();
app.set('port', process.env.PORT || 3001);

console.log('Going to try port ' + app.get('port'));
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

```

In the above, container is just the instance of our single inversify container object.
We pass to the InversifyExpressServer.

The setConfig call allows us to set any other express application specific configuration 
which is needed such as additional routes / middleware.

Finally, we call server.build() which creates the instance of the express application to run.

The build looks through all controllers loaded in the system, registers them with Inversify,
and maps them to routes in express.

That's it!

## Conclusion

Once Inversify ana inversify-express-utils are setup, it allows a very simple way to 
write modular web application code which is more inline with feature rich server side
web frameworks but in node.js.