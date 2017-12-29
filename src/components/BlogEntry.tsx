import * as React from 'react';
import { BlogEntryData } from '../types/BlogEntry';
import './BlogEntry.css';
import 'highlight.js/styles/github.css';

export interface Props {
  blogEntry: BlogEntryData;
}

class BlogEntry extends React.Component<Props> {

  render() {
    const postRoot = 'https://github.com/eliakaris/blog/tree/master/server/data/posts';
    return (
      this.props && this.props.blogEntry && 
      (
      <article>
        <h1><a href={`/blog/${this.props.blogEntry.slug}`} itemProp="url">{this.props.blogEntry.title}</a></h1>
        <div className="meta">
          <p>
            <time itemProp="dateCreated" dateTime={`${this.props.blogEntry.pub_date}`}>
              {this.props.blogEntry.pretty_pub_date}
            </time>
            &nbsp;∙&nbsp;
            <a href={`${postRoot}/${this.props.blogEntry.slug}.md`}>
              History
            </a>
          </p>
        </div>
        <div dangerouslySetInnerHTML={{__html: this.props.blogEntry.html}} />
      </article>
      )
    );
  }
}

export default BlogEntry;