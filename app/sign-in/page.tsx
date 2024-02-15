'use client'

import {authenticate} from '@/app/lib/actions'
import {useFormState, useFormStatus} from 'react-dom'

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return <form action={dispatch}>
    <label className="" htmlFor="email">
      Email
    </label>
    <input
      className="text-black"
      id="email"
      type="email"
      name="email"
      placeholder="Enter your email address"
      required
    />
    <label className="" htmlFor="password">
      Password
    </label>
    <input
      className="text-black"
      id="password"
      type="password"
      name="password"
      placeholder="Enter password"
      required
      minLength={8}
    />
    <div>{errorMessage && <p>{errorMessage}</p>}</div>
    <LoginButton/>
  </form>
}

function LoginButton() {
  const {pending} = useFormStatus()
  return <button aria-disabled={pending} type="submit">
    Sign in
  </button>
}