import { h } from "preact"
import { useEffect, useState } from "preact/compat"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import envelopeAnimation from "../assets/envelope-animation.json"
import Toast from "../components/toast"
import useUserStore from "../stores/useUserStore"
import Loading from "../components/loading"

type FormData = {
  error: string
  email: string
  password: string
  show: boolean
}

const oauthRedirectUrl = import.meta.env.VITE_OAUTH_REDIRECT_URL

function Login() {
  // https://tailwind-elements.com/docs/standard/components/login-form/
  const [formData, setFormData] = useState<FormData>({
    error: "",
    email: "",
    password: "",
    show: true,
  })

  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (key: keyof FormData) => (e: any) => {
    const v = e.target.value
    setFormData({
      ...formData,
      [key]: v,
    })
  }

  const navigate = useNavigate()
  const { setUser } = useUserStore()

  const handleSignUp = async () => {
    const { email } = formData

    if (!email.trim().match(/\w+@conjure\.co\.uk$/)) {
      setFormData({ ...formData, error: "Only conjured emails allowed." })
      return
    }

    try {
      setLoading(true)
      setFormData({ ...formData, error: "" })
      const { error: signUpError, data } = await supabase.auth.signUp(formData)

      console.log({ signUpError, data })
      if (signUpError) {
        setFormData({ ...formData, error: signUpError.message })
      } else {
        setFormData({ ...formData, show: false })
      }
    } catch (err) {
      // @ts-ignore
      setFormData({ ...formData, error: err.error_description || err.message })
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: any) => {
    // @ts-ignore
    e.preventDefault()
    const { email, password } = formData

    if (!email.trim().match(/\w+@conjure\.co\.uk$/)) {
      setFormData({ ...formData, error: "Only conjured emails allowed." })
      return
    }

    try {
      setLoading(true)
      const { error: signInError, data } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (signInError) {
        setFormData({ ...formData, error: signInError?.message ?? "Error" })
      }

      if (data.session && data.user) {
        const name = email?.toLowerCase().split("@")[0].split(".").join(" ")
        setUser({ id: data.user.id, email, name })
        navigate("/app")
      }
    } catch (err) {
      // @ts-ignore
      setFormData({ ...formData, error: err.error_description || err.message })
    } finally {
      setLoading(false)
    }
  }

  const { email, password, error, show } = formData

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setFormData({ ...formData, error: "" })
      }, 2000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [error])

  const loginWithGoogleAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: oauthRedirectUrl },
    })

    if (error) console.error(error)

    console.log(data ?? "no login data")
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {formData.error && <Toast message={error} />}
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>

          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            {show ? (
              <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-gray-900 pb-3">
                  Welcome back dear charmer ✨
                </h1>
                <p className="pb-5">Only charmed accounts can access 🧙‍</p>
                <form onSubmit={handleLogin}>
                  <div className="mb-6">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Charmer address"
                      value={email}
                      onChange={handleChange("email")}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange("password")}
                    />
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="flex">
                    <button
                      type="submit"
                      className="mr-1 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      disabled={password.length < 1}
                    >
                      {loading ? (
                        <span className="grid place-items-center">
                          <Loading />
                        </span>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                    <button
                      type="button"
                      className="ml-1 px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out w-full"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={handleSignUp}
                    >
                      {loading ? (
                        <span className="grid place-items-center">
                          <Loading />
                        </span>
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </div>

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                  </div>

                  <a
                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                    style="background-color: #3b5998"
                    href="#"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={loginWithGoogleAuth}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                      className="w-3.5 h-3.5 mr-2"
                    >
                      {/* Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      />
                    </svg>
                    Continue with Google
                  </a>
                </form>
              </div>
            ) : (
              <div style={{ maxWidth: 400 }}>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-gray-900 pb-3 text-center">
                  Please check your email!
                </h1>
                <Lottie
                  loop={false}
                  autoplay={true}
                  height={100}
                  width={100}
                  animationData={envelopeAnimation}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
