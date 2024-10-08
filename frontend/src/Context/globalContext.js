import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext';



const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const {user} = useAuthContext()

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}v1/add-income`, {payload: income, token: user.token}, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }
        )
        .catch((err) => {
            setError(err.response.data.message)
        })
        if(user){
        getIncomes()
        }
    }
    
    const getIncomes = async (income) => {
        console.log(BASE_URL)
        const response = await axios.get(`${BASE_URL}v1/get-incomes?token=${user.token}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if(user) {
        setIncomes(response.data)
        console.log(response.data)
        }
    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}v1/delete-income/${id}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if(user) {
        getIncomes()
        }
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    //calculate expenses
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}v1/add-expense`, {payload: income, token: user.token}, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .catch((err) => {
            setError(err.response.data.message)
        })
        if(user) {
        getExpenses()
        }
    }
    
    const getExpenses = async (income) => {
        const response = await axios.get(`${BASE_URL}v1/get-expenses?token=${user.token}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if(user) {
        setExpenses(response.data)
        console.log(response.data)
        }
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}v1/delete-expense/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if(user){
        getExpenses()
        }
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 5)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes, 
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance, 
            transactionHistory, 
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
