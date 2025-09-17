import DzButton from '@renderer/components/dzButton'
import DzFormInput from '@renderer/components/form/dzFormInput'
import DzInputPasswordField from '@renderer/components/form/dzFormPasswordInput'
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card'
import { Form } from '@renderer/components/ui/form'
import { Label } from '@renderer/components/ui/label'
import AppUtils from '@renderer/helpers/appUtils'
import constants from '@renderer/helpers/constants'
import useFormState from '@renderer/hooks/useFormState'
import ApiService, { ApiUrls } from '@renderer/services/apiClient'
import useAuthStore from '@renderer/stores/auth'
import { useState } from 'react'
import z from 'zod'
import LoginBackground from '../../assets/top-view-table-full-food.jpg'

const formSchema = z.object({
  emailAddress: z.email('Email address must be valid.'),
  password: z
    .string({
      error: 'Password cannot be empty.'
    })
    .min(8, {
      message: 'Password mus be contained at least 8 characters.'
    })
})

export default function Login() {
  const { authActions } = useAuthStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { form } = useFormState({
    schema: formSchema,
    defaultValues: {
      emailAddress: 'hamid@dinezo.com',
      password: 'Ddd@#123321'
    }
  })

  const backgroundStyle = {
    backgroundImage: `url(${LoginBackground})`,
    backgroundSize: 'cover'
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    const payload: any = {
      usr: values.emailAddress,
      pwd: values.password
    }

    const { data }: any = await ApiService.post(ApiUrls.login, payload)
    if (data) {
      const { user_details: user, token } = data

      authActions.setInitData({ user })
      authActions.setIsLogin(true)
      authActions.setSessionToken(token)

      AppUtils.setValueToLocalStorage(
        constants.localstorageKey.authKey,
        JSON.stringify({ user, token })
      )
    }

    setIsSubmitting(false)
  }

  return (
    <div
      style={backgroundStyle}
      className="w-full h-screen flex items-center justify-start bg-black m-0 p-0"
    >
      <Card className="max-w-lg w-full min-h-[80vh] rounded-2xl shadow-lg ml-16 flex flex-col justify-center">
        <CardHeader>
          <div className="flex items-center justify-center">
            <Label className="text-2xl text-primary-500 font-mono">LOGO</Label>
          </div>
        </CardHeader>

        <CardContent className="px-10 py-8 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">Login form</h2>
            <p className="text-gray-500 text-sm mt-2">
              Lorem Ipsum has been the industry/&rsquo;s standard dummy text ever since.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DzFormInput
                name="emailAddress"
                label="Username"
                placeholder="Enter username"
                control={form.control}
                className={AppUtils.classNames('rounded-full')}
              />

              <DzInputPasswordField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter password"
                control={form.control}
                inputClassNames={AppUtils.classNames('rounded-full')}
              />

              <div className="flex justify-between items-center text-sm">
                <Label className="text-primary-500 cursor-pointer">Forgot password?</Label>
              </div>

              <DzButton
                label={'Login'}
                disabled={isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-700 py-3 rounded-full"
                type="submit"
              />
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">End user agreement</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
