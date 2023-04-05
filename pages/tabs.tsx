
import { Layout } from "@/components/layout"
import * as Tabs from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

type Pos = {
  offsetWidth: number
  offsetLeft: number
}

const calculatePos = (el: Pos, container: Pos) => {
  const { offsetWidth: containerWidth, offsetLeft: containerOffsetLeft } = container
  const { offsetWidth, offsetLeft } = el
  const right = containerWidth - offsetLeft - offsetWidth + containerOffsetLeft
  const left = offsetLeft - containerOffsetLeft
  return {
    left,
    right
  }
}

const Page = () => {
  const [tab, setTab] = useState('tab1')
  const metaRef = useRef({
    offsetWidth: 0,
    offsetLeft: 0,
  })
  const animateRef = useRef(false)
  const ref = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => {
    if (ref.current) {
      const el = ref.current.querySelector<HTMLButtonElement>("button[data-state=active]")
      const { left, right } = calculatePos(el, ref.current)
      backRef.current?.animate([
        {
          clipPath: `inset(4px ${right}px 4px ${left}px round 4px)`,
        }
      ], {
        duration: 0,
        fill: 'forwards',
      })
      metaRef.current = {
        offsetWidth: el.offsetWidth,
        offsetLeft: el.offsetLeft,
      }
      animateRef.current = true
    }
  }, [])
  const onClick = (e) => {
    const old = calculatePos(metaRef.current, ref.current)
    const now = calculatePos(e.currentTarget, ref.current)
    if (animateRef.current) {
      backRef.current?.animate([
        {
          clipPath: `inset(4px ${old.right}px 4px ${old.left}px round 4px)`,
        },
        {
          clipPath: `inset(4px ${now.right}px 4px ${now.left}px round 4px)`,
        }
      ], {
        easing: 'cubic-bezier(.165, .84, .44, 1)',
        duration: 350,
        fill: 'forwards',
      })
    }
    metaRef.current = {
      offsetWidth: e.currentTarget.offsetWidth,
      offsetLeft: e.currentTarget.offsetLeft,
    }
    animateRef.current = true
  }
  const onMouseMove = (e) => {
    const { offsetLeft, offsetWidth } = e.currentTarget
    const keyFrames = activeRef.current ? [{
      width: `${activeRef.current.offsetWidth}px`,
      transform: `translate(${activeRef.current.offsetLeft}px)`,
      opacity: 1
    }, {
      width: `${offsetWidth}px`,
      transform: `translate(${offsetLeft}px)`,
      opacity: 1
    }] : [{
      opacity: 0
    }, {
      width: `${offsetWidth}px`,
      transform: `translate(${offsetLeft}px)`,
      opacity: 1
    }]
    highlightRef.current.animate(keyFrames, {
      fill: 'forwards',
      duration: activeRef.current ? 150 : 0,
    })
    activeRef.current = e.currentTarget
  }

  return <Layout>
    <section className={cn('container relative pb-8 pt-6 md:py-10')}>
      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List
          ref={ref}
          className={cn('justify-cente inline-flex items-center bg-slate-100 p-1 dark:bg-slate-800')}
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
            One
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
            Two
          </Tabs.Trigger>
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
            value="tab3">
            Three
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Tabs.Root className='pointer-events-none absolute top-10 h-10' defaultValue="tab1" value={tab} onValueChange={setTab}>
        <Tabs.List
          ref={backRef}
          className={cn('inline-flex items-center justify-center  p-1 dark:bg-slate-800', {
            'bg-white': true
          })}
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
            One
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
            Two
          </Tabs.Trigger>
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
            value="tab3">
            Three
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </section>
    <section className="container">
      <Tabs.Root
        onMouseLeave={() => {
          if (!activeRef.current) return
          const { offsetLeft, offsetWidth } = activeRef.current
          const keyFrames = [{
            width: `${offsetWidth}px`,
            transform: `translate(${offsetLeft}px)`,
            opacity: 1
          }, {
            transform: `translate(0px)`,
            width: `0px`,
            opacity: 0
          }]
          highlightRef.current.animate(keyFrames, {
            duration: 0,
            fill: 'forwards',
          })
          activeRef.current = null
        }}
        value={tab}
        onValueChange={setTab}
      >

        <Tabs.List
          className={cn('relative inline-flex items-center justify-center bg-white p-1 dark:bg-slate-800')}
        >
          <div ref={highlightRef}
            style={{
              background: 'rgb(153 150 150 / 10%)'
            }}
            className='absolute left-0 h-10 w-0 p-2 opacity-0'></div>
          <Tabs.Trigger
            onMouseOver={onMouseMove}
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
            One
          </Tabs.Trigger>
          <Tabs.Trigger
            onMouseOver={onMouseMove}
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
            Two
          </Tabs.Trigger>
          <Tabs.Trigger
            onMouseOver={onMouseMove}
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
            value="tab3">
            Three
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </section>
  </Layout>
}


export default Page
