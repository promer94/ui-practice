
import { Layout } from "@/components/layout"
import * as Tabs from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { useRef, useState } from 'react'

const Page = () => {
  const [tab, setTab] = useState("tab1")
  const metaRef = useRef({
    offsetWidth: 0,
    offsetLeft: 0,
  })
  const animateRef = useRef(false)
  const ref = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const onClick = (e) => {
    const { offsetWidth, offsetLeft } = metaRef.current
    const { offsetWidth: newWidth, offsetLeft: newLeft } = e.currentTarget
    const containerWidth = ref.current?.offsetWidth
    const containerOffsetLeft = ref.current?.offsetLeft
    console.log(
      'newWidth', newWidth,
      'newLeft', newLeft,
      'containerWidth', containerWidth,
      'containerOffsetLeft', containerOffsetLeft,
      backRef.current.offsetWidth,
      backRef.current.offsetLeft,
    )
    const old = {
      right: containerWidth - offsetLeft - offsetWidth + containerOffsetLeft,
      left: offsetLeft - containerOffsetLeft,
    }
    const now = {
      right: containerWidth - newLeft - newWidth + containerOffsetLeft,
      left: newLeft - containerOffsetLeft,
    }
    if (animateRef.current) {
      backRef.current?.animate([
        {
          clipPath: `inset(4px ${old.right}px 4px ${old.left}px round 4px)`,
        },
        {
          clipPath: `inset(4px ${now.right}px 4px ${now.left}px round 4px)`,
        }
      ], {
        duration: 400,
        fill: 'forwards',
      })
    }
    metaRef.current = {
      offsetWidth: newWidth,
      offsetLeft: newLeft,
    }
    animateRef.current = true
  }
  return <Layout>
    <section className={cn('relative container pb-8 pt-6 md:py-10')}>
      <Tabs.Root defaultValue="tab1" value={tab} onValueChange={setTab}>
        <Tabs.List
          ref={ref}
          className={cn('inline-flex items-center justify-cente bg-slate-100 p-1 dark:bg-slate-800')}
        >
          <Tabs.Trigger
            onClick={onClick}
            className={cn(`
            inline-flex
            min-w-[100px]
            items-center
            justify-center
            px-3 py-1.5
            text-sm font-medium
            text-slate-700 transition-all
            disabled:pointer-events-none disabled:opacity-50
          data-[state=active]:text-slate-900
             dark:text-slate-200
            dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100`)}
            value="tab1">
            Account
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={onClick}
            className={
              cn(`
            inline-flex
            min-w-[100px]
            items-center
            justify-center
            px-3 py-1.5
            text-sm font-medium
            text-slate-700 transition-all
            disabled:pointer-events-none disabled:opacity-50
          data-[state=active]:text-slate-900
             dark:text-slate-200
            dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100`)
            } value="tab2">
            Password
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Tabs.Root className='absolute top-10 h-10 pointer-events-none' defaultValue="tab1" value={tab} onValueChange={setTab}>
        <Tabs.List
          ref={backRef}
          className={cn('inline-flex items-center justify-center bg-blue-200 p-1 dark:bg-slate-800')}
        >
          <Tabs.Trigger
            className={cn(`
            inline-flex
            min-w-[100px]
            items-center
            justify-center
            px-3 py-1.5
            text-sm font-medium
            text-slate-700 transition-all
            disabled:pointer-events-none disabled:opacity-50
          data-[state=active]:text-slate-900
          dark:text-slate-200
           dark:data-[state=active]:text-slate-100`)}
            value="tab1">
            Account
          </Tabs.Trigger>
          <Tabs.Trigger className={
            cn(`
            inline-flex
            min-w-[100px]
            items-center
            justify-center
            px-3 py-1.5
            text-sm font-medium
            text-slate-700 transition-all
            disabled:pointer-events-none disabled:opacity-50
           data-[state=active]:text-slate-900
            dark:text-slate-200
            dark:data-[state=active]:text-slate-100`)
          } value="tab2">
            Password
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </section>
  </Layout>
}


export default Page
