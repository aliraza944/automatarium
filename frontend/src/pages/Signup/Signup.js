import React, { useState, useEffect, forwardRef } from 'react'
import { useForm } from 'react-hook-form'

import { firebase } from '/src/auth'
import { createUser } from '/src/services'
import { Main, Label, TextInput, Button, Header, Modal } from '/src/components'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '/src/hooks'

const defaultValues = {
  email: '',
  password: '',
  passwordAgain: ''
}

const Signup = {}

Signup.Form = forwardRef(({ setFormActions, onComplete, ...props }, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const { signOut, setSigningUp } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    setError: setFieldError,
    formState: { errors, isDirty },
  } = useForm({ defaultValues})

  useEffect(() => {
    if (setFormActions) {
      setFormActions(<>
        <Button type='submit' form='signup-form' disabled={!isDirty || isSubmitting}>Sign Up</Button> 
      </>)
    }
  }, [isDirty, isSubmitting, ref?.current, setFormActions])

  const watchPassword = watch('password')

  const onSubmit = async values => {
    setIsSubmitting(true)
    setError(null)
    setSigningUp(true)
    try {
      // Create fire user
      const fireUserRecord = await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)

      // Create datastore user
      const res = await createUser({
        uid: fireUserRecord.user.uid,
        email: values.email,
        preferences: {},
      })

      if (res?.user) {
        onComplete?.()
      } else {
        setError(res?.error?.message ?? res?.error)
      }
    } catch (error) {
      // Is it an 'email taken' error?
      if (error.code && error.code === 'auth/email-already-in-use') {
        setFieldError('email', {
          type: 'manual',
          message: 'This email is already in use',
        })
        values.email = ''
      } else if (error.response && error.response.status === 400) {
        // Make sure we aren't logged into that account
        signOut()

        // Field errors
        setError(error.response.data.message)
        error.response.data.fieldErrors.forEach(fieldError => {
          setFieldError(fieldError.name, {
            type: 'manual',
            message: fieldError.message,
          })
        })
      } else {
        // General error
        console.error(error)
        setError('An error occured, please try again')
      }
    } finally {
      setIsSubmitting(false)
      setSigningUp(false)
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)} ref={ref} id='signup-form' {...props}>
    {error && (
      <p>${error}</p>
    )}
    <Label htmlFor='email'>Email</Label>
    <TextInput type='email' {...register('email')} />
    <p>{errors.email?.message}</p>

    <Label htmlFor='password'>Password</Label>
    <TextInput type='password' {...register('password')} />

    <p>{errors.email?.password}</p>

    <Label htmlFor='passwordAgain'>Confirm Password</Label>
    <TextInput type='password' {...register('passwordAgain', {
      validate: value =>
      value === watchPassword || 'Passwords must match',
    })} />
    <p>{errors.passwordAgain?.message}</p>
  </form>
})

Signup.Modal = ({ ...props }) => {
  const [formActions, setFormActions] = useState()
  
  return <Modal
    narrow
    actions={<>
      <Button secondary style={{ marginRight: 'auto' }} onClick={props?.onClose}>Close</Button> 
      {formActions}
    </>}
    {...props}
  >
    <Header center/>
    <h2>Signup</h2>
    <Signup.Form
      onComplete={props?.onClose}
      setFormActions={setFormActions}
      style={{ paddingBottom: '1em' }} />
  </Modal>
}

export default Signup
