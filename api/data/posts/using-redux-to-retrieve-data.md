[Redux](https://redux.js.org/) is a simple way to store state of an application.  All changes done to the state are immutable.  Changes are made to the state by posting actions to the store.  The actions are handled by reducers which mutate the state.

In this blog, we use redux to handle the state transitions of calling the backend api and updating the UI when it completes.

## Example - retrieving the blog entries list

Here's an example of how we retrieve a list of blog entries on the /blog page.

To start, we have three actions:
1. RequestBlogEntries
1. RequestBlogEntriesSuccess
1. RequestBlogEntriesFailures

We have a helper method in [src/actions/index.tsx](https://github.com/eliakaris/blog/blob/master/src/actions/index.tsx), getBlogEntries().  This method does three important things:
1. Dispactes an event that the request has started (RequestBlogEntries)
1. Perfrorms the http get to /api/v1/blog
1. When the response returns, fires either RequestBlogEntriesSuccess or RequestBlogEntriesFailure.

Here is the method in its entirety:

```javascript
export function getBlogEntries() {
  return (dispatch: Dispatch<RequestBlogEntriesAction>) => {
    dispatch({ type: constants.REQUEST_BLOG_ENTRIES });
    Request.get('/api/v1/blog').then(
      (response) => {
        dispatch({ type: constants.REQUEST_BLOG_ENTRIES_SUCCESS, blogEntries: response.body});
      },
      (failureReason) => {
        dispatch({ type: constants.REQUEST_BLOG_ENTRIES_FAIL, error: failureReason.message});
      });
  };
}
```

Calling the helper method is done in a container component's componentDidMount method.  The container components whole purpose is to call the helper action and to render the actual BlogList presentation component.  It uses the [react-redux](https://github.com/reactjs/react-redux) connect method.

The dispatch method calls the reducer for blog entries.  This reducer updates the state and returns it.  Then mapStateToProps maps the global state to the props of the presentation component.

Here's the reducer in its entirety:

```javascript
export function blogEntries(state: BlogListEntry[] = [], action: RequestBlogEntriesAction): BlogListEntry[] {
  switch (action.type) {
    case actions.REQUEST_BLOG_ENTRIES:
      return state;

    case actions.REQUEST_BLOG_ENTRIES_SUCCESS:
      return action.blogEntries;

    default:
      return state;
  }
}
```

And here's mapStateToProps:

```javascript
export function mapStateToProps({ blogEntries }: StoreState) {
  return {
    blogEntries
  };
}
```

For our simple component, the state and the props for the presentation are the same.

Since the props are changed in mapStateToProps, react will rerender the underlying component.

## Future enhancements

Currently, we dont do anything with the RequestBlogEntries method.  Normally, we would show a loading indicator in the component.  This would be added as a new field to the props of the BlogList component:

```javascript
export interface Props {
  blogEntries: BlogListEntry[];
  isLoading: boolean;
}
```
