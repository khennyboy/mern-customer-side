import { useEffect, type RefObject } from "react";

const useAutofillRevalidate = (
  formRef: RefObject<HTMLDivElement | null>,
  trigger: () => void,
) => {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleAutofill = () => {
      trigger();
    };

    form.addEventListener("input", handleAutofill);
    form.addEventListener("change", handleAutofill);

    return () => {
      form.removeEventListener("input", handleAutofill);
      form.removeEventListener("change", handleAutofill);
    };
  }, [formRef, trigger]);
};

export default useAutofillRevalidate;
