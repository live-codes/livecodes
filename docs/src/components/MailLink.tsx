import React from 'react';

export default function MailLink(props: { email: string; text: string }) {
  const email = props.email.replace('&#64;', '@').replace('&#46;', '.');
  return (
    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
      {props.text || email}
    </a>
  );
}
