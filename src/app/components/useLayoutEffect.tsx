// 공식문서 상에서는 useLayoutEffect를 비추천한다. 가능하면 useEffect로 해결하자.

import {
  LegacyRef,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// useLayoutEffect는 브라우저가 화면을 다시 그리기 전에 실행되는 useEffect입니다.

// import { useState, useRef, useLayoutEffect } from "react";

// function Tooltip() {
//   const ref = useRef(null);
//   const [tooltipHeight, setTooltipHeight] = useState(0);

//   useLayoutEffect(() => {
//     const { height } = ref.current?.getBoundingClientRect();
//     setTooltipHeight(height);
//   }, []);
// }

// 작동 방식을 단계별로 알아봅시다.

// 1. Tooltip은 초기화된 값인 tooltipHeight = 0으로 렌더링 됩니다 (따라서 툴팁의 위치는 잘못될  수 있습니다).
// 2. React가 이 툴팁의 높이를 계산하고 바로 다시 렌더링시킵니다.
// 3. useLayoutEffect가 툴팁의 높이를 계산하고 바로 다시 렌더링시킵니다.
// 4. Tooltip이 실제 tooltipHeight로 렌더링 됩니다.(따라서 툴팁이 올바른 위치에 배치됩니다.)
// 5. React가 DOM에서 이를 업데이트하고 마침내 브라우저가 툴팁을 표시합니다.

// 아래의 버튼들 위로 마우스 커서를 올려서 툴팁이 공간에 들어가는지에 따라 위치를 조정하는 것을 확인하세요.

export function TooltipContainer({
  children,
  x,
  y,
  contentRef,
}: {
  children: string | ReactNode;
  x: number;
  y: number;
  contentRef: RefObject<HTMLDivElement> | undefined;
}) {
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        left: 0,
        top: 0,
        transform: `translate3d(${x}px,  ${y}px, 0)`,
      }}
    >
      <div ref={contentRef} className="tooltip">
        {children}
      </div>
    </div>
  );
}

export function Tooltip({
  children,
  targetRect,
}: {
  children: string | ReactNode;
  targetRect: { left: number; top: number; right: number; bottom: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current!.getBoundingClientRect();
    setTooltipHeight(height);
    console.log("Measured tooltip height: " + height);
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // 위쪽 공간에 들어가지 못하므로 아래에 배치합니다.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}

export function ButtonWithTooltip({
  tooltipContent,
  children,
  ...rest
}: {
  tooltipContent: string | ReactNode;
  children: string;
}) {
  const [targetRect, setTargetRect] = useState<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        {...rest}
        children={children}
        ref={buttonRef}
        onPointerEnter={() => {
          const rect = buttonRef.current!.getBoundingClientRect();
          setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
          console.log(
            `사각형의 left는 ${rect.left}, top은 ${rect.top}, bottom은 ${rect.bottom}, right는 ${rect.right}`
          );
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>
      )}
    </>
  );
}

export default function ToolBox() {
  return (
    <div>
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={<div>This tooltip fits above the button</div>}
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={<div>This tooltip fits above the button</div>}
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
    </div>
  );
}

// chatgpt와 내가 이해한 내용 결합
// useEffect와 useLayoutEffect, 이 두 개의 차이는 렌더링된 혹은 렌더링되는  노드의 접근방식에 있다.
// useEffect는 비동기적으로 실행되므로, 노드가  렌더링되기 전에 접근할 수도 있지만 useLayoutEffect는 동기적으로 실행되며 노드가 렌더링된 후에 접근한다.
// 그러므로 필요한 경우가 아니면, useEffect를 이용하는 것이 성능면에서 좋다.
