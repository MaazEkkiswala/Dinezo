import DzButton from '@renderer/components/dzButton'
import DzFormInput from '@renderer/components/form/dzFormInput'
import { Card, CardContent } from '@renderer/components/ui/card'
import { Form } from '@renderer/components/ui/form'
import AppUtils from '@renderer/helpers/appUtils'
import useFormState from '@renderer/hooks/useFormState'
import { useState } from 'react'
import z from 'zod'

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters.')
    .max(50, 'First name must be less than 50 characters.'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters.')
    .max(50, 'Last name must be less than 50 characters.'),
  email: z.string().email('Email address must be valid.'),
  phone: z.string().regex(/^\+91\s?[0-9]{10}$/, 'Phone number must be valid (+91 xxxxxxxxxx).'),
  joiningDate: z.string().min(1, 'Joining date is required.')
})

export default function Users() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { form, formValues, resetForm, setServerErrors } = useFormState({
    schema: profileFormSchema
  })

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
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
    <>
      <div className="w-full">
        <div className="grid grid-cols-4">
          <Card>
            <CardContent className="px-10 py-8 flex flex-col justify-center">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <DzFormInput
                    name="firstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    control={form.control}
                    className={AppUtils.classNames('rounded-full')}
                  />

                  <DzFormInput
                    name="lastName"
                    label="Lasr Name"
                    placeholder="Enter Last Name"
                    control={form.control}
                    className={AppUtils.classNames('rounded-full')}
                  />

                  <DzFormInput
                    name="emailAddress"
                    label="Email Address"
                    placeholder="Enter Email Address"
                    control={form.control}
                    className={AppUtils.classNames('rounded-full')}
                  />

                  {/* <DzButton
                    label={'Save'}
                    disabled={isSubmitting}
                    className="w-full bg-primary-500 hover:bg-primary-700 py-3 rounded-full"
                    type="submit"
                  /> */}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-8"></div>
      </div>
    </>
  )
}
