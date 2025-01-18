import type { Template } from '../../models';

const cdnBaseUrl = 'https://cdn.jsdelivr.net/npm/@hatemhosny/shadcdn@0.0.13/build/';

export const shadcnuiStarter: Template = {
  name: 'shadcn-ui',
  title: window.deps.translateString('templates.starter.shadcnui', 'shadcn/ui Starter'),
  thumbnail: 'assets/templates/shadcn-ui.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `<link rel="stylesheet" href="${cdnBaseUrl}shadcdn.css">`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trimStart(),
  },
  script: {
    language: 'react-tsx',
    content: `
// from https://ui.shadcn.com/blocks/login#login-03
import React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}


export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
`.trimStart(),
  },
  processors: ['tailwindcss'],
  imports: {},
  types: {},
  customSettings: {
    imports: {
      react: 'https://esm.sh/react',
      'react/': 'https://esm.sh/react/',
      'react-dom': 'https://esm.sh/react-dom',
      'react-dom/': 'https://esm.sh/react-dom/',
      '@': `${cdnBaseUrl}shadcdn.js`,
      '@/lib/utils': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/accordion': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/alert-dialog': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/alert': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/aspect-ratio': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/avatar': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/badge': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/button': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/calendar': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/card': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/checkbox': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/collapsible': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/command': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/context-menu': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/dialog': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/dropdown-menu': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/form': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/hover-card': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/input': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/label': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/menubar': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/navigation-menu': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/popover': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/progress': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/radio-group': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/scroll-area': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/select': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/separator': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/sheet': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/skeleton': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/slider': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/switch': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/table': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/tabs': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/textarea': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/toast': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/toaster': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/toggle': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/tooltip': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/use-toast': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/resizable': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/input-otp': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/breadcrumb': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/toggle-group': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/sonner': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/pagination': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/drawer': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/carousel': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/sidebar': `${cdnBaseUrl}shadcdn.js`,
      '@/components/ui/chart': `${cdnBaseUrl}shadcdn.js`,
    },
    types: {
      '@/components': `${cdnBaseUrl}shadcdn.d.ts`,
      '@/utils': `${cdnBaseUrl}shadcdn.d.ts`,
    },
  },
};
