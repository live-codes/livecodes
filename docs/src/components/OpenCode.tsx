import React from 'react';

export default function OpenCode(props: { children: string; id: string; template: string }) {
  const url = props.id
    ? `/?x=id/${props.id}`
    : props.template
    ? `/?template=${props.template}`
    : '/';
  return (
    <a href={url} target="_blank">
      {props.children || 'open in LiveCodes'}
    </a>
  );
}
