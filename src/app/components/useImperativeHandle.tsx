import {
  forwardRef,
  useRef,
  useImperativeHandle,
  InputHTMLAttributes,
} from "react";

interface CustomInputRef {
  focus: () => void;
  scrollIntoView: () => void;
  stepUp: () => void;
  classList: { add: (...string: string[]) => void };
}

const MyInput = forwardRef<
  CustomInputRef,
  InputHTMLAttributes<HTMLInputElement>
>(function MyInput(props, ref) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current?.focus();
        },
        scrollIntoView() {
          inputRef.current?.scrollIntoView();
        },
        classList: {
          add: (...str) => {
            inputRef.current?.classList.add(...str);
          },
        },
        stepUp: () => {
          inputRef.current?.classList.add("text-red-500");
        },
      };
    },
    []
  );
  return <input {...props} ref={inputRef} />;
});

export default MyInput;

export function Form() {
  const ref = useRef<CustomInputRef>(null);

  function handleClick() {
    ref.current?.focus();
    ref.current?.stepUp();
    // ref.current?.classList.add("text-red-500");
  }

  return (
    <form>
      <MyInput placeholder="Enter your name" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}

// 개인적으로  이해한  내용
// useImperativeHandle는 노출하길 원치 않은 메소드들을 숨길 수 있는 훅이다.
// 그 외에는 일반적으로 커스텀이 안되는 ref 훅을 커스텀할 수 있다.
