"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "This field is required",
  }),
});

export default function Signin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    signIn("email", {
      email: values.email,
      redirect: false,
    });
  }

  return (
    <main className="flex flex-col md:flex-row-reverse md:h-screen">
      <section className="flex items-start w-full px-4 mx-auto md:px-0 md:items-center md:w-1/3">
        <div className="w-full max-w-sm mx-auto md:mx-0 my-auto min-w-min relative md:-left-2 text-primary">
          {/* <div className="bg-primary pt-4 py-4">
            <svg
              width="200"
              height="32"
              viewBox="0 0 200 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="logo-load">
                <path
                  d="M0 16C7.52254e-07 7.16344 7.16344 -7.52254e-07 16 0C22.4971 5.67999e-07 28.0898 3.87259 30.5956 9.43544L9.43544 30.5957C8.52739 30.1866 7.66439 29.6953 6.85591 29.1313L19.9872 16H16L4.68629 27.3137C1.79086 24.4183 -3.86258e-07 20.4183 0 16Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M32 16.0055L16.0055 32C24.8377 31.997 31.997 24.8377 32 16.0055Z"
                  fill="currentColor"
                ></path>
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40.4824 4.8634V26.7224H43.5388V19.9467H48.1036C52.2538 19.9045 55.6334 16.7655 55.6334 12.6465C55.6334 8.07728 52.3444 4.8634 48.1205 4.8634H40.4824ZM52.708 12.4433C52.708 15.0043 50.6173 17.255 48.0673 17.2684C47.2745 17.268 46.4819 17.2682 45.6894 17.2684C44.9724 17.2685 44.2556 17.2687 43.5388 17.2684V7.55944L48.0447 7.55968C50.6047 7.55968 52.708 9.74728 52.708 12.4433Z"
                fill="currentColor"
              ></path>
              <path
                d="M178.332 26.723V4.86375L180.207 4.86352C180.777 4.8634 181.161 4.86332 181.404 4.86354V26.723H178.332Z"
                fill="currentColor"
              ></path>
              <path
                d="M60.2914 26.723V4.87602C59.7493 4.87577 59.2723 4.87579 58.4088 4.87581L57.2193 4.87584V26.723H60.2914Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M79.2185 26.723V10.3581H76.1464V12.6622H76.0873C74.8171 10.8012 72.8085 9.915 70.4158 9.915C65.6008 9.915 61.8493 13.5779 61.8493 18.8064C61.8493 23.5327 65.7485 27.1365 70.5339 27.1365C72.8675 27.1365 74.9353 26.1322 76.0873 24.1826H76.1464V26.723H79.2185ZM70.5044 24.3303C67.4323 24.3303 64.9214 21.6422 64.9214 18.5701C64.9214 15.3503 67.4323 12.7213 70.5044 12.7213C73.9014 12.7213 76.2055 15.3798 76.2055 18.5701C76.2055 21.6717 73.6946 24.3303 70.5044 24.3303Z"
                fill="currentColor"
              ></path>
              <path
                d="M96.3588 26.723V16.9159C96.3588 12.3963 93.4639 9.915 89.5352 9.915C87.6446 9.915 85.9609 10.5353 84.7498 12.1009H84.6907V10.3581H81.6202V26.723H84.8974V17.7725C84.8974 14.7004 86.5221 12.7213 89.2102 12.7213C91.9278 12.7213 93.2867 14.3459 93.2867 17.8021V26.723H96.3588Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M114.562 19.7527C114.633 19.242 114.633 18.8006 114.633 18.3338C114.633 13.637 110.97 9.915 106.155 9.915C101.813 9.915 97.9137 13.5188 97.9137 18.6882C97.9137 23.0601 101.636 27.1365 106.244 27.1365C109.759 27.1365 112.831 24.9506 114.101 21.5831H111.029C110.084 23.3259 108.282 24.3303 106.362 24.3303C103.875 24.3303 101.736 22.6204 101.006 19.9471H114.529C114.541 19.8846 114.552 19.8189 114.562 19.7527ZM101.012 17.2687C101.365 14.5892 103.805 12.7213 106.244 12.7213C108.797 12.7213 111.183 14.6159 111.535 17.2687H101.012Z"
                fill="currentColor"
              ></path>
              <path
                d="M136.987 10.3264H140.406C139.885 7.64258 136.821 4.86375 132.701 4.86375C128.389 4.86375 125.085 7.32887 125.085 11.0318C125.085 14.0214 127.222 15.8555 130.674 16.7891L133.212 17.4814C135.509 18.0898 137.288 18.8992 137.288 20.8084C137.288 22.9064 135.285 24.291 132.526 24.291C130.326 24.291 128.451 23.4273 127.908 21.6208H124.493C125.054 24.9318 128 27.1338 132.547 27.1338C137.593 27.1338 140.498 24.4799 140.498 20.8399C140.498 16.9691 137.041 15.4149 134.314 14.7435L132.216 14.1981C130.537 13.768 128.305 12.899 128.316 10.843C128.316 9.01774 129.984 7.55944 132.627 7.55944C134.889 7.55944 136.55 8.63551 136.987 10.3264Z"
                fill="currentColor"
              ></path>
              <path
                d="M157.97 21.6208C156.609 25.126 153.551 27.1365 150.018 27.1365C145.321 27.1365 141.629 23.3555 141.629 18.6882C141.629 13.7551 145.203 9.915 149.989 9.915C153.597 9.915 156.9 12.1085 157.987 15.4726H154.523C153.599 13.7457 152.167 12.7213 150.077 12.7213C146.858 12.7213 144.701 15.173 144.701 18.511C144.701 21.7603 146.917 24.3303 150.018 24.3303C152.001 24.3303 153.614 23.3273 154.508 21.6208H157.97Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M175.927 10.3581V26.723H172.854V24.1826H172.795C171.643 26.1322 169.576 27.1365 167.242 27.1365C162.457 27.1365 158.557 23.5327 158.557 18.8064C158.557 13.5779 162.309 9.915 167.124 9.915C169.517 9.915 171.525 10.8012 172.795 12.6622H172.854V10.3581H175.927ZM161.629 18.5701C161.629 21.6422 164.14 24.3303 167.212 24.3303C170.403 24.3303 172.914 21.6717 172.914 18.5701C172.914 15.3798 170.609 12.7213 167.212 12.7213C164.14 12.7213 161.629 15.3503 161.629 18.5701Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M199.615 19.6633C199.674 19.19 199.674 18.7733 199.674 18.334V18.3338C199.674 18.2604 199.674 18.1874 199.672 18.1145C199.657 17.524 199.585 16.9498 199.459 16.3975C199.229 15.3815 198.819 14.4395 198.262 13.6061C196.765 11.369 194.206 9.915 191.197 9.915C186.854 9.915 182.955 13.5188 182.955 18.6882C182.955 19.2347 183.013 19.7766 183.124 20.3064C183.899 24.0155 187.253 27.1365 191.285 27.1365C194.8 27.1365 197.873 24.9506 199.143 21.5831H196.071C195.952 21.801 195.821 22.0073 195.677 22.2015C194.673 23.5613 193.083 24.3303 191.403 24.3303C188.916 24.3303 186.777 22.6204 186.048 19.9471H199.57C199.575 19.9218 199.58 19.896 199.585 19.8698H199.586C199.597 19.7997 199.607 19.7309 199.615 19.6633ZM186.098 16.9905C186.577 14.4607 188.931 12.7213 191.285 12.7213C193.839 12.7213 196.225 14.6159 196.576 17.2687H186.053C186.065 17.1749 186.08 17.0822 186.098 16.9905Z"
                fill="currentColor"
              ></path>
              <path
                d="M120.103 10.3612H123.535V13.0416H120.103V22.191C120.103 23.7972 120.881 24.2445 121.751 24.326C121.812 24.3277 121.866 24.3297 121.914 24.3323C122.442 24.3606 122.856 24.2799 123.109 24.1967C123.469 25.0138 123.957 25.7618 124.561 26.4192C123.496 27.0599 122.231 27.1812 121.277 27.1239C120.817 27.0999 120.369 27.0233 119.948 26.894C118.068 26.3214 117.476 24.9711 117.263 24.4176L117.277 24.4171C117.116 23.9521 117.028 23.4269 117.03 22.8412V13.0416H114.617L114.617 10.3612H117.03V4.86375H120.103V10.3612Z"
                fill="currentColor"
              ></path>
            </svg>
          </div> */}
        </div>
      </section>

      <section className="justify-center px-4 md:px-0 md:flex md:w-2/3 md:border-r">
        <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Sign in
          </h3>
          <small className="text-sm font-medium leading-none text-muted-foreground">
            No account? Contact the admin.
          </small>

          <div className="my-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          An email will be sent to you with a link to sign in.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between mb-4">
                  <Link
                    href="/"
                    className="text-sm text-primary transition-colors hover:text-blue-500"
                  >
                    Forgot your email?
                  </Link>
                </div>

                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
