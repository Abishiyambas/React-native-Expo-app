import { createContext, useEffect, useState } from "react"
import { databases, client } from "../lib/appwrite"
import { ID, Role, Permission, Query } from "react-native-appwrite"
import { useUser } from "../hooks/useUser"

const DATABASE_ID="6accd6de0007cb41db33"
const COLLECTION_ID = "6accd6e5003367f96bce"

export const BooksContext = createContext()

export function BooksProvider ({children}) {
    const [books, setBooks] = useState([])
    const {user} = useUser()

    async function fetchBooks() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal('userID', user.$id)
                ]
            )

            setBooks(response.documents)
            console.log(response.documents)
        } catch (error) {
            console.log(error.message)
        }
    }


    async function fetchBookById(id) {

        try {
            const response = await databases.getDocument(
              DATABASE_ID,
              COLLECTION_ID,  

              id
            )

            return response
            
        } catch (error) {
            console.log(error.message)
        }

    }

    // adds a book unless it's already in the list (createBook and realtime can both deliver it)
    function addBook(book) {
        setBooks((prevBooks) =>
            prevBooks.some((b) => b.$id === book.$id) ? prevBooks : [...prevBooks, book]
        )
    }

    async function createBook(data) {
try {
            const newBook = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {...data, userID: user.$id },
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            )
            addBook(newBook)
        } catch (error) {
            throw Error(error.message)
        }
    }

    async function deleteBook(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            )
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=> {

        let unsubscribe
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`

if(user) {
  fetchBooks()  

  unsubscribe = client.subscribe(channel, (response) => {
    const {payload,events} = response

    if(events[0].includes('create')) {
        setBooks((prevBooks) => [...prevBooks, payload])
    }

    if(events[0].includes('delete')) {
        setBooks((prevBooks) => prevBooks.filter((book)=> book.$id !== payload.$id))
    }

  } )
} else {
    setBooks([])
}   

return () => {
    if (unsubscribe) unsubscribe()
}


}, [user])

    return (
        <BooksContext.Provider
        value={{books, fetchBooks, fetchBookById, createBook, deleteBook}}
        >
{children}
        </BooksContext.Provider>
    )
}