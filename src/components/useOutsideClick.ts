import { useEffect } from "react"

function useOutsideClick(ref, setOpenOption, exceptionId) {
    useEffect(()=>{
        /// effect function:
        document.addEventListener("mousedown", handleOutsideClick)

        function handleOutsideClick(event){
            if (ref.current && !ref.current.contains(event.target) && exceptionId !== event.target.id){
                setOpenOption(false)
            }
        }

        /// cleanup function
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        };
    }, [ref])
}

export default useOutsideClick