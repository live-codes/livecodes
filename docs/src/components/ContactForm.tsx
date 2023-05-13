import React, { useState, type FormEventHandler } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [hasError, setHasError] = useState(false);

  const send: FormEventHandler = (ev) => {
    ev.preventDefault();
    setSending(true);
    const name = document.querySelector<HTMLInputElement>('#form-container #name').value;
    const email = document.querySelector<HTMLInputElement>('#form-container #email').value;
    const message = document.querySelector<HTMLTextAreaElement>('#form-container #message').value;

    fetch('https://submit-form.com/6CPRLFS0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _email: {
          subject: 'LiveCodes Contact',
          from: name,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setSending(false);
        setHasError(false);
        setSent(true);
        document.querySelector('h1').scrollIntoView({
          behavior: 'smooth',
        });
      })
      .catch(() => {
        setSending(false);
        setHasError(true);
      });
  };

  return (
    <div id="form-container" className={styles['form-container']}>
      {sent ? (
        <>
          <h2>Thank you</h2>
          <div>Your message has been sent successfully.</div>
        </>
      ) : (
        <form id="contact-form" onSubmit={send}>
          {hasError && <div className={styles.error}>Sending failed. Please try again!</div>}
          <div>
            <label htmlFor="name">Name *</label>
            <input id="name" className="text-input" required={true} />
          </div>
          <div>
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" className="text-input" required={true} />
          </div>
          <div>
            <label htmlFor="message">Message *</label>
            <textarea id="message" required={true}></textarea>
          </div>
          <button type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </button>
          <span className={styles.info}>* Required</span>
        </form>
      )}
    </div>
  );
}
