import { useContext } from "react"
import { FirebaseServiceContext } from "../context/FirebaseServiceContext"

export const useFirebaseService = () => {
    return useContext(FirebaseServiceContext)
}