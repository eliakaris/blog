import * as React from 'react';
import * as Request from 'superagent';
import './BlogEntry.css';

export interface Props {
  match: {
    params: {
      slug: string;
    }
  };
}

interface BlogEntryData {
  pretty_pub_date: string;
  html: string;
  summary: string;
  slug: string;
  title: string;
  pub_date: string;
}

interface State {
  blogEntry: BlogEntryData;
}

class BlogEntry extends React.Component<Props, State> {

  componentWillMount() {
    if (this.props && this.props.match && this.props.match.params && this.props.match.params.slug) {
      Request.get(`/api/blog/${this.props.match.params.slug}`).then((response) => {
        this.setState({ blogEntry: response.body });
      });
    }
  }

  render() {
    return (
      this.state && this.state.blogEntry && 
      <div className="container">
        <article>
        <h1><a href={`/${this.state.blogEntry.slug}`} itemProp="url">{this.state.blogEntry.title}</a></h1>
        <div className="meta">
          <p>
            <time itemProp="dateCreated" dateTime={`${this.state.blogEntry.pub_date}`}>{ this.state.blogEntry.pretty_pub_date }</time>
             ∙ <a href={`https://github.com/eliakaris/blog/tree/master/posts/${this.state.blogEntry.slug}.md`}>History</a>
          </p>
        </div>
        <div dangerouslySetInnerHTML={{__html: this.state.blogEntry.html}} />
        </article>
      </div>
    );
  }
}

export default BlogEntry;