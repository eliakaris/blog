import * as React from 'react';

export interface Props {
  match: {
    params: {
      slug: string;
    }
  };
}

function BlogEntry(props: Props) {
  return (
    <div>
      blog entry: {props.match.params.slug}
    </div>
  );
}

export default BlogEntry;