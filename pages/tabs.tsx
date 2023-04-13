import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from "@/lib/utils"
import { Layout } from "@/components/layout"

type Pos = {
  offsetWidth: number
  offsetLeft: number
  offsetTop: number
  offsetHeight: number
}

const calculateClipPath = ({
  item,
  container,
  borderRadius
}: {
  item: Pos
  container: Pos
  borderRadius: string
}) => {
  const right = container.offsetWidth + container.offsetLeft - item.offsetWidth - item.offsetLeft
  const left = item.offsetLeft - container.offsetLeft
  const top = item.offsetTop - container.offsetTop
  const bottom = container.offsetHeight - top - item.offsetHeight
  return {
    clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round ${borderRadius})`,
  }
}

const useClipPathAnimtation = (option: KeyframeAnimationOptions) => {
  const lastActiveRef = useRef<Pos | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const backgrounRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<KeyframeAnimationOptions>(option)
  useEffect(() => {
    optionsRef.current = option
  }, [option])
  useEffect(() => {
    if (backgrounRef.current && containerRef.current) {
      const selectedButton =
        containerRef.current.querySelector<HTMLButtonElement>(
          "button[data-state=active]"
        )
      const { clipPath } = calculateClipPath({ item: selectedButton, container: containerRef.current, borderRadius: '0.185rem' })
      backgrounRef.current?.animate(
        [
          {
            clipPath
          },
        ],
        {
          duration: 0,
          fill: "forwards",
        }
      )
      lastActiveRef.current = selectedButton
    }
  }, [])
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const { clipPath: now } = calculateClipPath({ item: e.currentTarget, container: containerRef.current, borderRadius: '0.185rem' })
    if (lastActiveRef.current) {
      const { clipPath: old } = calculateClipPath({
        item: lastActiveRef.current,
        container: containerRef.current,
        borderRadius: '0.185rem'
      })
      backgrounRef.current?.animate(
        [
          {
            clipPath: old,
          },
          {
            clipPath: now,
          },
        ],
        optionsRef.current
      )
    } else {
      backgrounRef.current?.animate(
        [
          {
            clipPath: now
          },
        ],
        {
          duration: 0,
          fill: "forwards",
        }
      )
    }
    lastActiveRef.current = e.currentTarget
  }, [])
  return {
    containerRef,
    backgrounRef,
    onClick
  }
}

const TabsComponents = () => {
  const [tab, setTab] = useState("tokens")
  const { containerRef, onClick, backgrounRef } = useClipPathAnimtation({
    duration: 450,
    easing: "cubic-bezier(0.36, 0.72, 0, 1)",
    fill: "forwards",
  })
  return (
    <div className='container relative mt-10'>
      <Tabs defaultValue="tokens" value={tab} onValueChange={setTab}>
        <TabsList ref={containerRef}>
          <TabsTrigger className={cn("data-[state=active]:bg-transparent data-[state=active]:shadow-none dark-[state=active]:bg-transparent")} value="tokens" onClick={onClick} >tokens</TabsTrigger>
          <TabsTrigger className={cn("data-[state=active]:bg-transparent data-[state=active]:shadow-none dark-[state=active]:bg-transparent")} value="members" onClick={onClick}>members</TabsTrigger>
          <TabsTrigger className={cn("data-[state=active]:bg-transparent data-[state=active]:shadow-none dark-[state=active]:bg-transparent")} value="storage" onClick={onClick} >storage</TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs className={cn("pointer-events-none -translate-y-full")} value={tab} onValueChange={setTab}>
        <TabsList className={cn("bg-white")} ref={backgrounRef}>
          <TabsTrigger className={cn("data-[state=active]:bg-transparent data-[state=active]:shadow-none dark-[state=active]:bg-transparent")} value="tokens">tokens</TabsTrigger>
          <TabsTrigger className={cn("data-[state=active]:bg-transparent data-[state=active]:shadow-none dark-[state=active]:bg-transparent")} value="members">members</TabsTrigger>
          <TabsTrigger className={cn("data-[state=active]:bg-transparent data-[state=active]:shadow-none dark-[state=active]:bg-transparent")} value="storage">storage</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
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
      <Tabs onMouseLeave={onMouseLeave}>
        <TabsList
         className="bg-slate-50"
        >
          <div
            ref={highlightRef}
            style={{
              background: "rgb(153 150 150 / 10%)",
            }}
            className="absolute left-0 h-10 w-0 p-2 opacity-0"
          ></div>
          <TabsTrigger
            onMouseOver={onMouseMove}
            value="tab1"
          >
            One
          </TabsTrigger>
          <TabsTrigger
            onMouseOver={onMouseMove}
            value="tab2"
          >
            Two
          </TabsTrigger>
          <TabsTrigger
            onMouseOver={onMouseMove}
            value="tab3"
          >
            Three
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </section>
  )
}

const Page = () => {
  return (
    <Layout>
      <TabsComponents></TabsComponents>
      <HighlistTab></HighlistTab>
    </Layout>
  )
}

export default Page
