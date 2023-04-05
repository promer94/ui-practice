import { useLayoutEffect, useRef, useState } from "react"
import * as Tabs from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { Layout } from "@/components/layout"

type Pos = {
  offsetWidth: number
  offsetLeft: number
}

const calculatePos = (el: Pos, container: Pos) => {
  const { offsetWidth: containerWidth, offsetLeft: containerOffsetLeft } =
    container
  const { offsetWidth, offsetLeft } = el
  const right = containerWidth - offsetLeft - offsetWidth + containerOffsetLeft
  const left = offsetLeft - containerOffsetLeft
  return {
    left,
    right,
  }
}

const ExclusiveTabs = () => {
  const [tab, setTab] = useState("tab1")
  const lastPos = useRef<Pos | null>(null)
  const tabContainerRef = useRef<HTMLDivElement>(null)
  const tabBackgroundRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (tabContainerRef.current) {
      const selectedButton =
        tabContainerRef.current.querySelector<HTMLButtonElement>(
          "button[data-state=active]"
        )
      const { left, right } = calculatePos(
        selectedButton,
        tabContainerRef.current
      )
      tabBackgroundRef.current?.animate(
        [
          {
            clipPath: `inset(4px ${right}px 4px ${left}px round 4px)`,
          },
        ],
        {
          duration: 0,
          fill: "forwards",
        }
      )
      lastPos.current = {
        offsetWidth: selectedButton.offsetWidth,
        offsetLeft: selectedButton.offsetLeft,
      }
    }
  }, [])
  const onClick = (e) => {
    const now = calculatePos(e.currentTarget, tabContainerRef.current)
    if (lastPos.current) {
      const old = calculatePos(lastPos.current, tabContainerRef.current)
      tabBackgroundRef.current?.animate(
        [
          {
            clipPath: `inset(4px ${old.right}px 4px ${old.left}px round 4px)`,
          },
          {
            clipPath: `inset(4px ${now.right}px 4px ${now.left}px round 4px)`,
          },
        ],
        {
          easing: "cubic-bezier(.165, .84, .44, 1)",
          duration: 350,
          fill: "forwards",
        }
      )
    } else {
      tabBackgroundRef.current?.animate(
        [
          {
            clipPath: `inset(4px ${now.right}px 4px ${now.left}px round 4px)`,
          },
        ],
        {
          duration: 0,
          fill: "forwards",
        }
      )
    }
    lastPos.current = {
      offsetWidth: e.currentTarget.offsetWidth,
      offsetLeft: e.currentTarget.offsetLeft,
    }
  }
  return (
    <section className={cn("container relative pb-8 pt-6 md:py-10")}>
      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List
          ref={tabContainerRef}
          className={cn(
            "justify-cente inline-flex items-center bg-slate-100 p-1 dark:bg-slate-800"
          )}
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
            value="tab1"
          >
            One
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
            value="tab2"
          >
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
            value="tab3"
          >
            Three
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Tabs.Root
        className="pointer-events-none absolute top-10 h-10"
        defaultValue="tab1"
        value={tab}
        onValueChange={setTab}
      >
        <Tabs.List
          ref={tabBackgroundRef}
          className={cn(
            "inline-flex items-center justify-center  p-1 dark:bg-slate-800",
            {
              "bg-white": true,
            }
          )}
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
            value="tab1"
          >
            One
          </Tabs.Trigger>
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
            value="tab2"
          >
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
            value="tab3"
          >
            Three
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </section>
  )
}

const HighlistTab = () => {
  const highlightRef = useRef<HTMLDivElement>(null)
  const activeButtonRef = useRef<HTMLButtonElement>(null)
  const onMouseLeave = () => {
    if (!activeButtonRef.current) return
    const { offsetLeft, offsetWidth } = activeButtonRef.current
    const keyFrames = [
      {
        width: `${offsetWidth}px`,
        transform: `translate(${offsetLeft}px)`,
        opacity: 1,
      },
      {
        transform: `translate(0px)`,
        width: `0px`,
        opacity: 0,
      },
    ]
    highlightRef.current.animate(keyFrames, {
      duration: 0,
      fill: "forwards",
    })
    activeButtonRef.current = null
  }
  const onMouseMove = (e) => {
    const { offsetLeft, offsetWidth } = e.currentTarget
    const keyFrames = activeButtonRef.current
      ? [
          {
            width: `${activeButtonRef.current.offsetWidth}px`,
            transform: `translate(${activeButtonRef.current.offsetLeft}px)`,
            opacity: 1,
          },
          {
            width: `${offsetWidth}px`,
            transform: `translate(${offsetLeft}px)`,
            opacity: 1,
          },
        ]
      : [
          {
            opacity: 0,
          },
          {
            width: `${offsetWidth}px`,
            transform: `translate(${offsetLeft}px)`,
            opacity: 1,
          },
        ]
    highlightRef.current.animate(keyFrames, {
      fill: "forwards",
      duration: activeButtonRef.current ? 150 : 0,
    })
    activeButtonRef.current = e.currentTarget
  }
  return (
    <section className="container">
      <Tabs.Root onMouseLeave={onMouseLeave}>
        <Tabs.List
          className={cn(
            "relative inline-flex items-center justify-center bg-white p-1 dark:bg-slate-800"
          )}
        >
          <div
            ref={highlightRef}
            style={{
              background: "rgb(153 150 150 / 10%)",
            }}
            className="absolute left-0 h-10 w-0 p-2 opacity-0"
          ></div>
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
            value="tab1"
          >
            One
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
            value="tab2"
          >
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
            value="tab3"
          >
            Three
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </section>
  )
}

const Page = () => {
  return (
    <Layout>
      <ExclusiveTabs></ExclusiveTabs>
      <HighlistTab></HighlistTab>
    </Layout>
  )
}

export default Page
