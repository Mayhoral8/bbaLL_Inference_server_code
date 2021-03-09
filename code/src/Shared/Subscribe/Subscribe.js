import React, { useState } from "react";
import firebase from "Firebase";
import { fbFirestore } from "Firebase";
import { SubscribeForm, SubscribeHeader, SubscribeContent, SubscribeWrapper } from "./subscribe-style";
import { ContainerCard } from "../../globalStyles";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState("");

  // add email to firebase
  const createSubscriptionList = email => {
    return fbFirestore
      .collection('email_subscription')
      .add({
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        email
      })
      .then(() => setSuccess(true))
      .catch(err => {
        setSuccess(false);
        console.log(err);
      });
  };

  // email validation
  const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // handle form submit
  const handleOnSubmit = event => {
    event.preventDefault();
    if (email.length === 0 || !validateEmail(email)) {
      setErrors('Please provide a valid email address');
    } else {
      createSubscriptionList(email);
      event.target.reset();
    }
  };

  return (
    <SubscribeWrapper>
      <h3 className='footer-subtitle'>Subscribe To Our Newsletter</h3>
      <SubscribeContent>
        {success
          ? <p>Thank you for signing up. You should receive an email shortly. If not, make sure we didn't end up in your spam box....something along these lines</p>
          : (
            <>
              <form onSubmit={handleOnSubmit} error={errors}>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email address"
                  onChange={e => setEmail(e.target.value)}
                />
                <small>{errors && errors}</small>
                <button type="submit">subscribe</button>
              </form>
            </>
          )
        }
      </SubscribeContent>
    </SubscribeWrapper>
  )
}

export default Subscribe;