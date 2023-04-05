import { useEffect } from "react"

const useTitle = (title) => {
  useEffect(() =>{
    document.title = `${title}-Taskly`;
  }, [title])
}

export default useTitle;