import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

type Project = {
  img: string;
  title: string;
};

const projects: Project[] = [
  {
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940&auto=format&fit=crop",
    title: "Project Alpha",
  },
  {
    img: "https://images.unsplash.com/photo-1600798226939-3914c216e2b1?q=80&w=2787&auto=format&fit=crop",
    title: "Project Beta",
  },
  {
    img: "https://images.unsplash.com/photo-1595428774223-ef725c566378?q=80&w=2835&auto=format&fit=crop",
    title: "Project Gamma",
  },
  {
    img: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2832&auto=format&fit=crop",
    title: "Project Delta",
  },
];

const CARD_SIZE = 256; // px

const GsapInfiniteCards = () => {
  const boxesRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!boxesRef.current || !boxRefs.current.length) return;

    const STAGGER = 0.1;
    const DURATION = 1;
    const OFFSET = 0;

    const BOXES = boxRefs.current.filter(Boolean);

    const LOOP = gsap.timeline({
      paused: true,
      repeat: -1,
      ease: "none",
    });

    const SHIFTS = [...BOXES, ...BOXES, ...BOXES];

    SHIFTS.forEach((BOX, index) => {
      const BOX_TL = gsap
        .timeline()
        .set(BOX, {
          xPercent: 250,
          rotateY: -50,
          opacity: 0,
          scale: 0.5,
        })
        .to(
          BOX,
          { opacity: 1, scale: 1, duration: 0.1 },
          0
        )
        .to(
          BOX,
          { opacity: 0, scale: 0.5, duration: 0.1 },
          0.9
        )
        .fromTo(
          BOX,
          { xPercent: 250 },
          { xPercent: -350, duration: 1, immediateRender: false, ease: "power1.inOut" },
          0
        )
        .fromTo(
          BOX,
          { rotateY: -50 },
          { rotateY: 50, immediateRender: false, duration: 1, ease: "power4.inOut" },
          0
        )
        .to(
          BOX,
          { z: 100, scale: 1.25, duration: 0.1, repeat: 1, yoyo: true },
          0.4
        )
        .fromTo(
          BOX,
          { zIndex: 1 },
          { zIndex: BOXES.length, repeat: 1, yoyo: true, ease: "none", duration: 0.5, immediateRender: false },
          0
        );
      LOOP.add(BOX_TL, index * STAGGER);
    });

    const CYCLE_DURATION = STAGGER * BOXES.length;
    const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET;

    const LOOP_HEAD = gsap.fromTo(
      LOOP,
      { totalTime: START_TIME },
      {
        totalTime: `+=${CYCLE_DURATION}`,
        duration: 1,
        ease: "none",
        repeat: -1,
        paused: true,
      }
    );

    const PLAYHEAD = { position: 0 as number };

    const POSITION_WRAP = (value: number) =>
      gsap.utils.wrap(0, Number(LOOP_HEAD.duration()))(value);

    const SCRUB = gsap.to(PLAYHEAD, {
      position: 0,
      onUpdate: () => {
        LOOP_HEAD.totalTime(POSITION_WRAP(Number(PLAYHEAD.position)));
      },
      paused: true,
      duration: 0.25,
      ease: "power3",
    });

    let iteration = 0;
    const boxesElement = boxesRef.current;
    let TRIGGER: ScrollTrigger;

    TRIGGER = ScrollTrigger.create({
      trigger: boxesElement,
      start: 0,
      end: '+=2000',
      horizontal: false,
      pin: boxesElement,
      onUpdate: self => {
        const SCROLL = self.scroll();
        if (SCROLL > (self.end as number) - 1) {
          WRAP(1, 1);
        } else if (SCROLL < 1 && self.direction < 0) {
          WRAP(-1, (self.end as number) - 1);
        } else {
          // Fix: ensure LOOP_HEAD.duration() is a number for arithmetic
          const durationNum = Number(LOOP_HEAD.duration());
          const NEW_POS = (iteration + self.progress) * durationNum;
          SCRUB.vars.position = NEW_POS;
          SCRUB.invalidate().restart();
        }
      },
    });

    function WRAP(iterationDelta: number, scrollTo: number) {
      iteration += iterationDelta;
      TRIGGER.scroll(scrollTo);
      TRIGGER.update();
    }

    const SNAP = gsap.utils.snap(1 / BOXES.length);

    function progressToScroll(progress: number) {
      return gsap.utils.clamp(
        1,
        (TRIGGER.end as number) - 1,
        gsap.utils.wrap(0, 1, progress) * (TRIGGER.end as number)
      );
    }

    function scrollToPosition(position: number) {
      const SNAP_POS = SNAP(position);
      const durationNum = Number(LOOP_HEAD.duration());
      const PROGRESS =
        (SNAP_POS - durationNum * iteration) / durationNum;
      const SCROLL = progressToScroll(PROGRESS);
      if (PROGRESS >= 1 || PROGRESS < 0) return WRAP(Math.floor(PROGRESS), SCROLL);
      TRIGGER.scroll(SCROLL);
    }

    ScrollTrigger.addEventListener("scrollEnd", () => scrollToPosition(Number(SCRUB.vars.position)));

    function NEXT() {
      scrollToPosition(Number(SCRUB.vars.position) - 1 / BOXES.length);
    }
    function PREV() {
      scrollToPosition(Number(SCRUB.vars.position) + 1 / BOXES.length);
    }

    // Keyboard
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === "ArrowLeft" || event.code === "KeyA") NEXT();
      if (event.code === "ArrowRight" || event.code === "KeyD") PREV();
    }
    document.addEventListener("keydown", onKeyDown);

    // Click
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const box = target.closest(".box") as HTMLDivElement | null;
      if (box) {
        const TARGET = BOXES.indexOf(box);
        const CURRENT = gsap.utils.wrap(0, BOXES.length, Math.floor(BOXES.length * Number(SCRUB.vars.position)));
        let BUMP = TARGET - CURRENT;
        if (TARGET > CURRENT && TARGET - CURRENT > BOXES.length * 0.5) BUMP = (BOXES.length - BUMP) * -1;
        if (CURRENT > TARGET && CURRENT - TARGET > BOXES.length * 0.5) BUMP = BOXES.length + BUMP;
        scrollToPosition(Number(SCRUB.vars.position) + BUMP * (1 / BOXES.length));
      }
    }
    boxesElement.addEventListener("click", onClick);

    // Button navigation
    if (prevBtnRef.current) prevBtnRef.current.onclick = PREV;
    if (nextBtnRef.current) nextBtnRef.current.onclick = NEXT;

    // Style setup
    gsap.set(BOXES, { display: 'block', yPercent: -50 });
    gsap.set('button', { z: 200 });

    // Draggable
    Draggable.create(boxesElement, {
      type: "x",
      trigger: boxesElement,
      onPress(this: any) {
        this.startOffset = Number(SCRUB.vars.position);
      },
      onDrag(this: any) {
        SCRUB.vars.position = this.startOffset + (this.startX - this.x) * 0.001;
        SCRUB.invalidate().restart();
      },
      onRelease(this: any) {
        scrollToPosition(Number(SCRUB.vars.position));
      }
    });

    return () => {
      ScrollTrigger.removeEventListener("scrollEnd", () => scrollToPosition(Number(SCRUB.vars.position)));
      document.removeEventListener("keydown", onKeyDown);
      boxesElement.removeEventListener("click", onClick);
      if (TRIGGER) TRIGGER.kill();
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-center pb-6">
        <button
          ref={prevBtnRef}
          className="prev bg-black/70 hover:bg-brand-yellow/70 text-white px-4 py-2 rounded-full mr-4 border shadow-lg transition"
          aria-label="Previous"
        >
          <ArrowLeft />
        </button>
        <button
          ref={nextBtnRef}
          className="next bg-black/70 hover:bg-brand-yellow/70 text-white px-4 py-2 rounded-full border shadow-lg transition"
          aria-label="Next"
        >
          <ArrowRight />
        </button>
      </div>
      {/* Card area */}
      <div
        className="boxes relative flex items-center justify-center h-[380px] md:h-[420px] w-full overflow-visible"
        ref={boxesRef}
      >
        {projects.map((project, i) => (
          <div
            key={project.title + i}
            ref={el => (boxRefs.current[i] = el)}
            className="box absolute aspect-[3/4] w-[200px] md:w-[240px] rounded-2xl overflow-hidden border-2 border-brand-yellow/70 shadow-2xl bg-black flex flex-col items-center justify-end cursor-pointer will-change z-0"
            tabIndex={0}
            style={{
              left: "50%",
              top: "48%",
              transform: "translate(-50%, -50%)",
              background: "black",
              borderColor: "#f6e574a6",
            }}
            aria-label={project.title}
          >
            <img
              draggable={false}
              loading="lazy"
              className="w-full h-full object-cover pointer-events-none select-none"
              src={project.img}
              alt={project.title}
            />
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center bg-black/80 py-2">
              <span className="text-base md:text-lg font-bold text-brand-yellow drop-shadow">{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GsapInfiniteCards;
