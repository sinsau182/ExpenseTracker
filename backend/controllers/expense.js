const ExpenseSchema = require("../models/ExpenseModel")
const { jwtDecode } = require("jwt-decode")

const getDecoded = (token) => {
    const data = jwtDecode(token)     
    return data 
}

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body?.payload 
    const user = getDecoded(req.body.token)
    const user_id = user._id

    const income = ExpenseSchema({
        title, 
        amount,
        category,
        description,
        date,
        user_id
    })

    try {
        //validations
        
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) => {
    try {
        const user = getDecoded(req.query.token)
        const user_id = user._id
        const incomes = await ExpenseSchema.find({user_id}).sort({date: 1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Server Error'})
        });
}