import DzButton from '@renderer/components/dzButton'
import { CommonDialog } from '@renderer/components/dzCommonDialog'
import DzIconButton from '@renderer/components/dzIconButton'
import DzFormInput from '@renderer/components/form/dzFormInput'
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'

import { Card, CardContent } from '@renderer/components/ui/card'
import { ChartConfig } from '@renderer/components/ui/chart'
import { Form } from '@renderer/components/ui/form'
import { Label } from '@renderer/components/ui/label'
import AppUtils from '@renderer/helpers/appUtils'
import useFormState from '@renderer/hooks/useFormState'
import BestTipsCard from '@renderer/sections/user/bestTips'
import { ChartLineLinear } from '@renderer/sections/user/chart-line-linear'
import TrendingDishesCard from '@renderer/sections/user/trendingDishes'
import { IconLogout } from '@tabler/icons-react'
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

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'July', desktop: 214 },
  { month: 'August', desktop: 300 },
  { month: 'September', desktop: 405 },
  { month: 'October', desktop: 215 },
  { month: 'November', desktop: 345 },
  { month: 'December', desktop: 320 }
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

export default function Users() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)
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
      <div className="flex flex-row">
        <div className="m-4 p-4 grid grid-cols-12 grow">
          <div className="col-span-4 m-5">
            <Card>
              <CardContent className="px-10 py-8 flex flex-col justify-center">
                {/* ------------------------------------Avatar uncomment after user get from State ----------------------------------*/}
                {/* <Avatar className="ring-offset-2 ring-2 w-16 h-16">
                <AvatarImage src={getURLFromImage()} alt="@shadcn" />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <Label className="text-xs text-gray-700">
                  {profileState.profile?.name || 'Profile Picture (Optional)'}
                </Label>
                <Button
                  onClick={() => profileInputRef.current.click()}
                  variant="outline"
                  size="sm"
                  className="text-xs font-robot text-gray-700"
                >
                  Select
                </Button>
              </div>
              <input
                ref={profileInputRef}
                accept=".jpeg, .jpg, .png"
                className="hidden"
                type="file"
                onChange={(e) => onSelectImage(e)}
              /> */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <DzFormInput
                      name="firstName"
                      label="First Name"
                      placeholder="Enter First Name"
                      control={form.control}
                      labelClassName={AppUtils.classNames('text-xl')}
                      className={AppUtils.classNames('h-15 px-4 text-2xl')}
                    />
                    <DzFormInput
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter Last Name"
                      control={form.control}
                      labelClassName={AppUtils.classNames('text-xl')}
                      className={AppUtils.classNames('h-15 px-4 text-2xl')}
                    />
                    <DzFormInput
                      name="emailAddress"
                      label="Email Address"
                      placeholder="Enter Email Address"
                      control={form.control}
                      labelClassName={AppUtils.classNames('text-xl')}
                      className={AppUtils.classNames('h-15 px-4 text-2xl')}
                    />
                    <DzFormInput
                      maxLength={10}
                      name="phone"
                      label="Phone Number"
                      placeholder="Phone Number"
                      control={form.control}
                      labelClassName={AppUtils.classNames('text-xl')}
                      className={AppUtils.classNames('h-15 px-4 text-2xl')}
                    />

                    <DzButton
                      label={'Save'}
                      disabled={isSubmitting}
                      className="h-15 text-xl w-full bg-primary-500 hover:bg-primary-700 py-3"
                      type="submit"
                    />

                    <div
                      className="mt-10 h-15 flex flex-row w-full items-center border border-primary-500 text-primary-500 justify-center rounded-md cursor-pointer"
                      onClick={() => setOpenLogoutDialog(true)} // ← open dialog
                    >
                      <DzIconButton
                        icon={<IconLogout className="h-20 w-20" />}
                        variant="ghost"
                        onClick={() => setOpenLogoutDialog(true)} // optional: also opens dialog
                      />
                      Logout
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-8 space-y-6">
            <div className="m-5 grid grid-cols-3 gap-4">
              <Card className="rounded-2xl bg-white text-black p-6 shadow transition-colors duration-300 hover:bg-primary-700 hover:text-white">
                <div className="flex flex-col">
                  <Label className="text-md font-semibold">New Order</Label>
                  <Label className="text-2xl font-bold">72</Label>
                  <Label className="text-sm mt-1 ">• Updated every new order</Label>
                </div>
              </Card>

              {/* Card 2 */}
              <Card className="rounded-2xl bg-white text-black p-6 shadow transition-colors duration-300 hover:bg-primary-700 hover:text-white">
                <div className="flex flex-col">
                  <Label className="text-md font-semibold">Total Order</Label>
                  <Label className="text-2xl font-bold">72</Label>
                  <Label className="text-sm mt-1  ">• Updated every new order</Label>
                </div>
              </Card>

              {/* Card 3 */}
              <Card className="rounded-2xl bg-white text-black p-6 shadow transition-colors duration-300 hover:bg-primary-700 hover:text-white">
                <div className="flex flex-col">
                  <Label className="text-md font-semibold">Waiting List</Label>
                  <Label className="text-2xl font-bold">72</Label>
                  <Label className="text-sm mt-1 ">• Updated every new order</Label>
                </div>
              </Card>
            </div>

            <ChartLineLinear
              title="Line Chart - Linear"
              description="January - December 2025"
              data={chartData}
              dataKey="desktop"
              xKey="month"
              chartConfig={chartConfig}
              className="m-5 p-4"
            />

            <div className="m-5 grid grid-cols-2 gap-4">
              <TrendingDishesCard />
              <BestTipsCard />
            </div>
          </div>
        </div>
        <CommonDialog
          open={openLogoutDialog}
          onOpenChange={setOpenLogoutDialog}
          title=""
          description=""
          onSubmit={() => {
            // Handle logout
            console.log('Logging out...')
            setOpenLogoutDialog(false)
          }}
          onCancel={() => {
            setOpenLogoutDialog(false)
          }}
          cancelLabel="Cancel"
          submitLabel="Log Out"
          submitButtonClass="h-15 text-lg bg-error-500 hover:bg-error-600"
          cancelButtonClass="h-15 text-lg border-error-500 text-error-500"
        >
          {/* Custom children content */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <IconLogout className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-black">Log Out?</h2>
            <p className="text-gray-500 text-sm">Are you sure want to log out?</p>
          </div>
        </CommonDialog>
      </div>
    </>
  )
}
