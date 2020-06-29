import React, { Fragment, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';


async function sendToPublicChat(topic, message) {
  try {
    const res = await window.ethereum.status.sendToPublicChat(topic, message)
    return res
  } catch (e) {
    console.error('send to public chat', {e})
  }
}

const SendMessage = () => (
  <div>
    <h2>Send to public chat</h2>
    <Formik
      initialValues={{ topic: 'test-room', message: 'test message' }}
      onSubmit={async (values, { setSubmitting }) => {
        const { topic, message } = values;
        const res = sendToPublicChat(topic, message)
        console.log({res})
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="topic" />
          <ErrorMessage name="topic" component="div" />
          <Field type="text" name="message" />
          <ErrorMessage name="message" component="div" />
          <Button type="submit" disabled={isSubmitting}>
            Send
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

function StatusApi() {
  const [account, setAccount] = useState()
  const [isStatus, setIsStatus] = useState(false)
  const [contactCode, setContactCode] = useState()

  useEffect(() => {
      setIsStatus(!!window.ethereum.isStatus)
  }, [account])

  async function enableEthereum() {
    try {
      const res = await window.ethereum.enable()
      const account = res[0]
      setAccount(account)
    } catch (e) {
      console.error('Enable Ethereum :', {e})
    }
  }

  async function getContactCode() {
    try {
      const code = await window.ethereum.status.getContactCode()
      setContactCode(code)
    } catch (e) {
      console.error('Contct code :', {e})
    }
  }

  async function sendToPublicChat(topic = 'testroom', message = 'test') {
    try {
      const res = await window.ethereum.status.sendToPublicChat('testroom', 'testing')
      console.log({res})
    } catch (e) {
      console.error('send to public chat', {e})
    }
  }

  return (
    <Fragment>
      <div>{isStatus ? 'Status API Detected' : 'Status API not found'}</div>
      <h3>Enable ethereum</h3>
      <Button onClick={enableEthereum}>Enable ethereum</Button>
      {account && <div>{account}</div>}
      <h3>Get contact code</h3>
      <Button onClick={getContactCode}>Get Contact Code</Button>
      {contactCode && <div>{contactCode}</div>}
      <SendMessage />
    </Fragment>
  )
}

export default StatusApi;
