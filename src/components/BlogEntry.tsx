import * as React from 'react';
import { BlogEntryData } from '../types/BlogEntry';
import './BlogEntry.css';

export interface Props {
  blogEntry: BlogEntryData;
}

class BlogEntry extends React.Component<Props> {

  render() {
    return (
      this.props && this.props.blogEntry && 
      (
      <div className="container">
        <article>
        <h1><a href={`/${this.props.blogEntry.slug}`} itemProp="url">{this.props.blogEntry.title}</a></h1>
        <div className="meta">
          <p>
            <time itemProp="dateCreated" dateTime={`${this.props.blogEntry.pub_date}`}>
              {this.props.blogEntry.pretty_pub_date}
            </time>
             ∙
             <a href={`https://github.com/eliakaris/blog/tree/master/server/data/posts/${this.props.blogEntry.slug}.md`}>
              History
             </a>
          </p>
        </div>
        <div dangerouslySetInnerHTML={{__html: this.props.blogEntry.html}} />
        </article>
      </div>
      )
    );
  }
}

export default BlogEntry;