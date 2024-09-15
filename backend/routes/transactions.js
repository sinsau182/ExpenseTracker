const { deleteExpense, getExpense, addExpense } = require('../controllers/expense');
const { addIncome, deleteIncome, getIncomes } = require('../controllers/income');
const requireAuth = require('../middleware/requireAuth')

const router = require('express').Router()

//require auth for all transactions routes
router.use(requireAuth)

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router;  