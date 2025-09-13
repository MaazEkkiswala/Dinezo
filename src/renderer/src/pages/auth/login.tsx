import { IconUser } from '@tabler/icons-react'
import LoginBackground from '../../assets/top-view-table-full-food.jpg'
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card'
import { Form } from '@renderer/components/ui/form'
import DzFormInput from '@renderer/components/form/dzFormInput'
import DzInputPasswordField from '@renderer/components/form/dzFormPasswordInput'
import { Label } from '@renderer/components/ui/label'
import DzButton from '@renderer/components/dzButton'
import z from 'zod'
import { useState } from 'react'
import useFormState from '@renderer/hooks/useFormState'
import AppUtils from '@renderer/helpers/appUtils'

const formSchema = z.object({
  emailAddress: z.email('Email address must be valid.'),
  password: z.string().min(8, {
    message: 'Password mus be contained at least 8 characters.'
  })
})

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { form, formValues, resetForm, setServerErrors } = useFormState({
    schema: formSchema
  })

  const backgroundStyle = {
    backgroundImage: `url(${LoginBackground})`,
    backgroundSize: 'cover'
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    const payload: any = {
      ...values
    }

    // const { data, errors }: any = await ApiService.post(ApiUrls.login, payload);
    // if (data) {
    //   dispatch(login(data));
    //   if (data.user?.preferenceId) {
    //     dispatch(setUserPreference(data.user.preferenceId));
    //   }

    //   router.push("/home");
    // }
    //   else if (errors) {
    //         setServerErrors(errors);
    //     }
    // }

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
              Lorem Ipsum has been the industry's standard dummy text ever since.
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
